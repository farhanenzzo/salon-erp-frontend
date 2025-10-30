import React from "react";
import EmployeeContainer from "../employeeContainerComponent/EmployeeContainer";
import useFetchData from "../../hooks/useFetchData";
import { listAppointments } from "../../service/api";

const UpcomingAppointments = ({ filterDate }) => {
  const {
    data: upcomingAppointments,
    loading,
    error,
  } = useFetchData(listAppointments, {
    selectedDate: filterDate,
    status: "Upcoming",
  });

  return (
    <EmployeeContainer
      empData={upcomingAppointments?.data || []} // Pass the array of appointments
      appointments={true}
      isAppointmentLoading={loading}
    />
  );
};

export default UpcomingAppointments;
