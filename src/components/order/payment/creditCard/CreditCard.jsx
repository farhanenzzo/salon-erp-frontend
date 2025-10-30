import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import CommonButton from "../../../commonButton/CommonButton";
import toast from "react-hot-toast";
import { creditCardInputData } from "../../../../utils/data";
import {
  BUTTON_LABELS,
  BUTTON_TYPE,
  CARD_INPUT_IDS,
  DELETE_MODAL_TITLE,
  MODAL_TITLES,
  PLACEHOLDERS,
  ROUTES,
} from "../../../../constants";
import { finalizeOrder } from "../../../../service/api";
import { useRouter } from "next/navigation";
import ModalComponent from "../../../../components/modalComponent/ModalComponent";

const CreditCard = ({ clientSecret, orderId }) => {
  const [showConfirmPaymentModal, setShowConfirmPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  // Add validation check
  const validateForm = () => {
    if (!stripe || !elements) {
      toast.error("Stripe has not been properly initialized");
      return false;
    }

    if (!clientSecret) {
      toast.error("Client secret is missing");
      return false;
    }

    return true;
  };

  const handlePayment = async (event) => {
    event.preventDefault();

    // Prevent double submission
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    console.log("Starting payment process...");

    try {
      if (!validateForm()) {
        setIsProcessing(false);
        return;
      }

      console.log("Form validated, proceeding with payment...");

      const cardNumber = elements.getElement(CardNumberElement);
      if (!cardNumber) {
        toast.error("Card number element not found");
        return;
      }

      console.log("Confirming card payment with secret:", clientSecret);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumber,
          },
        }
      );

      if (error) {
        console.error("Payment failed:", error);
        toast.error(`Payment failed: ${error.message}`);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", paymentIntent);
        toast.success("Payment successful!");

        try {
          await finalizeOrder(orderId);
          console.log("Order finalized successfully");

          setShowConfirmPaymentModal(false);
          setTimeout(() => {
            router.push(ROUTES.ORDER);
          }, 1000);
        } catch (finalizeError) {
          console.error("Error finalizing order:", finalizeError);
          toast.error("Payment successful but error finalizing order");
        }
      } else {
        console.log("Unexpected payment status:", paymentIntent.status);
        toast.error("Unexpected payment status");
      }
    } catch (err) {
      console.error("Unexpected error during payment:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderCardInput = (input) => {
    switch (input.id) {
      case 1:
        return (
          <CardNumberElement
            id={CARD_INPUT_IDS.NUMBER}
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
              },
            }}
          />
        );
      case 2:
        return (
          <CardExpiryElement
            id={CARD_INPUT_IDS.EXPIRY}
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                },
              },
            }}
          />
        );
      case 3:
        return (
          <CardCvcElement
            id={CARD_INPUT_IDS.CVC}
            options={{
              placeholder: PLACEHOLDERS.CVV,
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                },
              },
            }}
          />
        );
      default:
        return null;
    }
  };

  const handlePayNow = (event) => {
    event.preventDefault();

    // Add validation before showing modal
    if (!validateForm()) {
      return;
    }

    setShowConfirmPaymentModal(true);
  };

  return (
    <div className="w-full space-y-6">
      <h2>Card details</h2>
      <form>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 justify-between">
            {creditCardInputData.map((input) => (
              <div
                key={input.id}
                className={`w-full ${input.id === 2 || input.id === 3 ? "md:w-[49%] lg:w-[48%]" : "lg:w-full"}`}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {input.label}
                </label>
                <div className="inputContainer">{renderCardInput(input)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-fit self-end mt-6">
          <CommonButton
            label={isProcessing ? "Processing..." : BUTTON_LABELS.PAY_NOW}
            type={BUTTON_TYPE.BUTTON}
            disabled={!stripe || isProcessing}
            onClick={handlePayNow}
          />
        </div>
      </form>
      {showConfirmPaymentModal && (
        <ModalComponent
          isOpen={showConfirmPaymentModal}
          onClose={() => setShowConfirmPaymentModal(false)}
          title={MODAL_TITLES.CONFIRM_PAYMENT}
          confirmModal={true}
          confirmText={isProcessing ? "Processing..." : "Confirm Payment"}
          confirmButtonClick={handlePayment}
          disabled={isProcessing}
        />
      )}
    </div>
  );
};

export default CreditCard;
