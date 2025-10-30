export const formatPrice = (price) => {
  if (!price) return "0"; // Handle empty or null values
  return Number(price).toLocaleString("en-US"); // Formats with commas
};
