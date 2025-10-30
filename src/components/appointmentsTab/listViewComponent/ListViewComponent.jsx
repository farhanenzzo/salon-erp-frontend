import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { format, isValid, parseISO } from "date-fns";
import ActionMenu from "../../actionMenu/ActionMenu";
import useActionMenu from "../../../hooks/useActionMenu";
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
  const { openMenuId, handleActionMenu, menuRef } = useActionMenu();
  const [filters, setFilters] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  console.log("bodyData in everything", bodyData);

  const data = Array.isArray(bodyData) ? bodyData : bodyData ? [bodyData] : [];

  const formatDate = (date) => {
    if (typeof date === "string") {
      // Check if the date string is already in the correct format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateRegex.test(date)) {
        return date; // Return as-is if it's already in yyyy-MM-dd format
      }

      // If not, try to parse and format
      const parsedDate = parseISO(date);
      if (isValid(parsedDate)) {
        return format(parsedDate, DATE_FORMAT);
      }
    }

    // If it's a valid Date object, format it
    if (date instanceof Date && !isNaN(date)) {
      return format(date, DATE_FORMAT);
    }

    // If all else fails, return the original value
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

  const statusBodyTemplate = (rowData) => (
    <span
      className={`status ${getStatusClass(
        rowData[
          headerData.find(
            (h) =>
              h.key === "employeeStatus" ||
              h.key === "appointmentStatus" ||
              h.key === "paymentStatus" ||
              h.key === "serviceStatus" ||
              h.key === "stockStatus" ||
              h.key === "status"
          ).key
        ]
      )}`}
    >
      {
        rowData[
          headerData.find(
            (h) =>
              h.key === "employeeStatus" ||
              h.key === "appointmentStatus" ||
              h.key === "paymentStatus" ||
              h.key === "serviceStatus" ||
              h.key === "stockStatus" ||
              h.key === "status"
          ).key
        ]
      }
    </span>
  );

  const handleRowClick = (rowData) => {
    if (onRowSelect) {
      onRowSelect(rowData);
    }
  };

  const handleServiceDetail = (rowData) => {
    if (onServiceDetail) {
      onServiceDetail(rowData);
    }
  };

  const dateBodyTemplate = (rowData, header) => {
    const dateValue = rowData[header.key];
    return (
      <div className={styles.singleLineDate} title={formatDate(dateValue)}>
        {formatDate(dateValue)}
      </div>
    );
  };

  const actionBodyTemplate = (rowData) =>
    canEdit && (
      <div className={styles.actionRelativeContainer}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleActionMenu(rowData._id);
          }}
        >
          <i className="pi pi-ellipsis-h cursor-pointer"></i>
        </div>
        {openMenuId === rowData._id && (
          <div className={styles.actionMenuContainer} ref={menuRef}>
            <div className={styles.actionMenuWrapper}>
              <ActionMenu
                extraActions={
                  isInacitveButton
                    ? [
                        {
                          id: 4,
                          label:
                            rowData.employeeStatus === "Active" ||
                            rowData.status === "active" ||
                            rowData.serviceStatus === "Active"
                              ? "In-activate"
                              : "Activate",
                          action: "in-active",
                          icon: inactiveIcon,
                        },
                      ]
                    : cancelButton && rowData.appointmentStatus === "Upcoming"
                      ? [
                          {
                            id: 4,
                            label:
                              rowData.appointmentStatus === "Upcoming"
                                ? "Cancelled"
                                : null,
                            action: "cancel",
                            icon: inactiveIcon,
                          },
                        ]
                      : []
                }
                onDelete={() => onDelete(rowData._id)}
                onClose={() => handleActionMenu(null)}
                hideDelete={rowData.roleName === "superAdmin" ? true : false}
                hideEdit={
                  hideEdit
                    ? hideEdit
                    : rowData.appointmentStatus === "Completed" ||
                        rowData.roleName === "superAdmin"
                      ? true
                      : false
                }
                onEdit={() => onEdit(rowData._id)}
                onInactive={() => onInactive(rowData._id)}
                onCancel={() => onCancel(rowData._id)}
                userRole={
                  rowData.role
                    ? rowData.role
                    : rowData.roleName
                      ? rowData.roleName
                      : ""
                }
              />
            </div>
          </div>
        )}
      </div>
    );

  const skeletonBodyTemplate = () => (
    <Skeleton width="100%" height="1.5rem" borderRadius="8px" />
  );

  const handleNestedField = (rowData, field) => {
    if (field === "gender") {
      return rowData.client?.gender ?? "";
    }
    if (field === "phoneNumber") {
      return rowData.client?.phone ?? "";
    }
    if (field === "stylistName") {
      return rowData.stylistId?.employeeName ?? "";
    }
    if (field === "preferredStylist") {
      return rowData.preferredStylist?.name ?? "";
    }
    if (field === "createdBy") {
      return rowData.createdBy?.name ?? "";
    }
    if (field === "clientName") {
      return (
        rowData.client?.name ??
        rowData.clientId?.name ??
        rowData?.clientName ??
        ""
      );
    }
    if (field === "client") {
      return rowData.client?.name ?? "";
    }
    if (field === "service") {
      return (
        rowData.service?.serviceName ?? rowData.serviceId?.serviceName ?? ""
      );
    }
    if (field === "stockBrand") {
      return rowData.brandName ?? "";
    }
    if (field === "stockCategory") {
      return rowData.stockCategory?.name ?? "";
    }

    if (field === "roleName" || field === "role") {
      return formatString(rowData.roleName || rowData.role?.roleName || "");
    }

    if (field === "suppliers" || field === "brands") {
      const names = rowData.suppliers || rowData.brands;

      return names.length > 2
        ? `${names.slice(0, 2).join(", ")}...`
        : names.join(", ");
    }
    if (field === "price" || field === "amount") {
      return (
        <span style={{ fontWeight: "bold" }}>
          {formatPrice(
            rowData.service?.price || rowData.price || rowData.amount || ""
          )}
        </span>
      );
    }
    return rowData[field] ? rowData[field] : "";
  };

  const SortIconComponent = () => (
    <Image src={SortIcon} alt="Sort Icon" width={20} height={15} />
  );

  const onSelectionChange = (e) => {
    setSelectedRows(e.value);
    console.log("Selected Rows:", e.value);
    // const selectedIds = e.value.map((row) => row._id);
    // console.log("Selected IDs:", selectedIds);
    if (onRowSelectionChange) {
      onRowSelectionChange(e.value); // Pass the selected rows to the parent
    }
  };

  const checkboxTemplate = (rowData) => {
    return (
      <Checkbox
        checked={selectedRows.some((row) => row._id === rowData._id)}
        onChange={() => {}}
      />
    );
  };

  return (
    <div>
      <DataTable
        value={isLoading ? Array(10).fill({}) : data}
        // paginator={!isLoading}
        // rows={numberOfRows ? numberOfRows : 10}
        paginator={false} //
        rows={paginationInfo ? paginationInfo.limit : 10}
        lazy
        first={
          paginationInfo ? (paginationInfo.page - 1) * paginationInfo.limit : 0
        } // Handle page offset if pagination info exists
        totalRecords={paginationInfo ? paginationInfo.total : 0}
        sortIcon={<SortIconComponent />}
        className={styles.datatable}
        filterIcon
        stripedRows
        sortMode="multiple"
        selectionMode={
          isLoading ? null : selectionMode ? selectionMode : "single"
        }
        selection={selectedRows}
        onSelectionChange={onSelectionChange}
        // dataKey="_id"
        onFilter={(e) => setFilters(e.filters)}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowClick={(e) =>
          isRowClickable && !isLoading && handleRowClick(e.data)
            ? handleRowClick(e.data)
            : isRowClickable &&
                !isLoading &&
                handleRowClick(e.data) &&
                serviceDetail
              ? handleServiceDetail(e.data)
              : null
        }
        emptyMessage={NO_DATA_TO_DISPLAY}
      >
        {selectionMode === "checkbox" && (
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            body={checkboxTemplate}
          />
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
                  ? (rowData) => dateBodyTemplate(rowData, header)
                  : header.key === "dateAndTime" || header.type === "date"
                    ? (rowData) => (
                        <div
                          className={styles.singleLineDate}
                          title={formatDateTime(rowData[header.key])}
                        >
                          {formatDateTime(rowData[header.key])}
                        </div>
                      )
                    : header.key === "employeeStatus" ||
                        header.key === "appointmentStatus" ||
                        header.key === "status" ||
                        header.key === "serviceStatus" ||
                        header.key === "stockStatus" ||
                        header.key === "status"
                      ? statusBodyTemplate
                      : (rowData) => handleNestedField(rowData, header.key)
            }
            style={{
              color: idColoring && header.id === 1 ? "#9B0E53" : "#000",
              textTransform: header.title === "Email" ? null : "capitalize",
            }}
          />
        ))}
        <Column body={canEdit === true ? actionBodyTemplate : null} />
      </DataTable>
      {paginationInfo && paginationInfo.total > 0 && !isLoading && (
        <Pagination paginationInfo={paginationInfo} fetchData={fetchData} />
      )}
    </div>
  );
};

export default ListViewComponent;
