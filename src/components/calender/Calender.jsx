import React, { useState, useEffect } from "react";
import { format } from "date-fns"; // Import the format function
import styles from "./Calendar.module.css";
import LeftBTN from "../../assets/svg/calenderLeftClick.svg";
import RightBTN from "../../assets/svg/calenderRightClick.svg";
import Image from "next/image";
import CalenderIcon from "../../assets/svg/calendarIcon.svg";
import { DATE_FORMAT } from "../../constants";

const Calendar = ({onDateChange}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const startOfWeek = getStartOfWeek(currentDate);
    const week = Array.from(
      { length: 7 },
      (_, i) =>
        new Date(
          startOfWeek.getFullYear(),
          startOfWeek.getMonth(),
          startOfWeek.getDate() + i
        )
    );
    setCurrentWeek(week);
  }, [currentDate]);

  const getStartOfWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(start.setDate(diff));
  };

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleDateClick = (date) => {
    const formattedDate = format(date, DATE_FORMAT); 
    setSelectedDate(formattedDate);
    onDateChange(formattedDate)
  };

  console.log("selectedDate:", selectedDate);

  const renderDays = () => {
    const today = new Date();
    return currentWeek.map((date, index) => (
      <div
        className={`${styles.dayContainer} ${
          date.toDateString() === today.toDateString() ? styles.today : ""
        } ${
          selectedDate && date.toDateString() === new Date(selectedDate).toDateString()
            ? styles.selected
            : ""
        }`}
        key={index}
        onClick={() => handleDateClick(date)}
      >
        <div className={styles.dayContent}>
          <div className={styles.weekDay}>
            {date.toLocaleDateString("en-US", { weekday: "short" })}
          </div>
          <div className={styles.day}>{date.getDate()}</div>
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <Image src={CalenderIcon} alt="CalenderIcon" />
        <h6>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h6>
        <div className={styles.navButtons}>
          <Image
            src={LeftBTN}
            alt="LeftBTN"
            onClick={handlePrevWeek}
            className={styles.leftRightIcons}
          />
          <Image
            src={RightBTN}
            alt="RightBTN"
            onClick={handleNextWeek}
            className={styles.leftRightIcons}
          />
        </div>
      </div>

      <div className={styles.daysContainer}>{renderDays()}</div>
    </div>
  );
};

export default Calendar;
