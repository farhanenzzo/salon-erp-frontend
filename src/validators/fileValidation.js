export const fileValidation = (file) => {
  // Check if file is present
  if (!file) {
    return "Image file is required.";
  }

  // Check if file is an image (MIME type check)
  if (!file.type.startsWith("image/")) {
    return "File must be an image.";
  }

  return null;
};
