// 사전고객등록 접수 (Vercel Function)
// - 운영자 알림: 이메일(Resend) + 카카오톡 "나에게 보내기"(Kakao REST API)
// - 고객 등록완료 메시지: SOLAPI 알림톡(템플릿 설정 시) 또는 문자(SMS/LMS)
// 별도 DB가 없으므로 운영자 알림 채널 중 1개 이상이 수신되어야 접수 성공으로 응답한다.
// 비밀값·수신처는 모두 Vercel 환경변수에만 둔다. 설정 방법은 PRE_REGISTER_SETUP.md 참고.
const crypto = require("crypto");

const SITE = {
  "label": "원삼 센트레빌 퍼스트원",
  "host": "www.wonsam-firstone.co.kr",
  "source": "wonsam-firstone.co.kr",
  "hosts": [
    "wonsam-firstone.co.kr",
    "www.wonsam-firstone.co.kr"
  ],
  "phone": "1833-3872"
};

const PERSONAL = "personal";
const CORPORATE = "corporate";

function clean(value, max) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "";
}

function digits(value) {
  return typeof value === "string" ? value.replace(/\D/g, "") : "";
}

function formatPhone(phone) {
  if (/^02\d{7,8}$/.test(phone)) return phone.replace(/^(02)(\d{3,4})(\d{4})$/, "$1-$2-$3");
  return phone.replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
}

function kstNow() {
  return new Date(Date.now() + 9 * 60 * 60 * 1000);
}

function kstStamp() {
  return kstNow().toISOString().replace("T", " ").slice(0, 16) + " (KST)";
}

