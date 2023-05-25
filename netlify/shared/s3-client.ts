import AWS_S3, {
  DeleteObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";

export function getS3Client() {
  const {
    S3_USER_AWS_REGION,
    S3_USER_AWS_ACCESS_KEY_ID,
    S3_USER_AWS_SECRET_ACCESS_KEY,
  } = process.env;
  if (!S3_USER_AWS_REGION) {
    throw new Error("S3_USER_AWS_REGION is not defined");
  }

  if (!S3_USER_AWS_ACCESS_KEY_ID) {
    throw new Error("S3_USER_AWS_ACCESS_KEY_ID is not defined");
  }

  if (!S3_USER_AWS_SECRET_ACCESS_KEY) {
    throw new Error("S3_USER_AWS_SECRET_ACCESS_KEY is not defined");
  }

  const client = new S3Client({
    region: process.env.S3_USER_AWS_REGION,
    credentials: {
      accessKeyId: S3_USER_AWS_ACCESS_KEY_ID,
      secretAccessKey: S3_USER_AWS_SECRET_ACCESS_KEY,
    },
  });

  return client;
}

export async function getAllS3Files(
  params: AWS_S3.ListObjectsV2CommandInput
): Promise<AWS_S3.ListObjectsV2CommandOutput> {
  const s3 = getS3Client();
  const command = new ListObjectsV2Command(params);
  const res = await s3.send(command);

  return res;
}

export async function deleteObjectFromS3(
  params: AWS_S3.DeleteObjectCommandInput
) {
  const s3 = getS3Client();
  const command = new DeleteObjectCommand(params);
  const res = await s3.send(command);

  return res;
}

export enum FOLDERS {
  IMAGES = "images",
  FILES = "files",
  AUDIOS = "audios",
  PARTNERS_LOGOS = "partners",
}
