import Image from "next/image";
import { Sidebar } from "primereact/sidebar";
import React, { useEffect, useState } from "react";
import CloseButton from "../../assets/svg/popupCloseBTN.svg";
import styles from "./DetailSidebar.module.css";
import ListViewComponent from "../appointmentsTab/listViewComponent/ListViewComponent";
import { expiredStockTableHeader, lowStockTableHeader } from "../../utils/data";
import { listStocks } from "../../service/api";
import useFetchData from "../../hooks/useFetchData";
import {
  DETAIL_SIDEBAR_BUTTON_LABEL,
  DETAIL_SIDEBAR_HEADING,
} from "../../constants";
import CommonButton from "../commonButton/CommonButton";
import { STOCK_STATUSES } from "../../constants/stockConstants";

const DetailSidebar = ({
  visible,
  onHide,
  header,
  showReorderScreen,
  handleSelectedRows,
}) => {
  const { data, loading } = useFetchData(listStocks, {
    status:
      header === DETAIL_SIDEBAR_HEADING.LOW_STOCK
        ? STOCK_STATUSES.LOW_STOCK
        : STOCK_STATUSES.EXPIRED_STOCK,
  });

  return (
    <Sidebar
      visible={visible}
      position="right"
      onHide={onHide}
      showCloseIcon={false}
      className={styles.sidebar}
    >
      <div className="flex justify-between items-center mb-4">
        <h2>{header}</h2>
        <Image
          src={CloseButton}
          alt="close icon"
          onClick={onHide}
          className="cursor-pointer"
        />
      </div>
      <ListViewComponent
        headerData={
          header === DETAIL_SIDEBAR_HEADING.LOW_STOCK
            ? lowStockTableHeader
            : expiredStockTableHeader
        }
        bodyData={data}
        idColoring={true}
        isLoading={loading}
        selectionMode="checkbox"
        isRowClickable={true}
        onRowSelectionChange={handleSelectedRows}
      />
      <footer className={styles.footerButtons}>
        <CommonButton
          label={
            header === DETAIL_SIDEBAR_HEADING.LOW_STOCK
              ? DETAIL_SIDEBAR_BUTTON_LABEL.RE_ORDER
              : DETAIL_SIDEBAR_BUTTON_LABEL.REMOVE
          }
          onClick={() => showReorderScreen()}
        />
      </footer>
    </Sidebar>
  );
};

export default DetailSidebar;
