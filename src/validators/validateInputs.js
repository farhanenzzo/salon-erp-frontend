export const validateInput = (formData, requiredFields) => {
  for (const { field, message, type } of requiredFields) {
    const value = formData[field];

    // Check if the field is missing or doesn't meet the required type
    if (!value && type !== "email") {
      // Allow empty email
      return { error: message }; // Return early with the error message for required fields
    }

    // Check if the field type is email and validate the email format if it's provided
    if (type === "email" && value) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        return { error: message }; // Return error if email format is invalid
      }
    }

    // If the field type is number, validate that the value is numeric
    if (type === "number" && isNaN(value)) {
      return { error: message }; // Return error if the value is not a number
    }
  }

  return { error: null }; // Return no error if all fields are valid
};
