"use client";
import React, { useEffect, useState } from "react";
import MainIMG from "../../../assets/images/authScreenBG.webp";
import Logo from "../../../assets/svg/brandSpinLogo.svg";
import CommonButton from "../../../components/commonButton/CommonButton";
import "../../../app/globals.css";
import BackButton from "../../../components/backbuttonComponent/Backbutton";
import OTPInput from "react-otp-input";
import { verifyOTP } from "../../../service/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LOCAL_STORAGE, ROUTES, TOAST_MESSAGES } from "../../../constants";
import Link from "next/link";

const OTPverification = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const [email, setEmail] = useState("");

  useEffect(() => {
    // Retrieve email from localStorage
    const storedEmail = localStorage.getItem(LOCAL_STORAGE.VERIFICATION_EMAIL);
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If email is not found, redirect back to forgot password page
      router.push(ROUTES.FORGOT_PASSWORD);
    }
  }, [router]);

  const handleReset = async () => {
    setIsLoading(true);
    try {
      const response = await verifyOTP(email, otp);
      console.log("response in otp", response);
      toast.success(TOAST_MESSAGES.OTP_VERIFIED);
      router.push(ROUTES.RESET_PASSWORD);
    } catch (error) {
      console.log("error in otp", error);

      const errorMessage =
        error?.response?.data?.error || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className="absolute top-10 left-10"
        style={{ cursor: "pointer", zIndex: 999 }}
      >
        <BackButton />
      </div>
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md justify-center align-middle">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src={Logo} alt="Logo" />
          </div>
          <h1 className="mb-4 text-center">OTP Verification</h1>
          <p className="text-lg text-center my-5">
            Check you email for the verification OTP
          </p>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputStyle={{
              width: "80px",
              height: "65px",
              borderWidth: "1px",
              borderColor: "#EEEEEE",
              fontSize: "20px",
              fontWeight: "600",
            }}
            containerStyle={{
              gap: 10,
              justifyContent: "center",
              marginBottom: "3rem",
            }}
            renderInput={(props) => <input {...props} />}
          />
          <CommonButton
            label={isLoading ? "Loading.." : "Reset"}
            onClick={handleReset}
            loading={isLoading}
            disabled={isLoading}
            canEdit={true}
          />
          <p className="text-center my-5">
            If you didn’t receive a code!{" "}
            <Link href={ROUTES.EMAIL_VERIFY_ROUTE}>
              <span className="text-customHeadOrange">Resend</span>
            </Link>
          </p>
        </div>
        <div className="rightsReserved">
          <p className="text-center">@2024 LuxeLooks All Rights Reserved.</p>
        </div>
      </div>
      <div className="flex-1 relative hidden md:block">
        <Image
          src={MainIMG}
          alt="Login Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default OTPverification;
