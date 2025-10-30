"use client";
import toast from "react-hot-toast";
import TabsHeader from "../../../components/tabsHeader/TabsHeader";
import {
  DELETE_MODAL_TITLE,
  MODAL_TITLES,
  TABHEADER,
  TOAST_MESSAGES,
} from "../../../constants";
import React, { useEffect, useState } from "react";
import {
  addNewUserModalData,
  createUserRequiredFields,
  userManagementHeaderData,
  userSearchFields,
} from "../../../utils/data";
import {
  createUser,
  fetchRolesForDropdown,
  getUsersByCompany,
  trashUser,
} from "../../../service/api";
import useForm from "../../../hooks/useForm";
import useModulePermissions from "../../../hooks/useModulePermissions";
import dynamic from "next/dynamic";
import { validateInput } from "../../../validators/validateInputs";
import { useSearch } from "../../../hooks/useSearch";

const ListViewComponent = dynamic(
  () => import("../../appointmentsTab/listViewComponent/ListViewComponent"),
  { ssr: false }
);

const ModalComponent = dynamic(
  () => import("../../modalComponent/ModalComponent"),
  { ssr: false }
);

const UserManagement = () => {
  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);

  const initialModalData = {
    name: "",
    email: "",
    role: "",
  };

  const keyMap = {
    1: "name",
    2: "email",
    3: "role",
  };

  const handleAddNewButton = () => {
    setShowAddNewModal(true);
  };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isAddNewUserLoading, setIsAddNewUserLoading] = useState(false);

  const { formData, setFormData, handleInputChange, resetForm } = useForm(
    initialModalData,
    keyMap
  );

  const { filteredData, setSearchTerm } = useSearch(users, userSearchFields);

  const { canEdit } = useModulePermissions();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsersByCompany();
      setUsers(response);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching users", error);
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      if (showAddNewModal) {
        try {
          const fetchedRoles = await fetchRolesForDropdown();
          setRoles(fetchedRoles);
        } catch (error) {
          console.log("Error fetching roles:", error);
          toast.error("Error fetching roles");
        }
      }
    };

    fetchRoles();
  }, [showAddNewModal]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData((prevData) => ({ ...prevData, role }));
  };

  const createNewUser = async () => {
    const { error } = validateInput(formData, createUserRequiredFields);

    if (error) {
      toast.error(error);
      setIsAddNewUserLoading(false);
      return;
    }

    try {
      setIsAddNewUserLoading(true);
      const response = await createUser(formData);

      if (response?.success) {
        toast.success(TOAST_MESSAGES.USER_CREATED_SUCCESSFULLY);
        await fetchUsers();
        setShowAddNewModal(false);
        resetForm();
      }
    } catch (error) {
      console.log(TOAST_MESSAGES.ERROR_CREATING_USER, error);
      // toast.error(errorMessage);
    } finally {
      setIsAddNewUserLoading(false);
    }
  };

  const handleUserDeleteModal = async (user) => {
    setSelectedUserToDelete(user);
    setShowDeleteModal(true);
  };

  const deleteUser = async () => {
    if (selectedUserToDelete) {
      setIsDeleteLoading(true);
      try {
        const response = await trashUser(selectedUserToDelete);
        if (response.success) {
          toast.success(TOAST_MESSAGES.USER_DELETED_SUCCESSFULLY);
          await fetchUsers();
          setShowDeleteModal(false);
        }
        setIsDeleteLoading(false);
      } catch (error) {
        toast.error(TOAST_MESSAGES.ERROR_DELETING_USER);
      }
    }
  };

  const handleAddNewModalClose = () => {
    resetForm();
    setShowAddNewModal(false);
  };

  return (
    <div className="tabContainer">
      {showAddNewModal && (
        <ModalComponent
          isOpen={showAddNewModal}
          onClose={handleAddNewModalClose}
          title={MODAL_TITLES.ADD_USER}
          modalData={addNewUserModalData}
          formData={formData}
          options={roles}
          optionLabel="roleName"
          optionValue="_id"
          onSelectRole={handleRoleSelect}
          handleInputChange={handleInputChange}
          onSave={createNewUser}
          canEdit={canEdit}
          isLoading={isAddNewUserLoading}
        />
      )}
      {showDeleteModal && (
        <ModalComponent
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title={DELETE_MODAL_TITLE.DELETE_USER}
          deleteModal={true}
          handleDeleteData={deleteUser}
          canEdit={canEdit}
          isLoading={isDeleteLoading}
        />
      )}
      <TabsHeader
        handleAddNewButton={handleAddNewButton}
        canEdit={canEdit}
        setSearchTerm={setSearchTerm}
      />
      <ListViewComponent
        headerData={userManagementHeaderData}
        bodyData={filteredData}
        isLoading={loading}
        idColoring={true}
        isRowClickable={true}
        onDelete={handleUserDeleteModal}
        canEdit={canEdit}
        hideEdit={true}
      />
    </div>
  );
};

export default UserManagement;
