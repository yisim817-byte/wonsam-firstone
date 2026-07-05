module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body || {};
  const company_name = typeof body.company_name === "string" ? body.company_name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const purpose = typeof body.purpose === "string" ? body.purpose.trim() : "";

  if (!company_name || !phone || !email) {
    res.status(400).json({ error: "기업명, 전화번호, 이메일은 필수입니다." });
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
    const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/corporate_requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify([
        {
          company_name: company_name.slice(0, 200),
          phone: phone.slice(0, 50),
          email: email.slice(0, 200),
          purpose: purpose ? purpose.slice(0, 100) : null,
        },
      ]),
    });

    if (!supabaseRes.ok) {
      const detail = await supabaseRes.text();
      console.error("Supabase insert failed", supabaseRes.status, detail);
      res.status(502).json({ error: "접수 처리 중 문제가 발생했습니다." });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("corporate-request handler error", err);
    res.status(500).json({ error: "접수 처리 중 문제가 발생했습니다." });
  }
};
