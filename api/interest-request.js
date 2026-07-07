async function insertInterestRecord(url, key, record) {
  return fetch(`${url}/rest/v1/interest_requests`, {
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
    type: record.type,
    phone: record.phone,
    email: record.email,
    name: record.name,
    company_name: record.company_name,
    contact_name: record.contact_name,
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body || {};
  const type = body.type === "corporate_interest"
    ? "corporate_interest"
    : body.type === "personal_interest" || body.type === "pre_interest"
      ? "personal_interest"
      : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!type) {
    res.status(400).json({ error: "유효하지 않은 접수 유형입니다." });
    return;
  }

  if (!phone || !email) {
    res.status(400).json({ error: "전화번호와 이메일은 필수입니다." });
    return;
  }

  const record = {
    type,
    phone: phone.slice(0, 50),
    email: email.slice(0, 200),
    name: null,
    company_name: null,
    contact_name: null,
    interest_type: typeof body.interest_type === "string" ? body.interest_type.trim().slice(0, 100) || null : null,
    purpose: typeof body.purpose === "string" ? body.purpose.trim().slice(0, 100) || null : null,
    memo: typeof body.memo === "string" ? body.memo.trim().slice(0, 1000) || null : null,
    user_agent: typeof body.userAgent === "string" ? body.userAgent.slice(0, 300) : null,
  };

  if (type === "personal_interest") {
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name) {
      res.status(400).json({ error: "이름을 입력해 주세요." });
      return;
    }
    record.name = name.slice(0, 100);
  } else {
    const companyName = typeof body.company_name === "string" ? body.company_name.trim() : "";
    const contactName = typeof body.contact_name === "string" ? body.contact_name.trim() : "";
    if (!companyName || !contactName) {
      res.status(400).json({ error: "기업명과 담당자명을 입력해 주세요." });
      return;
    }
    record.company_name = companyName.slice(0, 200);
    record.contact_name = contactName.slice(0, 100);
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
    res.status(500).json({ error: "서버 설정이 완료되지 않았습니다." });
    return;
  }

  try {
    let supabaseRes = await insertInterestRecord(SUPABASE_URL, SERVICE_KEY, record);

    if (!supabaseRes.ok && supabaseRes.status === 400) {
      const detail = await supabaseRes.text();
      console.warn("Interest insert with extended fields failed; retrying base schema", detail);
      supabaseRes = await insertInterestRecord(SUPABASE_URL, SERVICE_KEY, pickBaseRecord(record));
    }

    if (!supabaseRes.ok) {
      const detail = await supabaseRes.text();
      console.error("Supabase insert failed", supabaseRes.status, detail);
      res.status(502).json({ error: "접수 처리 중 문제가 발생했습니다." });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("interest-request handler error", err);
    res.status(500).json({ error: "접수 처리 중 문제가 발생했습니다." });
  }
};
