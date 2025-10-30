"use client";
import React, { useState, useEffect } from "react";
import MainIMG from "../../../assets/images/authScreenBG.webp";
import Logo from "../../../assets/svg/brandSpinLogo.svg";
import CommonButton from "../../../components/commonButton/CommonButton";
import "../../../app/globals.css";
import PasswordIcon from "../../../assets/svg/lockIcon.svg";
import PasswordVisibleIcon from "../../../assets/svg/eyeIcon.svg";
import PasswordHiddenIcon from "../../../assets/svg/passwordHideIcon.svg";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updatePassword } from "../../../service/api";
import Image from "next/image";
import {
  BUTTON_LABELS,
  INPUT_TYPE,
  LOCAL_STORAGE,
  PLACEHOLDERS,
  ROUTES,
  TOAST_MESSAGES,
} from "../../../constants";
import ModalInput from "../../../components/modalInputComponent/ModalInput";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [resetAttempted, setResetAttempted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    return password.length >= 8;
  };
  const [email, setEmail] = useState("");
  const router = useRouter();

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

  console.log("email in reset pass", email);

  const getPasswordStrength = (password) => {
    if (password.length < 8) return "Weak";
    let strength = 0;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength < 3) return "Weak";
    if (strength < 4) return "Medium";
    return "Strong";
  };

  useEffect(() => {
    if (password) {
      const strength = getPasswordStrength(password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength("");
    }
  }, [password]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (resetAttempted) {
      validateFields(value, confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (resetAttempted) {
      validateFields(password, value);
    }
  };

  const validateFields = (pass, confirmPass) => {
    setPasswordError("");
    setConfirmPasswordError("");

    if (!validatePassword(pass)) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (getPasswordStrength(pass) === "Weak") {
      setPasswordError(
        "Password is too weak. Please choose a stronger password."
      );
    }

    if (pass !== confirmPass) {
      setConfirmPasswordError("Passwords do not match.");
    }
  };

  const handleSubmit = async () => {
    setResetAttempted(true);
    validateFields(password, confirmPassword);

    if (
      validatePassword(password) &&
      password === confirmPassword &&
      getPasswordStrength(password) !== "Weak"
    ) {
      try {
        setIsLoading(true);
        await updatePassword(email, password);
        toast.success(TOAST_MESSAGES.PASSWORD_RESET_SUCCESSFULL);
        router.push(ROUTES.SUCCESS_PASS_RESET);
        setIsLoading(false);
      } catch (error) {
        toast.error(FAILED_RESET_PASSWORD);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
        localStorage.removeItem(LOCAL_STORAGE.VERIFICATION_EMAIL);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md justify-center align-middle">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src={Logo} alt="Logo" />
          </div>
          <h1 className="mb-4 text-center">Reset Password</h1>
          <p className="text-lg text-center my-5">Enter new password</p>
          <div className="mt-5 relative">
            <ModalInput
              label={BUTTON_LABELS.NEW_PASSWORD}
              startIcon={PasswordIcon}
              endIcon={showPassword ? PasswordVisibleIcon : PasswordHiddenIcon}
              inputType={showPassword ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              placeholder={PLACEHOLDERS.ENTER_PASSWORD}
              onEndIconClick={togglePasswordVisibility}
            />
          </div>
          <div className="mt-5 mb-7">
            <ModalInput
              label={BUTTON_LABELS.CONFIRM_PASSWORD}
              startIcon={PasswordIcon}
              endIcon={
                showConfirmPassword ? PasswordVisibleIcon : PasswordHiddenIcon
              }
              inputType={
                showConfirmPassword ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD
              }
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={confirmPasswordError}
              placeholder={PLACEHOLDERS.RE_ENTER_PASSWORD}
              onEndIconClick={toggleConfirmPasswordVisibility}
            />
          </div>
          <CommonButton
            label={isLoading ? BUTTON_LABELS.LOADING : BUTTON_LABELS.RESET}
            onClick={handleSubmit}
            disabled={isLoading}
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
          // alt="Login Image"
          // layout="fill"
          // objectFit="cover"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
