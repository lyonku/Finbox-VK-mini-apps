import React, { useState } from "react";

import InactiveStar from "components/InactiveStar";
import ActiveStar from "components/ActiveStar";
import { Rating } from "react-simple-star-rating";

function CommentsForm({
  chosenGroup,
  review,
  currentGroup,
  addComment,
  addReply,
  handleRating,
  rating,
  setEditText,
  editText,
  handleBlockComment,
  animate,
}) {
  const [hover, setHover] = useState();

  const onPointerMove = (value) => {
    setHover(value);
  };

  const onPointerLeave = () => {
    setHover(rating);
  };
  return (
    <form
      className={`comments__feedback ${review}`}
      onSubmit={chosenGroup?.id != currentGroup?.id ? addComment : addReply}
    >
      {chosenGroup?.id != currentGroup?.id && (
        <>
          <div className="feedback-title">
            Ваша оценка и комментарий <br /> о компании Займер
          </div>
          <div className="feedback-rating">
            <Rating
              onClick={handleRating}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              transition
              className={
                animate.rate
                  ? "feedback-rating-item animate__animated animate__shakeX"
                  : "feedback-rating-item"
              }
              emptyIcon={<InactiveStar />}
              fillIcon={<ActiveStar rating={rating} hover={hover} />}
            />
          </div>
        </>
      )}
      <div className="feedback-textarea">
        <textarea
          className={
            animate.textarea
              ? "feedback-textarea-input animate__animated animate__shakeX"
              : "feedback-textarea-input"
          }
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          maxLength={2000}
        ></textarea>
      </div>
      <div className="feedback-submit">
        <input
          type="submit"
          value="Отправить"
          className="feedback-submit-btn"
        />
      </div>
      <div className="feedback-cancel">
        <input
          type="button"
          value="Отменить"
          className="feedback-cancel-btn"
          onClick={handleBlockComment}
        />
      </div>
    </form>
  );
}
export default CommentsForm;
