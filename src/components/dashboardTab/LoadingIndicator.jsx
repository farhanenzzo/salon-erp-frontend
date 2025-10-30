import React from "react";
import styles from "./LoadingIndicator.module.css";
import { Skeleton } from "primereact/skeleton";

const LoadingIndicator = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.leftSection}>
        {/* First line */}
        <div className={styles.lineContain}>
          <div className={styles.detailSection}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div className={styles.commonContainerWithIMG} key={index}>
                <Skeleton shape="circle" size="80px" />
                <div className={styles.skeletonText}>
                  <Skeleton width="100px" height="20px" />
                  <Skeleton width="150px" height="30px" />
                </div>
              </div>
            ))}
          </div>
          <div
            className={styles.commonContainerWithoutIMG}
            style={{
              alignItems: "flex-start",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <div className={styles.headAndSelect}>
              <Skeleton width="100px" height="20px" />
              <Skeleton width="100px" height="40px" />
            </div>
            <div className={styles.pieChartContainer}>
              <Skeleton width="100%" height="200px" />
            </div>
          </div>
        </div>
        {/* Second line */}
        <div
          className={styles.commonContainerWithoutIMG}
          style={{
            paddingTop: "30px",
            width: "100%",
            height: "max-content",
          }}
        >
          <div className={styles.headAndSelect}>
            <Skeleton width="150px" height="20px" />
            <Skeleton width="100px" height="40px" />
          </div>
          <div className={styles.skeletonBarChart}>
            <Skeleton width="100%" height="200px" />
          </div>
        </div>
        <div className="flex justify-between" style={{ gap: "1rem" }}>
          <div className={styles.commonContainerWithoutIMG} style={{ flex: 1 }}>
            <Skeleton width="100px" height="20px" />
            <Skeleton width="100%" height="200px" />
          </div>
          <div
            className={styles.commonContainerWithoutIMG}
            style={{
              flex: 1,
            }}
          >
            <Skeleton width="150px" height="20px" />
            <Skeleton width="100%" height="200px" />
          </div>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.commonContainerWithoutIMG}>
          <Skeleton width="200px" height="20px" />
          <Skeleton width="100%" height="200px" />
          <Skeleton width="100%" height="200px" />
        </div>
      </div>
    </div>
  );
};
export default LoadingIndicator;
