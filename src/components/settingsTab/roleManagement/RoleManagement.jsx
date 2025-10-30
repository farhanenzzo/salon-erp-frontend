"use client";
import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { toast } from "react-hot-toast";
import {
  createRole,
  fetchRolePermissions,
  fetchRolesForDropdown,
  updateRolePermissions,
} from "../../../service/api";
import {
  BUTTON_LABELS,
  MODAL_TITLES,
  ROLE_KEYMAP,
  TABHEADER,
  TOAST_MESSAGES,
} from "../../../constants";
import TabsHeader from "../../../components/tabsHeader/TabsHeader";
import useForm from "../../../hooks/useForm";
import { addNewRoleModalData } from "../../../utils/data";
import CommonButton from "../../commonButton/CommonButton";
import { Skeleton } from "primereact/skeleton";
import useModulePermissions from "../../../hooks/useModulePermissions";
import dynamic from "next/dynamic";

const ModalComponent = dynamic(
  () => import("../../modalComponent/ModalComponent"),
  {
    ssr: false,
  }
);

const RoleManagement = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [modulesLoading, setModulesLoading] = useState(false);

  console.log("module permissions", rolePermissions);

  // New state to track if permissions have been modified
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Track original permissions to compare with current state
  const [originalPermissions, setOriginalPermissions] = useState([]);
  const [addPermissionLoading, setAddPermissionLoading] = useState(false);

  const [roles, setRoles] = useState(selectedRole);

  const { canEdit: canEditModule } = useModulePermissions();

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const fetchedRoles = await fetchRolesForDropdown();
        setRoles(fetchedRoles);
        if (fetchedRoles.length > 0) {
          setSelectedRole(fetchedRoles[0]._id);
        }
      } catch (error) {
        console.log("Error fetching roles:", error);
        toast.error("Error fetching roles");
      }
    };
    fetchUserRoles();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      getModulePermissions();
    }
  }, [selectedRole]);

  const initialData = useMemo(() => ({ roleName: "" }), []);
  const keyMap = useMemo(() => ({ 1: ROLE_KEYMAP.ROLE_NAME }), []);

  const { formData, handleInputChange, resetForm } = useForm(
    initialData,
    keyMap
  );

  const getModulePermissions = async () => {
    try {
      setModulesLoading(true);
      const response = await fetchRolePermissions(selectedRole);

      //   dispatch(setUserPermissions(response));

      setRolePermissions(response);
      // Store original permissions for comparison
      setOriginalPermissions(response);
      // Reset unsaved changes flag
      setHasUnsavedChanges(false);
    } catch (error) {
      console.log("Error fetching modules of given role", error);
      toast.error(TOAST_MESSAGES.ERROR_FETCHING_MODULES_OF_ROLE);
    } finally {
      setModulesLoading(false);
    }
  };

  const handleAddNewRole = () => {
    setShowAddNewModal(true);
  };

  const addNewRole = async () => {
    try {
      await createRole(formData);
      const udpdatedRole = await fetchRolesForDropdown();
      console.log("updated role", udpdatedRole);
      setRoles(udpdatedRole);
      toast.success("New role added");
    } catch (error) {
      console.log("Error creating role:");
      toast.error("Error creating role");
    } finally {
      setShowAddNewModal(false);
      resetForm();
    }
  };

  const handlePermissionToggle = async (
    moduleId,
    permissionType,
    currentValue
  ) => {
    try {
      const permissionsToUpdate = {
        permissions: [
          {
            moduleId,
            [permissionType]: !currentValue,
          },
        ],
      };

      // Update local state
      const updatedPermissions = rolePermissions.map((permission) => {
        if (permission.moduleId === moduleId) {
          const updatedPermission = {
            ...permission,
            [permissionType]: !currentValue,
          };
          // Ensure view is true if edit is true
          if (permissionType === "canEdit" && !currentValue) {
            updatedPermission.canView = true;
          }
          return updatedPermission;
        }
        return permission;
      });

      setRolePermissions(updatedPermissions);

      // Check if changes exist compared to original permissions
      const hasChanges = updatedPermissions.some(
        (perm, index) =>
          perm.canView !== originalPermissions[index].canView ||
          perm.canEdit !== originalPermissions[index].canEdit
      );

      setHasUnsavedChanges(hasChanges);
    } catch (error) {
      toast.error("Failed to update permission");
      console.error("Permission update error:", error);
    }
  };

  const handleSavePermissions = async () => {
    try {
      setAddPermissionLoading(true);
      // Prepare permissions to update
      const permissionsToUpdate = {
        permissions: rolePermissions.map((permission) => ({
          moduleId: permission.moduleId,
          canView: permission.canView,
          canEdit: permission.canEdit,
        })),
      };

      // Save all permissions for the selected role
      await updateRolePermissions(selectedRole, permissionsToUpdate);

      // Update original permissions after successful save
      setOriginalPermissions(rolePermissions);

      // Reset unsaved changes flag
      setHasUnsavedChanges(false);

      toast.success("Permission updated successfully");
    } catch (error) {
      toast.error("Failed to save permissions");
      console.error("Permission save error:", error);
    } finally {
      setAddPermissionLoading(false);
    }
  };

  const filteredPermissions = useMemo(() => {
    return rolePermissions.filter(
      (permission) => permission.moduleName !== "Settings"
    );
  }, [rolePermissions]);

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
      {/* <TabsHeader
        handleAddNewButton={handleAddNewRole}
        canEdit={canEditModule}
      /> */}
      <div className="mb-3 flex justify-between">
        <div className="flex items-center items-center gap-2 w-1/3">
          <label htmlFor="roleSelect" className="mr-2 w-max">
            Select Role:
          </label>
          <Dropdown
            id="roleSelect"
            value={selectedRole}
            options={roles}
            optionLabel="roleName"
            optionValue="_id"
            onChange={(e) => setSelectedRole(e.value)}
            placeholder="Select a role"
            className="dropdownContainer"
          />
        </div>
        <div>
          <CommonButton
            label={BUTTON_LABELS.ADD_NEW}
            onClick={handleAddNewRole}
          />
        </div>
      </div>
      <DataTable
        value={modulesLoading ? Array.from({ length: 5 }) : filteredPermissions}
        responsiveLayout="scroll"
        showGridlines
        stripedRows
      >
        <Column
          field="moduleName"
          header="Module"
          body={(rowData) =>
            modulesLoading ? (
              <Skeleton width="80%" height="1.5rem" />
            ) : (
              rowData.moduleName
            )
          }
          style={{ width: "50%" }}
        />
        <Column
          header="View"
          body={(rowData) =>
            modulesLoading ? (
              <Skeleton width="50%" height="1.5rem" />
            ) : (
              <InputSwitch
                checked={rowData.canView}
                onChange={() =>
                  handlePermissionToggle(
                    rowData.moduleId,
                    "canView",
                    rowData.canView
                  )
                }
              />
            )
          }
          style={{ textAlign: "left", width: "25%" }}
        />

        <Column
          header="Edit"
          body={(rowData) =>
            modulesLoading ? (
              <Skeleton width="50%" height="1.5rem" />
            ) : (
              <InputSwitch
                checked={rowData.canEdit}
                onChange={() =>
                  handlePermissionToggle(
                    rowData.moduleId,
                    "canEdit",
                    rowData.canEdit
                  )
                }
              />
            )
          }
          style={{ textAlign: "left", width: "25%" }}
        />
      </DataTable>
      <div className="w-max ml-auto my-5">
        <CommonButton
          label={BUTTON_LABELS.SAVE}
          onClick={handleSavePermissions}
          loading={addPermissionLoading}
          disabled={!hasUnsavedChanges} // Disable if no changes
          canEdit={true}
        />
      </div>
    </div>
  );
};

export default RoleManagement;
