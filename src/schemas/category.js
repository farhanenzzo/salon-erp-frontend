import Joi from "joi";

const categoryValidationSchema = Joi.object({
  name: Joi.string().required().trim().min(2).max(50).messages({
    "string.base": "Category name must be text",
    "string.empty": "Category name is required",
    "string.min": "Category name must be at least 2 characters",
    "string.max": "Category name cannot exceed 50 characters",
    "any.required": "Category name is required",
  }),

  status: Joi.boolean().default(true).messages({
    "boolean.base": "Status must be true or false",
  }),
}).unknown(true);

export { categoryValidationSchema };
