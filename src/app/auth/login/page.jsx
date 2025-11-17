import Link from "next/link";
import { IMG_ALT, LOGIN_SCREEN, ROUTES } from "../../../constants";
// import Logo from "../../../assets/svg/brandSpinLogo.svg";
import Logo from "../../../assets/images/Grotech-04.svg";
import MainIMG from "../../../assets/images/authScreenBG.jpg";
import { loginInputData } from "../../../utils/data";
import LoginForm from "./LoginForm";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md justify-center align-middle">
          <div className="flex justify-center">
            <Image src={Logo} alt="Logo" className="w-60 h-60"/>
          </div>
          {/* <h1 className="mb-4 text-center">
            Welcome to <span className="text-customHeadOrange">Grotech</span>
          </h1> */}
          <p className="text-lg text-center">{LOGIN_SCREEN.LOGIN_TO_ACCOUNT}</p>
          <LoginForm loginInputData={loginInputData} />
          <p className="text-center mt-5 mb-3">
            Don't have an account?{" "}
            <Link className="text-customHeadOrange" href={ROUTES.SIGNUP}>
              Create your Saloon
            </Link>
          </p>
        </div>
        <div className="rightsReserved">
          <p className="text-center">@2025 Grotech All Rights Reserved.</p>
        </div>
      </div>
      <div className="flex-1 relative hidden md:block">
        <Image src={MainIMG} alt={IMG_ALT.HERO_IMG} className="mainIMG" />
      </div>
    </div>
  );
}
