"use client";
import React, { useEffect, useState } from "react";
import TabsHeader from "../../../components/tabsHeader/TabsHeader";
import { TABHEADER, TOAST_MESSAGES } from "../../../constants";
import { listPayments } from "../../../service/api";
import toast from "react-hot-toast";
import ListViewComponent from "../../../components/appointmentsTab/listViewComponent/ListViewComponent";
import {
  transactionsSearchField,
  transactionsTableHeader,
} from "../../../utils/data";
import { useSearch } from "../../../hooks/useSearch";

const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const { filteredData, setSearchTerm } = useSearch(
    transactions,
    transactionsSearchField
  );

  const listTransactions = async (page = 1) => {
    setIsTransactionsLoading(true);
    try {
      const response = await listPayments(page, paginationInfo.limit);
      if (response.success) {
        setTransactions(response.payments);
        setPaginationInfo(response.pagination);
        setIsTransactionsLoading(false);
      }
    } catch (error) {
      console.log(TOAST_MESSAGES.ERROR_FETCHING_TRANSACTIONS);
      toast.error(TOAST_MESSAGES.ERROR_FETCHING_TRANSACTIONS);
    } finally {
      setIsTransactionsLoading(false);
    }
  };

  useEffect(() => {
    listTransactions();
  }, []);

  return (
    <div className="tabContainer">
      <TabsHeader
        heading={TABHEADER.TRANSACTIONS}
        setSearchTerm={setSearchTerm}
      />
      <ListViewComponent
        headerData={transactionsTableHeader}
        bodyData={filteredData}
        idColoring={true}
        paginationInfo={paginationInfo}
        fetchData={listTransactions}
        // canEdit={canEdit}
        isLoading={isTransactionsLoading}
      />
    </div>
  );
};

export default TransactionsScreen;
