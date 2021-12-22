import { Handler, HandlerEvent } from "@netlify/functions";
import { jsonResponse } from "../shared/utils";
import { parseMultipartForm } from "../shared/parse-multipart-form";
// const ALLOWED_METHODS = ["GET", "POST"];
const ALLOWED_METHODS = ["POST"];

// async function get(client: MongoClient) {
//   try {
//     const projects = await client
//       .db(process.env.VITE_MONGO_DB_NAME)
//       .collection("projects")
//       .find()
//       .toArray();

//     return jsonResponse({
//       status: 200,
//       body: { projects },
//     });
//   } catch (error) {
//     return jsonResponse({
//       status: 500,
//       body: {
//         message: "Error fetching projects, please try again later on.",
//       },
//     });
//   }
// }

async function post(client: any, event: HandlerEvent) {
  try {
    const fields = parseMultipartForm(event);

    console.log(fields);

    // await client
    //   .db(process.env.VITE_MONGO_DB_NAME)
    //   .collection("projects")
    //   .insertOne(projectDocument);

    return jsonResponse({
      status: 200,
      body: {
        images: [
          "https://pbs.twimg.com/profile_images/1342768807891378178/8le-DzgC_400x400.jpg",
          "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
          "https://media.istockphoto.com/photos/random-multicolored-spheres-computer-generated-abstract-form-of-large-picture-id1295274245?b=1&k=20&m=1295274245&s=170667a&w=0&h=4t-XT7aI_o42rGO207GPGAt9fayT6D-2kw9INeMYOgo=",
          "https://upload.wikimedia.org/wikipedia/commons/e/ec/RandomBitmap.png",
        ],
      },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error creating your project, please try again later on.",
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

  let s3Client;

  try {
    // client = await connect();
    s3Client = {}; //
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error connecting to S3, please try again later on.",
      },
    });
  }

  //   if (event.httpMethod === "GET") {
  //     return get(s3Client);
  //   }

  if (event.httpMethod === "POST") {
    return post(s3Client, event);
  }
};

export { handler };
