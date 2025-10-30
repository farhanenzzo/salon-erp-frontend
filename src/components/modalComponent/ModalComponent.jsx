import React, { useState, useEffect } from "react";
import Image from "next/image";
import ModalInput from "../modalInputComponent/ModalInput";
import CommonButton from "../commonButton/CommonButton";
import { actionDeleteButtons, footerButtons } from "../../utils/data";
import PopupCloseBTN from "../../assets/svg/popupCloseBTN.svg";
import styles from "./ModalComponent.module.css";
import { BUTTON_LABELS, IMG_ALT } from "../../constants";
import { Dialog } from "primereact/dialog";

const ModalComponent = ({
  isOpen,
  onClose,
  title,
  modalData,
  onSave,
  formData,
  handleInputChange,
  handleDateChange,
  handleTimeChange,
  handleServiceChange,
  selectedService,
  handleClientIdChange,
  handleBrandChange,
  deleteModal,
  handleDeleteData,
  brands,
  categories,
  onSelectBrand,
  suppliers,
  stylist,
  services,
  confirmModal,
  errors,
  confirmText,
  confirmButtonClick,
  handleFileUpload,
  fileName,
  optionLabel,
  isLoading,
  optionValue,
  currentImageUrl,
  roles,
  options,
  handleStylistChange,
  onSelectRole,
  canEdit,
  minDate,
  isEditMode = false,
  isFieldDisabled = () => false,
}) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (handleDeleteData) {
      handleDeleteData();
    }
  };

  console.log("form data", formData);

  return (
    <div className={styles.modalMain}>
      <Dialog
        visible={visible}
        onHide={handleClose}
        header={
          <div className={styles.modalHeader}>
            <h2>{title}</h2>
            <button className="cursor-pointer" onClick={handleClose}>
              <Image src={PopupCloseBTN} alt={IMG_ALT.CLOSE} />
            </button>
          </div>
        }
        style={{ width: "35vw", borderRadius: "20px" }} // Adjust width as needed
        modal
        closable={false} // Disable default close button
      >
        <div className={styles.modalBody}>
          {deleteModal ? (
            <div>Are you sure you want to delete?</div>
          ) : confirmModal ? (
            <div>Are you sure you want to {confirmText}</div>
          ) : (
            modalData.map((data, index) => (
              <div key={index} className={styles.inputContainer}>
                <ModalInput
                  label={data.label}
                  id={data.id}
                  key={data.id}
                  startIcon={data.icon}
                  inputType={data.type}
                  type={data.type}
                  options={
                    options
                      ? options
                      : data.options ||
                        (data.type === "dropdown" || data.type === "multiSelect"
                          ? getOptions(data.label, {
                              services,
                              stylist,
                              brands,
                              suppliers,
                              roles,
                              categories,
                            })
                          : [])
                  }
                  value={formData[data.key]}
                  onChange={(e) =>
                    handleInputChange
                      ? handleInputChange(data.id, e.target.value)
                      : onSelectRole(e.target.value)
                  }
                  handleDateChange={(e) => handleDateChange(data.key, e)}
                  handleTimeChange={handleTimeChange}
                  handleStylistChange={handleStylistChange}
                  handleServiceChange={handleServiceChange}
                  handleClientIdChange={handleClientIdChange}
                  placeholder={data.placeholder}
                  handleBrandChange={handleBrandChange}
                  handleFileUpload={handleFileUpload}
                  currentImageUrl={currentImageUrl}
                  fileName={fileName}
                  optionLabel={optionLabel ? optionLabel : null}
                  optionValue={optionValue ? optionValue : null}
                  error={errors}
                  minDate={minDate}
                  disabled={isFieldDisabled(data.key, isEditMode)} // Disable specific fields in edit mode

                  // onSelectRole={onSelectRole}
                />
              </div>
            ))
          )}
        </div>
        <div className={styles.modalFooter}>
          {deleteModal || confirmModal
            ? actionDeleteButtons.map((data) => (
                <div key={data.id}>
                  <CommonButton
                    label={data.label}
                    onClick={
                      data.label === BUTTON_LABELS.CANCEL
                        ? handleClose
                        : confirmModal
                          ? confirmButtonClick
                          : handleConfirm
                    }
                    bgColor={data.bgColor}
                    borderClr={data.borderClr}
                    borderWidth={data.borderWidth}
                    textColor={data.textColor}
                    paddingBlock={8}
                    canEdit={canEdit}
                    loading={data.label !== "Cancel" && isLoading}
                  />
                </div>
              ))
            : footerButtons.map((data) => (
                <div key={data.id}>
                  <CommonButton
                    label={data.label}
                    onClick={
                      data.label === BUTTON_LABELS.CANCEL ? handleClose : onSave
                    }
                    bgColor={data.bgColor}
                    borderClr={data.borderClr}
                    borderWidth={data.borderWidth}
                    textColor={data.textColor}
                    paddingBlock={8}
                    canEdit={canEdit}
                    loading={data.label !== "Cancel" && isLoading}
                  />
                </div>
              ))}
        </div>
      </Dialog>
    </div>
  );
};

const getOptions = (
  label,
  { services, stylist, brands, suppliers, roles, categories }
) => {
  switch (label) {
    case "Service":
      return services.map((d) => ({ label: d.name, value: d.id }));
    case "Employee":
      return stylist.map((d) => ({ label: d.name, value: d.id }));
    case "Category":
      return categories.map((d) => ({ label: d.name, value: d._id }));
    case "Brand":
    case "Brands":
    case "Product Brand":
      return brands.map((d) => ({ label: d.name, value: d._id }));
    case "Suppliers":
      return suppliers.map((d) => ({ label: d.name, value: d._id }));
    case "Role":
    case "Roles":
      return roles.map((d) => ({ label: d.roleName, value: d._id }));
    default:
      return [];
  }
};

export default ModalComponent;
