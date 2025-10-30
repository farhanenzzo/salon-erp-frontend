"use client";
import React, { useEffect, useState } from "react";
import {
  categoryMastersTabHeaderData,
  categorySearchFields,
  editCategoryModalData,
} from "../../../../../utils/data";
import {
  deleteCategory,
  getCategories,
  toggleCategoryStatus,
  updateCategory,
} from "../../../../../service/api";
import toast from "react-hot-toast";
import {
  DELETE_MODAL_TITLE,
  MODAL_TITLES,
  TOAST_MESSAGES,
} from "../../../../../constants";
import useModulePermissions from "../../../../../hooks/useModulePermissions";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { resetCategoryRefetch } from "../../../../../redux/slices/mastersSlice";
import useForm from "../../../../../hooks/useForm";
import { validateCategoryInput } from "../../../../../validators/category";
import { useSearch } from "../../../../../hooks/useSearch";
import Search from "../../../../../components/searchComponent/Search";

const ListViewComponent = dynamic(
  () =>
    import(
      "../../../../../components/appointmentsTab/listViewComponent/ListViewComponent"
    ),
  { ssr: false }
);

const ModalComponent = dynamic(
  () => import("../../../../../components/modalComponent/ModalComponent"),
  { ssr: false }
);

const CategoryTab = () => {
  const [categories, setCategories] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [showCategoryEditModal, setShowCategoryEditModal] = useState(false);
  const [isCategoryUpdationLoading, setIsCategoryUpdationLoading] =
    useState(false);
  const [isCategoryDeleteLoading, setIsCategoryDeleteLoading] = useState(false);

  const [categoryCurrentImage, setCategoryCurrentImage] = useState("");

  const dispatch = useDispatch();

  const shouldRefetchCategory = useSelector(
    (state) => state.masters.shouldRefetchCategory
  );

  const { filteredData, setSearchTerm } = useSearch(
    categories,
    categorySearchFields
  );

  const initialFormData = {
    name: "",
    image: "",
  };

  const keyMap = {
    1: "name",
    2: "image",
  };

  const {
    formData,
    handleInputChange,
    handleFileChange,
    fileName,
    setFormData,
    resetForm,
  } = useForm(initialFormData, keyMap);

  const listCategories = async () => {
    setIsCategoryLoading(true);
    try {
      const response = await getCategories();

      if (response.success) {
        setCategories(response.data);
        setIsCategoryLoading(false);
      }
      // Reset the refetch flag after successful fetch
      if (shouldRefetchCategory) {
        dispatch(resetCategoryRefetch());
      }
    } catch (error) {
      console.log("Error fetching categories: ");
      toast.error(TOAST_MESSAGES.ERROR_FETCHING_CATEGORIES);
    }
  };

  useEffect(() => {
    listCategories();
  }, [shouldRefetchCategory]);

  const { canEdit } = useModulePermissions();

  const handleDeleteModal = (id) => {
    setSelectedCategory(id);
    setShowDeleteModal(true);
  };

  const softDeleteCategory = async () => {
    setIsCategoryDeleteLoading(true);
    if (selectedCategory) {
      try {
        const response = await deleteCategory(selectedCategory);
        if (response.success) {
          toast.success(TOAST_MESSAGES.SUCCESS_DELETING_CATEGORY);
          setIsCategoryDeleteLoading(false);
        }
        await listCategories();
      } catch (error) {
        console.log("Error deleting category: ", error);
        toast.error(TOAST_MESSAGES.ERROR_DELETING_CATEGORY);
      } finally {
        setShowDeleteModal(false);
        setIsCategoryDeleteLoading(false);
      }
    } else {
      toast.error(TOAST_MESSAGES.SELECT_CATEGORY);
    }
  };

  const handleToggleStatus = async (selectedCategory) => {
    if (selectedCategory) {
      try {
        const response = await toggleCategoryStatus(selectedCategory);
        if (response.success) {
          toast.success(TOAST_MESSAGES.SUCCESS_TOGGLE_CATEGORY_STATUS);
          // Optionally refresh to ensure consistency
          await listCategories();
        }
      } catch (error) {
        console.log("Error toggling category status: ", error);
        toast.error(TOAST_MESSAGES.ERROR_TOGGLE_CATEGORY_STATUS);
      }
    } else {
      toast.error(TOAST_MESSAGES.SELECT_CATEGORY);
    }
  };

  const handleEditClick = (category) => {
    const categoryData = categories.find((c) => c._id === category);
    if (categoryData) {
      setFormData({
        name: categoryData.name,
        image: categoryData.image,
      });
    }
    setCategoryCurrentImage(categoryData.image);
    setSelectedCategory(category);
    setShowCategoryEditModal(true);
  };

  const handleUpdateCategory = async () => {
    setIsCategoryUpdationLoading(true);
    console.log("category data form", formData);
    const { error } = validateCategoryInput(formData);

    if (error) {
      const firstErrorMessage = error.details[0].message;
      toast.error(firstErrorMessage);
      setIsCategoryUpdationLoading(false);

      return;
    }

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }
    try {
      const response = await updateCategory(selectedCategory, formDataToSubmit);
      if (response.success) {
        setIsCategoryUpdationLoading(false);
        toast.success(TOAST_MESSAGES.UPDATED_CATEGORY);
        await listCategories();
        setShowCategoryEditModal(false);
        resetForm();
      }
    } catch (error) {
      console.log(TOAST_MESSAGES.ERROR_UPDATING_CATEGORY, error);
      toast.error(TOAST_MESSAGES.ERROR_UPDATING_CATEGORY);
    } finally {
      setIsCategoryUpdationLoading(false);
    }
    // } else {
    //   toast.error(TOAST_MESSAGES.CATEGORY_DATA_CANNOT_NE_NULL);
    //   setIsCategoryUpdationLoading(false);
    // }
  };

  const handleEditCategoryClose = () => {
    setShowCategoryEditModal(false);
    setFormData(initialFormData);
    resetForm();
  };

  return (
    <div>
      {showDeleteModal && (
        <ModalComponent
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          deleteModal={true}
          handleDeleteData={softDeleteCategory}
          title={DELETE_MODAL_TITLE.CONFIRM_DELETE}
          canEdit={canEdit}
          isLoading={isCategoryDeleteLoading}
        />
      )}
      {showCategoryEditModal && (
        <ModalComponent
          isOpen={showCategoryEditModal}
          modalData={editCategoryModalData}
          formData={formData}
          title={MODAL_TITLES.EDIT_CATEGORY}
          handleInputChange={handleInputChange}
          onClose={handleEditCategoryClose}
          onSave={handleUpdateCategory}
          isLoading={isCategoryUpdationLoading}
          currentImageUrl={categoryCurrentImage}
          fileName={fileName}
          handleFileUpload={(event) => handleFileChange(event, "image")}
        />
      )}
      <div className="mb-5 flex justify-self-end">
        <Search onSearchChange={setSearchTerm} />
      </div>
      <ListViewComponent
        headerData={categoryMastersTabHeaderData}
        bodyData={filteredData}
        canEdit={canEdit}
        onDelete={handleDeleteModal}
        isInacitveButton={true}
        onInactive={handleToggleStatus}
        isLoading={isCategoryLoading}
        onEdit={handleEditClick}
      />
    </div>
  );
};

export default CategoryTab;
