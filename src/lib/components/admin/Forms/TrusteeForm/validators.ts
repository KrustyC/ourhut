import * as yup from "yup";

export const trusteeSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.object().required(),
});
