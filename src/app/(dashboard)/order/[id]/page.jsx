"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { orderDetailItemsHeader } from "../../../../utils/data";
import BackButton from "../../../../components/backbuttonComponent/Backbutton";
import { fetchOrderDetails } from "../../../../service/api";
import toast from "react-hot-toast";
import styles from "./page.module.css";
import ListViewComponent from "../../../../components/appointmentsTab/listViewComponent/ListViewComponent";
import { Skeleton } from "primereact/skeleton";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../../constants";

const OrderDetails = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const response = await fetchOrderDetails(id);
        setOrderData(response);
      } catch (error) {
        console.error("Error fetching order data:", error);
        toast.error("Error fetching order details.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderData();
  }, [id]);

  const renderOrderStatusClass = (status) => {
    switch (status) {
      case "Paid":
        return "positive_status";
      case "Unpaid":
        return "negative_status";
      case "Processing":
        return "neutral_status";
      default:
        return null;
    }
  };

  const orderItems = orderData?.items;

  return (
    <div className="tabContainer">
      <BackButton title="Order Details" />
      <div
        className={`${styles.fieldContainer} flex flex-wrap gap-6 my-6 w-full`}
      >
        <h4>
          Order ID:{" "}
          <span className="text-primaryColor">
            {loading ? <Skeleton width={50} /> : orderData.orderId}
          </span>
        </h4>
        <h4>
          Order Date:{" "}
          <span className="text-black">
            {loading ? (
              <Skeleton width={60} />
            ) : orderData.orderDate ? (
              format(new Date(orderData.orderDate), DATE_FORMAT)
            ) : (
              "N/A"
            )}
          </span>
        </h4>
        <h4>
          Tracking ID:{" "}
          <span className="text-black">
            {loading ? <Skeleton width={120} /> : orderData.trackingId}
          </span>
        </h4>
        <h4>
          Status:{" "}
          <span
            className={`${renderOrderStatusClass(orderData.paymentStatus)} px-4 py-2 rounded-md text-sm`}
          >
            {loading ? <Skeleton width={70} /> : orderData.paymentStatus}
          </span>
        </h4>
      </div>
      <ListViewComponent
        headerData={orderDetailItemsHeader}
        bodyData={orderItems}
        isLoading={loading}
      />
    </div>
  );
};

export default OrderDetails;
