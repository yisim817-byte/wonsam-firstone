const CLOUDCONVERT_API = "https://api.cloudconvert.com/v2";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function convertToPdf(buffer, filename) {
  const apiKey = process.env.CLOUDCONVERT_API_KEY;
  if (!apiKey) {
    const err = new Error("cloudconvert_not_configured");
    err.code = "cloudconvert_not_configured";
    throw err;
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const createRes = await fetch(`${CLOUDCONVERT_API}/jobs`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      tasks: {
        "import-file": { operation: "import/upload" },
        "convert-file": {
          operation: "convert",
          input: "import-file",
          output_format: "pdf",
          engine: "libreoffice",
        },
        "export-file": {
          operation: "export/url",
          input: "convert-file",
        },
      },
    }),
  });

  if (!createRes.ok) {
    const detail = await createRes.text();
    throw new Error(`cloudconvert_job_create_failed: ${createRes.status} ${detail}`);
  }

  const job = (await createRes.json()).data;
  const importTask = job.tasks.find((t) => t.name === "import-file");
  const uploadUrl = importTask.result.form.url;
  const uploadParams = importTask.result.form.parameters;

  const form = new FormData();
  Object.entries(uploadParams).forEach(([key, value]) => form.append(key, value));
  form.append("file", new Blob([buffer]), filename);

  const uploadRes = await fetch(uploadUrl, { method: "POST", body: form });
  if (!uploadRes.ok) {
    const detail = await uploadRes.text();
    throw new Error(`cloudconvert_upload_failed: ${uploadRes.status} ${detail}`);
  }

  const jobId = job.id;
  const maxAttempts = 20;
  const intervalMs = 2000;
  let finishedJob = null;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    await sleep(intervalMs);
    const statusRes = await fetch(`${CLOUDCONVERT_API}/jobs/${jobId}`, { headers });
    if (!statusRes.ok) continue;
    const statusJob = (await statusRes.json()).data;
    if (statusJob.status === "finished") {
      finishedJob = statusJob;
      break;
    }
    if (statusJob.status === "error") {
      throw new Error("cloudconvert_conversion_failed");
    }
  }

  if (!finishedJob) {
    throw new Error("cloudconvert_conversion_timeout");
  }

  const exportTask = finishedJob.tasks.find((t) => t.name === "export-file");
  const fileEntry = exportTask.result && exportTask.result.files && exportTask.result.files[0];
  if (!fileEntry || !fileEntry.url) {
    throw new Error("cloudconvert_no_output_file");
  }

  const pdfRes = await fetch(fileEntry.url);
  if (!pdfRes.ok) {
    throw new Error("cloudconvert_download_failed");
  }

  const arrayBuffer = await pdfRes.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

module.exports = { convertToPdf };
