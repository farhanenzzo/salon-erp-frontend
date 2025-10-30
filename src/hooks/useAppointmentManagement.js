import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  addAppointment,
  deleteAppointment,
  fetchClientDetailsByName,
  listAppointments,
  updateAppointment,
} from "../service/api";
import toast from "react-hot-toast";
import useForm from "./useForm";
import { debounce } from "lodash";
import { DATE_FORMAT, TIME_FORMAT } from "@/constants";

const useAppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  //   const [selectedService, setSelectedService] = useState("");
  //   const [selectedDate, setSelectedDate] = useState(null);
  //   const [selectedTime, setSelectedTime] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentDeleteModal, setAppointmentDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  const initialFormData = {
    clientId: "",
    phoneNumber: "",
    service: "",
    date: "",
    time: "",
    note: "",
    stylistId: "",
  };

  const keyMap = {
    1: "clientId",
    2: "phoneNumber",
    4: "date",
    5: "time",
    6: "service",
    7: "stylistId",
    9: "note",
  };

  const {
    formData,
    setFormData,
    handleDateChange,
    selectedDate,
    selectedTime,
    handleInputChange,
    handleServiceChange,
    // handleTimeChange,
    selectedService,
  } = useForm(initialFormData, keyMap);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const appointmentData = await listAppointments();
        setAppointments(appointmentData);
      } catch (error) {
        console.log("Can't fetch appointments data");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointmentData();
  }, []);

  const handleSaveAppointment = async () => {
    try {
      const date = format(selectedDate, DATE_FORMAT);
      const time = format(selectedTime, TIME_FORMAT);

      const appointmentData = {
        ...formData,
        service: selectedService,
        date,
        time,
      };

      const newAppointment = await addAppointment(appointmentData);

      // Include full client details in the new appointment object
      const fullNewAppointment = {
        ...newAppointment,
        clientId: {
          _id: formData.clientName,
          gender: formData.gender,
          phone: formData.phoneNumber,
          email: formData.email,
        },
        stylistId: {
          _id: formData.stylistId,
          employeeName: formData.stylistName,
        },
      };

      setAppointments((prevAppointments) => [
        ...prevAppointments,
        fullNewAppointment,
      ]);
      setModalOpen(false);

      const latestAppoinments = await listAppointments();
      setAppointments(latestAppoinments);
      toast.success("Appointment added successfully");
    } catch (error) {
      console.log("Error saving new appointment", error);
      toast.error("Error adding appointment");
    }
  };

  const handleClientNameChange = debounce(async (value) => {
    if (typeof value !== "string") {
      console.error("Client name should be a string:", value);
      return;
    }

    setFormData((prevFormData) => ({ ...prevFormData, clientName: value }));

    try {
      const clientDetails = await fetchClientDetailsByName(value);

      if (clientDetails && clientDetails._id) {
        console.log("Match found, updating form data");
        setFormData((prevFormData) => ({
          ...prevFormData,
          clientId: clientDetails._id,
          phoneNumber: clientDetails.phone || "",
          email: clientDetails.email || "",
          gender: clientDetails.gender || "",
        }));
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
    console.log("Clearing client details");
    setFormData((prevFormData) => ({
      ...prevFormData,
      phoneNumber: "",
      email: "",
      gender: "",
    }));
  };

  const updateAppointmentData = async (appointmentID, updatedData) => {
    try {
      await updateAppointment(appointmentID, updatedData);
      const latestAppointments = await listAppointments();
      setAppointments(latestAppointments);
      setModalOpen(false);
      toast.success("Appointment data updated successfully");
    } catch (error) {
      toast.error("Error updating appointment data");
      console.log("Error updating appointment data", error);
    }
  };

  const handleDeleteAppointment = async () => {
    if (appointmentToDelete) {
      try {
        await deleteAppointment(appointmentToDelete);
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment._id !== appointmentToDelete
          )
        );
        setAppointmentDeleteModal(false);
        toast.success("Appointment deleted successfully");
      } catch (error) {
        console.log("Error deleting appointment", error);
        toast.error("Error deleting appointment");
      }
    }
  };

  return {
    appointments,
    setAppointments,
    modalOpen,
    setModalOpen,
    selectedService,
    // setSelectedService,
    selectedDate,
    selectedTime,
    isEditMode,
    setIsEditMode,
    selectedClientId,
    setSelectedClientId,
    selectedAppointment,
    setSelectedAppointment,
    appointmentDeleteModal,
    setAppointmentDeleteModal,
    appointmentToDelete,
    setAppointmentToDelete,
    loading,
    setLoading,
    formData,
    setFormData,
    handleSaveAppointment,
    updateAppointmentData,
    handleDeleteAppointment,
    handleDateChange,
    handleInputChange,
    handleServiceChange,
    handleClientNameChange,
    // handleTimeChange,
  };
};

export default useAppointmentManagement;
