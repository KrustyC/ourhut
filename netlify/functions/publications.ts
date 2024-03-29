import { Handler } from "@netlify/functions";
import { jsonResponse } from "../shared/utils";
import { connect } from "../shared/mongodb-client";
import { HTTP_METHODS } from "../shared/variables";

const PUBLICATIONS_COLLECTION = "publications";

async function get() {
  try {
    const client = await connect();

    if (!client) {
      throw new Error("Can not connect to DB");
    }

    const publications = await client
      .db()
      .collection(PUBLICATIONS_COLLECTION)
      .find()
      .toArray();

    return jsonResponse({
      status: 200,
      body: { publications },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message:
          "Error fetching press & publications, please try again later on.",
      },
    });
  }
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== HTTP_METHODS.GET) {
    return jsonResponse({
      status: 405,
      body: { message: "Method not allowed" },
    });
  }

  return get();
};

export { handler };
