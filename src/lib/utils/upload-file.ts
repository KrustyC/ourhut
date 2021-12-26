import { variables } from "../variables";

async function readFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    // Create file reader
    let reader = new FileReader();

    // Register event listeners
    reader.addEventListener("loadend", (e: any) => resolve(e.target.result));
    reader.addEventListener("error", reject);

    // Read file
    reader.readAsArrayBuffer(file);
  });
}

async function getAsByteArray(file) {
  return new Uint8Array(await readFile(file));
}

export async function uploadFileToS3(file: File) {
  const url = `${variables.basePath}/.netlify/functions/admin-signed-s3-url?name=${file.name}&type=${file.type}`;
  const result = await fetch(url, {
    method: "GET",
  });

  const { uploadURL } = await result.json();

  const byteFile = await getAsByteArray(file);

  const blobData = new Blob([new Uint8Array(byteFile)], {
    type: file.type,
  });

  await fetch(uploadURL, {
    method: "PUT",
    body: blobData,
  });

  return `${variables.s3BucketUrl}/${file.name}`;
}
