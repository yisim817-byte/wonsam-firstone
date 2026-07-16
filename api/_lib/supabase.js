function getConfig() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return { url, serviceKey };
}

function restHeaders(serviceKey, extra) {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    ...extra,
  };
}

async function dbSelect(table, query) {
  const { url, serviceKey } = getConfig();
  if (!url || !serviceKey) throw new Error("missing_supabase_env");
  const res = await fetch(`${url}/rest/v1/${table}?${query}`, {
    headers: restHeaders(serviceKey),
  });
  return res;
}

async function dbInsert(table, record) {
  const { url, serviceKey } = getConfig();
  if (!url || !serviceKey) throw new Error("missing_supabase_env");
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: restHeaders(serviceKey, {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify([record]),
  });
  return res;
}

async function dbUpdate(table, id, patch) {
  const { url, serviceKey } = getConfig();
  if (!url || !serviceKey) throw new Error("missing_supabase_env");
  const res = await fetch(`${url}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: restHeaders(serviceKey, {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify(patch),
  });
  return res;
}

async function dbDelete(table, id) {
  const { url, serviceKey } = getConfig();
  if (!url || !serviceKey) throw new Error("missing_supabase_env");
  const res = await fetch(`${url}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: restHeaders(serviceKey),
  });
  return res;
}

async function storageUpload(bucket, path, buffer, contentType) {
  const { url, serviceKey } = getConfig();
  if (!url || !serviceKey) throw new Error("missing_supabase_env");
  const res = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: restHeaders(serviceKey, {
      "Content-Type": contentType || "application/pdf",
      "x-upsert": "true",
    }),
    body: buffer,
  });
  return res;
}

async function storageDelete(bucket, path) {
  const { url, serviceKey } = getConfig();
  if (!url || !serviceKey) throw new Error("missing_supabase_env");
  const res = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, {
    method: "DELETE",
    headers: restHeaders(serviceKey),
  });
  return res;
}

async function storageCreateSignedUrl(bucket, path, expiresInSeconds) {
  const { url, serviceKey } = getConfig();
  if (!url || !serviceKey) throw new Error("missing_supabase_env");
  const res = await fetch(`${url}/storage/v1/object/sign/${bucket}/${path}`, {
    method: "POST",
    headers: restHeaders(serviceKey, { "Content-Type": "application/json" }),
    body: JSON.stringify({ expiresIn: expiresInSeconds }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.signedURL) return null;
  return `${url}/storage/v1${data.signedURL}`;
}

module.exports = {
  getConfig,
  dbSelect,
  dbInsert,
  dbUpdate,
  dbDelete,
  storageUpload,
  storageDelete,
  storageCreateSignedUrl,
};
