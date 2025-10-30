import { Skeleton } from "primereact/skeleton";
import React from "react";
import styles from "./EmployeeLoading.module.css";

const EmployeeLoading = ({ key }) => {
  return (
    <div className={styles.loadingDes}>
      <Skeleton shape="circle" size="4rem" />
      <div className="w-full">
        <div className="w-max">
          <Skeleton width="4rem" height="1.5rem" borderRadius="5px" />
        </div>
        <div className={styles.serviceTime}>
          <Skeleton
            width="6rem"
            height="1.5rem"
            borderRadius="5px"
            className="mt-3"
          />
          <Skeleton width="3rem" height="1.5rem" borderRadius="5px" />
        </div>
      </div>
    </div>
  );
};

export default EmployeeLoading;
