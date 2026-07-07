const crypto = require("crypto");

function safeCompare(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!ADMIN_TOKEN || !token || !safeCompare(token, ADMIN_TOKEN)) {
    res.status(401).json({ error: "관리자 인증이 필요합니다." });
    return;
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
    res.status(500).json({ error: "서버 설정이 완료되지 않았습니다." });
    return;
  }

  try {
    const supabaseRes = await fetch(
      `${SUPABASE_URL}/rest/v1/corporate_requests?select=*&order=created_at.desc`,
      {
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
        },
      }
    );

    if (!supabaseRes.ok) {
      const detail = await supabaseRes.text();
      console.error("Supabase query failed", supabaseRes.status, detail);
      res.status(502).json({ error: "데이터를 불러오지 못했습니다." });
      return;
    }

    const data = await supabaseRes.json();
    res.status(200).json({ ok: true, data });
  } catch (err) {
    console.error("admin-requests handler error", err);
    res.status(500).json({ error: "데이터를 불러오지 못했습니다." });
  }
};