function receiptNo() {
  const d = kstNow().toISOString().slice(2, 10).replace(/-/g, "");
  return `PR${d}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function validBirth(birth) {
  if (!/^\d{8}$/.test(birth)) return "생년월일 8자리를 입력해 주세요. 예: 19850315";
  const y = Number(birth.slice(0, 4));
  const m = Number(birth.slice(4, 6));
  const d = Number(birth.slice(6, 8));
  const date = new Date(Date.UTC(y, m - 1, d));
  if (y < 1900 || date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) {
    return "생년월일을 다시 확인해 주세요.";
  }
  const today = kstNow();
  let age = today.getUTCFullYear() - y;
  if (today.getUTCMonth() + 1 < m || (today.getUTCMonth() + 1 === m && today.getUTCDate() < d)) age -= 1;
  if (age < 0) return "생년월일을 다시 확인해 주세요.";
  if (age < 14) return "만 14세 미만은 등록할 수 없습니다.";
  return "";
}

function originAllowed(req) {
  const origin = req.headers.origin;
  if (!origin) return true; // 일부 브라우저·앱 내 웹뷰는 Origin 을 보내지 않는다.
  let host = "";
  try {
    host = new URL(origin).hostname.toLowerCase();
  } catch {
    return false;
  }
  return SITE.hosts.includes(host) || host.endsWith(".vercel.app") || host === "localhost" || host === "127.0.0.1";
}

function parse(body) {
  const type = body.type === CORPORATE ? CORPORATE : body.type === PERSONAL ? PERSONAL : "";
  if (!type) return { error: "등록 유형(개인/법인)을 선택해 주세요.", field: "type" };

  const phone = digits(body.phone);
  const entry = {
    type,
    phone,
    page: clean(body.page, 200),
    referrer: clean(body.referrer, 300),
    utm: clean(body.utm, 300),
  };

  if (type === PERSONAL) {
    entry.name = clean(body.name, 20);
    entry.birth = digits(body.birth);
    if (entry.name.length < 2) return { error: "이름을 입력해 주세요.", field: "name" };
    const birthError = validBirth(entry.birth);
    if (birthError) return { error: birthError, field: "birth" };
    if (!/^01[016789]\d{7,8}$/.test(phone)) return { error: "휴대폰번호를 확인해 주세요. 예: 010-1234-5678", field: "phone" };
  } else {
    entry.company = clean(body.company, 60);
    entry.manager = clean(body.manager, 20);
    if (entry.company.length < 2) return { error: "회사명을 입력해 주세요.", field: "company" };
    if (entry.manager.length < 2) return { error: "담당자 이름을 입력해 주세요.", field: "manager" };
    if (!/^0\d{8,10}$/.test(phone)) return { error: "담당자 전화번호를 확인해 주세요.", field: "phone" };
  }

  if (body.consentPrivacy !== true) return { error: "개인정보 수집·이용에 동의해야 등록할 수 있습니다.", field: "consentPrivacy" };
  if (body.consentNotice !== true) return { error: "분양일정 안내 수신에 동의해야 등록할 수 있습니다.", field: "consentNotice" };
  return { entry };
}

function typeLabel(entry) {
  return entry.type === CORPORATE ? "법인" : "개인";
}

function displayName(entry) {
  return entry.type === CORPORATE ? `${entry.company} ${entry.manager}` : entry.name;
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function ownerRows(entry, receipt, at) {
  const rows = [
    ["접수번호", receipt],
    ["접수시각", at],
    ["현장/사이트", `${SITE.label} · ${SITE.source}`],
    ["구분", typeLabel(entry)],
  ];
  if (entry.type === CORPORATE) {
    rows.push(["회사명", entry.company], ["담당자", entry.manager], ["전화번호", formatPhone(entry.phone)]);
  } else {
    rows.push(
      ["이름", entry.name],
      ["생년월일", `${entry.birth.slice(0, 4)}-${entry.birth.slice(4, 6)}-${entry.birth.slice(6, 8)}`],
      ["휴대폰", formatPhone(entry.phone)],
    );
  }
  rows.push(["동의", "개인정보 수집·이용(필수), 분양일정 안내 수신(필수)"]);
  if (entry.page) rows.push(["등록 페이지", entry.page]);
  if (entry.utm) rows.push(["유입(UTM)", entry.utm]);
  if (entry.referrer) rows.push(["이전 페이지", entry.referrer]);
  return rows;
}

async function sendOwnerEmail(entry, receipt, at) {
  const key = process.env.RESEND_API_KEY?.trim();
  const to = (process.env.PREREG_EMAIL_TO || "").split(",").map((v) => v.trim()).filter(Boolean);
  if (!key || !to.length) return { status: "not_configured" };
  const from = process.env.PREREG_EMAIL_FROM?.trim() || "사전고객등록 <onboarding@resend.dev>";
  const rows = ownerRows(entry, receipt, at);
  const html = [
    `<h2 style="margin:0 0 12px;font-family:sans-serif">[${escapeHtml(SITE.source)}] 사전고객등록 (${typeLabel(entry)})</h2>`,
    '<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">',
    ...rows.map(([k, v]) => `<tr><th style="text-align:left;padding:6px 12px;border:1px solid #ddd;background:#f6f6f6">${escapeHtml(k)}</th><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(v)}</td></tr>`),
    "</table>",
    '<p style="font-family:sans-serif;font-size:12px;color:#777">이 메일이 사전고객등록 원본 기록입니다. 보관·파기는 개인정보처리방침의 보유기간을 따릅니다.</p>',
  ].join("");
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: `[사전고객등록·${SITE.source}] ${typeLabel(entry)} · ${displayName(entry)} (${receipt})`,
        html,
        text,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { status: "failed", detail: `resend http ${res.status}` };
    return { status: "sent" };
  } catch {
    return { status: "failed", detail: "resend network" };
  }
}

async function sendOwnerKakao(entry, receipt, at) {
  const restKey = process.env.KAKAO_REST_API_KEY?.trim();
  const refreshToken = process.env.KAKAO_REFRESH_TOKEN?.trim();
  if (!restKey || !refreshToken) return { status: "not_configured" };
  try {
    const form = new URLSearchParams({ grant_type: "refresh_token", client_id: restKey, refresh_token: refreshToken });
    const secret = process.env.KAKAO_CLIENT_SECRET?.trim();
    if (secret) form.set("client_secret", secret);
    const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded;charset=utf-8" },
      body: form,
      signal: AbortSignal.timeout(8000),
    });
    const token = await tokenRes.json().catch(() => null);
    if (!tokenRes.ok || !token?.access_token) return { status: "failed", detail: `kakao token http ${tokenRes.status}` };
    // 리프레시 토큰은 만료 1개월 전부터 갱신 값이 내려온다. 환경변수 교체가 필요하다는 신호만 남긴다.
    const renewNeeded = Boolean(token.refresh_token);

    const lines = [
      `[사전고객등록] ${SITE.source}`,
      `${typeLabel(entry)} · ${displayName(entry)}`,
      formatPhone(entry.phone),
      at,
      `접수번호 ${receipt}`,
    ];
    if (renewNeeded) lines.push("※ 카카오 토큰 갱신 필요(설정 문서 참고)");
    const url = `https://${SITE.host}/pre-register.html`;
    const template = {
      object_type: "text",
      text: lines.join("\n").slice(0, 200),
      link: { web_url: url, mobile_web_url: url },
      button_title: "등록 페이지",
    };
    const sendRes = await fetch("https://kapi.kakao.com/v2/api/talk/memo/default/send", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token.access_token}`,
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({ template_object: JSON.stringify(template) }),
      signal: AbortSignal.timeout(8000),
    });
    const sent = await sendRes.json().catch(() => null);
    if (!sendRes.ok || sent?.result_code !== 0) return { status: "failed", detail: `kakao memo http ${sendRes.status}` };
    return { status: "sent", renewNeeded };
  } catch {
    return { status: "failed", detail: "kakao network" };
  }
}

function solapiAuth(apiKey, apiSecret) {
  const date = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  const salt = crypto.randomBytes(16).toString("hex");
  const signature = crypto.createHmac("sha256", apiSecret).update(date + salt).digest("hex");
  return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
}

function customerText(entry, receipt) {
  return [
    `[${SITE.label}] 사전고객등록 완료`,
    "",
    `${displayName(entry)}님, 사전고객등록이 완료되었습니다.`,
    `접수번호: ${receipt}`,
    "",
    "분양 일정이 확정되면 등록하신 연락처로 순차 안내드리겠습니다.",
    "백화점상품권 이벤트의 지급 조건은 분양 상담 시 안내드립니다.",
    "",
    `문의 ${SITE.phone}`,
  ].join("\n");
}

async function sendCustomerMessage(entry, receipt) {
  const apiKey = process.env.SOLAPI_API_KEY?.trim();
  const apiSecret = process.env.SOLAPI_API_SECRET?.trim();
  const sender = digits(process.env.SOLAPI_SENDER || "");
  if (!apiKey || !apiSecret || !sender) return { status: "not_configured" };
  if (!/^01[016789]\d{7,8}$/.test(entry.phone)) return { status: "skipped", detail: "landline" };

  const pfId = process.env.SOLAPI_PFID?.trim();
  const templateId = process.env.SOLAPI_TEMPLATE_ID?.trim();
  const message = { to: entry.phone, from: sender };
  if (pfId && templateId) {
    // 알림톡: 승인된 템플릿 변수만 채운다. 실패 시 SOLAPI 가 문자로 대체 발송한다.
    message.type = "ATA";
    message.kakaoOptions = {
      pfId,
      templateId,
      disableSms: false,
      variables: {
        "#{고객명}": displayName(entry),
        "#{현장명}": SITE.label,
        "#{접수번호}": receipt,
        "#{대표번호}": SITE.phone,
      },
    };
  } else {
    message.text = customerText(entry, receipt);
    message.subject = `[${SITE.label}] 사전고객등록 완료`.slice(0, 40);
  }
  try {
    const res = await fetch("https://api.solapi.com/messages/v4/send-many/detail", {
      method: "POST",
      headers: { authorization: solapiAuth(apiKey, apiSecret), "content-type": "application/json" },
      body: JSON.stringify({ messages: [message] }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { status: "failed", detail: `solapi http ${res.status}` };
    const body = await res.json().catch(() => null);
    if (body?.failedMessageList?.length) return { status: "failed", detail: "solapi rejected" };
    return { status: "sent" };
  } catch {
    return { status: "failed", detail: "solapi network" };
  }
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }
  if (!originAllowed(req)) {
    res.status(403).json({ ok: false, error: "허용되지 않은 요청입니다." });
    return;
  }

  let body = req.body || {};
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  // 자동 등록 차단: 숨김 필드가 채워졌거나 화면 진입 후 2초 안에 제출되면 저장·발송 없이 종료한다.
  if (clean(body.website, 100) || Number(body.elapsed) < 2000) {
    res.status(200).json({ ok: true, receiptNo: receiptNo(), customerNotice: "skipped" });
    return;
  }

  const parsed = parse(body);
  if (parsed.error) {
    res.status(400).json({ ok: false, error: parsed.error, field: parsed.field });
    return;
  }

  const { entry } = parsed;
  const receipt = receiptNo();
  const at = kstStamp();

  const [email, kakao] = await Promise.all([sendOwnerEmail(entry, receipt, at), sendOwnerKakao(entry, receipt, at)]);
  const delivered = email.status === "sent" || kakao.status === "sent";
  console.log("pre-register owner", JSON.stringify({ receipt, type: entry.type, email, kakao }));

  if (!delivered) {
    const configured = email.status !== "not_configured" || kakao.status !== "not_configured";
    res.status(configured ? 502 : 503).json({
      ok: false,
      error: `지금은 온라인 등록을 처리하지 못했습니다. 분양문의 ${SITE.phone}로 연락 주시면 바로 등록해 드립니다.`,
    });
    return;
  }

  const customer = await sendCustomerMessage(entry, receipt);
  console.log("pre-register customer", JSON.stringify({ receipt, customer }));

  res.status(200).json({ ok: true, receiptNo: receipt, customerNotice: customer.status });
};
