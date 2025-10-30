import { offerValidationSchema } from "../schemas/offer";

export const validateOfferInput = (data) => {
  return offerValidationSchema.validate(data, { abortEarly: false });
};
