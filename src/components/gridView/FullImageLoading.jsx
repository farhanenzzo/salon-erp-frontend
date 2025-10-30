import { Skeleton } from "primereact/skeleton";
import React from "react";
import styles from "./FullImageLoading.module.css";

const FullImageLoading = ({ length }) => {
  return (
    <div className={styles.gridContainer}>
      {Array(length)
        .fill()
        .map((_, index) => (
          <div key={index}>
            <Skeleton
              width="100%"
              height="153px"
              className={styles.fullWidthSkeleton}
            />
            <div className={styles.skeletonGroup}>
              <div>
                <Skeleton width="100px" height="20px" className="mb-2" />
                <Skeleton width="60px" height="10px" />
              </div>
              <div>
                <Skeleton width="60px" height="10px" className="mb-4" />
                <Skeleton width="40px" height="10px" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FullImageLoading;
