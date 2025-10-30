"use client";
import React, { useState, useEffect } from "react";
import { generalSettingsInputFields } from "../../../utils/data";
import ModalInput from "../../modalInputComponent/ModalInput";
import styles from "./GeneralSettings.module.css";
import CommonButton from "../../commonButton/CommonButton";
import useForm from "../../../hooks/useForm";
import {
  BUTTON_LABELS,
  COMPANY_KEYMAP,
  PLACEHOLDERS,
} from "../../../constants";
import { City, Country } from "country-state-city";
import { updateCompany } from "../../../service/api";
import useModulePermissions from "../../../hooks/useModulePermissions";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyDetails } from "../../../redux/thunks/company";
import { setCompanyDetails } from "../../../redux/slices/company";

const GeneralSettings = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [compantDetails, setCompanyData] = useState([]);

  const countries = Country.getAllCountries();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanyDetails()); // Fetch data on mount
  }, [dispatch]);

  const company = useSelector((state) => state.company);
  const loading = useSelector((state) => state.company.loading);

  const initialFormData = {
    name: "",
    country: "",
    city: "",
    address: "",
  };

  const keyMap = {
    1: COMPANY_KEYMAP.NAME,
    2: COMPANY_KEYMAP.COUNTRY,
    3: COMPANY_KEYMAP.CITY,
    4: COMPANY_KEYMAP.ADDRESS,
  };

  const {
    formData,
    setFormData,
    selectedCountry,
    setSelectedCity,
    setSelectedCountry,
    handleCountryChange,
    handleCityChange,
  } = useForm(initialFormData, keyMap);

  useEffect(() => {
    if (selectedCountry) {
      const citiesOfCountry =
        City.getCitiesOfCountry(selectedCountry.isoCode) || [];
      setCities(citiesOfCountry);
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (isMounted && company) {
      setFormData({
        ...formData,
        name: company.name || "",
        country: company.country || "",
        city: company.city || "",
        address: company.address || "",
      });

      setIsLoading(false);

      const countryObj = countries.find(
        (c) => c.name.toLowerCase() === company.country.toLowerCase()
      );
      if (countryObj) {
        setSelectedCountry(countryObj);

        const citiesOfCountry =
          City.getCitiesOfCountry(countryObj.isoCode) || [];
        setCities(citiesOfCountry);

        const cityObj = citiesOfCountry.find(
          (c) => c.name.toLowerCase() === company.city.toLowerCase()
        );
        if (cityObj) {
          setSelectedCity(cityObj);
          formData.city = cityObj.name;
        }
      }
    }
  }, [isMounted, company]);

  const updateCompanyDetails = async () => {
    try {
      const response = await updateCompany(formData);

      // Check if the response was successful
      if (response.success) {
        dispatch(setCompanyDetails(response.data));

        // If successful, update the company details in the state
        setCompanyData(response.data);
        toast.success(response.message); // Show success toast
      } else {
        // If unsuccessful, show the error message from the response
        toast.error(response.message); // Show error toast
      }
    } catch (error) {
      console.log("Error updating company details", error);
      toast.error(response.message);
    }
  };

  const { canEdit } = useModulePermissions();

  if (!isMounted) return null; // Don't render on the server

  return (
    <>
      <div className="tabContainer">
        <div className={styles.inputContainer}>
          {generalSettingsInputFields.map((field) => (
            <div
              key={field.id}
              className={`${field.key === "address" ? styles.address : ""} ${
                styles.inputFields
              }`}
            >
              {field.key === COMPANY_KEYMAP.COUNTRY ? (
                <ModalInput
                  id={field.id}
                  label={field.label}
                  inputType={field.type}
                  options={countries.map((country) => ({
                    value: country.isoCode,
                    label: country.name,
                  }))}
                  value={selectedCountry ? selectedCountry.isoCode : ""}
                  placeholder={
                    isLoading
                      ? PLACEHOLDERS.LOADING
                      : PLACEHOLDERS.SELECT_COUNTRY
                  }
                  onChange={(e) => handleCountryChange(e.target.value)}
                />
              ) : field.key === COMPANY_KEYMAP.CITY ? (
                <ModalInput
                  id={field.id}
                  label={field.label}
                  inputType={field.type}
                  options={cities.map((city) => ({
                    value: city.name,
                    label: city.name,
                  }))}
                  value={formData.city}
                  placeholder={
                    isLoading ? PLACEHOLDERS.LOADING : PLACEHOLDERS.SELECT_CITY
                  }
                  onChange={(e) => {
                    handleCityChange(e.target.value);
                    setFormData({ ...formData, city: e.target.value });
                  }}
                  disabled={!selectedCountry}
                />
              ) : (
                <ModalInput
                  id={field.id}
                  label={field.label}
                  inputType={field.type}
                  value={formData[field.key] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                />
              )}
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <CommonButton
            label={BUTTON_LABELS.SAVE}
            canEdit={canEdit}
            width="max-content"
            onClick={updateCompanyDetails}
          />
        </div>
      </div>
      {/* <div className="tabContainer" style={{ marginTop: "1rem" }}>
        <h2>{PAGE_HEADING.DELETE_ACCOUNT}</h2>
        <div className={styles.deleteAccountContainer}>
          <h6>{PAGE_PARA.DELETE_ACCOUNT}</h6>
          <p>{PAGE_PARA.ONCE_YOU_DELETE}</p>
        </div>
        <div className={styles.confirmBox}>
          <input
            type="checkbox"
            className={`form-checkbox h-3 w-3 text-customHeadOrange rounded-lg focus:ring-customHeadOrange border-gray-300 ${styles.custom_radio}`}
          />{" "}
          <p>{PAGE_PARA.CONFIRM_DEACTIVATION}</p>
        </div>
        <div style={{ width: "max-content", marginTop: "1rem" }}>
          <CommonButton
            label={SETTINGS_TAB.DELETE_ACCOUNT_LABEL}
            bgColor="#E71C1C"
            textColor="white"
            canEdit={canEdit}
          />
        </div>
      </div> */}
    </>
  );
};

export default GeneralSettings;
