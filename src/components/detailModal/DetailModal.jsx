import React from "react";
import Image from "next/image";
import { IMG_ALT } from "../../constants";
import { formatPrice } from "../../helpers/formatPrice";
import PopupCloseBTN from "../../assets/svg/popupCloseBTN.svg";

const DetailModal = ({
  isOpen,
  onClose,
  offerDetail,
  detailData,
  detailFields,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
      <div className="relative bg-white rounded-lg w-[1200px] z-[51]">
        <button
          className="absolute right-4 top-4 hover:opacity-70 transition-opacity"
          onClick={onClose}
        >
          <Image src={PopupCloseBTN} alt="Popup close" />
        </button>

        <div className="flex gap-8 p-6">
          <div className="w-[600px] h-[600px] flex items-center justify-center bg-gray-50">
            <div className="relative w-full h-full">
              <Image
                src={offerDetail ? detailData.image : detailData.serviceImage}
                alt={IMG_ALT.DETAIL_IMG}
                fill
                className="object-contain"
                sizes="(max-width: 600px) 100vw, 600px"
              />
            </div>
          </div>

          <div className="flex-1 space-y-4 py-2 flex flex-col justify-center">
            {detailFields.map(({ label, key, className, showLabel = true }) => (
              <div key={label}>
                {showLabel && (
                  <h2 className="text-gray-700 font-medium mb-2">{label}</h2>
                )}

                {key === "url" ? (
                  <a
                    href={detailData[key]}
                    className={`${className || ""} link`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {detailData[key]}
                  </a>
                ) : key === "dateRange" ? (
                  <p className={`${className || ""}`}>
                    {detailData[key]?.start && detailData[key]?.end
                      ? `${detailData[key].start} - ${detailData[key].end}`
                      : "No date range available"}
                  </p>
                ) : (
                  <p
                    className={`w-[70%] ${className || ""} ${
                      label === "Status"
                        ? detailData[key] === "Active"
                          ? "status positive_status w-max"
                          : "status negative_status w-max"
                        : ""
                    }`}
                  >
                    {key === "price"
                      ? formatPrice(detailData[key])
                      : detailData[key]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
