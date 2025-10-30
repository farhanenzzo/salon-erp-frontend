import { fileValidation } from "../validators/fileValidation";
import Joi from "joi";

const serviceValidationSchema = Joi.object({
  category: Joi.string().required().messages({
    "string.empty": "Category name is required.",
    "any.required": "Category name is required.",
  }),
  serviceName: Joi.string().required().messages({
    "string.empty": "Service name is required.",
    "any.required": "Service name is required.",
  }),
  image: Joi.custom((value, helpers) => {
    const error = fileValidation(value);
    if (error) {
      return helpers.error("any.invalid", { message: error });
    }
    return value; // Return the file if valid
  })
    .required()
    .messages({
      "any.invalid": "Image file is invalid.",
      "any.required": "Image file is required.",
    }),
  duration: Joi.string().required().messages({
    "string.empty": "Duration is required.",
    "any.required": "Duration is required.",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price must be a number.",
    "any.required": "Price is required.",
  }),
  roles: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Roles must be an array of strings.",
    "any.required": "Roles is required.",
  }),
  description: Joi.string().allow(null, "").optional(),
});

export default serviceValidationSchema;
