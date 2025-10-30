import { listEmployees } from "../../service/api";
import React, { useEffect, useState } from "react";
import styles from "./Employees.module.css";
import EmployeeContainer from "../employeeContainerComponent/EmployeeContainer";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    setLoading(true);
    const result = await listEmployees();

    if (result.success) {
      setEmployees(result.data);
    } else {
      setEmployees([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className={styles.employeeOverflowContainer}>
      <EmployeeContainer
        empData={employees}
        appointments={false}
        isEmployeeLoading={loading}
      />
    </div>
  );
};

export default Employees;
