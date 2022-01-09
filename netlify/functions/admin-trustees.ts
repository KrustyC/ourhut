import { Handler, HandlerEvent } from "@netlify/functions";
import { MongoClient, ObjectId } from "mongodb";
import slugify from "slugify";
import * as yup from "yup";
import { connect } from "../shared/mongodb-client";
import { jsonResponse } from "../shared/utils";

export const trusteeSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.object().required(),
});

const TRUSTEES_TABLE = "trustees";
const ALLOWED_METHODS = ["GET", "POST", "PUT", "DELETE"];

async function get(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    const { id } = handlerEvent.queryStringParameters;

    if (id) {
      const trustee = await client
        .db(process.env.VITE_MONGO_DB_NAME)
        .collection(TRUSTEES_TABLE)
        .findOne({ _id: new ObjectId(id) });

      if (!trustee) {
        return jsonResponse({
          status: 404,
          body: {
            message: `Trustee with id "${id}" could not be found`,
          },
        });
      }

      return jsonResponse({
        status: 200,
        body: { trustee },
      });
    }

    const trustees = await client
      .db(process.env.VITE_MONGO_DB_NAME)
      .collection(TRUSTEES_TABLE)
      .find()
      .toArray();

    return jsonResponse({
      status: 200,
      body: { trustees },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error fetching trustees, please try again later on.",
      },
    });
  }
}

async function post(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    const { trustee } = JSON.parse(handlerEvent.body);

    let trusteeDocument;

    try {
      trusteeDocument = await trusteeSchema.validate(trustee);
    } catch (error) {
      console.log(error);
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

    const result = await client
      .db(process.env.VITE_MONGO_DB_NAME)
      .collection(TRUSTEES_TABLE)
      .insertOne({
        ...trusteeDocument,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    return jsonResponse({
      status: 200,
      body: { message: "Trustee successfully added", id: result.insertedId },
    });
  } catch (error) {
    console.log("errrror", error);
    return jsonResponse({
      status: 500,
      body: {
        message:
          "Error adding your trustee to the database, please try again later on.",
      },
    });
  }
}

async function put(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    // Find the query params id
    const { id } = handlerEvent.queryStringParameters;
    if (!id) {
      return jsonResponse({
        status: 400,
        body: {
          message: {
            name: "It is required to pass a id in the form of a query parameter `id`",
          },
        },
      });
    }

    const { trustee } = JSON.parse(handlerEvent.body);
    let trusteeDocument;

    try {
      trusteeDocument = await trusteeSchema.validate(trustee);
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

    const res = await client
      .db(process.env.VITE_MONGO_DB_NAME)
      .collection(TRUSTEES_TABLE)
      .findOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            ...trusteeDocument,
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
        message: "Error updating your trustee, please try again later on.",
      },
    });
  }
}

async function deleteEvent(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    // Find the query params slug
    const { id } = handlerEvent.queryStringParameters;
    if (!id) {
      return jsonResponse({
        status: 400,
        body: {
          message: {
            name: "It is required to pass a id in the form of a query parameter `id`",
          },
        },
      });
    }

    await client
      .db(process.env.VITE_MONGO_DB_NAME)
      .collection(TRUSTEES_TABLE)
      .deleteMany({
        _id: new ObjectId(id),
      });

    return jsonResponse({
      status: 200,
      body: { message: "Trustee successfully deleted" },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error deleting the trustee, please try again later on.",
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
