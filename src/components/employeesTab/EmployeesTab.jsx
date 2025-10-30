"use client";
import React, { useEffect, useState } from "react";
import {
  addEmployeeModalData,
  employeeRequiredFields,
  employeeSearchFields,
  employeeTabData,
} from "../../utils/data";
import {
  addEmployee,
  deleteEmployee,
  fetchRolesForDropdown,
  listEmployees,
  updateEmployee,
} from "../../service/api";
import toast from "react-hot-toast";
import TabsHeader from "../tabsHeader/TabsHeader";
import { MODAL_TITLES, TABHEADER } from "../../constants";
import { incrementNotificationCount } from "../../redux/slices/notificationSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSearch } from "../../hooks/useSearch";
import useForm from "../../hooks/useForm";
import useModulePermissions from "../../hooks/useModulePermissions";
import dynamic from "next/dynamic";
import Loading from "../../app/loading";
import { validateEmployeeInput } from "../../validators/employee";

const ListViewComponent = dynamic(
  () => import("../appointmentsTab/listViewComponent/ListViewComponent"),
  { ssr: false, loading: () => <Loading /> }
);

const Gridview = dynamic(() => import("../gridView/GridView"), { ssr: false });

const ModalComponent = dynamic(
  () => import("../modalComponent/ModalComponent"),
  { ssr: false }
);

