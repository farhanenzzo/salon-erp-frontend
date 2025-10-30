"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BackButton from "../../../assets/svg/backButton.svg";
import {
  ADD_STOCK_KEYMAP,
  BUTTON_LABELS,
  CURRENCY,
  FIELD_NAMES,
  IMG_ALT,
  ORDER_SCREEN,
  ORDER_STATUS,
  TOAST_MESSAGES,
} from "../../../constants";
import ListViewComponent from "../../appointmentsTab/listViewComponent/ListViewComponent";
import { addNewOrder, orderDetailsTableHeader } from "../../../utils/data";
import ModalInput from "../../modalInputComponent/ModalInput";
import styles from "./AddOrder.module.css";
import CommonButton from "../../commonButton/CommonButton";
import useForm from "../../../hooks/useForm";
import {
  createOrUpdateDraftOrder,
  listBrands,
  listOrders,
  listStocks,
} from "../../../service/api";
import toast from "react-hot-toast";
import useFetchData from "../../../hooks/useFetchData";
import { useRouter } from "next/navigation";

const AddOrder = () => {
  const [brandProducts, setBrandProducts] = useState([]);
  const [draftOrders, setDraftOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const initialFormData = {
    productName: "",
    category: "",
    quantity: "",
    price: "",
  };

  const keyMap = {
    1: ADD_STOCK_KEYMAP.PRODUCT_NAME,
    2: ADD_STOCK_KEYMAP.CATEGORY,
    3: ADD_STOCK_KEYMAP.QUANTITY,
    4: ADD_STOCK_KEYMAP.PRICE,
  };

  const {
    formData,
    selectedBrand,
    selectedProduct,
    handleInputChange,
    handleBrandChange,
    handleProductChange,
    resetForm,
    setFormData,
  } = useForm(initialFormData, keyMap);

  const brandData = useFetchData(listBrands);
  const finalBrandData = brandData?.data?.data || [];

  const brandOptions =
    Array.isArray(finalBrandData) && finalBrandData.length > 0
      ? finalBrandData.map((brand) => ({
          value: brand._id,
          label: brand.name,
        }))
      : [];

  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0,
  });

  const selectedProductData = brandProducts.find(
    (product) => product._id === selectedProduct
  );

  useEffect(() => {
    const listBrandProducts = async () => {
      if (selectedBrand) {
        try {
          const response = await listStocks({ brandId: selectedBrand });
          setBrandProducts(response.data);
          setFormData((prevData) => ({
            ...prevData,
            price: response.data[0]?.price || "",
          }));
        } catch (error) {
          console.log("Error getting products of particular brand:", error);
        }
      }
    };

    listBrandProducts();
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedProductData) {
      setFormData((prevData) => ({
        ...prevData,
        category: selectedProductData.stockCategory || "",
        totalPrice: selectedProductData.price || "",
        quantity: 1,
      }));
    }
  }, [selectedProduct, selectedProductData]);

  const fetchOrders = async (page = 1, limit = 5) => {
    try {
      setLoading(true);

      const {
        data: orders = [],
        pagination = { total: 0, page: 1, limit: 5, totalPages: 1 },
        success,
        error,
      } = await listOrders({
        status: ORDER_STATUS.DRAFT,
        page,
        limit,
      });

      if (!success) {
        throw new Error(error || "Failed to fetch orders");
      }

      setDraftOrders(orders);
      setPaginationInfo({
        ...pagination,
        total: orders.reduce((sum, order) => sum + order.items.length, 0),
        totalPages: Math.ceil(
          orders.reduce((sum, order) => sum + order.items.length, 0) / limit
        ),
      });
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error(err.message || "Error fetching orders");
      setDraftOrders([]);
      setPaginationInfo({ total: 0, page: 1, limit, totalPages: 1 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(paginationInfo.page, paginationInfo.limit);
  }, [paginationInfo.page, paginationInfo.limit]);

  const handleQuantityChange = (newQuantity) => {
    const unitPrice = selectedProductData?.price || 0;
    const newTotalPrice = unitPrice * newQuantity;
    setFormData((prevData) => ({
      ...prevData,
      quantity: newQuantity,
      totalPrice: newTotalPrice,
    }));
  };

  const handleAddToOrder = async () => {
    if (!selectedProductData || !formData.quantity) {
      return toast.error(TOAST_MESSAGES.ERROR_ADDING_PRODUCTS);
    }

    const { stockName, stockCategory, stockEXPDate, stockMFGDate, price } =
      selectedProductData;

    const totalPrice = formData.quantity * parseFloat(price);

    const latestDraftOrder = draftOrders[draftOrders.length - 1] || {
      items: [],
    };
    const nextSerialNumber = latestDraftOrder.items.length + 1;

    const newDraftOrder = {
      items: [
        {
          sNo: nextSerialNumber,
          productName: stockName,
          category: stockCategory,
          stockEXPDate,
          stockMFGDate,
          quantity: formData.quantity,
          price,
          totalPrice,
        },
      ],
    };

    try {
      await createOrUpdateDraftOrder(newDraftOrder);
      toast.success(TOAST_MESSAGES.PRODUCT_ADDED_TO_ORDER);

      // Refresh the order list and update pagination
      const newTotal = paginationInfo.total + 1;
      const newTotalPages = Math.ceil(newTotal / paginationInfo.limit);
      setPaginationInfo((prev) => ({
        ...prev,
        total: newTotal,
        totalPages: newTotalPages,
      }));

      // Fetch the last page if a new page is created
      if (newTotalPages > paginationInfo.totalPages) {
        fetchOrders(newTotalPages, paginationInfo.limit);
      } else {
        fetchOrders(paginationInfo.page, paginationInfo.limit);
      }
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("Error adding order");
    }

    resetForm();
  };

  const totalPrice = draftOrders.reduce(
    (sum, order) =>
      sum + order.items.reduce((itemSum, item) => itemSum + item.totalPrice, 0),
    0
  );

  const flattenedDraftOrders = draftOrders.flatMap((order) => order.items);

  const handleGoBack = () => {
    router.back();
  };

  const handleNextToPayment = () => {
    router.push("/order/payment");
  };

  return (
    <div className="tabContainer">
      <div className="flex gap-4 items-center mb-6">
        <Image
          src={BackButton}
          alt={IMG_ALT.GO_BACK_BUTTON}
          className="cursor-pointer"
          onClick={handleGoBack}
        />
        <h2>{ORDER_SCREEN.ORDER_TAB_HEADING}</h2>
      </div>
      <h2 className="mb-6">{ORDER_SCREEN.ADD_PRODUCT}</h2>
      <div className={styles.addOrderContainer}>
        {addNewOrder.map((data) => (
          <div key={data.id} className={`${styles.inputWrapper} numberCount`}>
            <ModalInput
              key={data.key}
              label={data.label}
              inputType={data.type}
              options={
                data.key === FIELD_NAMES.PRODUCT_BRAND
                  ? brandOptions
                  : data.key === FIELD_NAMES.PRODUCT_NAME
                    ? brandProducts.map((product) => ({
                        value: product._id,
                        label: product.stockName,
                      }))
                    : []
              }
              value={formData[data.key] || ""}
              onChange={(e) =>
                data.key === FIELD_NAMES.PRODUCT_BRAND
                  ? handleBrandChange(e)
                  : data.key === FIELD_NAMES.PRODUCT_NAME
                    ? handleProductChange(e)
                    : data.key === FIELD_NAMES.QUANTITY
                      ? handleQuantityChange(parseInt(e.target.value))
                      : handleInputChange(data.key, e.target.value)
              }
            />
          </div>
        ))}
        <div className={styles.buttonWrapper}>
          <CommonButton
            label={BUTTON_LABELS.ADD_TO_ORDER}
            onClick={handleAddToOrder}
          />
        </div>
      </div>
      <h2 className="mb-3">{ORDER_SCREEN.ORDER_LIST}</h2>
      <ListViewComponent
        headerData={orderDetailsTableHeader}
        bodyData={flattenedDraftOrders.slice(
          (paginationInfo.page - 1) * paginationInfo.limit,
          paginationInfo.page * paginationInfo.limit
        )}
        numberOfRows={paginationInfo.limit}
        fetchData={(page, limit) => fetchOrders(page, limit)}
        paginationInfo={paginationInfo}
      />
      <div className="flex justify-between items-center">
        <h2>Total Price</h2>
        <h2>
          {CURRENCY}
          {totalPrice}
        </h2>
      </div>
      <div className="flex justify-center items-center gap-4 w-max ml-auto my-12">
        <CommonButton
          label={BUTTON_LABELS.NEXT}
          onClick={handleNextToPayment}
        />
      </div>
    </div>
  );
};

export default AddOrder;
