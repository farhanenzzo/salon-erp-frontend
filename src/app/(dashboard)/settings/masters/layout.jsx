"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  addNewCategory,
  addNewRole,
  createCategoryRequiredFields,
  createRoleRequiredFields,
  mastersTabs,
} from "../../../../utils/data";
import { usePathname, useSearchParams } from "next/navigation";
import TabsHeader from "../../../../components/tabsHeader/TabsHeader";
import {
  MODAL_TITLES,
  ROUTES,
  TABHEADER,
  TOAST_MESSAGES,
} from "../../../../constants";
import styles from "./masters.module.css";
import useForm from "../../../../hooks/useForm";
import { addCategory, createRole } from "../../../../service/api";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import {
  triggerCategoryRefetch,
  triggerRoleRefetch,
} from "../../../../redux/slices/mastersSlice";
import { useDispatch } from "react-redux";
import { validateInput } from "../../../../validators/validateInputs";

const ModalComponent = dynamic(
  () => import("../../../../components/modalComponent/ModalComponent"),
  { ssr: false }
);

const TabLayout = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const moduleId = searchParams.get("moduleId");

  const activeTab = pathname || ROUTES.CATEGORY;

  const [showAddNewModal, setShowAddNewModal] = useState(false);
  // const [activeTab, setActiveTab] = useState(ROUTES.CATEGORY);
  const [isAddCategoryLoading, setIsAddCategoryLoading] = useState(false);
  const [isAddRoleLoading, setIsAddRoleLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    formData: categoryFormData,
    resetForm: resetCategoryForm,
    handleInputChange: handleCategoryInputChange,
    fileName: categoryFileName,
    handleFileChange: handleCategoryFileChange,
  } = useForm(
    {
      name: "",
      image: "",
    },
    {
      1: "name",
      2: "image",
    }
  );

  const {
    formData: roleFormData,
    resetForm: resetRoleForm,
    handleInputChange: handleRoleInputChange,
  } = useForm(
    {
      roleName: "",
    },
    {
      1: "roleName",
    }
  );

  // Get current form data and handlers based on active tab
  const getCurrentFormData = () => {
    return pathname === ROUTES.CATEGORY ? categoryFormData : roleFormData;
  };

  const getCurrentHandleInputChange = () => {
    return pathname === ROUTES.CATEGORY
      ? handleCategoryInputChange
      : handleRoleInputChange;
  };

  const handleAddNewButton = () => {
    setShowAddNewModal(true);
  };

  const handleAddNewCategory = async () => {
    setIsAddCategoryLoading(true);
    if (categoryFormData) {
      const { error } = validateInput(
        categoryFormData,
        createCategoryRequiredFields
      );

      if (error) {
        toast.error(error);
        setIsAddCategoryLoading(false);
        return;
      }
      try {
        const formDataToSubmit = new FormData();
        for (const key in categoryFormData) {
          formDataToSubmit.append(key, categoryFormData[key]);
        }
        const response = await addCategory(formDataToSubmit);
        if (response.success) {
          toast.success("Category added successfully");
          dispatch(triggerCategoryRefetch());
          setShowAddNewModal(false);
          resetCategoryForm();
        }
      } catch (error) {
        console.log("Error adding category: ", error);
        toast.error("Error adding category");
      } finally {
        setIsAddCategoryLoading(false);
      }
    } else {
      toast.error(TOAST_MESSAGES.CATEGORY_DATA_CANNOT_NE_NULL);
    }
  };

  const handleAddNewRole = async () => {
    setIsAddRoleLoading(true);
    if (roleFormData) {
      const { error } = validateInput(roleFormData, createRoleRequiredFields);

      if (error) {
        toast.error(error);
        setIsAddRoleLoading(false);
        return;
      }
      try {
        const response = await createRole(roleFormData);
        // Check if response exists and has data property
        if (response.success) {
          dispatch(triggerRoleRefetch()); // Trigger refetch
          toast.success(TOAST_MESSAGES.ROLE_ADDED_SUCCESSFULLY);
          setShowAddNewModal(false); // Close modal first
          resetRoleForm(); // Then reset form
        }
      } catch (error) {
        console.log("Error adding role:", error);
        const errorMessage =
          error?.response?.data?.message ||
          TOAST_MESSAGES.ERROR_ADDING_NEW_ROLE;
        toast.error(errorMessage);
      } finally {
        setIsAddRoleLoading(false);
      }
    } else {
      toast.error(TOAST_MESSAGES.ADD_ROLE_NAME);
    }
  };

  const conditionalModalTitles =
    pathname === ROUTES.CATEGORY
      ? MODAL_TITLES.ADD_NEW_CATEGORY
      : MODAL_TITLES.ADD_NEW_ROLE;

  const handleConditionalSaveFunction = () => {
    if (pathname === ROUTES.CATEGORY) {
      handleAddNewCategory();
    } else {
      handleAddNewRole();
    }
  };

  const handleAddNewModal = () => {
    if (pathname === ROUTES.CATEGORY) {
      resetCategoryForm();
    } else {
      resetRoleForm();
    }
    setShowAddNewModal(false);
  };

  return (
    <div className="tabContainer">
      {showAddNewModal && (
        <ModalComponent
          isOpen={showAddNewModal}
          title={conditionalModalTitles}
          onClose={handleAddNewModal}
          modalData={pathname === ROUTES.CATEGORY ? addNewCategory : addNewRole}
          handleInputChange={getCurrentHandleInputChange()}
          formData={getCurrentFormData()}
          onSave={handleConditionalSaveFunction}
          canEdit={true}
          fileName={pathname === ROUTES.CATEGORY ? categoryFileName : null}
          handleFileUpload={
            pathname === ROUTES.CATEGORY
              ? (e) => handleCategoryFileChange(e, "image")
              : null
          }
          isLoading={
            pathname === ROUTES.CATEGORY
              ? isAddCategoryLoading
              : isAddRoleLoading
          }
        />
      )}

      <TabsHeader handleAddNewButton={handleAddNewButton} canEdit={true} />
      <div className={styles.masterTabsContainer}>
        {mastersTabs.map((tab) => (
          <Link
            key={tab.id}
            href={{
              pathname: tab.route,
              query: moduleId ? { moduleId } : {},
            }}
            className={`text-customParaColor ${
              pathname === tab.route ? styles.activeTab : ""
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>

      <div className="flex-1 py-6">{children}</div>
    </div>
  );
};

export default TabLayout;
