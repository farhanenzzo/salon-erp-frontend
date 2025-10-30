"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import styles from "./AppointmentsTab.module.css";
import {
  addAppointment,
  deleteAppointment,
  fetchClientDetailsByClientId,
  listAppointments,
  updateAppointment,
} from "../../service/api";
import {
  addNewAppointmentData,
  appointmentRequiredFields,
  appointmentSearchFields,
  appointmentTabData,
} from "../../utils/data";
import toast from "react-hot-toast";
import TabsHeader from "../tabsHeader/TabsHeader";
import { debounce } from "lodash";
import useForm from "../../hooks/useForm";
import { useFetchServices } from "../../hooks/useFetchServices";
import { useFetchStylists } from "../../hooks/useFetchStylists";
import {
  DATE_FORMAT,
  DELETE_MODAL_TITLE,
  MODAL_TITLES,
  TABHEADER,
  TIME_FORMAT,
  TOAST_MESSAGES,
} from "../../constants";
import { useSearch } from "../../hooks/useSearch";
import { APPOINTMENT_STATUSES } from "../../constants/index";
import { useDispatch } from "react-redux";
import { incrementNotificationCount } from "../../redux/slices/notificationSlice";
import { useRouter } from "next/navigation";
import useModulePermissions from "../../hooks/useModulePermissions";
import dynamic from "next/dynamic";
import Loading from "../../app/loading";
import { validateAppointmentInput } from "../../validators/appointmentValidator";
import { convertTimeToDate } from "../../helpers/convertTime";
import { isFieldDisabled } from "../../utils/disabledInputs";

const ModalComponent = dynamic(
  () => import("../modalComponent/ModalComponent"),
  { ssr: false }
);

const ListViewComponent = dynamic(
  () => import("./listViewComponent/ListViewComponent"),
  { ssr: false, loading: () => <Loading /> }
);

const CalendarViewComponent = dynamic(
  () => import("./CalendarViewComponent/CalendarViewComponent"),
  { ssr: false }
);

