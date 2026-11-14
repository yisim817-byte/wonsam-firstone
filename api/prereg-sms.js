// 사전고객등록 완료 문자 (Vercel Function)
// - 운영자 이메일 접수(FormSubmit)가 성공한 뒤 브라우저가 1회 호출한다.
// - 문구는 고정이며 고객이 입력한 내용은 이름(한글·영문만)과 접수번호(형식 검증)만 들어간다.
// - 같은 번호로 24시간 안에 이미 등록완료 문자가 나갔으면 다시 보내지 않는다(SOLAPI 발송 내역 조회).
// - 비밀값은 Vercel 환경변수에만 둔다: SOLAPI_API_KEY, SOLAPI_API_SECRET, SOLAPI_SENDER(솔라피 등록 발신번호).
//   값이 없으면 문자를 보내지 않고 접수만 정상 처리된다.
// - 개인정보(이름·번호)는 로그에 남기지 않는다.
const crypto = require("crypto");

const LABEL = "원삼 센트레빌 퍼스트원";
const PHONE = "1833-3872";
const MARK = "사전고객등록이 완료되었습니다";

const SITE_HOSTS = [
  "wonsam-firstone.co.kr",
  "www.wonsam-firstone.co.kr",
  "skwonsam.site",
  "www.skwonsam.site",
  "xn--cg4bj2imdx1a.kr",
  "www.xn--cg4bj2imdx1a.kr",
];
const PREVIEW_HOST = /^(wonsam-firstone|skwonsam-landing|yongin-wonsam-kr)(-[a-z0-9-]+)?\.vercel\.app$/;

// 인스턴스 단위 남용 방지(보조 장치). 실제 중복 차단은 SOLAPI 발송 내역 조회로 한다.
const recentByPhone = new Map(); // phone -> 발송 시각
const recentByIp = new Map(); // ip -> [시각...]
let sentThisHour = [];
const IP_LIMIT = 3; // 10분당
const HOURLY_LIMIT = 60;

function digits(value) {
  return typeof value === "string" ? value.replace(/\D/g, "") : "";
}

function safeName(value) {
  const name = typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
  return /^[가-힣A-Za-z ]{2,20}$/.test(name) ? name : "";
}

function originAllowed(req) {
  const origin = req.headers.origin;
  if (!origin) return false;
  let host = "";
  try {
    host = new URL(origin).hostname.toLowerCase();
  } catch {
    return false;
  }
  return SITE_HOSTS.includes(host) || PREVIEW_HOST.test(host);
}

function clientIp(req) {
  const fwd = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return fwd || req.socket?.remoteAddress || "unknown";
}

