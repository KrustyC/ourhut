import * as yup from "yup";

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