const AppointmentTabs = () => {
  const [appointments, setAppointments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tabView, setTabView] = useState("List");
  const [appointmentDeleteModal, setAppointmentDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClientSelected, setIsClientSelected] = useState(false);
  const [isAddAppointmentLoading, setIsAddAppointmentLoading] = useState(false);
  const [selectedStylist, setSelectedStylist] = useState(null);

  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const { canEdit } = useModulePermissions();

  const dispatch = useDispatch();
  const router = useRouter();

  const initialFormData = {
    clientId: "",
    clientName: "",
    phoneNumber: "",
    email: "",
    date: "",
    time: "",
    service: "",
    stylistId: "",
    gender: "",
    note: "",
  };

  const fetchAppointmentData = async (page = 1) => {
    setLoading(true);
    try {
      const result = await listAppointments({
        page,
        limit: paginationInfo.limit,
      });

      if (result.success) {
        setAppointments(result.data);
        setPaginationInfo(result.pagination);
      } else {
        toast.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.log("Can't fetch appointments data");
      toast.error("Error fetching appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentData(1);
  }, []);

  const keyMap = {
    1: "clientId",
    2: "clientName",
    3: "phoneNumber",
    4: "email",
    5: "date",
    6: "time",
    7: "service",
    8: "stylistId",
    9: "gender",
    10: "note",
  };

  const {
    formData,
    setFormData,
    selectedDate,
    selectedTime,
    setSelectedService,
    selectedService,
    handleDateChange,
    handleInputChange,
    handleTimeChange,
    handleServiceChange,
    resetForm,
  } = useForm(initialFormData, keyMap);

  const handleModal = () => {
    setModalOpen(true);
  };

  const { filteredData, setSearchTerm } = useSearch(
    appointments,
    appointmentSearchFields
  );

  const handleSaveAppointment = async () => {
    try {
      setIsAddAppointmentLoading(true);
      const { error } = validateAppointmentInput(
        formData,
        appointmentRequiredFields
      );

      if (error) {
        const firstErrorMessage = error.details[0].message;
        toast.error(firstErrorMessage);
        return;
      }

      const date = format(selectedDate, DATE_FORMAT);
      const time = format(selectedTime, TIME_FORMAT);

      const appointmentData = {
        ...formData,
        service: selectedService,
        date,
        time,
        paidStatus: "paid",
      };

      const newAppointment = await addAppointment(appointmentData);

      if (!newAppointment) {
        toast.error("Error adding appointment");
      }

      await fetchAppointmentData();

      setIsAddAppointmentLoading(false);
      setModalOpen(false);
      dispatch(incrementNotificationCount());
      resetForm();
      toast.success("Appointment added successfully");
    } catch (error) {
      console.log("Error saving new appointment", error);
      toast.error("Error adding appointment");
    } finally {
      setIsAddAppointmentLoading(false);
    }
  };

  const handleStylistChange = (event) => {
    const selectedStylistId = event.target.value;

    if (stylist && stylist.length > 0) {
      const selectedStylist = stylist.find((s) => s.id === selectedStylistId);

      if (selectedStylist) {
        setFormData({
          ...formData,
          stylistId: selectedStylistId,
        });
      } else {
        console.log("No stylist found with ID:", selectedStylistId);
      }
    } else {
      console.log("Stylist data not loaded or empty");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setIsEditMode(false);
    setSelectedAppointment(null);
    resetForm();
    setFormData({
      clientId: "",
      phoneNumber: "",
      service: "",
      date: "",
      time: "",
      note: "",
      stylistId: "",
    });
  };

  const handleEmployeeDeleteModal = async (id) => {
    setAppointmentToDelete(id);
    setAppointmentDeleteModal(true);
  };

  const deleteAppointmentFromModal = async () => {
    if (appointmentToDelete) {
      try {
        await deleteAppointment(appointmentToDelete);
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment._id !== appointmentToDelete
          )
        );
        // setAppointmentDeleteModal(false);
        // setAppointmentToDelete(null);
        toast.success("Appointment deleted successfully");
      } catch (error) {
        console.log("Error deleting appointment", error);
        toast.error("Error deleting appointment");
      } finally {
        // Close the modal in both success and error cases
        setAppointmentDeleteModal(false);
        setAppointmentToDelete(null);
      }
    }
  };

  const handleAppointmentEdit = (appointmentId) => {
    const editAppointment = appointments.find((a) => a._id === appointmentId);

    console.log("editing appointment", editAppointment);

    if (editAppointment) {
      const selectedServiceId = editAppointment.service?._id || "";
      const selectedStylistId = editAppointment.stylistId?._id || "";

      console.log("Stylist ID:", editAppointment.stylistId);
      console.log("Stylist ID _id:", editAppointment.stylistId?._id);

      setSelectedService(selectedServiceId);
      setSelectedStylist(selectedStylistId);
      const newFormData = {
        clientId: editAppointment.clientId || "",
        clientName: editAppointment.client?.name || "",
        phoneNumber: editAppointment.client?.phone || "",
        email: editAppointment.client?.email || "",
        service: selectedServiceId,
        date: editAppointment.date,
        time: convertTimeToDate(editAppointment.time),
        gender: editAppointment.client?.gender || "",
        note: editAppointment.note || "",
        stylistId: selectedStylistId || "",
      };
      console.log("New form data being set:", newFormData);
      setFormData(newFormData);
    }
    setSelectedAppointment(editAppointment);
    setIsEditMode(true);
    setModalOpen(true);
  };

  const updateAppointmentData = async (appointmentID, updatedData) => {
    try {
      let { date, time } = updatedData;

      // Format the date and time before sending the update
      if (date) {
        updatedData.date = format(new Date(date), "yyyy-MM-dd"); // Format date to yyyy-MM-dd
      }

      if (time) {
        const formattedTime = format(new Date(time), "HH:mm"); // Extract time in HH:mm format
        updatedData.time = formattedTime;
      }
      // Call the updateAppointment function with the formatted data
      const updatedAppointment = await updateAppointment(
        appointmentID,
        updatedData
      );

      if (updatedAppointment) {
        await fetchAppointmentData();
        setModalOpen(false);
        toast.success("Appointment updated successfully");
        dispatch(incrementNotificationCount());
      }
    } catch (error) {
      toast.error("Error updating appointment");
      console.log("Error updating appointment data", error);
    }
  };

  const handleAppointmentCancel = async (appointmentID) => {
    try {
      const currentAppointment = appointments.find(
        (appointment) => appointment._id === appointmentID
      );
      if (!currentAppointment) {
        toast.error(TOAST_MESSAGES.APPOINTMENT_NOT_FOUND);
        throw new Error("Appointment not found");
      }

      const newStatus =
        currentAppointment.appointmentStatus === APPOINTMENT_STATUSES.UPCOMING
          ? APPOINTMENT_STATUSES.CANCELLED
          : null;
      await updateAppointment(appointmentID, { appointmentStatus: newStatus });
      setAppointments((prevAppointments) =>
        prevAppointments.map((apmnt) =>
          apmnt._id === appointmentID
            ? { ...apmnt, appointmentStatus: newStatus }
            : apmnt
        )
      );

      dispatch(incrementNotificationCount());

      toast.success(TOAST_MESSAGES.APPOINTMENT_CANCELLED);
    } catch (error) {
      toast.error(TOAST_MESSAGES.ERROR_UPDATING_APPOINTMENT);
    }
  };

  const handleRowSelect = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedClientId(appointment.client._id);
    console.log("Selected client id", appointment.client._id);
    // setShowDetailTab(true);
    router.push(`/appointments/${appointment.client._id}`);
  };

  const handleClientIdChange = debounce(async (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      clientId: value,
    }));

    if (value.length < 5) {
      setFormData({
        clientName: "",
        phoneNumber: "",
        email: "",
        gender: "",
      });
      return;
    }

    const formattedValue = value.toUpperCase();
    console.log("formatted vale", formattedValue);

    try {
      const clientDetails = await fetchClientDetailsByClientId(formattedValue);

      if (clientDetails && clientDetails._id) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          clientName: clientDetails.name,
          phoneNumber: clientDetails.phone || "",
          email: clientDetails.email || "",
          gender: clientDetails.gender || "",
        }));
        setIsClientSelected(true);
      } else {
        console.log("No matching client found, clearing details");
        clearClientDetails();
      }
    } catch (error) {
      console.error("Error fetching client details:", error);
      clearClientDetails();
    }
  }, 300);

  const clearClientDetails = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      clientName: "",
      phoneNumber: "",
      email: "",
      gender: "",
    }));
  };

  const services = useFetchServices();
  const stylist = useFetchStylists(selectedService);

  return (
    <div className={styles.container}>
      {modalOpen && (
        <ModalComponent
          isOpen={modalOpen}
          onClose={handleModalClose}
          title={
            isEditMode
              ? MODAL_TITLES.EDIT_APPOINTMENT
              : MODAL_TITLES.ADD_NEW_APPOINTMENT
          }
          modalData={addNewAppointmentData}
          onSave={() =>
            isEditMode
              ? updateAppointmentData(selectedAppointment._id, formData)
              : handleSaveAppointment()
          }
          formData={formData}
          handleServiceChange={handleServiceChange}
          handleDateChange={handleDateChange}
          handleTimeChange={handleTimeChange}
          handleInputChange={handleInputChange}
          handleStylistChange={handleStylistChange}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedService={selectedService}
          selectedStylist={selectedStylist}
          handleClientIdChange={handleClientIdChange}
          services={services}
          stylist={stylist}
          canEdit={canEdit}
          isLoading={isAddAppointmentLoading}
          minDate={new Date()}
          isEditMode={isEditMode}
          isFieldDisabled={isFieldDisabled}
        />
      )}
      {appointmentDeleteModal && (
        <ModalComponent
          isOpen={appointmentDeleteModal}
          onClose={() => setAppointmentDeleteModal(false)}
          deleteModal={true}
          title={DELETE_MODAL_TITLE.CONFIRM_DELETE}
          handleDeleteData={deleteAppointmentFromModal}
          canEdit={canEdit}
        />
      )}

      <div className={styles.table}>
        <TabsHeader
          heading={TABHEADER.ALL_APPOINTMENTS}
          listAndCalenderView={true}
          tabView={tabView}
          setTabView={setTabView}
          handleAddNewButton={handleModal}
          setSearchTerm={setSearchTerm}
          canEdit={canEdit}
        />
        {tabView === "List" ? (
          <ListViewComponent
            headerData={appointmentTabData}
            bodyData={filteredData}
            appointments={appointments}
            handleEdit={handleAppointmentEdit}
            cancelButton={true}
            onCancel={handleAppointmentCancel}
            handleDelete={handleEmployeeDeleteModal}
            onRowSelect={handleRowSelect}
            onEdit={handleAppointmentEdit}
            onDelete={handleEmployeeDeleteModal}
            idColoring={handleAppointmentEdit}
            isLoading={loading}
            isRowClickable={true}
            paginationInfo={paginationInfo}
            fetchData={fetchAppointmentData}
            canEdit={canEdit}
          />
        ) : (
          <CalendarViewComponent
            appointments={appointments}
            handleEdit={handleAppointmentEdit}
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentTabs;
