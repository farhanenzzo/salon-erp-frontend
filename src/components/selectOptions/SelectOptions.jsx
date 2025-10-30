import React, { useState } from "react";
import styles from "./SelectOptions.module.css";

const SelectOptions = ({ timeFrame, handleChange, options }) => {
  return (
    <select
      value={timeFrame}
      onChange={handleChange}
      className={styles.timeFrameDropdown}
    >
      {options.map((item) => (
        <option
          value={item.value}
          key={item.id}
          className="text-transform: capitalize"
        >
          {item.label}
        </option>
      ))}
      {/* <option value="weekly">Weekly</option>
        <option value="daily">Daily</option> */}
    </select>
  );
};

export default SelectOptions;
