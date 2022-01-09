import * as yup from "yup";

export const timeValidator = yup.object().shape({
  time: yup.string().required("please add a time"), // Use regex
  period: yup.string().required("please select time period (AM/PM)"), // Use enum
});

export const dayValidator = yup.string().required(); // use Regex

export const eventSchema = yup.object().shape({
  title: yup.string().required("please enter a title"),
  description: yup.object().required("please enter a description"), // Improve this validation to make sure text is not empty
  image: yup
    .string()
    .required("please enter an image"),
  eventbriteLink: yup
    .string()
    .url("please make sure Eventbrite link is a valid URL")
    .required("please enter an EventBrite link"),
  date: yup
    .object()
    .shape({
      day: dayValidator,
      startTime: timeValidator,
      endTime: timeValidator,
    })
    .required("please add a valid date"),
});
