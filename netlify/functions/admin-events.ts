import { Handler, HandlerEvent } from "@netlify/functions";
import { MongoClient } from "mongodb";
import slugify from "slugify";
import * as yup from "yup";
import { connect } from "../shared/mongodb-client";
import { jsonResponse } from "../shared/utils";

const timeValidator = yup.object().shape({
  time: yup.string().required(), // Use regex
  period: yup.string().required(), // Use enum
});

export const eventSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.object().required(),
  image: yup.string(),
  eventbriteLink: yup.string().url(),
  date: yup
    .object()
    .shape({
      day: yup.string().required(), // use Regex,
      startTime: timeValidator,
      endTime: timeValidator,
    })
    .required(),
});

const ALLOWED_METHODS = ["GET", "POST", "PUT", "DELETE"];

async function get(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    const { slug } = handlerEvent.queryStringParameters;

    if (slug) {
      const event = await client
        .db(process.env.VITE_MONGO_DB_NAME)
        .collection("events")
        .findOne({ slug }, { projection: { _id: 0 } });

      if (!event) {
        return jsonResponse({
          status: 404,
          body: {
            message: `Event with slug "${slug}" could not be found`,
          },
        });
      }

      return jsonResponse({
        status: 200,
        body: { event },
      });
    }

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
    const { event, status } = JSON.parse(handlerEvent.body);

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

    const slug = slugify(event.title, {
      lower: true,
      strict: true,
    });

    await client
      .db(process.env.VITE_MONGO_DB_NAME)
      .collection("events")
      .insertOne({
        ...eventDocument,
        slug,
        isPublished: status === "publish",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

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

async function put(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    // Find the query params slug
    const { slug } = handlerEvent.queryStringParameters;
    if (!slug) {
      return jsonResponse({
        status: 400,
        body: {
          message: {
            name: "It is required to pass a slug in the form of a query parameter `slug`",
          },
        },
      });
    }

    const { event, status } = JSON.parse(handlerEvent.body);
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
      .findOneAndUpdate(
        {
          slug,
        },
        {
          $set: {
            ...eventDocument,
            isPublished: status === "publish",
            updatedAt: new Date(),
          },
        }
      );

    return jsonResponse({
      status: 200,
      body: { message: "Event successfully updated" },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error updating your event, please try again later on.",
      },
    });
  }
}

async function deleteEvent(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    // Find the query params slug
    const { slug } = handlerEvent.queryStringParameters;
    if (!slug) {
      return jsonResponse({
        status: 400,
        body: {
          message: {
            name: "It is required to pass a slug in the form of a query parameter `slug`",
          },
        },
      });
    }

    await client
      .db(process.env.VITE_MONGO_DB_NAME)
      .collection("events")
      .deleteMany({
        slug,
      });

    return jsonResponse({
      status: 200,
      body: { message: "Event successfully deleted" },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error deleting your event, please try again later on.",
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

  if (event.httpMethod === "POST") {
    return post(client, event);
  }

  if (event.httpMethod === "PUT") {
    return put(client, event);
  }

  if (event.httpMethod === "DELETE") {
    return deleteEvent(client, event);
  }
};

export { handler };
