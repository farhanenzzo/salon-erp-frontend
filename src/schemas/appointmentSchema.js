import Joi from "joi";

const appointmentValidationSchema = Joi.object({
  clientId: Joi.string().required().messages({
    "string.empty": "Customer is required.",
    "any.required": "Customer is required.",
  }),
  service: Joi.string().required().messages({
    "string.empty": "Service is required.",
    "any.required": "Service is required.",
  }),
  date: Joi.string().required().messages({
    "string.empty": "Date is required.",
    "any.required": "Date is required.",
  }),
  time: Joi.date().required().messages({
    "date.base": "Time is required.",
    "string.empty": "Time is required.",
    "any.required": "Time is required.",
  }),
  note: Joi.string().allow(null, "").optional(),
  stylistId: Joi.string().required().messages({
    "string.empty": "Employee is required.",
    "any.required": "Employee is required.",
  }),

  // Name field - required
  clientName: Joi.string().required().messages({
    "string.empty": "Customer name is required.",
    "any.required": "Customer name is required.",
  }),

  // Email validation
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Validate email format if provided
    .optional()
    .messages({
      "string.email": "Email must be a valid email address.",
    }),

  // Gender validation - allowed values: Male, Female, Other
  gender: Joi.string()
    .valid("Male", "Female", "Other")
    .allow("")
    .optional()
    .messages({
      "any.only": "Gender must be either Male, Female, or Other.",
    }),

  // Date of birth validation
  dob: Joi.date().optional().messages({
    "date.base": "Date of birth must be a valid date.",
  }),

  // Phone number validation (optional, but must be valid if provided)
  phoneNumber: Joi.string().allow("").optional().pattern(/^\d+$/).messages({
    "string.pattern.base": "Phone number must contain only numbers.",
  }),
});

export { appointmentValidationSchema };
