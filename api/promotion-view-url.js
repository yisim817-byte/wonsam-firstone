const { dbSelect, storageCreateSignedUrl } = require("./_lib/supabase");

const SIGNED_URL_TTL_SECONDS = 300;

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const id = typeof req.query.id === "string" ? req.query.id : "";
  if (!id) {
    res.status(400).json({ error: "자료 id가 필요합니다." });
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
    const rowRes = await dbSelect(
      "promotion_files",
      `select=id,title,page_count,storage_path,is_published&id=eq.${encodeURIComponent(id)}`
    );
    if (!rowRes.ok) {
      res.status(502).json({ error: "자료를 확인하지 못했습니다." });
      return;
    }
    const rows = await rowRes.json();
    const file = rows[0];

    if (!file || !file.is_published) {
      res.status(404).json({ error: "현재 게시된 자료가 아닙니다." });
      return;
    }

    const signedUrl = await storageCreateSignedUrl("promotion", file.storage_path, SIGNED_URL_TTL_SECONDS);
    if (!signedUrl) {
      res.status(502).json({ error: "열람 링크를 생성하지 못했습니다." });
      return;
    }

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
      ok: true,
      url: signedUrl,
      expiresIn: SIGNED_URL_TTL_SECONDS,
      title: file.title,
      pageCount: file.page_count,
    });
  } catch (err) {
    console.error("promotion-view-url handler error", err.message);
    res.status(500).json({ error: "열람 링크를 생성하지 못했습니다." });
  }
};
