"use client";
import React, { useEffect, useState } from "react";
import TabsHeader from "../tabsHeader/TabsHeader";
import ListViewComponent from "../appointmentsTab/listViewComponent/ListViewComponent";
import { orderSearchFields, orderTableHeader } from "../../utils/data";
import { listOrders } from "../../service/api";
import toast from "react-hot-toast";
import { ORDER_STATUS, ROUTES, TABHEADER } from "../../constants";
import { useRouter } from "next/navigation";
import { useSearch } from "../../hooks/useSearch";
import useModulePermissions from "../../hooks/useModulePermissions";

const OrderTab = () => {
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);

  const { filteredData, setSearchTerm } = useSearch(orders, orderSearchFields);

  const { canEdit } = useModulePermissions();

  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const router = useRouter();

  const fetchOrders = async (page = 1, limit = 10) => {
    try {
      setOrderLoading(true);

      // Fetch data from the API
      const {
        data: orders = [], // Default to an empty array
        pagination = { total: 0, page: 1, limit: 10, totalPages: 1 }, // Default pagination
        success,
        error,
      } = await listOrders({
        status: ORDER_STATUS.COMPLETED,
        page,
        limit,
      });

      if (!success) {
        throw new Error(error || "Failed to fetch orders");
      }

      // Transform orders to include only the length of the items array
      const transformedOrders = orders.map((order) => ({
        ...order,
        items: Array.isArray(order.items) ? order.items.length : 0, // Safely replace items array with its length
      }));

      setOrders(transformedOrders);
      setPaginationInfo(pagination);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error(err.message || "Error fetching orders");
      setOrders([]); // Reset orders on error
      setPaginationInfo({ total: 0, page: 1, limit, totalPages: 1 }); // Reset pagination info
    } finally {
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, []);

  const handleAddNewButton = () => {
    router.push(ROUTES.ADD_ORDER);
  };

  const handleRowClick = (order) => {
    router.push(`/order/${order._id}`);
  };

  return (
    <div className="tabContainer">
      <TabsHeader
        heading={TABHEADER.ALL_ORDERS}
        handleAddNewButton={handleAddNewButton}
        setSearchTerm={setSearchTerm}
        canEdit={canEdit}
      />
      <ListViewComponent
        headerData={orderTableHeader}
        bodyData={filteredData}
        isLoading={orderLoading}
        idColoring={true}
        fetchData={fetchOrders}
        paginationInfo={paginationInfo}
        isRowClickable={true}
        onRowSelect={handleRowClick}
        canEdit={canEdit}
      />
    </div>
  );
};

export default OrderTab;
