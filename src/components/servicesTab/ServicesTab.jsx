"use client";
import React, { useEffect, useState } from "react";
import {
  addNewServiceModalData,
  serviceDetails,
  serviceRequiredFields,
  servicesSearchFields,
  servicesTableHeader,
} from "../../utils/data";
import {
  addServices,
  deleteService,
  fetchRolesForDropdown,
  getCategories,
  getServices,
  listCategoryDropdown,
  updateService,
} from "../../service/api";
import useForm from "../../hooks/useForm";
import toast from "react-hot-toast";
import {
  DELETE_MODAL_TITLE,
  IMAGE_UPLOAD_FIELDS,
  MODAL_TITLES,
  TABHEADER,
} from "../../constants";
import { useSearch } from "../../hooks/useSearch";
import TabsHeader from "../tabsHeader/TabsHeader";
import useModulePermissions from "../../hooks/useModulePermissions";
import dynamic from "next/dynamic";
import { validateInput } from "../../validators/validateInputs";

const DetailModal = dynamic(() => import("../detailModal/DetailModal"), {
  ssr: false,
});
const ModalComponent = dynamic(
  () => import("../modalComponent/ModalComponent"),
  { ssr: false }
);
const ListViewComponent = dynamic(
  () => import("../appointmentsTab/listViewComponent/ListViewComponent"),
  { ssr: false }
);

const ImageCard = dynamic(() => import("../ImageCard/ImageCard"), {
  ssr: false,
});

