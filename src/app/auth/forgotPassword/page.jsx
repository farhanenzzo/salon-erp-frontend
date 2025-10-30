"use client";
import React, { useState } from "react";
import Image from "next/image";
import MainIMG from "../../../assets/images/authScreenBG.webp";
import Logo from "../../../assets/svg/brandSpinLogo.svg";
import CommonButton from "../../../components/commonButton/CommonButton";
import "../../../app/globals.css";
import Link from "next/link";
import EmailIcon from "../../../assets/svg/modalEmailIcon.svg";
import BackButton from "../../../components/backbuttonComponent/Backbutton";
import { sendOTP } from "../../../service/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  BUTTON_LABELS,
  BUTTON_TYPE,
  IMG_ALT,
  INPUT_LABELS,
  LOCAL_STORAGE,
  PLACEHOLDERS,
  ROUTES,
} from "../../../constants";
import ModalInput from "../../../components/modalInputComponent/ModalInput";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await sendOTP(email);
      toast.success("OTP sent successfully. Please check your email.");
      localStorage.setItem(LOCAL_STORAGE.VERIFICATION_EMAIL, email);
      //Redirect to OTP verification page
      router.push(ROUTES.OTPVERIFY);
    } catch (error) {
      toast.error("Invalid email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className="absolute top-10 left-10 "
        style={{ cursor: "pointer", zIndex: 999 }}
      >
        <BackButton />
      </div>
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md justify-center align-middle ">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src={Logo} alt={IMG_ALT.LOGO} />
          </div>
          <h1 className="mb-4 text-center">Forgot Password</h1>
          <p className="text-lg text-center mb-5">Recover your account</p>
          <form onSubmit={handleSubmit}>
            <ModalInput
              inputType="email"
              placeholder={PLACEHOLDERS.ENTER_EMAIL}
              label={INPUT_LABELS.EMAIL}
              startIcon={EmailIcon}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="my-5" />
            <CommonButton
              label={isLoading ? BUTTON_LABELS.LOADING : BUTTON_LABELS.CONTINUE}
              type={BUTTON_TYPE.SUBMIT}
              disabled={isLoading}
              canEdit={true}
            />
          </form>
          <p className="text-center mt-5 mb-3">
            Already have an account?{" "}
            <Link className="text-customHeadOrange" href={ROUTES.LOGIN}>
              Login
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
          alt={IMG_ALT.HERO_IMG}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
