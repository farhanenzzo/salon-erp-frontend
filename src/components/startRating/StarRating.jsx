import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) => (
        <span key={index}>
          {index < rating ? (
            <FaStar color="gold" />
          ) : (
            <FaRegStar color="gray" />
          )}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
