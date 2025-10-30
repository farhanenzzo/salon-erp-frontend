import { categoryValidationSchema } from "../schemas/category";

export const validateCategoryInput = (data) => {
  return categoryValidationSchema.validate(data, {
    abortEarly: false,
  });
};
