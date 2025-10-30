import { Image } from "next/image";

const AppointmentNotification = ({ notification }) => {
  const { status, clientName, appointmentDate, time } = notification.details;
  const iconSrc =
    status === "Upcoming" ? AppointmentIcon : CancelledAppointmentsIcon;
  const iconAlt =
    status === "Upcoming"
      ? IMG_ALT.UPCOMING_APPOINTMENT_ICON
      : IMG_ALT.CANCELLED_APPOINTMENT_ICON;

  return (
    <div className="flex items-center gap-4 mb-2">
      <Image src={iconSrc} alt={iconAlt} />
      <div>
        <p>
          {FIELD_NAMES.CLIENT}:{" "}
          <span>{clientName || TOAST_MESSAGES.CLIENT_NOT_FOUND}</span>
        </p>
        <p>
          {FIELD_NAMES.DATE}:{" "}
          <span>
            {appointmentDate} {time}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AppointmentNotification;
