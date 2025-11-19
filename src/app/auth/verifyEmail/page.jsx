"use client";
import React from "react";
import Image from "next/image";
import MainIMG from "../../../assets/images/authScreenBG.webp";
import Logo from "../../../assets/svg/Grotech-04.svg";
import CommonButton from "../../../components/commonButton/CommonButton";
import "../../../app/globals.css";
import BackButton from "../../../components/backbuttonComponent/Backbutton";
import CheckIMG from "../../../assets/svg/checkEmailIMG.svg";
import { BUTTON_LABELS, IMG_ALT, ROUTES } from "../../../constants";

const VerifyEmail = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className="absolute top-10 left-10 "
        style={{ cursor: "pointer", zIndex: 999 }}
      >
        <BackButton />
      </div>
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md justify-center align-middle">
          <Image src={Logo} alt="Logo" className="w-60 h-60"/>
          <h1 className="mb-4 text-center">Check Your Email </h1>
          <p className="text-lg text-center my-5">
            We have sent a verification link to your email address
          </p>
          <Image src={CheckIMG} alt={IMG_ALT.LOGO} className="mx-auto my-7" />

          <p className="text-center mb-5">
            To complete your registration, please click the verification link
            that has been sent to your email.
          </p>
          <CommonButton
            label={BUTTON_LABELS.GOTO_LOGIN}
            link={ROUTES.LOGIN}
            canEdit={true}
          />
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
          // height="100vh"
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
