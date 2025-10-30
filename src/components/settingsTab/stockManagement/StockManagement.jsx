import React, { useState } from "react";
import { stockManagementTabData } from "../../../utils/data";
import { InputSwitch } from "primereact/inputswitch";

const StockManagement = () => {
  const [checkedIds, setCheckedIds] = useState([]);

  const handleCheck = (id) => {
    setCheckedIds((prevCheckedIds) =>
      prevCheckedIds.includes(id)
        ? prevCheckedIds.filter((checkedId) => checkedId !== id)
        : [...prevCheckedIds, id]
    );
  };
  return (
    <div className="tabContainer">
      <h2>Stock Management</h2>
      <div>
        {stockManagementTabData.map((data) => (
          <div key={data.id} className="optionsContainer">
            <div className="mt-5">
              <h4 className="mb-2">{data.title}</h4>
              <p>{data.para}</p>
            </div>
            {data.type === "switch" ? (
              <InputSwitch
                checked={checkedIds.includes(data.id)}
                onChange={() => handleCheck(data.id)}
              />
            ) : (
              <p className="quantity_container">{data.orderQuantity}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockManagement;
