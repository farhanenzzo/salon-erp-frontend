import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { format, isValid, parseISO } from "date-fns";
import inactiveIcon from "../../../assets/svg/edit.svg";
import styles from "./ListViewComponent.module.css";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import SortIcon from "../../../assets/svg/dataTableFilterIcon.svg";
import Image from "next/image";
import Pagination from "../../pagination/Pagination";
import { DATE_FORMAT, NO_DATA_TO_DISPLAY } from "../../../constants";
import { formatDateTime } from "../../../utils/formatDateTime";
import { formatPrice } from "../../../helpers/formatPrice";
import { formatString } from "../../../utils/formatString";
import ActionIcon from "../../../assets/svg/actionsIcon.svg";

const ListViewComponent = ({
  headerData,
  bodyData,
  onDelete,
  isInacitveButton,
  cancelButton,
  onEdit,
  onInactive,
  onCancel,
  onRowSelect,
  onServiceDetail,
  idColoring,
  isLoading,
  serviceDetail,
  isRowClickable,
  selectionMode,
  fetchData,
  onRowSelectionChange,
  paginationInfo,
  canEdit,
  hideEdit,
}) => {
  const [filters, setFilters] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeModalRow, setActiveModalRow] = useState(null);

  const data = Array.isArray(bodyData) ? bodyData : bodyData ? [bodyData] : [];

  const formatDate = (date) => {
    if (typeof date === "string") {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateRegex.test(date)) return date;

      const parsedDate = parseISO(date);
      if (isValid(parsedDate)) return format(parsedDate, DATE_FORMAT);
    }

    if (date instanceof Date && !isNaN(date)) return format(date, DATE_FORMAT);

    return date;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
      case "active":
      case "paid":
      case "Completed":
      case "In Stock":
        return "positive_status";
      case "In-active":
      case "in-active":
      case "Cancelled":
      case "un-paid":
      case "Expired Stock":
        return "negative_status";
      case "Upcoming":
      case "Low Stock":
        return "neutral_status";
      case "Ongoing":
      case "Expired":
        return "live_status";
      default:
        return "neutral_status";
    }
  };

  const statusBodyTemplate = (rowData) => {
    const matchingHeader = headerData.find(
      (h) =>
        h.key === "employeeStatus" ||
        h.key === "appointmentStatus" ||
        h.key === "paymentStatus" ||
        h.key === "serviceStatus" ||
        h.key === "stockStatus" ||
        h.key === "status"
    );

    return (
      <span className={`status ${getStatusClass(rowData[matchingHeader.key])}`}>
        {rowData[matchingHeader.key]}
      </span>
    );
  };

  const handleNestedField = (rowData, field) => {
    if (field === "gender") return rowData.client?.gender ?? "";
    if (field === "phoneNumber") return rowData.client?.phone ?? "";
    if (field === "stylistName") return rowData.stylistId?.employeeName ?? "";
    if (field === "preferredStylist")
      return rowData.preferredStylist?.name ?? "";
    if (field === "createdBy") return rowData.createdBy?.name ?? "";
    if (field === "clientName")
      return (
        rowData.client?.name ??
        rowData.clientId?.name ??
        rowData.clientName ??
        ""
      );
    if (field === "client") return rowData.client?.name ?? "";
    if (field === "service")
      return (
        rowData.service?.serviceName ?? rowData.serviceId?.serviceName ?? ""
      );
    if (field === "stockBrand") return rowData.brandName ?? "";
    if (field === "stockCategory") return rowData.stockCategory?.name ?? "";

    if (field === "roleName" || field === "role")
      return formatString(rowData.roleName || rowData.role?.roleName || "");

    if (field === "suppliers" || field === "brands") {
      const names = rowData.suppliers || rowData.brands;
      return names.length > 2
        ? `${names.slice(0, 2).join(", ")}...`
        : names.join(", ");
    }

    if (field === "price" || field === "amount")
      return (
        <span style={{ fontWeight: "bold" }}>
          {formatPrice(
            rowData.service?.price || rowData.price || rowData.amount || ""
          )}
        </span>
      );

    return rowData[field] ? rowData[field] : "";
  };

  const onSelectionChange = (e) => {
    setSelectedRows(e.value);
    if (onRowSelectionChange) onRowSelectionChange(e.value);
  };

  // ACTION BUTTON → OPEN MODAL
  const actionBodyTemplate = (rowData) =>
    canEdit && (
      <div style={{ position: "relative" }}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setActiveModalRow(rowData);
          }}
          style={{ cursor: "pointer" }}
        >
          <Image src={ActionIcon} alt="Action Button" />
        </div>
      </div>
    );

  const skeletonBodyTemplate = () => (
    <Skeleton width="100%" height="1.5rem" borderRadius="8px" />
  );

  return (
    <div>
      <DataTable
        value={isLoading ? Array(10).fill({}) : data}
        paginator={false}
        rows={paginationInfo ? paginationInfo.limit : 10}
        lazy
        first={
          paginationInfo ? (paginationInfo.page - 1) * paginationInfo.limit : 0
        }
        totalRecords={paginationInfo ? paginationInfo.total : 0}
        stripedRows
        sortMode="multiple"
        selectionMode={isLoading ? null : selectionMode || "single"}
        selection={selectedRows}
        onSelectionChange={onSelectionChange}
        onRowClick={(e) =>
          isRowClickable && !isLoading && onRowSelect?.(e.data)
        }
        emptyMessage={NO_DATA_TO_DISPLAY}
      >
        {selectionMode === "checkbox" && (
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        )}

        {headerData.map((header) => (
          <Column
            key={header.id}
            field={header.key}
            sortable={!isLoading}
            header={header.title}
            headerStyle={{ color: "#757575" }}
            body={
              isLoading
                ? skeletonBodyTemplate
                : header.key === "date" || header.type === "date"
                  ? (rowData) => (
                      <div className={styles.singleLineDate}>
                        {formatDate(rowData[header.key])}
                      </div>
                    )
                  : header.key === "dateAndTime"
                    ? (rowData) => (
                        <div className={styles.singleLineDate}>
                          {formatDateTime(rowData[header.key])}
                        </div>
                      )
                    : [
                          "employeeStatus",
                          "appointmentStatus",
                          "status",
                          "serviceStatus",
                          "stockStatus",
                        ].includes(header.key)
                      ? statusBodyTemplate
                      : (rowData) => handleNestedField(rowData, header.key)
            }
            style={{
              color: idColoring && header.id === 1 ? "#9B0E53" : "#000",
              textTransform: header.title === "Email" ? null : "capitalize",
            }}
          />
        ))}

        <Column body={canEdit ? actionBodyTemplate : null} />
      </DataTable>

      {/* PAGINATION */}
      {paginationInfo && paginationInfo.total > 0 && !isLoading && (
        <Pagination paginationInfo={paginationInfo} fetchData={fetchData} />
      )}

      {/* CUSTOM MODAL */}
      {activeModalRow && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setActiveModalRow(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "250px",
              textAlign: "center",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ marginBottom: "20px", fontSize: "18px" }}>Choose your option</h3>

            {/* EDIT */}
            {!hideEdit && (
              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#ec7be7ff",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  onEdit(activeModalRow._id);
                  setActiveModalRow(null);
                }}
              >
                Edit
              </button>
            )}

            {/* DELETE */}
            <button
              style={{
                width: "100%",
                padding: "10px",
                background: "#d32f2f",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => {
                onDelete(activeModalRow._id);
                setActiveModalRow(null);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListViewComponent;
