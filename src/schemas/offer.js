import Joi from "joi";

const offerValidationSchema = Joi.object({
  title: Joi.string().trim().min(3).max(150).required().messages({
    "string.base": "Title must be text",
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title cannot exceed 150 characters",
    "any.required": "Title is required",
  }),

  message: Joi.string().trim().min(5).max(500).required().messages({
    "string.base": "Message must be text",
    "string.empty": "Message is required",
    "string.min": "Message must be at least 5 characters",
    "string.max": "Message cannot exceed 500 characters",
    "any.required": "Message is required",
  }),

  dateRange: Joi.array()
    .items(
      Joi.date().iso().messages({
        "date.base": "Please select a valid date.",
      })
    )
    .length(2)
    .custom((value, helpers) => {
      const [start, end] = value;

      if (!start && !end) {
        return helpers.error("any.invalid", {
          message: "Please select a start and end date.",
        });
      }
      if (!start) {
        return helpers.error("any.invalid", {
          message: "Please select a start date.",
        });
      }
      if (!end) {
        return helpers.error("any.invalid", {
          message: "Please select an end date.",
        });
      }
      if (new Date(start) >= new Date(end)) {
        return helpers.error("any.invalid", {
          message: "End date must be after the start date.",
        });
      }
      return value;
    })
    .required()
    .messages({
      "array.base": "Please select a valid start and end date.",
      "array.length": "You must select both a start and end date.",
      "any.required": "Date range is required.",
    }),

  // image: Joi.alternatives()
  //   .try(
  //     Joi.string().uri().messages({
  //       "string.uri": "Image must be a valid URL.",
  //     }),
  //     Joi.custom((value, helpers) => {
  //       if (!value) {
  //         return helpers.error("any.required", {
  //           message: "Image is required.",
  //         });
  //       }
  //       if (
  //         value instanceof File ||
  //         (typeof value === "object" && value !== null)
  //       ) {
  //         const error = fileValidation(value);
  //         if (error) {
  //           return helpers.error("any.invalid", {
  //             message: "Invalid image format.",
  //           });
  //         }
  //         return value;
  //       }
  //       return helpers.error("any.invalid", {
  //         message: "Invalid image format.",
  //       });
  //     })
  //   )
  //   .required()
  //   .label("Image")
  //   .messages({
  //     "any.required": "Image is required.",
  //     "any.invalid": "Invalid image format.",
  //   }),
}).unknown(true);

export { offerValidationSchema };
