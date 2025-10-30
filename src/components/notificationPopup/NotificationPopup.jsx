import React, { useEffect, useRef } from "react";
import styles from "./NotificationPopup.module.css";
import CloseButton from "../../assets/svg/popupCloseBTN.svg";
import Image from "next/image";
import {
  FIELD_NAMES,
  IMG_ALT,
  NOTIFICATION_FIELD_NAMES,
  NOTIFICATION_HEADS,
  NOTIFICATIONS_POPUP,
  TOAST_MESSAGES,
} from "../../constants";
import AppointmentIcon from "../../assets/svg/upcomingAppointmentIcon.svg";
import CancelledAppointmentsIcon from "../../assets/svg/cancelledAppointmentsIcon.svg";
import ServiceIcon from "../../assets/svg/serviceIcon.svg";
import { NOTIFICATION_POPUP_HEADINGS } from "../../constants/appointmentConstants";
import staffAddedIcon from "../../assets/svg/staffAdded.svg";

const NotificationPopup = ({ onClose, notifications = [], loading }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const groupedAppointments = notifications
    .filter((notif) => notif.type === "appointment")
    .reduce((acc, notification) => {
      const status = notification.details?.status || "Other";
      if (!acc[status]) acc[status] = [];
      acc[status].push(notification);
      return acc;
    }, {});

  const renderNotificationItem = (notification, iconSrc, iconAlt, content) => {
    const isRead = notification.isRead;

    return (
      <div
        key={notification.id}
        className={`${styles.notificationItem} ${
          isRead ? styles.readNotification : styles.unreadNotification
        }`}
      >
        <div className="flex items-start gap-4 ">
          <Image src={iconSrc} alt={iconAlt} width={24} height={24} />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="flex-1">{content}</p>
              {!isRead && (
                <span className={`${styles.unreadIndicator} ml-2`}></span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAppointmentNotification = (notification) => {
    const iconSrc =
      notification.details.status === "Upcoming"
        ? AppointmentIcon
        : CancelledAppointmentsIcon;
    const iconAlt =
      notification.details.status === "Upcoming"
        ? IMG_ALT.UPCOMING_APPOINTMENT_ICON
        : IMG_ALT.CANCELLED_APPOINTMENT_ICON;

    return renderNotificationItem(
      notification,
      iconSrc,
      iconAlt,
      <>
        <div>
          {FIELD_NAMES.CLIENT}:{" "}
          {notification.details?.clientName || TOAST_MESSAGES.CLIENT_NOT_FOUND}
        </div>
        <div>
          {FIELD_NAMES.DATE}: {notification.details?.appointmentDate}{" "}
          {notification.details?.time}
        </div>
      </>
    );
  };

  const renderServiceNotification = (notification) => {
    return renderNotificationItem(
      notification,
      ServiceIcon,
      IMG_ALT.SERVICE_ICON,
      `${notification.details?.serviceName || "Service not found"}`
    );
  };

  const renderStaffNotification = (notification) => {
    return renderNotificationItem(
      notification,
      staffAddedIcon,
      IMG_ALT.STAFF_ICON,
      `${NOTIFICATION_FIELD_NAMES.NEW_STAFF_ADDED}: ${
        notification.details?.employeeName || "Employee not found"
      }`
    );
  };

  return (
    <div
      ref={popupRef}
      className={`${styles.popup} ${isOpen ? styles.open : ""} ${
        isClosing ? styles.close : ""
      }`}
    >
      <div className={styles.popupHeader}>
        <h2 className="mb-4">{NOTIFICATIONS_POPUP.NOTIFICATIONS}</h2>
        <button onClick={handleClose} aria-label="Close notifications">
          <Image
            src={CloseButton}
            alt={IMG_ALT.CLOSE_BUTTON}
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className={styles.notificationList}>
        {loading ? (
          <p>{NOTIFICATION_POPUP_HEADINGS.LOADING_NOTIFICATIONS}</p>
        ) : (
          <>
            {notifications.some((notif) => notif.type === "service") && (
              <div className="mb-6">
                <h3 className="text-md font-bold mb-3">
                  {NOTIFICATION_HEADS.NEW_SERVICE_ADDED}
                </h3>
                {notifications
                  .filter((notif) => notif.type === "service")
                  .map(renderServiceNotification)}
              </div>
            )}

            {notifications.some((notif) => notif.type === "employee") && (
              <div className="mb-6">
                <h3 className="text-md font-bold mb-3">
                  {NOTIFICATION_HEADS.NEW_STAFFS}
                </h3>
                {notifications
                  .filter((notif) => notif.type === "employee")
                  .map(renderStaffNotification)}
              </div>
            )}

            {Object.entries(groupedAppointments).map(
              ([status, notifications]) => (
                <div key={status} className="mb-6">
                  <h3 className="text-md font-bold mb-3">
                    {status === "Upcoming"
                      ? NOTIFICATION_POPUP_HEADINGS.NEW_APPOINTMENTS
                      : NOTIFICATION_POPUP_HEADINGS.CANCELLED_APPOINTMENTS}
                  </h3>
                  {notifications.map(renderAppointmentNotification)}
                </div>
              )
            )}

            {notifications.length === 0 && (
              <p>{NOTIFICATION_POPUP_HEADINGS.NO_NEW_NOTIFICATIONS}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;
