import React from "react";
import ModalInput from "../modalInputComponent/ModalInput";

const TimeRangePicker = ({ start, end, onChange }) => {
  const timeOptions = [];
  for (let hour = 9; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      timeOptions.push(time);
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <ModalInput
        value={start}
        label={"Start Time"}
        onValueChange={(value) => onChange({ start: value, end })}
        key={`start-${start}`}
        inputType="dropdown"
        options={timeOptions}
      />
      <span className="text-gray-500">to</span>
      <ModalInput
        value={end}
        label={"End Time"}
        onValueChange={(value) => onChange({ start: value, end })}
        key={`start-${end}`}
        inputType="dropdown"
        options={timeOptions}
      />
    </div>
  );
};

export default TimeRangePicker;
