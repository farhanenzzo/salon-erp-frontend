import Joi from "joi";

const employeeValidationSchema = Joi.object({
  employeeName: Joi.string().trim().min(2).max(100).required().messages({
    "string.base": "Employee Name must be text",
    "string.empty": "Employee Name is required",
    "string.min": "Employee Name must be at least 2 characters",
    "string.max": "Employee Name cannot exceed 100 characters",
    "any.required": "Employee Name is required",
  }),

  employeeEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .allow(null, "")
    .messages({
      "string.email": "Invalid email format",
    }),

  employeeRole: Joi.string().required().messages({
    "string.base": "Employee Role must be a valid ObjectId",
    "string.empty": "Employee Role is required",
    "any.required": "Employee Role is required",
  }),

  employeePhone: Joi.number()
    .integer()
    .min(1000000000)
    .max(9999999999)
    .required()
    .messages({
      "number.base": "Employee Phone is required",
      "number.min": "Employee Phone must be a valid 10-digit number",
      "number.max": "Employee Phone must be a valid 10-digit number",
      "any.required": "Employee Phone is required",
    }),

  employeeJoiningData: Joi.string().isoDate().required().messages({
    "string.base": "Joining Date must be a valid date",
    "string.empty": "Joining Date is required",
    "string.isoDate": "Joining Date must be in ISO date format",
    "any.required": "Joining Date is required",
  }),

  employeeSalary: Joi.number().min(0).required().messages({
    "number.base": "Salary must be a number",
    "number.min": "Salary cannot be negative",
    "any.required": "Salary is required",
  }),

  employeeAddress: Joi.string().trim().min(5).max(200).required().messages({
    "string.base": "Address must be text",
    "string.empty": "Address is required",
    "string.min": "Address must be at least 5 characters",
    "string.max": "Address cannot exceed 200 characters",
    "any.required": "Address is required",
  }),

  employeeGender: Joi.string()
    .valid("Male", "Female", "Other")
    .required()
    .messages({
      "any.only": "Gender must be 'Male', 'Female', or 'Other'",
      "any.required": "Gender is required",
    }),

}).unknown(true);

export { employeeValidationSchema };
