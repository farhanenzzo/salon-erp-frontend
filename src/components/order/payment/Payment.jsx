"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import {
  IMG_ALT,
  ORDER_STATUS,
  PAYMENT_METHODS,
  Payment_SCREEN,
} from "../../../constants";
import { billingAddressInputData, paymentMethods } from "../../../utils/data";
import ModalInput from "../../modalInputComponent/ModalInput";
import BackButton from "../../../assets/svg/backButton.svg";
import { useSelector } from "react-redux";
import { createPaymentIntent, listOrders } from "../../../service/api";
import CreditCard from "../../order/payment/creditCard/CreditCard";
import styles from "./Payment.module.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useForm from "../../../hooks/useForm";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [draftOrders, setDraftOrders] = useState([]);

  const router = useRouter();

  const initialBillingValues = {
    name: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  };

  const keyMap = {
    1: "name",
    2: "streetAddress",
    3: "city",
    4: "state",
    5: "zipCode",
    6: "country",
  };

  const [formValid, setFormValid] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await listOrders({ status: ORDER_STATUS.DRAFT });
        console.log("ordersss", orders);
        // const orderItems = orders.map((order) => order.items).flat(); // Flatten if there are multiple orders
        setDraftOrders(orders.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Error fetching orders");
      } finally {
        // setIsDraftLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Fetch client secret for the payment
  useEffect(() => {
    const fetchClientSecret = async () => {
      if (draftOrders && draftOrders.length > 0) {
        const items = draftOrders.map((order) => ({
          sNo: order.sNo,
          productName: order.stockName,
          category: order.category,
          stockEXPDate: order.stockEXPDate,
          stockMFGDate: order.stockMFGDate,
          quantity: order.quantity,
          price: order.price,
          totalPrice: order.totalPrice,
        }));
        try {
          const secret = await createPaymentIntent("card", items);
          setClientSecret(secret);
        } catch (error) {
          console.error("Error fetching client secret:", error);
        }
      }
    };
    fetchClientSecret();
  }, [draftOrders]);

  const orderId = draftOrders.length > 0 ? draftOrders[0]._id : null;

  const { formData, handleInputChange } = useForm(initialBillingValues, keyMap);

  const handleBillingAddressChange = (e) => {
    console.log("input value", e.target.value);
    setBillingAddress({
      ...billingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const isValid = Object.values(billingAddress).every(
      (field) => field.trim() !== ""
    );
    setFormValid(isValid);
    return isValid;
  };

  const renderPaymentMethods = () => {
    return (
      <Elements stripe={stripePromise}>
        <CreditCard clientSecret={clientSecret} orderId={orderId} />
      </Elements>
    );
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex gap-12 tabContainer">
      <div className="w-1/2">
        <div className="flex gap-4 items-center mb-6">
          <Image
            src={BackButton}
            alt={IMG_ALT.GO_BACK_BUTTON}
            className="cursor-pointer"
            onClick={handleGoBack}
          />
          <h2 className="normal-case">
            {PAYMENT_METHODS.CREDIT_OR_DEBIT_CARD}
          </h2>
        </div>
        {/* <div className="flex items-center gap-5">
          {paymentMethods.map((payment) => (
            <div key={payment.id} className="flex items-center">
              <RadioButton
                inputId={payment.id}
                name="paymentMethod"
                value={payment.label}
                onChange={(e) => setSelectedPayment(e.value)}
                checked={selectedPayment === payment.label}
              />
              <label htmlFor={payment.id} className="ml-2">
                <p>{payment.label}</p>
              </label>
            </div>
          ))}
        </div> */}
        <div className="my-6">{renderPaymentMethods()}</div>
      </div>
      <div className={styles.billingAddress}>
        <h2>Billing Address</h2>
        <div className={styles.billingAddressInputs}>
          {billingAddressInputData.map((input) => (
            <div key={input.id} className={styles.billingInput}>
              <ModalInput
                inputType={input.type}
                label={input.label}
                value={formData[input.key]}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payment;
