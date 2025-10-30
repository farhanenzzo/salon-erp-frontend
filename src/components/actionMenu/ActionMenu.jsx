import { React, useEffect } from "react";
import styles from "./ActionMenu.module.css";
import { actionMenuData } from "../../utils/data";
import Image from "next/image";
import { ACTION_MENU_ALT } from "../../constants";

const ActionMenu = ({
  onDelete,
  onClose,
  extraActions = [],
  onEdit,
  hideEdit,
  hideDelete,
  onInactive,
  onCancel,
  onDownload,
  userRole,
}) => {
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.actionMenuContainer}`)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (userRole?.roleName === "superAdmin") return null;

  const combinedActions = [...actionMenuData, ...extraActions];

  const filteredActions = combinedActions.filter((action) => {
    if (!onDownload && action.action === "download") return false;
    if (hideEdit && action.action === "edit") return false;
    if (hideDelete && action.action === "delete") return false;
    return true;
  });

  const handleOptionClick = (action, e) => {
    e.stopPropagation(); // Prevent event bubbling

    switch (action) {
      case "delete":
        onDelete?.();
        break;
      case "in-active":
        onInactive?.();
        break;
      case "cancel":
        onCancel?.();
        break;
      case "edit":
        onEdit?.();
        break;
      case "download":
        onDownload?.();
        break;
    }

    onClose();
  };

  return (
    <div className={styles.actionMenuContainer}>
      {filteredActions.map((option) => (
        <div
          key={option.id}
          className={styles.actionMenu}
          onClick={(e) => handleOptionClick(option.action, e)}
          role="button"
          tabIndex={0}
        >
          <Image
            src={option.icon}
            alt={`${option.label} action`}
            className={styles.icon}
            width={20}
            height={20}
          />
          <p
            style={{
              color: option.action === "delete" ? "#dc2626" : undefined,
            }}
          >
            {option.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ActionMenu;
