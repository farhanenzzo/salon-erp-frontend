"use client";
import Image from "next/image";
import ListViewComponent from "../appointmentsTab/listViewComponent/ListViewComponent";
import BackButton from "../../assets/svg/backButton.svg";
import styles from "./DataTableDetail.module.css";
import {
  deleteAppointment,
  listAppointments,
  listClientAppointments,
  listEmployeeAppointments,
} from "../../service/api";
import useFetchData from "../../hooks/useFetchData";
import { format } from "date-fns";
import { useState } from "react";
import {
  DATE_FORMAT,
  DEFAULT_PROFILE_IMAGE_URL,
  DELETE_MODAL_TITLE,
} from "../../constants";
import ModalComponent from "../modalComponent/ModalComponent";
import toast from "react-hot-toast";
import DataTableDetailLoading from "./DataTableDetailLoading";
import { useRouter } from "next/navigation";
import { formatPrice } from "../../helpers/formatPrice";

/**
 * Displays detailed information for either a client or an employee, including appointments and related actions.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.client - The client ID (if applicable).
 * @param {string} props.employee - The employee ID (if applicable).
 * @param {Function} props.onGoback - Callback to handle back navigation.
 * @param {string} props.detailPage - The title of the detail page.
 * @param {Array} props.headerData - The header data for the list view.
 * @param {boolean} props.leftHead - Flag to determine left header rendering.
 * @param {boolean} props.canEdit - Flag to allow editing of specific details.
 * @returns {JSX.Element} The detailed data page component.
 */
const DataTableDetailPage = ({
  client,
  employee,
  onGoback,
  detailPage,
  headerData,
  leftHead,
  canEdit,
}) => {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [appointmentDeleteModal, setAppointmentDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  const isClientView =
    detailPage === "Appointments Details" || detailPage === "Customer Details";

  const api = isClientView ? listClientAppointments : listEmployeeAppointments;
  const id = isClientView ? client : employee;

  const { data, loading } = useFetchData(api, id);

  const displayItem = data?.length > 0 ? data[0] : data;
  const displayData = displayItem || {};

  console.log("displayItem", displayItem);

  /**
   * Opens the delete modal for a specific appointment.
   * @param {string} id - The ID of the appointment to delete.
   */
  const handleEmployeeDeleteModal = (id) => {
    setAppointmentToDelete(id);
    setAppointmentDeleteModal(true);
  };

  /**
   * Deletes an appointment and updates the appointment list.
   */
  const deleteAppointmentFromModal = async () => {
    if (appointmentToDelete) {
      try {
        await deleteAppointment(appointmentToDelete);
        const updatedAppointments = await listAppointments();
        setAppointments(updatedAppointments);
        toast.success("Appointment deleted successfully");
      } catch (error) {
        console.error("Error deleting appointment", error);
        toast.error("Error deleting appointment");
      } finally {
        setAppointmentDeleteModal(false);
        setAppointmentToDelete(null);
      }
    }
  };

  /**
   * Navigates back to the previous page.
   */
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      {appointmentDeleteModal && (
        <ModalComponent
          isOpen={appointmentDeleteModal}
          onClose={() => setAppointmentDeleteModal(false)}
          deleteModal
          title={DELETE_MODAL_TITLE.CONFIRM_DELETE}
          handleDeleteData={deleteAppointmentFromModal}
        />
      )}
      <div className={styles.header}>
        <Image
          src={BackButton}
          alt="Backbutton"
          className="cursor-pointer"
          onClick={onGoback || handleGoBack}
        />
        <h2>{detailPage}</h2>
      </div>
      <div className={styles.empContainer}>
        {loading ? (
          <DataTableDetailLoading />
        ) : (
          <>
            <h2 className="mb-5">
              {isClientView ? "Customer Information" : "Employee Information"}
            </h2>
            <div className={styles.container}>
              <div className="flex items-center">
                <Image
                  src={
                    isClientView
                      ? displayData.client?.photo || DEFAULT_PROFILE_IMAGE_URL
                      : displayData.employee?.employeePhoto ||
                        DEFAULT_PROFILE_IMAGE_URL
                  }
                  alt={isClientView ? "client" : "employee"}
                  width={80}
                  height={80}
                  className={styles.clientImage}
                />
              </div>
              <div className={styles.fontFields}>
                <h3>
                  {isClientView
                    ? displayData.client?.name
                    : displayData.employee?.employeeName}
                  {!isClientView && (
                    <span
                      className={
                        detailPage === "Employee Profile"
                          ? styles.roleContainer
                          : ""
                      }
                    >
                      {displayData.employee?.employeeRole?.roleName}
                    </span>
                  )}
                </h3>
                <h3>
                  {isClientView ? "ID: " : "ID: "}
                  <span className="highlightContainer">
                    {isClientView
                      ? displayData.client?.clientId
                      : displayData.employee?.employeeId}
                  </span>
                </h3>
                <h3>
                  Phone Number:{" "}
                  <span>
                    {isClientView
                      ? displayData.client?.phone
                      : displayData.employee?.employeePhone}
                  </span>
                </h3>
                <h3>
                  Email:{" "}
                  <span>
                    {isClientView
                      ? displayData.client?.email
                      : displayData.employee?.employeeEmail}
                  </span>
                </h3>
              </div>
              <div className={styles.fontFields}>
                <h3>
                  Address:{" "}
                  <span>
                    {isClientView
                      ? displayData.client?.address
                      : displayData.employee?.employeeAddress}
                  </span>
                </h3>
                {isClientView ? (
                  <h3>
                    Date of Birth:{" "}
                    <span>
                      {displayData.client?.dob &&
                        format(new Date(displayData.client?.dob), DATE_FORMAT)}
                    </span>
                  </h3>
                ) : (
                  <>
                    <h3>
                      Joining Date:{" "}
                      <span>{displayData.employee?.employeeJoiningData}</span>
                    </h3>
                    <h3>
                      Salary:{" "}
                      <span>
                        ${formatPrice(displayData.employee?.employeeSalary)}
                      </span>
                    </h3>
                  </>
                )}
              </div>
              {!isClientView && (
                <div className={styles.fontFieldsStatus}>
                  <h3>
                    Status:{" "}
                    <span
                      className={`${styles.status} ${
                        displayData.employee?.employeeStatus === "Active"
                          ? "positive_status"
                          : "negative_status"
                      }`}
                    >
                      {displayData.employee?.employeeStatus}
                    </span>
                  </h3>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <h2 className="mb-4">Appointments</h2>
      <ListViewComponent
        headerData={headerData}
        bodyData={displayData.appointments || data}
        isLoading={loading}
        idColoring={!isClientView}
        numberOfRows={5}
        onDelete={handleEmployeeDeleteModal}
      />
    </div>
  );
};

export default DataTableDetailPage;
