import { Handler, HandlerEvent } from "@netlify/functions";
import { MongoClient } from "mongodb";
import * as yup from "yup";
import { connect } from "../shared/mongodb-client";
import { jsonResponse } from "../shared/utils";

let eventSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.object().required(),
  price: yup.number().positive(),
  status: yup.string().required(),
  image: yup.string(),
  location: yup.object().shape({
    address: yup
      .object()
      .shape({
        address: yup.string().required(),
        postcode: yup.string().required(),
        city: yup.string().required(),
      })
      .required(),
    coordinates: yup
      .object()
      .shape({
        lat: yup.number().required(),
        lng: yup.number().required(),
      })
      .required(),
  }),
  date: yup
    .object()
    .shape({
      day: yup.string().required(),
      startTime: yup
        .object()
        .shape({
          lat: yup.string().required(),
          lng: yup.string().required(),
        })
        .required(),
      endTime: yup
        .object()
        .shape({
          lat: yup.string().required(),
          lng: yup.string().required(),
        })
        .required(),
    })
    .required(),
});

const ALLOWED_METHODS = ["GET", "POST"];

async function get(client: MongoClient) {
  try {
    const events = await client
      .db(process.env.VITE_MONGO_DB_NAME)
      .collection("events")
      .find()
      .toArray();

    return jsonResponse({
      status: 200,
      body: { events },
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

async function post(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    const { event } = JSON.parse(handlerEvent.body);

    let eventDocument;

    try {
      eventDocument = await eventSchema.validate(event);
    } catch (error) {
      return jsonResponse({
        status: 400,
        body: {
          message: {
            name: "Validation Error",
            error: error.message,
          },
        },
      });
    }

    await client
      .db(process.env.VITE_MONGO_DB_NAME)
      .collection("events")
      .insertOne(eventDocument);

    return jsonResponse({
      status: 200,
      body: { message: "Event successfully inserted" },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error creating your event, please try again later on.",
      },
    });
  }
}

const handler: Handler = async (event, context) => {
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
    return get(client);
  }

  if (event.httpMethod === "POST") {
    return post(client, event);
  }
};

export { handler };
