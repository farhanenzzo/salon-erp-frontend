"use client";
import React, { useEffect, useState } from "react";
import TabsHeader from "../tabsHeader/TabsHeader";
import { NO_REVIEWS_YET, TABHEADER, TOAST_MESSAGES } from "../../constants";
import {
  listReviews,
  handleReplySubmit,
  handleReplyUpdate,
} from "../../service/api";
import ReviewCard from "../reviewCard/ReviewCard";
import Pagination from "../pagination/Pagination";
import toast from "react-hot-toast";
import { Skeleton } from "primereact/skeleton";

const ReviewsTab = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchReviews = async (page = 1) => {
    setIsLoading(true); // Start loading
    try {
      const response = await listReviews({ page, limit: paginationInfo.limit });
      console.log("response in reviews", response);
      if (response.success) {
        setReviews(response.reviews);
        setPaginationInfo(response.pagination); // Use `pagination` from response
      } else {
        console.error(TOAST_MESSAGES.ERROR_FETCHING_REVIEWS);
      }
    } catch (error) {
      console.error(TOAST_MESSAGES.ERROR_FETCHING_REVIEWS, error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReplySubmitClick = async (reviewId, reply) => {
    if (!reply) {
      toast.error(TOAST_MESSAGES.REPLY_CANNOT_BE_EMPTY);
      return;
    }

    try {
      const response = await handleReplySubmit(reviewId, reply);

      console.log("response in reply", response);

      if (response.success) {
        // Instead of manually updating the state, just fetch fresh data
        await fetchReviews();
        toast.success(TOAST_MESSAGES.REPLY_SUBMITTED);
      } else {
        toast.error(TOAST_MESSAGES.ERROR_SUBMITTING_REVIEWS);
      }
    } catch (error) {
      toast.error(TOAST_MESSAGES.ERROR_SUBMITTING_REVIEWS);
    }
  };

  const handleReplyUpdateClick = async (reviewId, replyId, updatedReply) => {
    if (!updatedReply) {
      toast.error(TOAST_MESSAGES.REPLY_CANNOT_BE_EMPTY);
      return;
    }

    try {
      const response = await handleReplyUpdate(reviewId, replyId, updatedReply);

      if (response.success) {
        await fetchReviews();
        toast.success(TOAST_MESSAGES.REPLY_UPDATED);
      }
    } catch (error) {
      toast.error(TOAST_MESSAGES.ERROR_UPDATING_REPLY);
    }
  };

  return (
    <div className="tabContainer">
      <TabsHeader heading={TABHEADER.CUSTOMER_REVIEWS} />
      {reviews.length === 0 && !isLoading && <h3>{NO_REVIEWS_YET}</h3>}

      {isLoading ? (
        <div className="flex gap-2">
          <Skeleton height={200} width={200} />
          <Skeleton height={200} width={200} />
        </div>
      ) : (
        <ReviewCard
          reviews={reviews}
          onReplySubmit={handleReplySubmitClick} // Pass the function
          onReplyUpdate={handleReplyUpdateClick}
        />
      )}
      {paginationInfo && paginationInfo.total > 0 && (
        <Pagination
          paginationInfo={paginationInfo}
          fetchData={fetchReviews}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ReviewsTab;
