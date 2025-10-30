"use client";
import React from "react";
import Image from "next/image";

const CommonInput = ({
  id,
  label,
  startIcon,
  endIcon,
  inputType,
  value,
  onChange,
  error,
  onEndIconClick,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Image
              src={startIcon}
              alt="Start Icon"
              className="h-5 w-5 text-gray-400"
            />
          </div>
        )}
        <input
          type={inputType}
          id={id}
          value={value}
          onChange={onChange}
          className={`block w-full pl-10 pr-10 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:border-opacity-1 outline-none sm:text-sm`}
        />
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

export default CommonInput;
