"use client";
import React, { useEffect, useState } from "react";
import TabsHeader from "../tabsHeader/TabsHeader";
import {
  DELETE_MODAL_TITLE,
  IMAGE_UPLOAD_FIELDS,
  MODAL_TITLES,
  TABHEADER,
} from "../../constants";
import toast from "react-hot-toast";
import {
  addOffers,
  deleteOffer,
  listOffers,
  updateOffer,
} from "../../service/api";
import styles from "./OffersTab.module.css";

import {
  addOfferFormInput,
  offerDetails,
  offersSearchFields,
} from "../../utils/data";
import useForm from "../../hooks/useForm";
import ActionButton from "../../assets/svg/actionsIcon.svg";
import Image from "next/image";
import useActionMenu from "../../hooks/useActionMenu";
import ActionMenu from "../actionMenu/ActionMenu";
import { Skeleton } from "primereact/skeleton";
import { useSearch } from "../../hooks/useSearch";
import useModulePermissions from "../../hooks/useModulePermissions";
import dynamic from "next/dynamic";
import { validateOfferInput } from "../../validators/offer";

const ModalComponent = dynamic(
  () => import("../modalComponent/ModalComponent"),
  { ssr: false }
);

const DetailModal = dynamic(() => import("../DetailModal/DetailModal"), {
  ssr: false,
});

