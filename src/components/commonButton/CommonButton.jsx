"use client";
import React from "react";
import styles from "./CommonButton.module.css";
import { useRouter } from "next/navigation";
import { BUTTON_LABELS } from "../../constants";

/**
 * CommonButton Component
 *
 * A reusable button component with customizable styles, hover effects, and loading state.
 *
 * @param {Object} props
 * @param {string} props.label - The text displayed on the button.
 * @param {string} props.bgColor - Background color of the button.
 * @param {string} props.textColor - Text color of the button.
 * @param {string} props.borderClr - Border color of the button.
 * @param {number|string} props.borderWidth - Width of the button's border.
 * @param {string} props.link - URL to navigate to when the button is clicked.
 * @param {Function} [props.onClick] - Callback function triggered on button click.
 * @param {boolean} [props.disabled=false] - Disables the button if set to true.
 * @param {boolean} [props.loading=false] - Displays a loading state if set to true.
 * @param {string} [props.loadingLabel] - Custom label for the loading state.
 * @param {number|string} props.paddingBlock - Vertical padding inside the button.
 * @param {number|string} props.paddingInline - Horizontal padding inside the button.
 * @param {number|string} props.width - Width of the button.
 * @param {string} props.type - HTML button type (e.g., "button", "submit").
 * @param {boolean} [props.canEdit=true] - Controls the rendering of the button.
 *
 * @returns {JSX.Element|null} The rendered button element or null if canEdit is false.
 */
const CommonButton = ({
  label,
  bgColor,
  textColor,
  borderClr,
  borderWidth,
  link,
  onClick,
  disabled = false,
  loading = false,
  loadingLabel,
  paddingBlock,
  paddingInline,
  width,
  type,
  canEdit = true,
}) => {
  const router = useRouter();

  // Inline styles for the button
  const buttonStyles = {
    width: width,
    paddingInline: paddingInline,
    paddingBlock: paddingBlock,
    borderWidth: borderWidth,
    borderColor: borderClr,
    backgroundColor: bgColor,
    color: textColor,
    opacity: disabled || loading ? 0.5 : 1,
    cursor: disabled || loading ? "not-allowed" : "pointer",
    transition: "all 0.3s ease", // Smooth transition for hover effects
  };

  // Handle button click
  const handleClick = (e) => {
    if (disabled || loading) return; // Prevent click if loading

    if (onClick) {
      onClick(e);
    } else if (link) {
      router.push(link);
    }
  };

  // Do not render the button if canEdit is false
  if (!canEdit) return null;

  return (
    <button
      className={styles.commonButtonCls}
      style={buttonStyles}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? BUTTON_LABELS.LOADING : label}
    </button>
  );
};

export default CommonButton;
