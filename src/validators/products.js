import { productValidationSchema } from "../schemas/products";

export const validateProductInput = (data) => {
  return productValidationSchema.validate(data, { abortEarly: false });
};
