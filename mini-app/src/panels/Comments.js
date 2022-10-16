import React, { useState } from "react";
import PropTypes from "prop-types";

import "../panels/Comments.css";
import MemberLogo from "../img/memberLogo.svg";
import Back from "../img/chevron-back.svg";
import Rating from "@material-ui/lab/Rating";

const Offers = (props) => {
  const [review, addReview] = useState();
  const [value, setValue] = useState(2);

  return (
    <div className="comments">
      <Rating />
      <div className="comments__header">
        <img
          src={Back}
          alt="Back"
          className="header-back"
          onClick={props.go}
          data-to="offers"
        />
        <div className="member-logo">
          <img src={MemberLogo} alt="Logo" className="member-logo-img" />
        </div>
        <div className="member-info">
          <div className="member-title">Займер</div>
          <div className="member-about">
            <div className="member-reviews">12 отзывов</div>
            <div className="member-delimetr"></div>
            <div className="member-representatives">Есть представители</div>
          </div>
        </div>
      </div>
      <div className="comments__main"></div>
      <div className="comments__footer">
        <input
          type="button"
          value="Оставить отзыв"
          className="comments__footer-btn"
          onClick={() => addReview(review === "active" ? "inactive" : "active")}
        />
      </div>
      <div className={`comments__feedback ${review}`}>
        <div className="feedback-title">
          Ваша оценка и комментарий <br /> о компании Займер
        </div>
        <div className="feedback-rating"></div>
        <div className="feedback-textarea">
          <textarea className="feedback-textarea-input"></textarea>
        </div>
        <div className="feedback-submit">
          <input
            type="button"
            value="Отправить"
            className="feedback-submit-btn"
          />
        </div>
        <div className="feedback-cancel">
          <input
            type="button"
            value="Отменить"
            className="feedback-cancel-btn"
            onClick={() =>
              addReview(review === "active" ? "inactive" : "active")
            }
          />
        </div>
      </div>
    </div>
  );
};

Offers.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Offers;
