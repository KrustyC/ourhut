import { Handler, HandlerEvent } from "@netlify/functions";
import { MongoClient } from "mongodb";
import { connect } from "../shared/mongodb-client";
import { jsonResponse } from "../shared/utils";

const ALLOWED_METHODS = ["GET"];

async function get(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    const db = await client.db(process.env.VITE_MONGO_DB_NAME);
    const promises = [db.collection("events").countDocuments()];

    const [eventsCount] = await Promise.all(promises);

    return jsonResponse({
      status: 200,
      body: { events: eventsCount, news: 0, projects: 0 },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error fetching events, please try again later on.",
      },
    });
  }
}

const handler: Handler = async (event) => {
  if (!ALLOWED_METHODS.includes(event.httpMethod)) {
    return jsonResponse({
      status: 405,
      body: { message: "Method not allowed" },
    });
  }

  let client;

  try {
    client = await connect();
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error connecting to the database, please try again later on.",
      },
    });
  }

  if (event.httpMethod === "GET") {
    return get(client, event);
  }
};

export { handler };
