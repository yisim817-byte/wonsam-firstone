const { isAdminAuthorized, readBody, ADMIN_EMAIL } = require("./_lib/auth");
const { dbSelect, dbInsert, dbUpdate, storageUpload } = require("./_lib/supabase");
const { validateUpload, sanitizeFilename, countPdfPages } = require("./_lib/files");
const { convertToPdf } = require("./_lib/cloudconvert");

const MAX_UPLOAD_BYTES = 45 * 1024 * 1024;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!isAdminAuthorized(req)) {
    res.status(401).json({ error: "관리자 인증이 필요합니다." });
    return;
  }

  const body = readBody(req);
  const category = body.category === "corporate" || body.category === "customer" ? body.category : "";
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const filename = typeof body.filename === "string" ? body.filename.trim() : "";
  const mimeType = typeof body.mimeType === "string" ? body.mimeType.trim() : "";
  const fileBase64 = typeof body.fileBase64 === "string" ? body.fileBase64 : "";

  if (!category) {
    res.status(400).json({ error: "자료 구분(category)이 올바르지 않습니다." });
    return;
  }
  if (!title) {
    res.status(400).json({ error: "제목을 입력해 주세요." });
    return;
  }
  if (!filename || !mimeType || !fileBase64) {
    res.status(400).json({ error: "파일이 첨부되지 않았습니다." });
    return;
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
    res.status(500).json({ error: "서버 설정이 완료되지 않았습니다." });
    return;
  }

  let rawBuffer;
  try {
    rawBuffer = Buffer.from(fileBase64, "base64");
  } catch {
    res.status(400).json({ error: "파일 데이터를 읽을 수 없습니다." });
    return;
  }

  if (rawBuffer.length === 0) {
    res.status(400).json({ error: "파일 내용이 비어 있습니다." });
    return;
  }
  if (rawBuffer.length > MAX_UPLOAD_BYTES) {
    res.status(413).json({ error: "파일 용량이 너무 큽니다. 45MB 이하 파일만 업로드할 수 있습니다." });
    return;
  }

  const validation = validateUpload(mimeType, filename, rawBuffer);
  if (!validation.ok) {
    res.status(400).json({ error: validation.reason });
    return;
  }

  let pdfBuffer = rawBuffer;
  if (validation.extType !== "pdf") {
    try {
      pdfBuffer = await convertToPdf(rawBuffer, sanitizeFilename(filename));
    } catch (err) {
      if (err.code === "cloudconvert_not_configured") {
        res.status(503).json({
          error:
            "PPT/PPTX 자동 변환 기능이 아직 설정되지 않았습니다. 프레젠테이션 원본은 PDF로 변환한 후 업로드해 주십시오. PDF 형식이 모바일 및 PC 열람에 가장 안정적입니다.",
        });
        return;
      }
      console.error("PPTX conversion failed", err.message);
      res.status(502).json({ error: "파일 변환 중 문제가 발생했습니다. PDF로 변환 후 다시 업로드해 주십시오." });
      return;
    }
  }

  const pageCount = countPdfPages(pdfBuffer);
  const now = new Date().toISOString();
  const storagePath = `${category}/${Date.now()}-${sanitizeFilename(filename).replace(/\.(pptx?|pdf)$/i, "")}.pdf`;

  try {
    const uploadRes = await storageUpload("promotion", storagePath, pdfBuffer, "application/pdf");
    if (!uploadRes.ok) {
      const detail = await uploadRes.text();
      console.error("Storage upload failed", uploadRes.status, detail);
      res.status(502).json({ error: "파일 저장 중 문제가 발생했습니다." });
      return;
    }

    const existingRes = await dbSelect(
      "promotion_files",
      `select=id,display_order&category=eq.${category}&is_published=eq.true&order=display_order.asc`
    );
    const existing = existingRes.ok ? await existingRes.json() : [];
    const nextDisplayOrder = existing.length > 0 ? existing[0].display_order : 0;

    if (existing.length > 0) {
      await Promise.all(
        existing.map((row) => dbUpdate("promotion_files", row.id, { is_published: false, updated_at: now }))
      );
    }

    const record = {
      category,
      title: title.slice(0, 200),
      description: description ? description.slice(0, 2000) : null,
      storage_path: storagePath,
      original_filename: sanitizeFilename(filename).slice(0, 200),
      mime_type: "application/pdf",
      file_size: pdfBuffer.length,
      page_count: pageCount,
      version: 1,
      is_published: true,
      display_order: nextDisplayOrder,
      published_at: now,
      created_at: now,
      updated_at: now,
      created_by: ADMIN_EMAIL,
    };

    const insertRes = await dbInsert("promotion_files", record);
    if (!insertRes.ok) {
      const detail = await insertRes.text();
      console.error("promotion_files insert failed", insertRes.status, detail);
      res.status(502).json({ error: "자료 등록 중 문제가 발생했습니다." });
      return;
    }

    const inserted = await insertRes.json();
    res.status(200).json({ ok: true, file: inserted[0] || null });
  } catch (err) {
    console.error("admin-promotion-upload handler error", err.message);
    res.status(500).json({ error: "업로드 처리 중 문제가 발생했습니다." });
  }
};
