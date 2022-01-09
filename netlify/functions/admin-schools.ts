import { Handler, HandlerEvent } from "@netlify/functions";
import { MongoClient, ObjectId } from "mongodb";
import * as yup from "yup";
import { connect } from "../shared/mongodb-client";
import { jsonResponse } from "../shared/utils";

export const schoolSchema = yup.object().shape({
  name: yup.string().required("Please enter a name for the school"),
  postcode: yup.string().required("Please enter a postcode"),
});

const SCHOOLS_COLLECTION = "schools";
const ALLOWED_METHODS = ["GET", "POST", "PUT", "DELETE"];

async function get(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    const { id } = handlerEvent.queryStringParameters;

    if (id) {
      const school = await client
        .db(process.env.VITE_MONGO_DB_NAME)
        .collection(SCHOOLS_COLLECTION)
        .findOne({ _id: new ObjectId(id) });

      if (!school) {
        return jsonResponse({
          status: 404,
          body: {
            message: `School with id "${id}" could not be found`,
          },
        });
      }

      return jsonResponse({
        status: 200,
        body: { school },
      });
    }

    const schools = await client
      .db(process.env.VITE_MONGO_DB_NAME)
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

async function post(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    const { school } = JSON.parse(handlerEvent.body);

    let schoolDocument;

    try {
      schoolDocument = await schoolSchema.validate(school);
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
      .collection(SCHOOLS_COLLECTION)
      .insertOne({
        ...schoolDocument,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    return jsonResponse({
      status: 200,
      body: { message: "School successfully added", id: result.insertedId },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message:
          "Error adding your school to the database, please try again later on.",
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

    const { school } = JSON.parse(handlerEvent.body);
    let schoolDocument;

    try {
      schoolDocument = await schoolSchema.validate(school);
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
      .collection(SCHOOLS_COLLECTION)
      .findOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            name: schoolDocument.name,
            postcode: schoolDocument.postcode,
            updatedAt: new Date(),
          },
        }
      );

    return jsonResponse({
      status: 200,
      body: { message: "School successfully updated" },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error updating your school, please try again later on.",
      },
    });
  }
}

async function deleteSchool(client: MongoClient, handlerEvent: HandlerEvent) {
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
      .collection(SCHOOLS_COLLECTION)
      .deleteMany({
        _id: new ObjectId(id),
      });

    return jsonResponse({
      status: 200,
      body: { message: "School successfully deleted" },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error deleting the school, please try again later on.",
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
    return deleteSchool(client, event);
  }
};

export { handler };