function throttled(ip, phone, now) {
  const last = recentByPhone.get(phone);
  if (last && now - last < 24 * 60 * 60 * 1000) return "duplicate_local";
  const hits = (recentByIp.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (hits.length >= IP_LIMIT) return "ip_limit";
  sentThisHour = sentThisHour.filter((t) => now - t < 60 * 60 * 1000);
  if (sentThisHour.length >= HOURLY_LIMIT) return "hourly_limit";
  return "";
}

function remember(ip, phone, now) {
  recentByPhone.set(phone, now);
  const hits = (recentByIp.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  hits.push(now);
  recentByIp.set(ip, hits);
  sentThisHour.push(now);
  if (recentByPhone.size > 5000) recentByPhone.clear();
  if (recentByIp.size > 5000) recentByIp.clear();
}

function solapiAuth(apiKey, apiSecret) {
  const date = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  const salt = crypto.randomBytes(16).toString("hex");
  const signature = crypto.createHmac("sha256", apiSecret).update(date + salt).digest("hex");
  return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
}

function messageText(name, receipt) {
  return [
    `[${LABEL}]`,
    `${name ? name + "님, " : ""}${MARK}.`,
    `접수번호 ${receipt}`,
    "접수번호는 분양계약 시 등록 확인에 사용됩니다.",
    "",
    "재가동 일정이 정해지면 등록하신 번호로 안내드리겠습니다.",
    `문의 ${PHONE}`,
  ].join("\n");
}

// 같은 번호로 최근 24시간 안에 등록완료 문자가 나갔는지 확인한다. 조회 실패 시 발송을 막지 않는다.
async function alreadySent(apiKey, apiSecret, phone) {
  const end = new Date();
  const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);
  const qs = new URLSearchParams({ to: phone, startDate: start.toISOString(), endDate: end.toISOString(), limit: "50" });
  try {
    const res = await fetch(`https://api.solapi.com/messages/v4/list?${qs}`, {
      headers: { authorization: solapiAuth(apiKey, apiSecret) },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return { known: false, detail: `list http ${res.status}` };
    const body = await res.json().catch(() => null);
    const list = body?.messageList ? Object.values(body.messageList) : [];
    const hit = list.some((m) => (m?.customFields?.kind === "prereg") || String(m?.text || "").includes(MARK));
    return { known: true, sent: hit };
  } catch {
    return { known: false, detail: "list network" };
  }
}

async function sendSms(apiKey, apiSecret, sender, phone, name, receipt, site) {
  const message = {
    to: phone,
    from: sender,
    text: messageText(name, receipt),
    subject: "사전고객등록 완료",
    customFields: { kind: "prereg", site, receipt },
  };
  try {
    const res = await fetch("https://api.solapi.com/messages/v4/send-many/detail", {
      method: "POST",
      headers: { authorization: solapiAuth(apiKey, apiSecret), "content-type": "application/json" },
      body: JSON.stringify({ messages: [message] }),
      signal: AbortSignal.timeout(8000),
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) return { status: "failed", detail: `send http ${res.status} ${body?.errorCode || ""}`.trim() };
    if (body?.failedMessageList?.length) {
      const f = body.failedMessageList[0] || {};
      return { status: "failed", detail: `rejected ${f.statusCode || ""} ${f.statusMessage || ""}`.trim() };
    }
    return { status: "sent" };
  } catch {
    return { status: "failed", detail: "send network" };
  }
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false });
    return;
  }
  if (!originAllowed(req)) {
    res.status(403).json({ ok: false });
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

  const phone = digits(body.phone);
  const receipt = typeof body.receipt === "string" ? body.receipt.trim() : "";
  const name = safeName(body.name);
  const site = typeof body.site === "string" ? body.site.slice(0, 40) : "";

  if (!/^PR\d{6}-[0-9A-F]{6}$/.test(receipt)) {
    res.status(400).json({ ok: false, sms: "bad_request" });
    return;
  }
  if (!/^01[016789]\d{7,8}$/.test(phone)) {
    // 법인 유선번호 등 휴대폰이 아니면 문자를 보내지 않는다.
    res.status(200).json({ ok: true, sms: "skipped" });
    return;
  }

  const apiKey = process.env.SOLAPI_API_KEY?.trim();
  const apiSecret = process.env.SOLAPI_API_SECRET?.trim();
  const sender = digits(process.env.SOLAPI_SENDER || "");
  if (!apiKey || !apiSecret || !sender) {
    console.log("prereg-sms", JSON.stringify({ receipt, sms: "not_configured" }));
    res.status(200).json({ ok: true, sms: "not_configured" });
    return;
  }

  const now = Date.now();
  const ip = clientIp(req);
  const blocked = throttled(ip, phone, now);
  if (blocked) {
    console.log("prereg-sms", JSON.stringify({ receipt, sms: blocked }));
    res.status(200).json({ ok: true, sms: blocked === "duplicate_local" ? "duplicate" : "limited" });
    return;
  }

  const prior = await alreadySent(apiKey, apiSecret, phone);
  if (prior.known && prior.sent) {
    remember(ip, phone, now);
    console.log("prereg-sms", JSON.stringify({ receipt, sms: "duplicate" }));
    res.status(200).json({ ok: true, sms: "duplicate" });
    return;
  }

  const result = await sendSms(apiKey, apiSecret, sender, phone, name, receipt, site);
  if (result.status === "sent") remember(ip, phone, now);
  console.log("prereg-sms", JSON.stringify({ receipt, site, sms: result.status, detail: result.detail || prior.detail || "" }));
  res.status(200).json({ ok: true, sms: result.status });
};
