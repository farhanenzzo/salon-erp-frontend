"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import MainIMG from "../../../assets/images/authScreenBG.webp";
import Logo from "../../../assets/svg/Grotech-04.svg";
import CommonButton from "../../../components/commonButton/CommonButton";
import { singUpInputData } from "../../../utils/data";
import Link from "next/link";
import styles from "./module.css";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../../firebase.config";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import {
  COMPANY_ID,
  DEFAULT_PROFILE_IMAGE_URL,
  IMG_ALT,
  ROUTES,
  SIGNUP_SCREEN,
  TOAST_MESSAGES,
} from "../../../constants";
import { signUpUser } from "../../../service/api";
import ModalInput from "../../../components/modalInputComponent/ModalInput";
import { getFirebaseErrorMessage } from "../../../helpers/firebaseErrorHandler";

const SignUpSuperAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  const router = useRouter();

  const searchParams = useSearchParams();

  // Use useEffect to handle the companyId
  useEffect(() => {
    const id = searchParams.get(COMPANY_ID);
    setCompanyId(id);

    if (!id) {
      router.push(ROUTES.SIGNUP);
    }
  }, [searchParams]);

  console.log("company id in super admin", companyId);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Verify email
      await sendEmailVerification(user);

      await auth.signOut();

      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: DEFAULT_PROFILE_IMAGE_URL,
      }).catch((err) => console.log(err));

      await signUpUser({
        firebaseUid: user.uid,
        email: email,
        name: username,
        userProfile: DEFAULT_PROFILE_IMAGE_URL,
        companyId: companyId,
        // role: USER_ROLES.SUPER_ADMIN,
      });
      setIsLoading(false);
      toast.success(TOAST_MESSAGES.SIGNUP_SUCCESS);
      router.push(ROUTES.EMAIL_VERIFY_ROUTE);
    } catch (error) {
      setIsLoading(false);
      const errorMessage = getFirebaseErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md justify-center align-middle">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src={Logo} alt="Logo" className="w-60 h-60"/>
          </div>
          {/* <h1 className="mb-4 text-center">Create Your Admin Account</h1> */}
          <div className={styles.inputContainer}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-9 mb-4">
              {singUpInputData.map((data) => (
                <ModalInput
                  key={data.id}
                  id={data.id}
                  placeholder={data.title}
                  label={data.title}
                  startIcon={data.icon}
                  endIcon={data.endIcon}
                  // inputType={data.inputType}
                  inputType={
                    data.title === "Password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : data.title === "Confirm Password"
                        ? showConfirmPassword
                          ? "text"
                          : "password"
                        : data.inputType
                  }
                  onChange={(e) => {
                    if (data.title === "Username") setUserName(e.target.value);
                    if (data.title === "Email") setEmail(e.target.value);
                    if (data.title === "Password") setPassword(e.target.value);
                    if (data.title === "Confirm Password")
                      setConfirmPassword(e.target.value);
                  }}
                  onEndIconClick={
                    data.title === "Password"
                      ? togglePasswordVisibility
                      : data.title === "Confirm Password"
                        ? toggleConfirmPasswordVisibility
                        : null
                  }
                />
              ))}
            </div>
          </div>

          <CommonButton
            label={SIGNUP_SCREEN.CREATE_ADMIN_LABEL}
            onClick={handleSignup}
            canEdit={true}
            loading={isLoading}
          />
          <p className="my-5 text-center">
            Already have an account?{" "}
            <Link className="text-customHeadOrange" href={ROUTES.LOGIN}>
              Login
            </Link>
          </p>
        </div>
        <div className="rightsReserved">
          <p className="text-center">@2025 Grotech All Rights Reserved.</p>
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

export default SignUpSuperAdmin;
