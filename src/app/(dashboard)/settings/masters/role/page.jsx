"use client";
import React, { useEffect, useState } from "react";
import {
  editRoleModalData,
  roleMastersTabHeaderData,
  roleSearchFields,
} from "../../../../../utils/data";
import { fetchRoles, trashRole, updateRole } from "../../../../../service/api";
import toast from "react-hot-toast";
import {
  DELETE_MODAL_TITLE,
  MODAL_TITLES,
  TOAST_MESSAGES,
} from "../../../../../constants";
import useModulePermissions from "../../../../../hooks/useModulePermissions";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  resetRoleRefetch,
  triggerRoleRefetch,
} from "../../../../../redux/slices/mastersSlice";
import ModalComponent from "../../../../../components/modalComponent/ModalComponent";
import useForm from "../../../../../hooks/useForm";
import Search from "../../../../../components/searchComponent/Search";
import { useSearch } from "../../../../../hooks/useSearch";

const ListViewComponent = dynamic(
  () =>
    import(
      "../../../../../components/appointmentsTab/listViewComponent/ListViewComponent"
    ),
  { ssr: false }
);

const RoleTab = () => {
  const [roleData, setRoleData] = useState([]);
  const [isRoleLoading, setIsRoleLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isRoleUpdateLoading, setIsRoleUpdateLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteRoleLoading, setIsDeleteRoleLoading] = useState(false);

  const initialFormData = {
    roleName: "",
  };

  const keyMap = {
    1: "roleName",
  };

  const { filteredData, setSearchTerm } = useSearch(roleData, roleSearchFields);

  const { formData, setFormData, handleInputChange } = useForm(
    initialFormData,
    keyMap
  );

  const dispatch = useDispatch();

  const shouldRefetchRole = useSelector(
    (state) => state.masters.shouldRefetchRole
  );

  const getRoles = async () => {
    setIsRoleLoading(true);
    try {
      const response = await fetchRoles();
      if (response.success) {
        setRoleData(response.data);
        if (shouldRefetchRole) {
          dispatch(resetRoleRefetch());
        }
      }
    } catch (error) {
      console.log("Error fetching roles", error);
      toast.error(TOAST_MESSAGES.ERROR_FETCHING_ROLES);
    } finally {
      setIsRoleLoading(false);
      // Only reset the refetch flag after the data has been fetched and set
      if (shouldRefetchRole) {
        dispatch(resetRoleRefetch());
      }
    }
  };

  useEffect(() => {
    getRoles();
  }, [shouldRefetchRole]);

  const { canEdit } = useModulePermissions();

  const handleRoleSelect = (role) => {
    setSelectedRoleId(role._id);
  };

  const handleEditClick = (roleId) => {
    const role = roleData.find((role) => role._id === roleId);
    if (role) {
      setFormData({
        roleName: role.roleName,
      });
      setSelectedRoleId(role?._id);
      setIsEditModalVisible(true);
    }
  };

  const handleUpdateRole = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setIsRoleUpdateLoading(true);
    try {
      const response = await updateRole(selectedRoleId, formData.roleName);
      if (response.success) {
        toast.success(TOAST_MESSAGES.ROLE_UPDATED);
        setIsEditModalVisible(false);
        dispatch(triggerRoleRefetch()); // Trigger refetch
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error(TOAST_MESSAGES.ERROR_UPDATING_ROLE);
    } finally {
      setIsRoleUpdateLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedRoleId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteRole = async () => {
    setIsDeleteRoleLoading(true);

    try {
      const response = await trashRole(selectedRoleId);
      if (response.success) {
        toast.success(TOAST_MESSAGES.ROLE_DELETED);
        setIsDeleteModalOpen(false);
        dispatch(triggerRoleRefetch());
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error(TOAST_MESSAGES.ERROR_DELETING_ROLE);
    } finally {
      setIsDeleteRoleLoading(false);
    }
  };

  return (
    <div>
      {isEditModalVisible && (
        <ModalComponent
          isOpen={isEditModalVisible}
          formData={formData}
          modalData={editRoleModalData}
          title={MODAL_TITLES.EDIT_ROLE}
          onClose={() => setIsEditModalVisible(false)}
          handleInputChange={handleInputChange}
          onSave={handleUpdateRole}
          isLoading={isRoleUpdateLoading}
        />
      )}
      {isDeleteModalOpen && (
        <ModalComponent
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title={DELETE_MODAL_TITLE.CONFIRM_DELETE}
          deleteModal={true}
          handleDeleteData={handleDeleteRole}
          isLoading={isDeleteRoleLoading}
        />
      )}
      <div className="mb-5 flex justify-self-end">
        <Search onSearchChange={setSearchTerm} />
      </div>
      <ListViewComponent
        headerData={roleMastersTabHeaderData}
        bodyData={filteredData}
        canEdit={canEdit}
        isLoading={isRoleLoading}
        onEdit={handleEditClick}
        onRowSelect={handleRoleSelect}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default RoleTab;
