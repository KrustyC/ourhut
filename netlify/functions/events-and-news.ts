import { Handler } from "@netlify/functions";
import { jsonResponse } from "../shared/utils";
import { connect } from "../shared/mongodb-client";
import { HTTP_METHODS } from "../shared/variables";

const EVENTS_COLLECTION = "events";
const NEWS_COLLECTION = "news";

async function get() {
  try {
    const client = await connect();

    if (!client) {
      throw new Error("Can not connect to DB");
    }

    // @TODO Only takes published events
    const fetchEvents = client
      .db(process.env.MONGO_DB_NAME)
      .collection(EVENTS_COLLECTION)
      .find()
      .toArray();

    const fetchNews = client
      .db(process.env.MONGO_DB_NAME)
      .collection(NEWS_COLLECTION)
      .find()
      .toArray();

    const [events, news] = await Promise.all([fetchEvents, fetchNews]);

    // @TODO Events should be split into past and future

    return jsonResponse({
      status: 200,
      body: { events, news },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error fetching events and news, please try again later on.",
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
