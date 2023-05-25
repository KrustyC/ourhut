import { Handler } from "@netlify/functions";
import { jsonResponse } from "../shared/utils";
import { getS3Client, FOLDERS } from "../shared/s3-client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const URL_EXPIRATION_SECONDS = 300;

interface QueryStringParameters {
  name?: string;
  type?: string;
  folder?: string;
}

const handler: Handler = async function (event, context) {
  if (event.httpMethod !== "GET") {
    return jsonResponse({
      status: 405,
      body: { message: "Method not allowed" },
    });
  }

  const { user } = context.clientContext as { user?: any };

  if (!user) {
    return jsonResponse({
      status: 403,
      body: { message: "Only authorized users can perform this request" },
    });
  }

  const {
    name: Key,
    type: ContentType,
    folder,
  } = event.queryStringParameters as QueryStringParameters;

  // Get signed URL from S3
  const s3 = getS3Client();
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.S3_OUR_HUT_BUCKET,
    Key: `${folder}/${Key}`,
    ContentType,
    ACL: "public-read",
  });

  const uploadURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 3600,
  });

  return jsonResponse({
    status: 200,
    body: { uploadURL: uploadURL, Key },
  });
};

export { handler };
