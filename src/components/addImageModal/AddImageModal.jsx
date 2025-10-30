import Image from "next/image";
import React from "react";
import PopupCloseBTN from "../../assets/svg/popupCloseBTN.svg";
import styles from "./AddImageModal.module.css";

const AddImageModal = ({ isOpen, onClose, service }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className={`${styles.modalContain} modalContainer`}>
        <button onClick={onClose} className={styles.closeButton}>
          <Image src={PopupCloseBTN} alt="Popup close" />
        </button>
        <div className={styles.imageContainer}>
          <Image
            src={service.image}
            alt="detail IMG"
            layout="fill"
            // objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AddImageModal;
