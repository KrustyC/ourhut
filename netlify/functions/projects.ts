import { Handler, HandlerEvent } from "@netlify/functions";
import { jsonResponse } from "../shared/utils";
import { ObjectId } from "mongodb";
import { connect } from "../shared/mongodb-client";
import { HTTP_METHODS } from "../shared/variables";

const PROJECTS_COLLECTION = "projects";
const PRODUCTS_COLLECTION = "products";

async function get(event: HandlerEvent) {
  try {
    const client = await connect();
    if (!client) {
      throw new Error("Can not connect to DB");
    }

    const { id } = event.queryStringParameters as { id?: string };

    if (id) {
      const project = await client
        .db()
        .collection(PROJECTS_COLLECTION)
        .findOne({ _id: new ObjectId(id) });

      if (!project) {
        return jsonResponse({
          status: 404,
          body: {
            message: "Project not found",
          },
        });
      }

      if (project.links.shop) {
        const product = await client
          .db()
          .collection(PRODUCTS_COLLECTION)
          .findOne({ _id: new ObjectId(project.links.shop._id) });

        if (product) {
          project.links.shop = product;
        }
      }

      return jsonResponse({
        status: 200,
        body: { project },
      });
    }

    const projects = await client
      .db()
      .collection(PROJECTS_COLLECTION)
      .find()
      .toArray();

    // projects.sort((a, b) =>
    //   a.order > b.order ? 1 : b.order > a.order ? -1 : 0
    // );

    return jsonResponse({
      status: 200,
      body: { projects },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error fetching projects, please try again later on.",
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

  return get(event);
};

export { handler };
