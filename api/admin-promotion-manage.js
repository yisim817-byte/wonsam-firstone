const { isAdminAuthorized, readBody } = require("./_lib/auth");
const { dbSelect, dbUpdate, dbDelete, storageDelete } = require("./_lib/supabase");

async function listAll() {
  const res = await dbSelect(
    "promotion_files",
    "select=id,category,title,description,original_filename,mime_type,file_size,page_count,version,is_published,display_order,published_at,created_at,updated_at&order=category.asc,display_order.asc,created_at.desc"
  );
  if (!res.ok) return { ok: false, status: res.status, detail: await res.text() };
  return { ok: true, data: await res.json() };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!isAdminAuthorized(req)) {
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

  const body = readBody(req);
  const action = typeof body.action === "string" ? body.action : "";

  try {
    if (action === "list") {
      const result = await listAll();
      if (!result.ok) {
        console.error("promotion_files list failed", result.status, result.detail);
        res.status(502).json({ error: "목록을 불러오지 못했습니다." });
        return;
      }
      res.status(200).json({ ok: true, data: result.data });
      return;
    }

    const id = typeof body.id === "string" ? body.id : "";
    if (!id) {
      res.status(400).json({ error: "대상 자료 id가 필요합니다." });
      return;
    }

    if (action === "update_meta") {
      const patch = { updated_at: new Date().toISOString() };
      if (typeof body.title === "string" && body.title.trim()) patch.title = body.title.trim().slice(0, 200);
      if (typeof body.description === "string") patch.description = body.description.trim().slice(0, 2000) || null;
      if (typeof body.display_order === "number") patch.display_order = body.display_order;

      const updateRes = await dbUpdate("promotion_files", id, patch);
      if (!updateRes.ok) {
        const detail = await updateRes.text();
        console.error("promotion_files update failed", updateRes.status, detail);
        res.status(502).json({ error: "수정 중 문제가 발생했습니다." });
        return;
      }
      const updated = await updateRes.json();
      res.status(200).json({ ok: true, file: updated[0] || null });
      return;
    }

    if (action === "toggle_publish") {
      const isPublished = Boolean(body.is_published);
      const patch = { is_published: isPublished, updated_at: new Date().toISOString() };
      if (isPublished) patch.published_at = new Date().toISOString();

      if (isPublished) {
        const rowRes = await dbSelect("promotion_files", `select=category&id=eq.${encodeURIComponent(id)}`);
        if (rowRes.ok) {
          const rows = await rowRes.json();
          const category = rows[0] && rows[0].category;
          if (category) {
            const othersRes = await dbSelect(
              "promotion_files",
              `select=id&category=eq.${category}&is_published=eq.true&id=neq.${encodeURIComponent(id)}`
            );
            if (othersRes.ok) {
              const others = await othersRes.json();
              await Promise.all(
                others.map((row) =>
                  dbUpdate("promotion_files", row.id, { is_published: false, updated_at: new Date().toISOString() })
                )
              );
            }
          }
        }
      }

      const updateRes = await dbUpdate("promotion_files", id, patch);
      if (!updateRes.ok) {
        const detail = await updateRes.text();
        console.error("promotion_files publish toggle failed", updateRes.status, detail);
        res.status(502).json({ error: "공개 상태 변경 중 문제가 발생했습니다." });
        return;
      }
      const updated = await updateRes.json();
      res.status(200).json({ ok: true, file: updated[0] || null });
      return;
    }

    if (action === "delete") {
      const rowRes = await dbSelect("promotion_files", `select=storage_path&id=eq.${encodeURIComponent(id)}`);
      if (!rowRes.ok) {
        res.status(502).json({ error: "삭제할 자료를 확인하지 못했습니다." });
        return;
      }
      const rows = await rowRes.json();
      const storagePath = rows[0] && rows[0].storage_path;

      const deleteRes = await dbDelete("promotion_files", id);
      if (!deleteRes.ok) {
        const detail = await deleteRes.text();
        console.error("promotion_files delete failed", deleteRes.status, detail);
        res.status(502).json({ error: "삭제 중 문제가 발생했습니다." });
        return;
      }

      if (storagePath) {
        const storageRes = await storageDelete("promotion", storagePath);
        if (!storageRes.ok) {
          console.warn("Storage file delete failed after DB delete", storagePath);
        }
      }

      res.status(200).json({ ok: true });
      return;
    }

    res.status(400).json({ error: "알 수 없는 작업입니다." });
  } catch (err) {
    console.error("admin-promotion-manage handler error", err.message);
    res.status(500).json({ error: "요청 처리 중 문제가 발생했습니다." });
  }
};
