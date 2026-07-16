module.exports = async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error("supabase health check: missing env vars");
    res.status(500).json({ ok: false, error: "env_not_configured" });
    return;
  }

  try {
    const result = await fetch(`${SUPABASE_URL}/rest/v1/promotion_files?select=id&limit=1`, {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
      },
    });

    if (!result.ok) {
      console.error("supabase health check: query failed", result.status);
      res.status(502).json({ ok: false, error: "supabase_unreachable" });
      return;
    }

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ ok: true, checkedAt: new Date().toISOString() });
  } catch (err) {
    console.error("supabase health check: request error", err.message);
    res.status(502).json({ ok: false, error: "supabase_unreachable" });
  }
};
