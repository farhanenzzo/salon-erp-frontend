"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase.config";
import { loginUser, storeToken } from "../../../service/api";
import { LOGIN_SCREEN, ROUTES } from "../../../constants";
import CommonButton from "../../../components/commonButton/CommonButton";
import ModalInput from "../../../components/modalInputComponent/ModalInput";
import ShowPassIcon from "../../../assets/svg/eyeIcon.svg";
import { getFirebaseErrorMessage } from "../../../helpers/firebaseErrorHandler";

export default function LoginForm({ loginInputData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignin = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user.emailVerified) {
        const token = await user.getIdToken();
        await storeToken(token);
        const loginResult = await loginUser({ email, password });
        console.log("login result", loginResult);
        if (loginResult.success) {
          toast.success(LOGIN_SCREEN.SUCCESS_SIGNIN_TOAST);
          router.push(ROUTES.DASHBOARD);
        } else {
          toast.error(loginResult.message || LOGIN_SCREEN.SIGNIN_FAILED_TOAST);
        }
      } else {
        toast.error(LOGIN_SCREEN.VERIFY_EMAIL_TOAST);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      const errorMessage = getFirebaseErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
      {loginInputData.map((data) => (
        <div key={data.id} className="mt-5">
          <ModalInput
            id={data.id}
            placeholder={data.placeholder}
            label={data.title}
            startIcon={data.icon}
            endIcon={
              showPassword && data.inputType === "password"
                ? ShowPassIcon
                : data.endIcon
            }
            inputType={
              data.title === "Password"
                ? showPassword
                  ? "text"
                  : "password"
                : data.inputType
            }
            onChange={(e) =>
              data.title === "Email"
                ? setEmail(e.target.value)
                : setPassword(e.target.value)
            }
            onEndIconClick={
              data.title === "Password" ? togglePasswordVisibility : undefined
            }
          />
        </div>
      ))}
      <Link href={ROUTES.FORGOT_PASSWORD}>
        <p className="text-customHeadOrange text-right my-5">
          {LOGIN_SCREEN.FORGOT_PASSWORD}
        </p>
      </Link>
      <CommonButton
        label={LOGIN_SCREEN.LOGIN_LABEL}
        loading={isLoading}
        onClick={handleSignin}
        disabled={isLoading}
        canEdit={true}
      />
    </>
  );
}
