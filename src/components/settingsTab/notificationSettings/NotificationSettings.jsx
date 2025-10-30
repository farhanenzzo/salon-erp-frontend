import React, { useState } from "react";
import { notificationsTabData } from "../../../utils/data";
import styles from "./NotificationSettings.module.css";
import { InputSwitch } from "primereact/inputswitch";
import CommonButton from "../../commonButton/CommonButton";
import { Calendar } from "primereact/calendar";

const NotificationSettings = () => {
  const [checkedIds, setCheckedIds] = useState([]);

  const handleCheck = (id) => {
    setCheckedIds((prevCheckedIds) =>
      prevCheckedIds.includes(id)
        ? prevCheckedIds.filter((checkedId) => checkedId !== id)
        : [...prevCheckedIds, id]
    );
  };

  const [dates, setDates] = useState(null);

  return (
    <div className="tabContainer">
      <h2>Notifications</h2>
      <div>
        {notificationsTabData.map((data) => (
          <div key={data.id} className="optionsContainer">
            <div className="mt-5">
              <h4 className="mb-2">{data.title}</h4>
              <p>{data.para}</p>
            </div>
            <InputSwitch
              checked={checkedIds.includes(data.id)}
              onChange={() => handleCheck(data.id)}
            />
          </div>
        ))}
      </div>

      <div className="settingsTabSaveBTN">
        <CommonButton label="Save" />
      </div>
    </div>
  );
};

export default NotificationSettings;
