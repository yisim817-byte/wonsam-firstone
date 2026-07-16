const { dbSelect } = require("./_lib/supabase");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
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
    const result = await dbSelect(
      "promotion_files",
      "select=id,category,title,description,page_count,published_at,updated_at&is_published=eq.true&order=category.asc,display_order.asc"
    );
    if (!result.ok) {
      const detail = await result.text();
      console.error("promotion-files query failed", result.status, detail);
      res.status(502).json({ error: "자료 목록을 불러오지 못했습니다." });
      return;
    }
    const data = await result.json();
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ ok: true, data });
  } catch (err) {
    console.error("promotion-files handler error", err.message);
    res.status(500).json({ error: "자료 목록을 불러오지 못했습니다." });
  }
};