const EmployeesTab = () => {
  const [employees, setEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [employeeDeleteModal, setEmployeeDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [tabView, setTabView] = useState("List");
  const [empRoles, setEmpRoles] = useState([]);

  const [addEmployeeLoading, setAddEmployeeLoading] = useState(false);
  const [employeeImage, setEmployeeImage] = useState("");

  const [loading, setLoading] = useState(true);

  const initialValues = {
    employeeName: "",
    employeeEmail: "",
    employeeRole: "",
    employeePhone: "",
    employeePhoto: "",
    employeeJoiningData: "",
    employeeSalary: "",
    employeeAddress: "",
    employeeGender: "",
  };

  const { canEdit } = useModulePermissions();

  const keyMap = {
    1: "employeeName",
    2: "employeeEmail",
    3: "employeeRole",
    4: "employeePhone",
    5: "employeePhoto",
    6: "employeeJoiningData",
    7: "employeeSalary",
    8: "employeeAddress",
    9: "employeeGender",
  };

  const {
    formData,
    setFormData,
    fileName,
    handleFileChange,
    handleDateChange,
    resetForm,
  } = useForm(initialValues, keyMap);

  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const { filteredData, setSearchTerm } = useSearch(
    employees,
    employeeSearchFields
  );

  const handleModal = () => {
    setModalOpen(true);
  };

  const fetchEmployees = async (page = 1) => {
    try {
      setLoading(true);
      const result = await listEmployees({
        page,
        limit: paginationInfo.limit,
      });

      if (result.success) {
        setEmployees(result.data);
        setPaginationInfo(result.pagination);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.log("Can't fetch employee data");
      toast.error("Error fetching employees data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(1);
  }, []);

  const handleAddEmployee = async () => {
    if (formData) {
      try {
        setAddEmployeeLoading(true);

        const { error } = validateEmployeeInput(formData);

        // if (error) {
        //   toast.error(error); // Display the first error
        //   return;
        // }

        if (error) {
          // Get the first error message and display it
          const firstErrorMessage = error.details[0].message;
          toast.error(firstErrorMessage);
          setAddEmployeeLoading(false);
          return;
        }

        // Convert formData to FormData object if it includes a file
        const formDataToSubmit = new FormData();
        for (const key in formData) {
          formDataToSubmit.append(key, formData[key]);
        }

        // if (!formData.employeePhoto) {
        //   toast.error("Please include an employee photo.");
        //   return;
        // }

        // Add the employee via API
        const newEmployee = await addEmployee(formDataToSubmit);

        // Update local state
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);

        // Refresh employee list with pagination
        const updatedEmpData = await listEmployees({
          page: paginationInfo.page,
          limit: paginationInfo.limit,
        });

        if (updatedEmpData.success) {
          setEmployees(updatedEmpData.data);
          setPaginationInfo(updatedEmpData.pagination);
        }

        // Close modal and notify success
        setModalOpen(false);
        resetForm();
        toast.success("Employee added successfully");
        dispatch(incrementNotificationCount());
      } catch (error) {
        console.error("Error adding new employee:", error);
        toast.error(
          error.response?.data?.message || "Error adding new employee"
        );
      } finally {
        // Reset form and loading state
        setAddEmployeeLoading(false);
      }
    } else {
      toast.error("Please fill all fields, including employee photo.");
    }
  };

  const handleEmployeeDeleteModal = async (id) => {
    setEmployeeToDelete(id);
    setEmployeeDeleteModal(true);
  };

  const handleDataDeleteFromModal = async () => {
    if (employeeToDelete) {
      try {
        await deleteEmployee(employeeToDelete);
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== employeeToDelete)
        );
        setEmployeeDeleteModal(false);
        setEmployeeToDelete(null);
        toast.success("Employee deleted successfully");
      } catch (error) {
        console.log("Error deleting employee", error);
        toast.error("Error deleting employee");
      }
    }
  };

  const handleEmployeeEdit = (employeeId) => {
    const employee = employees.find((emp) => emp._id === employeeId);
    console.log("editing employee", employee);
    setEmployeeImage(employee.employeePhoto);
    if (employee) {
      setFormData({ ...employee, employeeRole: employee.role._id });
    }
    setSelectedEmployee(employee);
    setIsEditMode(true);
    setModalOpen(true);
  };

  const handleInputChange = (id, value) => {
    const key = keyMap[id] || id;
    console.log(`Updating ${key} with value: ${value}`);
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setIsEditMode(false);
    setSelectedEmployee(null);
    setFormData({});
    resetForm();
    setEmployeeImage(null);
  };

  const handleRowSelect = (employee) => {
    setSelectedEmployee(employee._id);
    router.push(`/employees/${employee._id}`);
  };

  const handleUpdateEmployees = async (employeeId, updatedData) => {
    try {
      setAddEmployeeLoading(true);

      const { error } = validateEmployeeInput(updatedData);

      if (error) {
        const firstErrorMessage = error.details[0].message;
        toast.error(firstErrorMessage);
        setAddEmployeeLoading(false);
        return;
      }

      const formDataToSubmit = new FormData();
      for (const key in updatedData) {
        formDataToSubmit.append(key, updatedData[key]);
      }

      if (!updatedData.employeePhoto) {
        toast.error("Please include an employee photo.");
        return;
      }

      const updatedEmpData = await updateEmployee(employeeId, formDataToSubmit);
      console.log("Updated employee data:", formDataToSubmit);

      if (updatedEmpData) {
        const listFullEmployees = await listEmployees();
        setEmployees(listFullEmployees?.data);
        setModalOpen(false);
        toast.success("Employee data updated successfully");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error updating employee data:", error);
      toast.error("Error updating employee data");
    } finally {
      setAddEmployeeLoading(false);
    }
  };

  const handleEmployeeStatusToggle = async (employeeId) => {
    try {
      const currentEmployee = employees.find((emp) => emp._id === employeeId);
      if (!currentEmployee) throw new Error("Employee not found");

      const newStatus =
        currentEmployee.employeeStatus === "Active" ? "In-active" : "Active";

      await updateEmployee(employeeId, { employeeStatus: newStatus });

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === employeeId
            ? { ...employee, employeeStatus: newStatus }
            : employee
        )
      );

      toast.success(`Employee status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating employee status:", error);
      toast.error("Error updating employee status");
    }
  };

  const fetchEmpRoles = async () => {
    try {
      const response = await fetchRolesForDropdown();
      setEmpRoles(response);
    } catch (error) {
      console.log("Error fetching employee roles", error);
    }
  };

  useEffect(() => {
    fetchEmpRoles();
  }, []);

  return (
    <div className="table">
      {modalOpen && (
        <ModalComponent
          isOpen={modalOpen}
          onClose={handleModalClose}
          title={
            isEditMode
              ? MODAL_TITLES.EDIT_EMPLOYEE
              : MODAL_TITLES.ADD_NEW_EMPLOYEE
          }
          modalData={addEmployeeModalData}
          formData={formData}
          currentImageUrl={employeeImage}
          selectedDate={formData.employeeJoiningData}
          isLoading={addEmployeeLoading}
          roles={empRoles}
          handleDateChange={handleDateChange}
          handleFileUpload={(e) => handleFileChange(e, "employeePhoto")}
          fileName={fileName}
          handleInputChange={handleInputChange}
          onSave={() =>
            isEditMode
              ? handleUpdateEmployees(selectedEmployee._id, formData)
              : handleAddEmployee()
          }
          canEdit={canEdit}
        />
      )}
      {employeeDeleteModal && (
        <ModalComponent
          isOpen={employeeDeleteModal}
          onClose={() => setEmployeeDeleteModal(false)}
          deleteModal={true}
          title="Confirm delete"
          handleDeleteData={handleDataDeleteFromModal}
          canEdit={canEdit}
        />
      )}
      <>
        <TabsHeader
          heading={TABHEADER.ALL_EMPLOYEES}
          listAndCalenderView={false}
          tabView={tabView}
          setTabView={setTabView}
          handleAddNewButton={handleModal}
          setSearchTerm={setSearchTerm}
          canEdit={canEdit}
        />
        {tabView === "List" ? (
          <ListViewComponent
            idColoring={true}
            headerData={employeeTabData}
            bodyData={filteredData}
            onDelete={handleEmployeeDeleteModal}
            isInacitveButton={true}
            onEdit={handleEmployeeEdit}
            onInactive={handleEmployeeStatusToggle}
            onRowSelect={handleRowSelect}
            isLoading={loading}
            isRowClickable={true}
            fetchData={fetchEmployees}
            paginationInfo={paginationInfo}
            canEdit={canEdit}
          />
        ) : (
          <Gridview
            gridData={filteredData}
            onDelete={handleEmployeeDeleteModal}
            onEdit={handleEmployeeEdit}
            isLoading={loading}
            canEdit={canEdit}
            onGridSelection={handleRowSelect}
          />
        )}
      </>
    </div>
  );
};

export default EmployeesTab;
