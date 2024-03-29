import { Handler, HandlerEvent } from "@netlify/functions";
import netlifyIdentity from "netlify-identity-widget";
import { jsonResponse } from "../shared/utils";
import {
  FOLDERS,
  getAllS3Files,
  deleteObjectFromS3,
} from "../shared/s3-client";

async function get() {
  try {
    const params = {
      Bucket: process.env.S3_OUR_HUT_BUCKET as string,
      Prefix: FOLDERS.AUDIOS,
    };

    const listObjects = await getAllS3Files(params);

    const audiosUrls =
      listObjects?.Contents?.map((file) => {
        return `https://${process.env.S3_OUR_HUT_BUCKET}.s3.amazonaws.com/${file.Key}`;
      }) || [];

    return jsonResponse({
      status: 200,
      body: {
        audios: audiosUrls.filter(
          (audio) =>
            audio !==
            `https://${process.env.S3_OUR_HUT_BUCKET}.s3.amazonaws.com/${FOLDERS.AUDIOS}/`
        ),
      },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error fetching audios, please try again later on.",
      },
    });
  }
}

async function deleteAudio(handlerEvent: HandlerEvent) {
  try {
    const { name } = handlerEvent.queryStringParameters as { name?: string };
    const params = {
      Bucket: process.env.S3_OUR_HUT_BUCKET as string,
      Key: `${FOLDERS.IMAGES}/${name}`,
    };

    await deleteObjectFromS3(params);

    return jsonResponse({
      status: 200,
      body: { message: "Audio successfully deleted!" },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error fetching audios, please try again later on.",
      },
    });
  }
}

const handler: Handler = async (event, context) => {
  const { user } = context.clientContext as { user?: netlifyIdentity.User };

  if (!user) {
    return jsonResponse({
      status: 403,
      body: { message: "Only authorized users can perform this request" },
    });
  }

  if (event.httpMethod === "GET") {
    return get();
  }

  if (event.httpMethod === "DELETE") {
    return deleteAudio(event);
  }

  return jsonResponse({
    status: 405,
    body: { message: "Method not allowed" },
  });
};

export { handler };
