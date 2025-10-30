import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ModalInput.module.css";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import IconIn from "../../assets/svg/actionsIcon.svg";
import FileUploadIcon from "../../assets/svg/fileUploadIcon.svg";

const ModalInput = ({
  id,
  label,
  startIcon,
  endIcon,
  onEndIconClick,
  inputType,
  value,
  onChange,
  placeholder,
  type,
  handleDateChange,
  handleTimeChange,
  handleClientIdChange,
  handleServiceChange,
  handleStylistChange,
  error,

  options,
  addIcon,
  handleAddButton,
  handleFileUpload,
  fileName,
  optionLabel,
  optionValue,
  currentImageUrl,
  onSelectRole,
  minDate,
  disabled = false,
}) => {
  const [selectedOption, setSelectedOption] = useState(value || "");
  const [selectedValue, setSelectedValue] = useState(value || []);
  const [time, setTime] = useState(value || "");
  const [date, setDate] = useState(value || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options || []);

  const calendarRef = useRef(null);

  const formattedOptions = options
    ? options.map((option) => ({
        label: option.label || option,
        value: option.value || option,
      }))
    : [];

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (label === "Customer ID") {
      handleClientIdChange(searchValue);
    } else {
      onChange(e);
      if (searchValue === "") {
        setFilteredOptions(options);
      } else {
        const newFilteredOptions = options.filter((option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredOptions(newFilteredOptions);
      }
    }
  };

  const handleMultiSelectChange = (e) => {
    setSelectedValue(e.value);
    onChange(e);
  };

  useEffect(() => {
    setSelectedOption(value);
    setSelectedValue(value || []);
    // setTime(value);
    setDate(value);
    setSearchTerm(value);
  }, [value]);

  const handleCalendarChange = (e) => {
    if (inputType === "time") {
      handleTimeChange(e);
    } else if (inputType === "date") {
      handleDateChange(e);
    } else {
      onChange(e);
    }
  };

  const formatDateValue = (val) => {
    if (!val) return null;
    if (typeof val === "string") {
      const date = new Date(val);
      return isNaN(date.getTime()) ? null : date;
    }
    return val;
  };

  const handleSvgClick = () => {
    document.getElementById(id).click();
  };

  const handleBlur = () => {
    if (calendarRef.current) {
      calendarRef.current.hide();
    }
  };

  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>

      <div className="relative w-full modalInput">
        {startIcon && inputType !== "dropdown" && inputType !== "file" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Image src={startIcon} alt="Start Icon" />
          </div>
        )}
        {addIcon && (
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-centerc cursor-pointer"
            onClick={handleAddButton}
          >
            <Image src={IconIn} alt="add Icon" />
          </div>
        )}

        {(inputType === "text" ||
          inputType === "number" ||
          inputType === "password" ||
          inputType === "email") && (
          <InputText
            type={inputType}
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            className={`${styles.inputContainer} ${startIcon ? "pl-10" : "pl-5"} ${
              error ? "border-red-500" : "border-gray-300"
            } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          />
        )}

        {inputType === "file" && (
          <div
            style={{ height: "3.3rem" }}
            className={`${styles.dropdownContainer}  flex items-center justify-between pr-2 overflow-hidden ${
              disabled ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          >
            {!fileName && currentImageUrl && (
              <Image
                src={currentImageUrl}
                alt="Current Image"
                width={30}
                height={30}
                className="rounded border object-contain"
              />
            )}
            <>
              <input
                type="file"
                id={id}
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-[80%]"
                accept="image/*"
              />
              <input
                type="text"
                value={fileName}
                readOnly
                placeholder={
                  currentImageUrl ? "Click to change" : "Upload image"
                }
                className="border-none bg-inherit pl-2 pr-2 flex-grow w-[70%]"
                disabled={disabled}
              />
              <Image
                src={FileUploadIcon}
                alt="Upload"
                onClick={handleSvgClick}
                className="flex ml-auto mr-2 cursor-pointer"
              />
            </>

            {/* Display preview if currentImageUrl is provided */}
          </div>
        )}

        {inputType === "multiSelect" && (
          <MultiSelect
            id={id}
            value={selectedValue}
            onChange={handleMultiSelectChange}
            options={formattedOptions}
            optionLabel="label"
            placeholder="Select options"
            disabled={disabled}
            className={`${styles.dropdownContainer} ${
              error ? "border-red-500" : "border-gray-300"
            } ${disabled ? "opacity-60" : ""}`}
          />
        )}

        {inputType === "search" && (
          <InputText
            id={id}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${styles.inputContainer} ${startIcon ? "pl-10" : "pl-3"} ${
              error ? "border-red-500" : "border-gray-300"
            } shadow-sm outline-none sm:text-sm ${
              disabled ? "bg-gray-100 cursor-not-allowed" : "bg-gray-100"
            }`}
            type="search"
          />
        )}

        {inputType === "date" && (
          <div className={styles.dateOnly}>
            <Calendar
              inputId="date"
              showIcon
              icon // minDate={new Date()}
              value={formatDateValue(value)}
              onChange={handleCalendarChange}
              className="w-full cursor-pointer"
              placeholder="Select a date"
              disabled={disabled}
              minDate={minDate ? new Date() : ""} // Use new Date() here to pass a Date object
            />
          </div>
        )}
        {inputType === "dateRangePicker" && (
          <div className={styles.dateOnly}>
            <Calendar
              inputId="date"
              minDate={new Date()}
              value={formatDateValue(value)}
              onChange={handleCalendarChange}
              selectionMode="range"
              className="w-full cursor-pointer"
              placeholder="Select a date"
              hideOnRangeSelection={true}
              disabled={disabled}
            />
          </div>
        )}

        {inputType === "time" && (
          <div className={styles.dateOnly}>
            <Calendar
              inputId="time"
              // minDate={new Date()}
              value={formatDateValue(value)}
              onChange={handleCalendarChange}
              ref={calendarRef}
              hide
              // hourFormat="12"
              onBlur={handleBlur}
              timeOnly={true}
              className="w-full cursor-pointer"
              placeholder="Select a time"
              disabled={disabled}
            />
          </div>
        )}

        {inputType === "dropdown" && (
          <Dropdown
            id={id}
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.value);
              onChange(e);
              // onSelectRole(e.value);

              if (
                label === "Service" &&
                typeof handleServiceChange === "function"
              ) {
                handleServiceChange(e);
              } else if (
                label === "Employee" &&
                typeof handleStylistChange === "function"
              ) {
                handleStylistChange(e);
              }
            }}
            options={options ? options : formattedOptions}
            optionValue={optionValue ? optionValue : null}
            optionLabel={optionLabel ? optionLabel : "label"}
            placeholder={placeholder ? placeholder : "Select an option"}
            disabled={disabled}
            className={`${styles.dropdownContainer} ${
              error ? "border-red-500" : "border-gray-300"
            } ${disabled ? "opacity-60" : ""}`}
            filter
          />
        )}

        {inputType === "textarea" && (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${styles.inputContainer} ${styles.noIcon} ${
              error ? "border-red-500" : "border-gray-300"
            } shadow-sm outline-none sm:text-sm ${
              disabled ? "bg-gray-100 cursor-not-allowed" : "bg-gray-100"
            }`}
          />
        )}
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Image
              src={endIcon}
              alt="End Icon"
              className="h-5 w-5 text-gray-400 cursor-pointer"
              onClick={onEndIconClick}
            />
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ModalInput;
