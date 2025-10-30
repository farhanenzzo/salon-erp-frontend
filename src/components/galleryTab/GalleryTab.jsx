"use client";
import React, { useEffect, useState } from "react";
import TabsHeader from "../tabsHeader/TabsHeader";
import { deleteService, getServices } from "../../service/api";
import styles from "./GalleryTab.module.css";
import Image from "next/image";
import ActionButton from "../../assets/svg/actionsIcon.svg";
import useActionMenu from "../../hooks/useActionMenu";
import toast from "react-hot-toast";
import ActionMenu from "../actionMenu/ActionMenu";
import ModalComponent from "../modalComponent/ModalComponent";
import { Skeleton } from "primereact/skeleton";
import AddImageModal from "../addImageModal/AddImageModal";
import { DELETE_MODAL_TITLE, TABHEADER } from "../../constants";
import { useSearch } from "../../hooks/useSearch";
import { gallerySearchFields } from "../../utils/data";

const GalleryTab = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showDetailScreen, setShowDetailScreen] = useState(false);

  const { filteredData, setSearchTerm } = useSearch(
    services,
    gallerySearchFields
  );

  useEffect(() => {
    const servicesData = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
      } catch (error) {
        console.log("Error fetching services", error);
      } finally {
        setIsLoading(false);
      }
    };
    servicesData();
  }, []);

  const { openMenuId, handleActionMenu, menuRef } = useActionMenu();

  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setSelectedService(id);
  };

  const removeService = async () => {
    try {
      await deleteService(selectedService);
      toast.success("Deleted service");
      const updatedService = await getServices();
      setServices(updatedService);
    } catch (error) {
      toast.error("Error deleting service");
    } finally {
      setDeleteModal(false);
    }
  };

  const handleItemClick = (event, service) => {
    // Check if the click originated from the action button
    if (!event.target.closest(`.${styles.actionButton}`)) {
      setShowDetailScreen(true);
      setSelectedService(service);
    }
  };

  return (
    <div className="table">
      {deleteModal && (
        <ModalComponent
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          deleteModal={true}
          title={DELETE_MODAL_TITLE.DELETE_SERVICE}
          handleDeleteData={removeService}
        />
      )}

      {showDetailScreen && selectedService && (
        <AddImageModal
          isOpen={showDetailScreen}
          onClose={() => setShowDetailScreen(false)}
          service={selectedService}
        />
      )}
      <TabsHeader heading={TABHEADER.GALLERY} setSearchTerm={setSearchTerm} />
      <div className={styles.galleryItems}>
        {Array.isArray(filteredData) &&
          filteredData.map((data) => (
            <React.Fragment key={data._id}>
              {isLoading ? (
                <Skeleton size="13rem" className="rounded-md" />
              ) : (
                <div
                  className={styles.servicesContainer}
                  onClick={(e) => handleItemClick(e, data)}
                >
                  <span className={styles.categoryContainer}>
                    {data.serviceName}
                  </span>
                  <Image
                    src={data.serviceImage}
                    alt={data.serviceName}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div
                    className={styles.actionButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActionMenu(data._id, e);
                    }}
                  >
                    <Image
                      src={ActionButton}
                      width={10}
                      height={10}
                      alt="Action Button"
                    />
                  </div>
                  {openMenuId === data._id && (
                    <div className={styles.actionMenu} ref={menuRef}>
                      <ActionMenu
                        onDelete={() => handleDeleteModal(data._id)}
                        onClose={() => handleActionMenu(null)}
                      />
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default GalleryTab;
