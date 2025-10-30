import React, { useState, useRef, useEffect } from "react";
import styles from "./ReviewCard.module.css";
import Image from "next/image";
import { DEFAULT_PROFILE_IMAGE_URL, IMG_ALT } from "../../constants";
import StarRating from "../startRating/StarRating";
import SendButton from "../../assets/svg/send.svg";
import EditReply from "../../assets/svg/replyEditIcon.svg";

const ReviewCard = ({ reviews, onReplySubmit, onReplyUpdate, isLoading }) => {
  const [replies, setReplies] = useState({}); // Track replies for each review
  const [editingReviewId, setEditingReviewId] = useState(null); // Track the review being edited
  const [editingReplyId, setEditingReplyId] = useState(null); // Track the reply being edited

  const textareaRefs = useRef({}); // Store refs for each review's textarea

  const handleReplyChange = (reviewId, value) => {
    setReplies((prevReplies) => ({
      ...prevReplies,
      [reviewId]: value, // Update the reply for the specific review
    }));
  };

  const handleEditClick = (reviewId, replyId, replyMessage) => {
    setEditingReviewId(reviewId); // Set the reviewId being edited
    setEditingReplyId(replyId); // Set the replyId being edited
    setReplies((prevReplies) => ({
      ...prevReplies,
      [reviewId]: replyMessage, // Set the existing reply in the input for editing
    }));
  };

  const handleReplySubmitClick = async (reviewId) => {
    const reply = replies[reviewId];
    if (editingReviewId === reviewId && editingReplyId) {
      // Update existing reply
      await onReplyUpdate(reviewId, editingReplyId, reply); // Call function to update reply in the backend
    } else {
      // Submit new reply
      await onReplySubmit(reviewId, reply); // Use the passed function for submitting new replies
    }
    setReplies((prevReplies) => ({
      ...prevReplies,
      [reviewId]: "",
    }));
    setEditingReviewId(null); // Reset editing state
    setEditingReplyId(null); // Reset reply being edited
  };

  // Automatically focus on the correct textarea when the reply message is set (during edit)
  useEffect(() => {
    if (editingReviewId !== null && textareaRefs.current[editingReviewId]) {
      textareaRefs.current[editingReviewId].focus(); // Focus on the specific review's textarea
    }
  }, [editingReviewId]); // Trigger focus when the review is being edited

  return (
    <div className={styles.reviewWrapper}>
      {reviews.map((review) => (
        <div className={styles.reviewCard} key={review._id}>
          {/* Header section with image, name, and relative date */}
          <div className={styles.headerDetails}>
            <Image
              src={review.clientId?.photo || DEFAULT_PROFILE_IMAGE_URL} // Use a fallback image
              className={styles.reviewImage}
              width={40}
              height={40}
              alt={IMG_ALT.REVIEW_IMAGE}
            />
            <div className={styles.reviewInfo}>
              <div className={styles.nameAndRating}>
                <div className={styles.reviewName}>
                  {review?.clientId?.name}
                </div>
                <StarRating rating={review?.rating} />
              </div>
              {review?.createdAtRelative}
            </div>
          </div>

          <div className={styles.comment}>
            <p className={styles.commentText}>{review?.comment}</p>

            {/* Map through replies and display each reply */}
            {review.replies && review.replies.length > 0 && (
              <div className={styles.replyContainer}>
                {review.replies.map((reply) => (
                  <div key={reply._id} className={styles.replyItem}>
                    {/* <div>
                      <Image
                        src={reply?.companyProfile}
                        alt=""
                        // className={styles.companyProfile}
                        width={30}
                        height={30}
                      />
                    </div> */}

                    <div className={styles.replyMessage}>
                      <p>{reply?.replyMessage}</p> {/* Display reply message */}
                      <Image
                        src={EditReply}
                        alt=""
                        className={styles.editIcon}
                        onClick={() =>
                          handleEditClick(
                            review._id,
                            reply._id,
                            reply.replyMessage
                          )
                        } // Trigger edit mode
                      />
                    </div>
                    <div className={styles.replyTimestamp}>
                      {/* {new Date(reply.repliedAt).toLocaleString()}{" "} */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reply Input Section */}
          <div className={styles.replySection}>
            <textarea
              ref={(el) => (textareaRefs.current[review._id] = el)} // Assign dynamic ref for each review's textarea
              value={replies[review._id] || ""}
              onChange={(e) => handleReplyChange(review._id, e.target.value)}
              placeholder="Reply"
              rows="3"
              className={styles.replyInput}
            />
            <button
              className={styles.replyButton}
              onClick={() => handleReplySubmitClick(review._id)} // Submit or update reply
            >
              <Image src={SendButton} alt="" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;
