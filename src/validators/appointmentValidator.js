import { appointmentValidationSchema } from "../schemas/appointmentSchema";
import { parseISO, isBefore } from "date-fns";

// Validate that the provided appointment date is in the future
const validateAppointmentDate = (date, time) => {
  const appointmentDateTime = `${date} ${time}`;
  const appointmentDateTimeISO = parseISO(appointmentDateTime); // Parse to Date object

  // Check if the appointment date and time are in the future
  if (isBefore(appointmentDateTimeISO, new Date())) {
    return "Appointment date and time must be in the future.";
  }

  return null;
};

// Validate the appointment input
export const validateAppointmentInput = (data) => {
  const requiredFields = [
    "clientId",
    "service",
    "date",
    "time",
    "stylistId",
    "clientName",
  ];

  // Check if all required fields are empty
  const isFormEmpty = requiredFields.every((field) => !data[field]);

  if (isFormEmpty) {
    return { error: { details: [{ message: "Please fill out the form." }] } };
  }
  const { error } = appointmentValidationSchema.validate(data, {
    abortEarly: false,
  });

  // Check if date and time are valid
  if (error) {
    return { error };
  }

  const dateValidationError = validateAppointmentDate(data.date, data.time);
  if (dateValidationError) {
    return { error: { details: [{ message: dateValidationError }] } };
  }

  return { error: null };
};
