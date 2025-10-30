import { customerValidationSchema } from "../schemas/customer";

export const validateAddCustomerInput = (data) => {
  return customerValidationSchema.validate(data, {
    abortEarly: false,
  });
};
