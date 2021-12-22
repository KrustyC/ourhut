import AWS from "aws-sdk";
import { HandlerEvent } from "@netlify/functions";
import { jsonResponse } from "../shared/utils";

AWS.config.update({
  accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: process.env.VITE_AWS_REGION,
});

const s3 = new AWS.S3();
const URL_EXPIRATION_SECONDS = 300;

const handler = async function (event: HandlerEvent) {
  // @TODO This needs to work under authenticated user
  if (event.httpMethod !== "GET") {
    return jsonResponse({
      status: 405,
      body: { message: "Method not allowed" },
    });
  }

  const { name: Key, type: ContentType } = event.queryStringParameters;

  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.VITE_S3_IMAGES_BUCKET,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType,
    ACL: "public-read",
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", s3Params);

  return jsonResponse({
    status: 200,
    body: { uploadURL: uploadURL, Key },
  });
};

export { handler };
