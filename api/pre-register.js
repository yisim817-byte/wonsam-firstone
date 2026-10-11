// 사전고객등록 운영자 추가 알림 (Vercel Function)
// 접수 원본은 브라우저가 FormSubmit 으로 운영자 이메일에 보낸다(pre-register.js).
// 이 함수는 그 뒤에 호출되며, 설정된 경우에만 운영자에게 추가 알림을 보낸다.
// - 카카오톡 "나에게 보내기"(KAKAO_REST_API_KEY, KAKAO_REFRESH_TOKEN)
// - 이메일(Resend: RESEND_API_KEY, PREREG_EMAIL_TO)
// 고객 발신은 보류 중이다. 설정 방법은 PRE_REGISTER_SETUP.md 참고.
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
    res.status(200).json({ ok: true, receiptNo: receiptNo(), skipped: true });
    return;
  }

  const parsed = parse(body);
  if (parsed.error) {
    res.status(400).json({ ok: false, error: parsed.error, field: parsed.field });
    return;
  }

  const { entry } = parsed;
  const receipt = /^PR\d{6}-[0-9A-F]{6}$/.test(body.receiptNo) ? body.receiptNo : receiptNo();
  const at = kstStamp();

  const [email, kakao] = await Promise.all([sendOwnerEmail(entry, receipt, at), sendOwnerKakao(entry, receipt, at)]);
  console.log("pre-register owner", JSON.stringify({ receipt, type: entry.type, email, kakao }));
  res.status(200).json({ ok: true, receiptNo: receipt, email: email.status, kakao: kakao.status });
};
