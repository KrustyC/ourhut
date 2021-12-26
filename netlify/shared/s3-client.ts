import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: process.env.VITE_AWS_REGION,
});

export function getS3Client() {
  const s3Client = new AWS.S3();
  return s3Client;
}
