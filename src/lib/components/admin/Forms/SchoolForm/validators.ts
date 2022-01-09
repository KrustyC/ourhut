import * as yup from "yup";

export const schoolSchema = yup.object().shape({
  name: yup.string().required("Please enter a name for the school"),
  postcode: yup.string().required("Please enter a postcode"),
});