const OffersTab = () => {
  const [offers, setOffers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [addOfferLoading, setAddOfferLoading] = useState(false);
  const [currentOfferIMG, setCurrentOfferIMG] = useState("");

  const { canEdit } = useModulePermissions();

  const initialFormData = {
    title: "",
    message: "",
    dateRange: { start: "", end: "" },
    image: "",
  };

  const keyMap = {
    1: "title",
    2: "message",
    3: "dateRange",
    4: "image",
  };

  const handleAddNewOffer = () => {
    setShowModal(true);
    resetForm();
  };

  const fetchOffers = async () => {
    try {
      const offersData = await listOffers();
      setOffers(offersData);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching offers");
      setOffers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const getBorderColor = (index) => {
    const colors = [
      "#9B0E53",
      "#FF8C2E",
      "#5609BA",
      "#1CC5E2",
      "#1CE229",
      "#D21CE2",
    ];
    return colors[index % colors.length];
  };

  const {
    formData,
    setFormData,
    handleInputChange,
    handleDateChange,
    resetForm,
    fileName,
    handleFileChange,
  } = useForm(initialFormData, keyMap);

  const addOffer = async () => {
    const { dateRange, image } = formData;
    setAddOfferLoading(true);

    const { error } = validateOfferInput(formData);

    if (error) {
      const firstErrorMessage = error.details[0].message;
      toast.error(firstErrorMessage);
      setAddOfferLoading(false);
      return;
    }

    if (!image) {
      toast.error("Image is required.");
      setAddOfferLoading(false);
      return;
    }

    // Ensure the start date is in the future
    if (new Date(dateRange[0]) < new Date()) {
      toast.error("Start date should be in the future");
      return;
    }

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      // Make the API call to add the offer
      const response = await addOffers(formDataToSubmit);

      // Check if the response indicates success (you may need to check specific response fields)
      if (response && response.success) {
        await fetchOffers();
        setShowModal(false);
        resetForm();
        toast.success("Offer added successfully");
      } else {
        // If the response doesn't indicate success, show an error toast
        toast.error(
          "Failed to add offer: " + (response?.message || "Unknown error")
        );
      }
    } catch (error) {
      console.log("Error adding offer", error);
      toast.error("Error adding offer");
    } finally {
      setAddOfferLoading(false);
    }
  };

  const handleDeleteModal = (id) => {
    setSelectedOffer(id);
    setDeleteModal(true);
  };

  const { filteredData, setSearchTerm } = useSearch(offers, offersSearchFields);

  console.log("selectedOffer", selectedOffer);
  const deleteOfferById = async () => {
    try {
      await deleteOffer(selectedOffer);
      const updatedOffer = await listOffers(); // Fetch updated offers after deletion
      setOffers(updatedOffer); // Update offers list
      toast.success("Offer deleted successfully");
    } catch (error) {
      toast.error("Error deleting offer");
    } finally {
      setDeleteModal(false);
    }
  };

  const { openMenuId, handleActionMenu, menuRef } = useActionMenu();

  const handleOfferDetail = (offer) => {
    setSelectedOffer(offer);
    setShowDetailModal(true);
  };

  const handleEditOffer = (offer) => {
    setSelectedOffer(offer);

    console.log("selected offer", offer);

    const currentOfferImage = offer.image ? offer.image : "null";
    setCurrentOfferIMG(currentOfferImage);
    // Map the dateRange object to an array for the date picker
    const updatedFormData = {
      ...offer,
      dateRange: [
        new Date(offer.dateRange.start),
        new Date(offer.dateRange.end),
      ],
    };

    setFormData(updatedFormData);
    setShowModal(true);
    setShowEditModal(true);
  };

  const handleModalClose = () => {
    setShowDetailModal(false);
    setShowEditModal(false);
    resetForm();
    setShowModal(false);
  };

  const updateOfferById = async () => {
    const { error } = validateOfferInput(formData);

    if (error) {
      // Get the first error message and display it
      const firstErrorMessage = error.details[0].message;
      toast.error(firstErrorMessage);
      setAddOfferLoading(false);
      return;
    }

    setAddOfferLoading(true);

    const formDataToSubmit = new FormData();
    // Append form data fields to the FormData
    for (const key in formData) {
      // If the key is 'image' and the value is a file, append it as a file
      if (key === "image" && formData[key] instanceof File) {
        formDataToSubmit.append("image", formData[key]);
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    }

    formDataToSubmit.append("dateRange[start]", formData.dateRange[0]);
    formDataToSubmit.append("dateRange[end]", formData.dateRange[1]);

    try {
      // Send the updated data to the updateOffer function
      const response = await updateOffer(selectedOffer._id, formDataToSubmit);
      if (response.success) {
        await fetchOffers();
        toast.success("Offer updated successfully");
        setShowEditModal(false);
        resetForm();
        setAddOfferLoading(false);
      }
    } catch (error) {
      toast.error("Error updating offer");
      console.error("Error updating offer:", error);
    } finally {
      setShowEditModal(false);
      setShowModal(false);
    }
  };

  return (
    <div className="tabContainer">
      <TabsHeader
        heading={TABHEADER.All_OFFERS}
        handleAddNewButton={handleAddNewOffer}
        setSearchTerm={setSearchTerm}
        canEdit={canEdit}
      />
      {showModal && (
        <ModalComponent
          title={
            showEditModal ? MODAL_TITLES.EDIT_OFFER : MODAL_TITLES.ADD_OFFER
          }
          isOpen={showModal}
          onClose={handleModalClose}
          onSave={showEditModal ? updateOfferById : addOffer}
          modalData={addOfferFormInput}
          fileName={fileName}
          formData={formData}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          isLoading={addOfferLoading}
          currentImageUrl={showEditModal ? currentOfferIMG : ""}
          handleFileUpload={(event) =>
            handleFileChange(event, IMAGE_UPLOAD_FIELDS.OFFER_IMAGE)
          }
          canEdit={canEdit}
        />
      )}
      {deleteModal && (
        <ModalComponent
          title={DELETE_MODAL_TITLE.DELETE_OFFER}
          deleteModal={true}
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          handleDeleteData={deleteOfferById}
          canEdit={canEdit}
        />
      )}
      {showDetailModal && (
        <DetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          detailData={selectedOffer}
          detailFields={offerDetails}
          offerDetail={true}
        />
      )}
      {isLoading ? (
        // Show skeleton loader while data is loading
        <Skeleton width="50rem" height="10rem" className="mb-2" />
      ) : filteredData && filteredData.length > 0 ? (
        filteredData.map((data, index) => {
          return (
            <div
              key={data._id}
              className={`${styles.offerContainer} mt-3`}
              style={{ borderLeft: `4px solid ${getBorderColor(index)}` }}
              onClick={(e) => {
                if (
                  !e.target.closest(`.${styles.actionButton}`) &&
                  !e.target.closest(".actionMenuContainer")
                ) {
                  handleOfferDetail(data);
                }
              }}
            >
              <div
                className={styles.actionButton}
                onClick={(e) => handleActionMenu(data._id, e)}
              >
                <Image
                  src={ActionButton}
                  alt="action button"
                  width={15}
                  height={15}
                />
              </div>
              {openMenuId === data._id && canEdit && (
                <div className={styles.actionMenuContainer} ref={menuRef}>
                  <ActionMenu
                    onDelete={() => handleDeleteModal(data._id)}
                    onClose={() => handleActionMenu(null)}
                    onEdit={() => handleEditOffer(data)}
                  />
                </div>
              )}
              <div className={styles.offerHeader}>
                <h5>{data.title}</h5>
                <div className={styles.dateContainer}>
                  <p>{data?.dateRange?.start}</p>
                  <p>-</p>
                  <p>{data?.dateRange?.end}</p>
                </div>
              </div>
              <div className={styles.offerBody}>
                <h4>{data.message}</h4>
              </div>
            </div>
          );
        })
      ) : (
        // Show "No offers found" when no offers exist
        <div className="noOffers">
          <p>No offers found</p>
        </div>
      )}
    </div>
  );
};

export default OffersTab;
