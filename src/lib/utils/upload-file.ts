import { variables } from "../variables";
import { fetchJson } from "./fetch-json";

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

interface UploadFileToS3Options {
  file: File;
  token: string;
  folder: "images" | "files" | "partners_logos";
}

export async function uploadFileToS3({
  file,
  token,
  folder = "images",
}: UploadFileToS3Options) {
  const { uploadURL } = await fetchJson(
    `/admin-signed-s3-url?name=${file.name}&type=${file.type}&folder=${folder}`,
    { method: "GET", token }
  );

  const byteFile = await getAsByteArray(file);

  const blobData = new Blob([new Uint8Array(byteFile)], {
    type: file.type,
  });

  await fetch(uploadURL, {
    method: "PUT",
    body: blobData,
  });

  return `${variables.s3BucketUrl}/images/${file.name}`;
}
