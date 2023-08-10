import axios from "axios";
import { Handler, HandlerEvent } from "@netlify/functions";
import * as yup from "yup";
import { jsonResponse } from "../shared/utils";
import { HTTP_METHODS } from "../shared/variables";

function getRequestParams() {
  const API_KEY = process.env.MAILCHIMP_API_KEY as string;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID as string;

  const DATACENTER = API_KEY.split("-")[1];
  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };

  return { url, headers };
}

export const newsletterSchema = yup.object().shape({
  email: yup.string().required("please enter an email"),
  firstName: yup.string().required("please enter a first name"),
  lastName: yup.string().required("please enter a last name"),
});

async function post(handlerEvent: HandlerEvent) {
  try {
    const newsletterData = handlerEvent.body
      ? JSON.parse(handlerEvent.body)
      : {};

    let newsletterDocument;

    try {
      newsletterDocument = await newsletterSchema.validate(newsletterData);
    } catch (error) {
      return jsonResponse({
        status: 400,
        body: {
          message: {
            name: "Validation Error",
            error: (error as Error).message,
          },
        },
      });
    }

    const { url, headers } = getRequestParams();

    await axios({
      method: "POST",
      url,
      headers,
      data: {
        email_address: newsletterDocument.email,
        status: "subscribed",
        merge_fields: {
          FNAME: newsletterDocument.firstName,
          LNAME: newsletterDocument.lastName,
        },
      },
    });

    // console.log("response", response);

    return jsonResponse({
      status: 200,
      body: { message: "User succesfully subscribed" },
    });
  } catch (error) {
    console.log("error", error);
    return jsonResponse({
      status: 500,
      body: {
        message: "Error subscirbing to newsletter, please try again later on.",
      },
    });
  }
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== HTTP_METHODS.POST) {
    return jsonResponse({
      status: 405,
      body: { message: "Method not allowed" },
    });
  }

  return post(event);
};

export { handler };
