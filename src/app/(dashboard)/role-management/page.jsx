"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";

// Import the sidebar modules
import { addNewRoleModalData, tabsData } from "../../../utils/data";
import TabsHeader from "../../../components/tabsHeader/TabsHeader";
import { MODAL_TITLES, TABHEADER } from "../../../constants";
import toast from "react-hot-toast";
import { createRole, fetchRolesForDropdown } from "../../../service/api";
import ModalComponent from "../../../components/modalComponent/ModalComponent";
import useForm from "../../../hooks/useForm";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);

  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const initialData = {
    roleName: "",
  };

  const keyMap = {
    1: "roleName",
  };

  const { formData, handleInputChange, resetForm } = useForm(
    initialData,
    keyMap
  );

  const handleAddNewRole = () => {
    setShowAddNewModal(true);
  };

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const roles = await fetchRolesForDropdown();
        setRoles(roles);
      } catch (error) {
        console.log("Error fetching roles:");
        toast.error("Error fetching roles");
      }
    };
    fetchUserRoles();
  }, []);

  const addNewRole = async () => {
    try {
      const newRole = await createRole(formData);
      setRoles(newRole);
      toast.success("Role added successfully");
    } catch (error) {
      console.log("Error creating role:");
      toast.error("Error creating role");
    } finally {
      setShowAddNewModal(false);
      resetForm();
    }
  };

  return (
    <div className="tabContainer">
      {showAddNewModal && (
        <ModalComponent
          isOpen={showAddNewModal}
          onClose={() => setShowAddNewModal(false)}
          title={MODAL_TITLES.ADD_NEW_ROLE}
          formData={formData}
          modalData={addNewRoleModalData}
          onSave={addNewRole}
          handleInputChange={handleInputChange}
          canEdit={true}
        />
      )}
      <TabsHeader
        heading={TABHEADER.ROLES}
        handleAddNewButton={handleAddNewRole}
      />
      <div className="mb-3">
        <label htmlFor="roleSelect" className="mr-2">
          Select Role:
        </label>
        <Dropdown
          id="roleSelect"
          value={selectedRole}
          options={roles}
          optionLabel="roleName"
          optionValue="_id"
          onChange={(e) => setSelectedRole(e.value)}
          placeholder="Select a Role"
        />
      </div>

      <DataTable
        value={tabsData}
        responsiveLayout="scroll"
        showGridlines
        stripedRows
      >
        {/* Module Name Column */}
        <Column field="tabName" header="Module" style={{ width: "50%" }} />

        {/* View Column */}
        <Column
          header="View"
          // body={(rowData) => toggleTemplate(rowData, "view")}
          style={{ textAlign: "left", width: "25%" }}
        />

        {/* Edit Column */}
        <Column
          header="Edit"
          // body={(rowData) => toggleTemplate(rowData, "edit")}
          style={{ textAlign: "left", width: "25%" }}
        />
      </DataTable>
    </div>
  );
};

export default RoleManagement;
