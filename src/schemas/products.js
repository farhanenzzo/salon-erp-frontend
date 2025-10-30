import Joi from "joi";
import { fileValidation } from "../validators/fileValidation";

const productValidationSchema = Joi.object({
  stockName: Joi.string().trim().min(2).max(100).required().messages({
    "string.base": "Product name must be text",
    "string.empty": "Product name is required",
    "string.min": "Product name must be at least 2 characters",
    "string.max": "Product name cannot exceed 100 characters",
    "any.required": "Product name is required",
  }),

  stockCategory: Joi.string().trim().min(2).max(50).required().messages({
    "string.base": "Product category must be text",
    "string.empty": "Product category is required",
    "string.min": "Product category must be at least 2 characters",
    "string.max": "Product category cannot exceed 50 characters",
    "any.required": "Product category is required",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
    "any.required": "Price is required",
  }),

  stockQuantity: Joi.number().integer().min(0).required().messages({
    "number.base": "Product quantity must be a number",
    "number.integer": "Product quantity must be an integer",
    "number.min": "Product quantity cannot be negative",
    "any.required": "Product quantity is required",
  }),

  stockMFGDate: Joi.date().required().messages({
    "date.base": "Manufacturing date is required.",
    "any.required": "Manufacturing date is required",
  }),

  stockEXPDate: Joi.date()
    .greater(Joi.ref("stockMFGDate"))
    .required()
    .messages({
      "any.required": "Expiration date is required.",
      "date.base": "Expiration date is required.",
      "date.greater": "Expiration date must be after manufacturing date.",
    }),

  reorderQuantity: Joi.number().integer().min(0).required().messages({
    "number.base": "Reorder quantity is required",
    "number.integer": "Reorder quantity must be an integer",
    "number.min": "Reorder quantity cannot be negative",
    "any.required": "Reorder quantity is required",
  }),

  stockImage: Joi.alternatives()
    .try(
      // For file upload validation
      Joi.custom((value, helpers) => {
        if (
          value instanceof File ||
          (typeof value === "object" && value !== null)
        ) {
          const error = fileValidation(value);
          if (error) {
            return helpers.error("any.invalid", { message: error });
          }
          return value;
        }
        return value;
      }),
      // For URL string validation
      Joi.string().uri().messages({
        "string.uri": "Product image must be a valid URL",
      })
    )
    .required()
    .messages({
      "any.invalid": "Product image file is invalid.",
      "any.required": "Product image file is required.",
    }),

  stockDescription: Joi.string().trim().optional().allow("").messages({
    "string.base": "Product description must be text",
  }),
}).unknown(true);

export { productValidationSchema };
