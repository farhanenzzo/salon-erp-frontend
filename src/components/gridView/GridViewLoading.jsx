import { Skeleton } from "primereact/skeleton";
import React from "react";
import styles from "./GridViewLoading.module.css";

const GridViewLoading = ({length}) => {
  return (
    <div className={styles.gridContainer}>
      {Array(length)
        .fill()
        .map((_, index) => (
          <div key={index} className={styles.employeeGrid}>
            <Skeleton shape="circle" size="80px" />
            <Skeleton width="100px" height="20px" />
            <Skeleton width="70px" height="20px" />
            <Skeleton width="70%" height="20px" />
            <Skeleton width="100%" height="40px" />
            <Skeleton
              width="18%"
              height="1.5rem"
              className={styles.empRoleContainerLoading}
            />
          </div>
        ))}
    </div>
  );
};

export default GridViewLoading;
