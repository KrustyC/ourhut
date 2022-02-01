import { Handler } from "@netlify/functions";
import { jsonResponse } from "../shared/utils";
import { connect } from "../shared/mongodb-client";
import { HTTP_METHODS } from "../shared/variables";

const SCHOOLS_COLLECTION = "schools";

async function get() {
  try {
    const client = await connect();

    if (!client) {
      throw new Error("Can not connect to DB");
    }

    const schools = await client
      .db(process.env.MONGO_DB_NAME)
      .collection(SCHOOLS_COLLECTION)
      .find()
      .toArray();

    return jsonResponse({
      status: 200,
      body: { schools },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error fetching schools, please try again later on.",
      },
    });
  }
}

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== HTTP_METHODS.GET) {
    return jsonResponse({
      status: 405,
      body: { message: "Method not allowed" },
    });
  }

  return get();
};

export { handler };
