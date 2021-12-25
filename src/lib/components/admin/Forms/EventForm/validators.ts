import * as yup from "yup";

export const timeValidator = yup.object().shape({
  time: yup.string().required(), // Use regex
  period: yup.string().required(), // Use enum
});

export const dayValidator = yup.string().required(); // use Regex

export const eventSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.object().required(),
  price: yup.number().moreThan(-1),
  image: yup.string(),
  location: yup.object().shape({
    address: yup
      .object()
      .shape({
        addressLine: yup.string().required(),
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
      day: dayValidator,
      startTime: timeValidator,
      endTime: timeValidator,
    })
    .required(),
});
