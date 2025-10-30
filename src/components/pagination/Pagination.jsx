import React from "react";
import { BUTTON_TYPE } from "../../constants";

const Pagination = ({ paginationInfo, fetchData }) => {
  const handlePageChange = async (newPage) => {
    if (
      newPage < 1 ||
      newPage > paginationInfo.totalPages ||
      newPage === paginationInfo.page
    )
      return;
    await fetchData(newPage);
  };
  console.log("pages", paginationInfo);
  return (
    <div className="flex items-center justify-between px-4 py-3 my-5">
      {/* Left side - Page info */}
      <div className="text-sm text-gray-700">
        Page <span className="font-medium">{paginationInfo.page}</span> of{" "}
        <span className="font-medium">{paginationInfo.totalPages}</span>
      </div>

      {/* Right side - Pagination buttons */}
      <div className="flex items-center gap-2">
        <button
        type={BUTTON_TYPE.BUTTON}
          onClick={() => handlePageChange(paginationInfo.page - 1)}
          disabled={paginationInfo.page === 1}
          className={`px-3 py-1 rounded border ${
            paginationInfo.page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-50"
          }`}
        >
          Previous
        </button>

        {/* Page numbers */}
        {Array.from({ length: paginationInfo.totalPages }, (_, i) => i + 1).map(
          (pageNum) => (
            <button
            type={BUTTON_TYPE.BUTTON}
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 rounded ${
                paginationInfo.page === pageNum
                  ? "bg-primaryColor text-white"
                  : "hover:bg-gray-50 border"
              }`}
            >
              {pageNum}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(paginationInfo.page + 1)}
          disabled={paginationInfo.page === paginationInfo.totalPages}
          className={`px-3 py-1 rounded border ${
            paginationInfo.page === paginationInfo.totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-50"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
