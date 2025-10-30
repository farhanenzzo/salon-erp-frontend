import { employeeValidationSchema } from "../schemas/employee";

export const validateEmployeeInput = (data) => {
  return employeeValidationSchema.validate(data, {
    abortEarly: false,
  });
};
