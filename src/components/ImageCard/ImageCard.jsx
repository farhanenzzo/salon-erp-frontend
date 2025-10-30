import Image from "next/image";
import React from "react";
import { DEFAULT_PROFILE_IMAGE_URL } from "../../constants";
import styles from "./ImageCard.module.css";
import { Skeleton } from "primereact/skeleton";

const ImageCard = ({
  data,
  selectedCategory,
  setSelectedCategory,
  loading,
}) => {
  console.log("data in image card", data);

  const handleSelectCategory = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  console.log("selected category", selectedCategory);

  return (
    <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
      {loading && data.length !== 0 ? (
        // Render 5 Skeleton placeholders when loading
        Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex-shrink-0 w-[150px]">
            <div className="w-full h-[150px]">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="mt-2 mb-4">
              <Skeleton width="70%" height="1.5rem" />
            </div>
          </div>
        ))
      ) : data.length === 0 ? (
        <h3>No categories to display</h3>
      ) : (
        data.map((category) => (
          <div key={category._id} className="flex-shrink-0 w-[150px]">
            <div className="rounded-lg overflow-hidden w-full">
              <div className="w-full h-[150px] relative">
                {" "}
                <Image
                  src={category.image || DEFAULT_PROFILE_IMAGE_URL}
                  alt={category.name}
                  fill
                  className="object-cover rounded-md cursor-pointer"
                  onClick={() => handleSelectCategory(category._id)}
                  onError={(e) => (e.target.src = DEFAULT_PROFILE_IMAGE_URL)}
                  loading="lazy"
                />
              </div>
              <div className="text-center mt-2 mb-4">
                <h3
                  className={`${selectedCategory === category._id ? styles.selectedCategory : null} text-xl font-semibold text-gray-800 truncate`}
                >
                  {category.name}
                </h3>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ImageCard;
