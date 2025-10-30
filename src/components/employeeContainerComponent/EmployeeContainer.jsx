import Image from "next/image";
import React from "react";
import styles from "./EmployeeContainer.module.css";
import TimeIcon from "../../assets/svg/timer.svg";
import EmployeeLoading from "./EmployeeLoading";
import ServiceIcon from "../../assets/svg/serviceIcon.svg";

const EmployeeContainer = ({
  empData = [],
  appointments,
  isAppointmentLoading,
  isEmployeeLoading,
}) => {
  console.log("emp data", empData);
  return (
    <>
      {appointments ? (
        isAppointmentLoading ? (
          <div className="mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <EmployeeLoading key={index} />
            ))}
          </div>
        ) : empData.length === 0 ? (
          <p className="mt-4">No Appointments Found</p>
        ) : (
          empData.map((data) => {
            // Extract time portion from expiresAt (after splitting by "T" and ignoring date part)
            const expireTime = data.expiresAt
              ? new Date(data.expiresAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hourCycle: "h23", // Ensures 24-hour format
                })
              : "";
            return (
              <div className={styles.employeesSection} key={data._id}>
                {data?.client?.photo && (
                  <div className={styles.employeeImg}>
                    <Image
                      src={data?.client?.photo}
                      alt="Employee Profile IMG"
                      width={65}
                      height={56}
                    />
                  </div>
                )}
                <div className="w-full">
                  <div className={styles.empDetails}>
                    <h5>{data?.client?.name}</h5>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Image
                        src={ServiceIcon}
                        alt="Service"
                        width={15}
                        height={15}
                      />
                      <p className="capitalize">{data?.service?.serviceName}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Image src={TimeIcon} alt="Time" width={15} height={15} />
                      <p>{data.time}</p> - <p>{expireTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )
      ) : isEmployeeLoading ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <EmployeeLoading key={index} />
          ))}
        </>
      ) : empData.length === 0 ? (
        <p>No Employees Found</p>
      ) : (
        empData.map((data) => (
          <div className={styles.employeesSection} key={data._id}>
            <div className={styles.employeeImg}>
              <Image
                src={data.employeePhoto}
                alt="Employee Profile IMG"
                width={65}
                height={56}
              />
            </div>

            <div className="w-full">
              {/* <div className={styles.empDetails}> */}
              <h5>{data.employeeName}</h5>
              {/* </div> */}
              <div className={styles.empDetails}>
                <p>{data?.role?.roleName}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default EmployeeContainer;