const ServicesTab = () => {
  const [services, setServices] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(false);
  const [selectedService, setSelectedService] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [categoryLoading, setCategoryLoading] = useState(true);
  const [empRoles, setEmpRoles] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isAddNewServiceLoading, setIsAddNewServiceLoading] = useState(false);
  const [isServiceDeleteLoading, setIsServiceDeleteLoading] = useState(false);
  const [selectedServiceIMG, setSelectedServiceIMG] = useState("");

  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const { canEdit } = useModulePermissions();

  const { filteredData, setSearchTerm } = useSearch(
    services,
    servicesSearchFields
  );

  const initialFormData = {
    serviceName: "",
    category: "",
    duration: "",
    price: "",
    image: "",
    roles: "",
    description: "",
  };

  const keyMap = {
    1: "serviceName",
    2: "category",
    3: "duration",
    4: "price",
    5: "image",
    6: "roles",
    7: "description",
  };

  const fetchCategories = async () => {
    setCategoryLoading(true);
    try {
      const response = await getCategories("active");
      setCategories(response.data);
      setCategoryLoading(false);
    } catch (error) {
      console.log("Error fetching categories: ", error);
      toast.error("Error fetching categories");
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchServices = async (page = 1) => {
    try {
      setLoading(true);
      const result = await getServices({
        page,
        limit: paginationInfo.limit,
        categoryId: selectedCategory,
      });

      if (result.success) {
        setServices(result.data);
        setPaginationInfo(result.pagination);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.log("Can't fetch service data");
      toast.error("Error fetching service data");
    } finally {
      setLoading(false);
    }
  };

  console.log("services", services);

  useEffect(() => {
    fetchServices(1);
  }, [selectedCategory, categories]);

  const handleModal = () => {
    setModalOpen(true);
  };

  const {
    formData,
    handleInputChange,
    setFormData,
    fileName,
    handleFileChange,
    resetForm,
  } = useForm(initialFormData, keyMap);

  const createService = async () => {
    if (formData) {
      setIsAddNewServiceLoading(true);

      try {
        const { error } = validateInput(formData, serviceRequiredFields);

        if (error) {
          toast.error(error);
          return;
        }
        console.log("formData", formData);
        const formDataToSubmit = new FormData();
        for (const key in formData) {
          formDataToSubmit.append(key, formData[key]);
        }

        console.log("formDataToSubmit", formDataToSubmit);
        await addServices(formDataToSubmit);
        await fetchServices();
        setModalOpen(false);
        resetForm();
        toast.success("Service added successfully!");
      } catch (error) {
        console.log("Error adding service", error);
        toast.error("Error adding service!");
      } finally {
        setIsAddNewServiceLoading(false);
      }
    }
  };

  const handleServiceDeleteModal = (id) => {
    setServiceToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteService = async () => {
    if (serviceToDelete) {
      setIsServiceDeleteLoading(true);
      try {
        console.log("Deleting service with ID: ", serviceToDelete);
        await deleteService(serviceToDelete);
        const updatedServices = await getServices();
        setServices(updatedServices.data);
        setDeleteModalOpen(false);
        toast.success("Service deleted successfully!");
      } catch (error) {
        console.log("Error deleting service: ");
        toast.error("Error deleting service!");
      } finally {
        setIsServiceDeleteLoading(false);
      }
    } else {
      console.log("No service to delete");
      toast.error("Error deleting service!");
    }
  };

  const handleStatusToggle = async (serviceId) => {
    try {
      const currentServiceStatus = services.find(
        (service) => service._id === serviceId
      );
      if (!currentServiceStatus) throw new Error("Service not found");

      const newStatus =
        currentServiceStatus.serviceStatus === "Active"
          ? "In-active"
          : "Active";

      await updateService(serviceId, { serviceStatus: newStatus });

      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === serviceId
            ? { ...service, serviceStatus: newStatus }
            : service
        )
      );

      toast.success(`Service status updated to ${newStatus}`);
    } catch (error) {
      console.log("Error updating service: ");
      toast.error("Error updating service!");
    }
  };

  const handleServiceEdit = (serviceId) => {
    const updatedService = services.find(
      (service) => service._id === serviceId
    );

    setSelectedServiceIMG(updatedService.serviceImage);

    console.log("updated service", updatedService);
    if (updatedService) {
      // Map all necessary fields from the employee object to formData
      setFormData({
        serviceName: updatedService.serviceName || "",
        category: updatedService.category || "",
        duration: updatedService.duration || "",
        price: updatedService.price || "",
        image: updatedService.serviceImage || "",
        roles: updatedService.roles.map((role) => role._id) || [],
        description: updatedService.description || "",
      });
    }
    setSelectedService(updatedService);
    setIsEditMode(true);
    setModalOpen(true);
  };

  const handleServiceUpdate = async (servieId, updatedData) => {
    setIsAddNewServiceLoading(true);
    const { error } = validateInput(formData, serviceRequiredFields);

    if (error) {
      toast.error(error);
      return;
    }

    const formDataToSubmit = new FormData();
    for (const key in updatedData) {
      formDataToSubmit.append(key, updatedData[key]);
    }

    try {
      const updatedServiceData = await updateService(
        servieId,
        formDataToSubmit
      );
      if (updatedServiceData) {
        await fetchServices();
        setModalOpen(false);
        setIsAddNewServiceLoading(false);
        resetForm();
        toast.success("Service updated successfully!");
      }
    } catch (error) {
      console.log("Error updating service: ");
      toast.error("Error updating service!");
    } finally {
      setIsAddNewServiceLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setIsEditMode(false);
    setSelectedService(null);
    setFormData({});
  };

  const handleRowSelect = (service) => {
    setSelectedService(service);
    setShowDetailModal(true);
  };

  const handleDetailModalClose = () => {
    setShowDetailModal(false);
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
    if (modalOpen) {
      fetchEmpRoles();
    }
  }, [modalOpen]);

  const listCategory = async () => {
    try {
      const response = await listCategoryDropdown();
      if (response.status === "success") {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.log("Error fetching categories", error);
      toast.error("Error fetching categories");
    }
  };
  useEffect(() => {
    listCategory();
  }, []);

  return (
    <div className="tabs_container">
      {modalOpen && (
        <ModalComponent
          isOpen={modalOpen}
          onClose={handleModalClose}
          // handleFileChange={(event) =>
          //   handleFileChange(event, IMAGE_UPLOAD_FIELDS.SERVICE_IMAGE)
          // }
          handleFileUpload={(event) =>
            handleFileChange(event, IMAGE_UPLOAD_FIELDS.SERVICE_IMAGE)
          }
          title={
            isEditMode
              ? MODAL_TITLES.EDIT_SERVICE
              : MODAL_TITLES.ADD_NEW_SERVICE
          }
          formData={formData}
          modalData={addNewServiceModalData}
          fileName={fileName}
          handleInputChange={handleInputChange}
          categories={categoryData}
          onSave={
            isEditMode
              ? () => handleServiceUpdate(selectedService._id, formData)
              : () => createService(formData)
          }
          roles={empRoles}
          currentImageUrl={isEditMode && selectedServiceIMG}
          isLoading={isAddNewServiceLoading}
          canEdit={canEdit}
        />
      )}
      {showDetailModal && (
        <DetailModal
          isOpen={showDetailModal}
          onClose={handleDetailModalClose}
          detailData={selectedService}
          detailFields={serviceDetails}
        />
      )}
      {deleteModalOpen && (
        <ModalComponent
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title={DELETE_MODAL_TITLE.DELETE_SERVICE}
          handleDeleteData={handleDeleteService}
          deleteModal={true}
          canEdit={canEdit}
        />
      )}

      <div className="table">
        <TabsHeader
          heading={TABHEADER.CATEGORIES}
          handleAddNewButton={handleModal}
          setSearchTerm={setSearchTerm}
          canEdit={canEdit}
        />
        <div>
          <ImageCard
            data={categoryData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            loading={categoryLoading}
          />
        </div>
        <h2 className="mb-4">Services</h2>
        <ListViewComponent
          headerData={servicesTableHeader}
          bodyData={filteredData}
          isLoading={loading}
          onDelete={handleServiceDeleteModal}
          onInactive={handleStatusToggle}
          isInacitveButton={true}
          onEdit={handleServiceEdit}
          idColoring={true}
          isRowClickable={true}
          onRowSelect={handleRowSelect}
          fetchData={fetchServices}
          paginationInfo={paginationInfo}
          // onEdit={handleServiceEdit}
          canEdit={canEdit}
        />
      </div>
    </div>
  );
};
export default ServicesTab;
