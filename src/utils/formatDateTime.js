import { format } from "date-fns";
import { DATE_AND_TIME_FORMAT } from "../constants";

/**
 * Formats a date string or Date object into a readable format with AM/PM.
 * @param {Date | string} date - The date to format (can be a Date object or a date string).
 * @returns {string} - The formatted date and time with AM/PM.
 */
export const formatDateTime = (date) => {
  if (!date) return ""; // Return empty string if no date is provided

  // Parse the date if it's a string (could be ISO string)
  const parsedDate = new Date(date);

  // Format the date to a readable format: "MM/dd/yyyy hh:mm a"
  return format(parsedDate, DATE_AND_TIME_FORMAT); // e.g., "01/28/2025 10:30 AM"
};
