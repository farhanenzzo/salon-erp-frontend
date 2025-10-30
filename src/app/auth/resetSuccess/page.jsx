"use client";
import React, { useState } from "react";
import MainIMG from "../../../assets/images/authScreenBG.webp";
import Logo from "../../../assets/svg/brandSpinLogo.svg";
import CommonButton from "../../../components/commonButton/CommonButton";
import "../../../app/globals.css";
import BackButton from "../../../components/backbuttonComponent/Backbutton";
import SuccessIMG from "../../../assets/svg/resetSuccess.svg";
import Image from "next/image";
import { ROUTES } from "../../../constants";

const ResetSuccess = () => {
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src={Logo} alt="Logo" className="mx-auto my-7" />
          </div>
          <h1 className="mb-4 text-center">Password Reset Success</h1>
          <p className="text-lg text-center my-5">
            You can now log in with your new password
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: 30,
            }}
          >
            <Image
              src={SuccessIMG}
              alt="SuccessIMG"
              className="mx-auto my-10"
            />
          </div>
          <CommonButton
            label="Go To Login"
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
          alt="Login Image"
          // layout="fill"
          // objectFit="cover"
          // height="100vh"
        />
      </div>
    </div>
  );
};

export default ResetSuccess;
