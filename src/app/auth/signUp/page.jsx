"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import MainIMG from "../../../assets/images/authScreenBG.webp";
import Logo from "../../../assets/svg/brandSpinLogo.svg";
import CommonButton from "../../../components/commonButton/CommonButton";
import { createSaloonRequiredFields, signUpCompany } from "../../../utils/data";
import Link from "next/link";
import styles from "./module.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { COMPANY_ID, ROUTES, SIGNUP_SCREEN, TOAST_MESSAGES } from "../../../constants";
import { addCompany } from "../../../service/api";
import useForm from "../../../hooks/useForm";
import ModalInput from "../../../components/modalInputComponent/ModalInput";
import { validateInput } from "../../../validators/validateInputs";
import { Country, State, City } from "country-state-city";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [availableCities, setAvailableCities] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const router = useRouter();

  const initialFormData = {
    name: "",
    country: "",
    city: "",
    address: "",
  };

  const keyMap = {
    1: "name",
    2: "country",
    3: "city",
    4: "address",
  };

  const {
    formData,
    handleInputChange,
    resetForm,
    selectedCountry,
    selectedCity,
    handleCountryChange,
    handleCityChange,
  } = useForm(initialFormData, keyMap);

  useEffect(() => {
    if (selectedCountry) {
      const citiesOfCountry = City.getCitiesOfCountry(selectedCountry.isoCode);
      setAvailableCities(citiesOfCountry || []);
    } else {
      setAvailableCities([]);
    }
  }, [selectedCountry]);

  const handleAddNewCompany = async () => {
    const { error } = validateInput(formData, createSaloonRequiredFields);

    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await addCompany(formData);
      if (response.message) {
        const newCompanyId = response.company._id; // Get ID from response
        setCompanyId(response.company._id);
        toast.success(TOAST_MESSAGES.COMPANY_CREATED_SUCCESSFULLY);
        setCompanyId(newCompanyId); // Update state (though we don't need to wait for it)
        router.push(`${ROUTES.SIGNUP_SUPER_ADMIN}?${COMPANY_ID}=${newCompanyId}`);
        setLoading(false);
        resetForm();
      } else {
        toast.error(response.message || TOAST_MESSAGES.ERROR_ADDING_COMPANY);
      }
    } catch (error) {
      toast.error(TOAST_MESSAGES.ERROR_ADDING_COMPANY);
      console.error("Error adding company: ", error);
    }
  };

  console.log("company id in sign up", companyId);

  const countries = Country.getAllCountries();

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md justify-center align-middle">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src={Logo} alt="Logo" />
          </div>
          <h1 className="mb-4 text-center">Create Your Salon</h1>
          <p className="text-lg text-center">Setup your Salon profile</p>
          <div className={styles.inputContainer}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-9 mb-4">
              {signUpCompany.map((data) => {
                if (data.inputType === "dropdown" && data.key === "country") {
                  return (
                    <div key={data.id}>
                      <ModalInput
                        inputType="dropdown"
                        startIcon={data.icon}
                        placeholder={data.placeholder}
                        label={data.title}
                        name={data.key}
                        value={selectedCountry ? selectedCountry.isoCode : ""}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        options={countries.map((country) => ({
                          value: country.isoCode,
                          label: country.name,
                        }))}
                      />
                    </div>
                  );
                } else if (
                  data.inputType === "dropdown" &&
                  data.key === "city"
                ) {
                  return (
                    <div key={data.id}>
                      <ModalInput
                        inputType="dropdown"
                        startIcon={data.icon}
                        placeholder={data.placeholder}
                        label={data.title}
                        name={data.key}
                        value={selectedCity ? selectedCity.name : ""}
                        onChange={(e) => handleCityChange(e.target.value)}
                        options={availableCities.map((city) => ({
                          value: city.name,
                          label: city.name,
                        }))}
                        disabled={!selectedCountry}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={data.id}>
                      <ModalInput
                        inputType={data.inputType}
                        startIcon={data.icon}
                        placeholder={data.placeholder}
                        label={data.title}
                        name={data.key}
                        value={formData[data.key]}
                        onChange={(e) =>
                          handleInputChange(data.id, e.target.value)
                        }
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <CommonButton
            label={SIGNUP_SCREEN.CREATE_COMPANY_LABEL}
            onClick={handleAddNewCompany}
            loading={loading}
            disabled={loading}
            canEdit={true}
          />
          <p className="my-5 text-center">
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
          alt="Login Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Signup;
