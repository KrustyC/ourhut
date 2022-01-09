import * as yup from "yup";

export const productSchema = yup.object().shape({
  name: yup.string().required("please enter a name for the product"),
  description: yup
    .object()
    .required("please enter a description for the product"),
  image: yup.string().required("please enter an image for the product"),
  price: yup
    .number()
    .positive("please enter a valid price")
    .required("please enter a price"),
  etsyLink: yup.string().url().required("please enter a valid Etsy link"),
});
