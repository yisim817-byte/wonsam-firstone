const crypto = require("crypto");

const ADMIN_EMAIL = "yisim817@gmail.com";

function safeCompare(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function readBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

function isAdminAuthorized(req) {
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  const body = readBody(req);
  const email = String(body.email || req.headers["x-admin-email"] || "").trim().toLowerCase();
  const token = String(body.token || req.headers["x-admin-token"] || "").trim();

  return Boolean(ADMIN_TOKEN && email === ADMIN_EMAIL && token && safeCompare(token, ADMIN_TOKEN));
}

module.exports = { ADMIN_EMAIL, readBody, isAdminAuthorized };
