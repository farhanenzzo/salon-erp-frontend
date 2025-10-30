import React, { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import styles from "./CalendarViewComponent.module.css";
import TimeIcon from "../../../assets/svg/tippyTimer.svg";
import Image from "next/image";
import ProfileIcon from "../../../assets/svg/clientNameICON.svg";
import EmployeeIcon from "../../../assets/svg/employeeIcon.svg";
import ServiceIcon from "../../../assets/svg/serviceIcon.svg";
import "tippy.js/themes/light.css";
import "tippy.js/animations/perspective.css";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../constants";
import toast from "react-hot-toast";
import { listAppointments } from "../../../service/api";
import { APPOINTMENT_STATUSES } from "../../../constants";

const CalendarViewComponent = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const response = await listAppointments({
        status: APPOINTMENT_STATUSES.UPCOMING,
      });
      if (response) {
        setAppointments(response.data);
      }
    } catch (error) {
      toast.error("Error fetching appointments");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  // Calculate appointment count per day
  const appointmentCount = useMemo(() => {
    const count = {};
    appointments.forEach((appt) => {
      const date = new Date(appt.date);
      if (isNaN(date.getTime())) {
        console.error(`Invalid date encountered: ${appt.date}`);
        return; // Skip invalid dates
      }
      date.setHours(0, 0, 0, 0);
      const dateStr = format(date, "yyyy-MM-dd");
      count[dateStr] = (count[dateStr] || 0) + 1;
    });
    return count;
  }, [appointments]);

  const events = useMemo(() => {
    // Group appointments by date
    const appointmentsByDate = {};

    appointments.forEach((appt) => {
      const date = new Date(appt.date);
      if (isNaN(date.getTime())) {
        console.error(`Invalid date: ${appt.date}`);
        return; // Skip invalid entries
      }

      const dateStr = format(date, "yyyy-MM-dd");
      if (!appointmentsByDate[dateStr]) {
        appointmentsByDate[dateStr] = [];
      }

      appointmentsByDate[dateStr].push(appt);
    });

    // Sort appointments by time within each date
    Object.keys(appointmentsByDate).forEach((dateStr) => {
      appointmentsByDate[dateStr].sort((a, b) => {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        return timeA - timeB;
      });
    });

    // Process sorted appointments to create events
    const eventsList = [];
    const imageCountPerDate = {};

    Object.keys(appointmentsByDate).forEach((dateStr) => {
      appointmentsByDate[dateStr].forEach((appt, index) => {
        const start = new Date(appt.date);
        const end = new Date(start);
        end.setHours(start.getHours() + 1);

        // Track image count for this date
        imageCountPerDate[dateStr] = (imageCountPerDate[dateStr] || 0) + 1;
        const imageLimitReached = imageCountPerDate[dateStr] > 4;

        eventsList.push({
          title: appt?.client?.name,
          start,
          end,
          backgroundColor: "transparent",
          borderColor: "transparent",
          textColor: "transparent",
          extendedProps: {
            profilePicture: appt?.client?.photo,
            time: appt?.time, // Optional if `appt.date` already has time
            displayImage: !imageLimitReached,
            isFirstImage: index === 0, // First image based on time, not array order
            count: appointmentCount[dateStr],
            service: appt?.service?.serviceName,
            stylist: appt?.stylistId?.employeeName,
          },
        });
      });
    });

    return eventsList;
  }, [appointments, appointmentCount]);

  const eventContent = (info) => {
    const { event } = info;
    const profilePicture = event.extendedProps.profilePicture;
    const isFirstImage = event.extendedProps.isFirstImage;
    const displayImage = event.extendedProps.displayImage;

    if (!displayImage) return null;
    // Apply specific class based on whether it is the first image
    const imageClass = isFirstImage
      ? styles.firstImage
      : styles.subsequentImage;

    return (
      <div style={{ position: "relative" }}>
        <div className={styles.eventContent}>
          {profilePicture && (
            <div className={`${styles.profilePictureContainer} ${imageClass}`}>
              <Image
                src={profilePicture}
                alt={event.title}
                className={styles.profilePicture}
                width={35}
                height={35}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleEventDidMount = (info) => {
    const { event } = info;
    tippy(info.el, {
      animation: "perspective",
      content: `
      <div class="${styles.tooltipContent}">
        <div class="${styles.tooltipTitle}"><img src="${ProfileIcon.src}" alt="client" style="width: 16px; height: 16px; margin-right: 5px; color:black" />${event.title}</div>
        <div class="${styles.tooltipTitle}"><img src="${TimeIcon.src}" alt="timer" style="width: 16px; height: 16px; margin-right: 5px; color:black" />${event.extendedProps.time}</div>
        <div class="${styles.tooltipTitle}"><img src="${ServiceIcon.src}" alt="service" style="width: 16px; height: 16px; margin-right: 5px; color:black" />${event.extendedProps.service}</div>
        <div class="${styles.tooltipTitle}"><img src="${EmployeeIcon.src}" alt="employee" style="width: 16px; height: 16px; margin-right: 5px; color:black" />${event.extendedProps.stylist}</div>
      </div>
    `,
      allowHTML: true,
      theme: "custom",
    });
  };

  const dayCellContent = (arg) => {
    const date = arg.date;
    date.setHours(0, 0, 0, 0);
    const dateStr = format(date, DATE_FORMAT);
    const count = appointmentCount[dateStr] || 0;

    // Calculate hidden appointments (if total appointments > 4)
    const hiddenCount = count > 4 ? count - 4 : 0;

    return (
      <div className={styles.dayCellContent}>
        <div>{arg.dayNumberText}</div>
        {count > 0 && (
          <div className={styles.appointmentCount}>
            <p>
              {count} {count > 1 ? "Members" : "Member"}
            </p>
            <p className={styles.countContainer}>
              {hiddenCount > 0 && ` +${hiddenCount}`}{" "}
            </p>
            {/* Display +X for hidden appointments */}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <style>
        {`
          .fc .fc-daygrid-day-top {
            flex-direction: column;
            align-items: stretch;
            min-height: 50px;
          }
          .fc .fc-daygrid-day-number {
            padding: 4px;
            text-align: right;
          }
          .fc-daygrid-day-events {
            margin-top: 0;
          }
          .fc-col-header {
            background:#F0F2F5;
            color:#757575;
          }
          .fc-daygrid-day-events {
            display: flex;
            align-items: center;
          }
          .fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events {
            max-height: 2rem;
          }
          .fc-col-header-cell {
            height: 3rem;
          }
          .fc .fc-col-header-cell-cushion {
            padding-top: 1rem;
            font-size: 13px;
          }
          .fc-daygrid-dot-event:hover{
            background-color: transparent
          }
        `}
      </style>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={eventContent}
        eventDidMount={handleEventDidMount}
        headerToolbar={{
          start: "prev",
          center: "title",
          end: "next",
        }}
        dayCellContent={dayCellContent}
      />
    </div>
  );
};

export default CalendarViewComponent;
