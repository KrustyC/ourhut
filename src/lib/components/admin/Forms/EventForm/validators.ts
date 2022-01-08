import * as yup from "yup";

export const timeValidator = yup.object().shape({
  time: yup.string().required(), // Use regex
  period: yup.string().required(), // Use enum
});

export const dayValidator = yup.string().required(); // use Regex

export const eventSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.object().required(),
  image: yup.string(),
  eventbriteLink: yup.string().url(),
  date: yup
    .object()
    .shape({
      day: dayValidator,
      startTime: timeValidator,
      endTime: timeValidator,
    })
    .required(),
});
