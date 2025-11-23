import React from "react";
import styles from "./GridView.module.css";
import Image from "next/image";
import TimerIcon from "../../assets/svg/gridTimer.svg";
import ActionIcon from "../../assets/svg/actionsIcon.svg";
import useActionMenu from "../../hooks/useActionMenu";
import ActionMenu from "../actionMenu/ActionMenu";
import GridViewLoading from "./GridViewLoading";
import FullImageLoading from "./FullImageLoading";
import { format } from "date-fns";
import { DATE_FORMAT, NEW_USER } from "../../constants";

const formatDate = (date) => {
  if (!date) return "";
  return format(new Date(date), DATE_FORMAT);
};

const GridView = ({
  gridData,
  onDelete,
  onEdit,
  isLoading,
  gridLayout,
  canEdit,
  onGridSelection,
}) => {
  console.log("Grid Data", gridData);
  const { openMenuId, handleActionMenu, menuRef } = useActionMenu();

  if (!gridData) return null;

  const generateClass = (status) =>
    status === "In Stock"
      ? "Positive_text"
      : status === "Low Stock"
        ? "Negative_text"
        : "";

  const gridDataLength = Array.isArray(gridData)
    ? gridData.length
    : Object.keys(gridData).length;

  return (
    <div className={styles.gridContainer}>
      {isLoading && gridLayout === "fullImage" ? (
        <FullImageLoading length={gridDataLength} />
      ) : isLoading ? (
        <GridViewLoading length={gridDataLength} />
      ) : (
        gridData.map((data) => (
          <React.Fragment key={data?._id || data?.id}>
            {gridLayout === "fullImage" ? (
              <div
                className={styles.employeeGridFullIMG}
                onClick={() => {
                  if (openMenuId !== data._id && onGridSelection) {
                    onGridSelection(data);
                  }
                }}
              >
                {/* Action Icon */}
                {canEdit && (
                  <div
                    className={styles.actionsIcon}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      handleActionMenu(
                        openMenuId === data._id ? null : data._id
                      );
                    }}
                  >
                    <Image src={ActionIcon} alt="Action Button" />
                  </div>
                )}

                {/* Action Menu */}
                {openMenuId === data._id && canEdit && (
                  <div className={styles.actionMenuContainer} ref={menuRef}>
                    <ActionMenu
                      onDelete={() => onDelete(data._id)}
                      onEdit={() => onEdit(data._id)}
                      onClose={() => handleActionMenu(null)}
                    />
                  </div>
                )}

                <div className={styles.empRoleContainer}>
                  {data?.role?.roleName ||
                    data?.clientId ||
                    data?.stockCategory?.name}
                </div>

                <div
                  className={
                    gridLayout === "fullImage"
                      ? styles.fullImageContainer
                      : styles.stockImageContainer
                  }
                >
                  <Image
                    src={data.stockImage}
                    alt="Profile photo"
                    layout={gridLayout === "fullImage" ? "intrinsic" : "fill"}
                    width={gridLayout === "fullImage" ? 260 : undefined}
                    height={gridLayout === "fullImage" ? 230 : undefined}
                    objectFit="cover"
                  />
                </div>

                <div className={styles.stockDtails}>
                  <div
                    className={styles.detailsContainer}
                    style={{ marginTop: "0.3rem", marginBottom: "0.5rem" }}
                  >
                    <h4>{data.stockName}</h4>
                    <div className={styles.sameLine}>
                      <p className="text-black">Quantity:</p>
                      <p>{data.stockQuantity}</p>
                    </div>
                  </div>

                  <div className={styles.detailsContainer}>
                    <div className={styles.sameLine}>
                      <p className="text-black">Expiry Date:</p>
                      <p>{formatDate(data.stockEXPDate)}</p>
                    </div>
                    <span className={generateClass(data.stockStatus)}>
                      {data?.stockStatus}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={styles.employeeGrid}
                onClick={() => {
                  if (openMenuId !== data._id && onGridSelection) {
                    onGridSelection(data);
                  }
                }}
              >
                {/* Action Icon */}
                {canEdit && (
                  <div
                    className={styles.actionsIcon}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      handleActionMenu(
                        openMenuId === data._id ? null : data._id
                      );
                    }}
                  >
                    <Image src={ActionIcon} alt="Action Button" />
                  </div>
                )}

                {/* Action Menu */}
                {openMenuId === data._id && canEdit && (
                  <div className={styles.actionMenuContainer} ref={menuRef}>
                    <ActionMenu
                      onDelete={() => onDelete(data._id)}
                      onEdit={() => onEdit(data._id)}
                      onClose={() => handleActionMenu(null)}
                    />
                  </div>
                )}

                <div className={styles.empProfileContainer}>
                  <Image
                    src={data?.employeePhoto || data?.photo}
                    alt="Profile photo"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                <div className="flex items-center">
                  <h2>{data?.name || data?.employeeName}</h2>
                  <span
                    className={
                      data.employeeStatus === "Active"
                        ? "activeDOT"
                        : "inactiveDOT"
                    }
                  ></span>
                </div>

                <div className={styles.empRoleContainer}>
                  {data?.role?.roleName || data?.clientId || data?.stockId}
                </div>

                <div>
                  <p className="text-center mb-2">
                    {data?.email ? data?.email : null}
                  </p>
                  <h3 className={styles.empID}>{data?.employeeId}</h3>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <Image src={TimerIcon} alt="Timer Icon" />
                  <p style={{ color: "#757575", marginBlock: "0.3rem" }}>
                    {data.lastVisitedDate
                      ? `Last Visit: ${format(
                          new Date(data.lastVisitedDate),
                          "yyyy-MM-dd"
                        )}`
                      : data.employeeJoiningData
                        ? `Joined on: ${data.employeeJoiningData}`
                        : NEW_USER}
                  </p>
                </div>
              </div>
            )}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default GridView;
