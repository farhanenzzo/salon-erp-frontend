"use client";
import {
  DATE_FORMAT,
  IMG_ALT,
  PRODUCT_DETAILS_TITLES,
  TABHEADER,
} from "../../../../constants";
import TabsHeader from "../../../../components/tabsHeader/TabsHeader";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { listProductById } from "../../../../service/api";
import toast from "react-hot-toast";
import Image from "next/image";
import styles from "./page.module.css";
import { format, parseISO } from "date-fns";
import { Skeleton } from "primereact/skeleton";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  const getProductDetails = async () => {
    setIsProductsLoading(true);
    try {
      const response = await listProductById(id);
      setProduct(response.data);
      setIsProductsLoading(false);
    } catch (error) {
      console.log("Error fetching product details", error);
      toast.error("Error fetching product details");
    } finally {
      setIsProductsLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  console.log("produc in detail", product);

  const formattedMFGDate = product?.stockMFGDate
    ? format(parseISO(product.stockMFGDate), DATE_FORMAT)
    : ""; // Fallback if MFG Date is missing or not available

  const formattedEXPDate = product?.stockEXPDate
    ? format(parseISO(product.stockEXPDate), DATE_FORMAT)
    : ""; // Fallback if EXP Date is missing or not available

  const getStatusClass = (status) => {
    switch (status) {
      case "In Stock":
        return "positive_status";
      case "Out of stock":
        return "negative_status";
      case "Expired Stock":
        return "negative_status";
      default:
        break;
    }
  };

  return (
    <div className="table">
      <TabsHeader heading={TABHEADER.PRODUCT_DETAILS} backbutton={true} />
      <div className={styles.productDetails_container}>
        {isProductsLoading ? (
          <Skeleton shape="rectangle" width={598} height={340} />
        ) : (
          <Image
            src={product.stockImage}
            alt={IMG_ALT.PRODUCT_IMAGE}
            width={598}
            height={340}
            className="rounded-lg"
          />
        )}

        <div className="flex flex-col gap-4">
          {isProductsLoading ? (
            <>
              {" "}
              <Skeleton width="10rem" />{" "}
              <Skeleton width="15rem" className="my-5" />{" "}
              <Skeleton width="18rem" />{" "}
            </>
          ) : (
            <>
              <h2>
                {PRODUCT_DETAILS_TITLES.PRODUCT_NAME}:{" "}
                <span>{product?.stockName}</span>
              </h2>
              <h2>
                {PRODUCT_DETAILS_TITLES.CATEGORY}:{" "}
                <span>{product?.stockCategory?.name}</span>
              </h2>
              <h2>
                {PRODUCT_DETAILS_TITLES.MFG_DATE}:{" "}
                <span>{formattedMFGDate}</span>
              </h2>
              <h2>
                {PRODUCT_DETAILS_TITLES.EXP_DATE}:{" "}
                <span>{formattedEXPDate}</span>
              </h2>
              <h2>
                {PRODUCT_DETAILS_TITLES.PRICE}: <span>${product?.price}</span>
              </h2>
              <h2>
                {PRODUCT_DETAILS_TITLES.QUANTITY}:{" "}
                <span>{product?.stockQuantity} units</span>
              </h2>
              <h2 className="flex items-center gap-3">
                {PRODUCT_DETAILS_TITLES.STOCK_STATUS} :{" "}
                <p
                  className={`status ${getStatusClass(product?.stockStatus)} `}
                >
                  {product?.stockStatus}
                </p>
              </h2>
            </>
          )}
        </div>
      </div>
      <h2 className="mt-6">{PRODUCT_DETAILS_TITLES.DESCRIPTION}</h2>
      <p>{product.stockDescription || PRODUCT_DETAILS_TITLES.NO_DESRIPTION}</p>
      <h2 className="mt-6">{PRODUCT_DETAILS_TITLES.CUSTOMER_REVIEWS}</h2>
      <p>{PRODUCT_DETAILS_TITLES.NO_REVIEWS_YET}</p>
    </div>
  );
};

export default ProductDetail;
