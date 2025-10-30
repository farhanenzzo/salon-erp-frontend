import serviceValidationSchema from "../schemas/serviceSchema";

export const validateServiceInput = (data) =>
  serviceValidationSchema.validate(data, { abortEarly: false });
