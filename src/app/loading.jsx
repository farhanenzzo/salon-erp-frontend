import Image from "next/image";
import React from "react";
import Logo from "../assets/svg/brandSpinLogo.svg";

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="logo-container">
        <Image src={Logo} alt="Company Logo" className="company-logo" />
      </div>
      {/* <h1 className="loading-text">Loading<span>.</span><span>.</span><span>.</span></h1> */}
    </div>
  );
}
