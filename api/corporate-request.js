async function insertCorporateRequest(url, key, record) {
  return fetch(`${url}/rest/v1/corporate_requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify([record]),
  });
}

function pickBaseRecord(record) {
  return {
    company_name: record.company_name,
    phone: record.phone,
    email: record.email,
    purpose: record.purpose,
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body || {};
  const companyName = typeof body.company_name === "string" ? body.company_name.trim() : "";
  const contactName = typeof body.contact_name === "string" ? body.contact_name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const purpose = typeof body.purpose === "string" ? body.purpose.trim() : "";
  const memo = typeof body.memo === "string" ? body.memo.trim() : "";

  if (!companyName || !phone || !email) {
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

  const record = {
    type: "corporate_request",
    company_name: companyName.slice(0, 200),
    contact_name: contactName ? contactName.slice(0, 100) : null,
    phone: phone.slice(0, 50),
    email: email.slice(0, 200),
    purpose: purpose ? purpose.slice(0, 100) : null,
    memo: memo ? memo.slice(0, 1000) : null,
    user_agent: typeof body.userAgent === "string" ? body.userAgent.slice(0, 300) : null,
  };

  try {
    let supabaseRes = await insertCorporateRequest(SUPABASE_URL, SERVICE_KEY, record);

    if (!supabaseRes.ok && supabaseRes.status === 400) {
      const detail = await supabaseRes.text();
      console.warn("Corporate request insert with extended fields failed; retrying base schema", detail);
      supabaseRes = await insertCorporateRequest(SUPABASE_URL, SERVICE_KEY, pickBaseRecord(record));
    }

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
