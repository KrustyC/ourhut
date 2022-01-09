import { Handler, HandlerEvent } from "@netlify/functions";
import { MongoClient, ObjectId } from "mongodb";
import * as yup from "yup";
import { connect } from "../shared/mongodb-client";
import { jsonResponse } from "../shared/utils";

export const productSchema = yup.object().shape({
  name: yup.string().required("Please enter a name for the product"),
  description: yup
    .object()
    .required("Please enter a description for the product"),
  image: yup.string().required("Please enter an image for the product"),
  price: yup
    .number()
    .positive("Please enter a valid price")
    .required("Please enter a price"),
  etsyLink: yup.string().url().required("Please enter a valid Etsy link"),
});

const ALLOWED_METHODS = ["GET", "POST", "PUT", "DELETE"];
const PRODUCTS_COLLECTION = "products";

async function get(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    const { id } = handlerEvent.queryStringParameters;

    if (id) {
      const product = await client
        .db(process.env.VITE_MONGO_DB_NAME)
        .collection(PRODUCTS_COLLECTION)
        .findOne({ _id: new ObjectId(id) });

      if (!product) {
        return jsonResponse({
          status: 404,
          body: {
            message: `Product with id "${id}" could not be found`,
          },
        });
      }

      return jsonResponse({
        status: 200,
        body: { product },
      });
    }

    const products = await client
      .db(process.env.VITE_MONGO_DB_NAME)
      .collection(PRODUCTS_COLLECTION)
      .find()
      .toArray();

    return jsonResponse({
      status: 200,
      body: { products },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error fetching products, please try again later on.",
      },
    });
  }
}

async function post(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    const { product } = JSON.parse(handlerEvent.body);

    let productDocument;

    try {
      productDocument = await productSchema.validate(product);
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
      .collection(PRODUCTS_COLLECTION)
      .insertOne({
        ...productDocument,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    return jsonResponse({
      status: 200,
      body: { message: "Product successfully added", id: result.insertedId },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message:
          "Error adding your product to the database, please try again later on.",
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

    const { product } = JSON.parse(handlerEvent.body);
    let productDocument;

    try {
      productDocument = await productSchema.validate(product);
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
      .collection(PRODUCTS_COLLECTION)
      .findOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            name: productDocument.name,
            description: productDocument.description,
            image: productDocument.image,
            price: productDocument.price,
            etsyLink: productDocument.etsyLink,
            updatedAt: new Date(),
          },
        }
      );

    return jsonResponse({
      status: 200,
      body: { message: "Product successfully updated" },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error updating your product, please try again later on.",
      },
    });
  }
}

async function deleteProduct(client: MongoClient, handlerEvent: HandlerEvent) {
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
      .collection(PRODUCTS_COLLECTION)
      .deleteMany({
        _id: new ObjectId(id),
      });

    return jsonResponse({
      status: 200,
      body: { message: "Product successfully deleted" },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error deleting the product, please try again later on.",
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
    return deleteProduct(client, event);
  }
};

export { handler };
