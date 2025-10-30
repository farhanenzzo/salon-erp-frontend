import Joi from "joi";

const customerValidationSchema = Joi.object({
  firstName: Joi.string().required().label("First name").messages({
    "string.base": "First name must be a string.",
    "string.empty": "First name is required.",
    "any.required": "First name is required.",
  }),

  lastName: Joi.string().required().label("Last name").messages({
    "string.base": "Last name must be a string.",
    "string.empty": "Last name is required.",
    "any.required": "Last name is required.",
  }),

  email: Joi.string()
    .allow("")
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Email must be a valid email address.",
    }),

  phone: Joi.string().allow("").messages({
    "string.base": "Phone must be a string.",
  }),

  dob: Joi.date().max("now").messages({
    "date.base": "Date of Birth is required.",
    "date.max": "Date of Birth cannot be in the future.",
  }),

  gender: Joi.string().valid("Male", "Female", "Other").messages({
    "string.base": "Gender is required.",
    "any.only": 'Gender must be "Male", "Female", or "Other".',
  }),

  notes: Joi.string().allow("").messages({
    "string.base": "Notes must be a string.",
  }),

  address: Joi.string().allow("").messages({
    "string.base": "Address must be a string.",
  }),
}).unknown(true);

export { customerValidationSchema };
