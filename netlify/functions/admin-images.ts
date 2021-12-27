import { S3 } from "aws-sdk";
import { Handler } from "@netlify/functions";
import { jsonResponse } from "../shared/utils";
import { getS3Client } from "../shared/s3-client";

const ALLOWED_METHODS = ["GET"];

async function getAllS3Files(params): Promise<S3.ListObjectsV2Output> {
  return new Promise((resolve, reject) => {
    const s3 = getS3Client();

    s3.listObjectsV2(params, function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      resolve(data as S3.ListObjectsV2Output);
    });
  });
}

async function get() {
  try {
    const params = {
      Bucket: process.env.VITE_S3_IMAGES_BUCKET,
    };

    const listObjects = await getAllS3Files(params);

    const imagesUrls = listObjects.Contents.map((file) => {
      return `https://${process.env.VITE_S3_IMAGES_BUCKET}.s3.amazonaws.com/${file.Key}`;
    });

    return jsonResponse({
      status: 200,
      body: { images: imagesUrls },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error fetching imagsd, please try again later on.",
      },
    });
  }
}

const handler: Handler = async (event, context) => {
  const { user } = context.clientContext;

  if (!user) {
    return jsonResponse({
      status: 403,
      body: { message: "Only authorized users can perform this request" },
    });
  }

  if (!ALLOWED_METHODS.includes(event.httpMethod)) {
    return jsonResponse({
      status: 405,
      body: { message: "Method not allowed" },
    });
  }

  if (event.httpMethod === "GET") {
    return get();
  }
};

export { handler };
