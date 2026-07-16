const ALLOWED_UPLOAD_TYPES = {
  "application/pdf": "pdf",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
};

function sanitizeFilename(name) {
  const base = String(name || "file").split(/[\\/]/).pop();
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/_{2,}/g, "_");
  return cleaned.slice(-150) || "file";
}

function detectSignature(buffer) {
  if (!buffer || buffer.length < 4) return "unknown";
  const head = buffer.subarray(0, 5).toString("latin1");
  if (head.startsWith("%PDF-")) return "pdf";
  const zipMagic = buffer[0] === 0x50 && buffer[1] === 0x4b;
  if (zipMagic) return "pptx";
  const oleMagic =
    buffer[0] === 0xd0 && buffer[1] === 0xcf && buffer[2] === 0x11 && buffer[3] === 0xe0;
  if (oleMagic) return "ppt";
  return "unknown";
}

function validateUpload(mimeType, filename, buffer) {
  const extType = ALLOWED_UPLOAD_TYPES[mimeType];
  if (!extType) return { ok: false, reason: "지원하지 않는 파일 형식입니다. PDF, PPT, PPTX만 업로드할 수 있습니다." };

  const ext = (filename.split(".").pop() || "").toLowerCase();
  const extMatchesType =
    (extType === "pdf" && ext === "pdf") ||
    (extType === "ppt" && ext === "ppt") ||
    (extType === "pptx" && ext === "pptx");
  if (!extMatchesType) {
    return { ok: false, reason: "파일 확장자와 형식이 일치하지 않습니다." };
  }

  const signature = detectSignature(buffer);
  if (extType === "pdf" && signature !== "pdf") {
    return { ok: false, reason: "PDF 파일 내용이 올바르지 않습니다." };
  }
  if (extType === "pptx" && signature !== "pptx") {
    return { ok: false, reason: "PPTX 파일 내용이 올바르지 않습니다." };
  }
  if (extType === "ppt" && signature !== "ppt") {
    return { ok: false, reason: "PPT 파일 내용이 올바르지 않습니다." };
  }

  return { ok: true, extType };
}

function countPdfPages(buffer) {
  try {
    const text = buffer.toString("latin1");
    const matches = text.match(/\/Type\s*\/Page(?!s)/g);
    if (matches && matches.length > 0) return matches.length;
    const countMatch = text.match(/\/Type\s*\/Pages[^e][\s\S]{0,300}?\/Count\s+(\d+)/);
    if (countMatch) return parseInt(countMatch[1], 10);
    return null;
  } catch {
    return null;
  }
}

module.exports = { ALLOWED_UPLOAD_TYPES, sanitizeFilename, detectSignature, validateUpload, countPdfPages };
