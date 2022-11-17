import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import "./Comments.css";
import MemberLogo from "../../img/memberLogo.svg";
import firstReview from "../../img/firstReview.svg";
import Back from "../../img/chevron-back.svg";
import InactiveStarSmall from "./components/InactiveStarSmall";
import InactiveStar from "./components/InactiveStar";
import ActiveStar from "./components/ActiveStar";
import ActiveStarSmall from "./components/ActiveStarSmall";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Rating } from "react-simple-star-rating";
import { Context } from "../..";
import firebase from "firebase/compat";

const Offers = (props) => {
  const [review, addReview] = useState("");
  const [hover, setHover] = useState();
  const [rating, setRating] = useState(0);

  const commentsMainRef = useRef(null);
  const commentsHeaderRef = useRef(null);

  const { firestore } = useContext(Context);
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );

  useEffect(() => {
    if (review === "inactive" || review === "") return;

    const handleClick = (e) => {
      if (
        commentsMainRef.current.contains(e.target) ||
        commentsHeaderRef.current.contains(e.target)
      ) {
        handleBlockComment();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [review]);

  const addComment = async (event) => {
    firestore.collection("messages").add({
      uid: props.user.id,
      displayName: props.user.first_name + " " + props.user.last_name[0] + ".",
      displayPhoto: props.user.photo_50,
      text: event.target[0].value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      rating: rating,
    });

    addReview(review === "active" ? "inactive" : "active");
    event.preventDefault();
    // let text = event.target[0].value;
    // let date = new Date(Math.floor(Date.now() / 1000) * 1000);
    // let month = [
    //   "Января",
    //   "Февраля",
    //   "Марта",
    //   "Апреля",
    //   "Мая",
    //   "Июня",
    //   "Июля",
    //   "Августа",
    //   "Сентября",
    //   "Ноября",
    //   "Декабря",
    // ];

    // let comment = {
    //   name: props.user.first_name + " " + props.user.last_name[0] + ".",
    //   body: text,
    //   time: date.getDate() + " " + month[date.getMonth()],
    //   rating: rating,
    // };
    // props.comments.push(comment);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const onPointerMove = (value) => {
    setHover(value);
  };

  const onPointerLeave = () => {
    setHover(rating);
  };

  const handleBlockComment = () => {
    addReview(review === "active" ? "inactive" : "active");
  };

  const handleComment = (event, comment) => {
    event.target.parentElement.children[2].textContent = comment;
    event.target.style.display = "none";
  };

  // console.log(props.group);
  return (
    <div className="comments">
      <div className="comments__header" ref={commentsHeaderRef}>
        <img
          src={Back}
          alt="Back"
          className="header-back"
          onClick={props.go}
          data-to="offers"
        />
        <div className="member-logo">
          <img
            src={props.group?.photo_50}
            alt="Logo"
            className="member-logo-img"
          />
        </div>
        <div className="member-info">
          <div className="member-title">{props.group?.name}</div>
          <div className="member-about">
            <div className="member-reviews">12 отзывов</div>
            <div className="member-delimetr"></div>
            <div className="member-representatives">Есть представители</div>
          </div>
        </div>
      </div>
      <div className="wrap"></div>
      <div className="comments__main" ref={commentsMainRef}>
        {props.comments.length >= 1 ? (
          props.comments.map((comment, index) => (
            <div className="comments__item" key={index}>
              <div className="comments__item-avatar">
                <img
                  src={props.user ? props.user.photo_100 : ""}
                  className="comments__item-avatar-img"
                />
              </div>
              <div className="comments__item-other">
                <div className="comments__item-name">
                  {props.user?.first_name
                    ? props.user.first_name +
                      " " +
                      props.user.last_name[0] +
                      "."
                    : "Аноним"}
                </div>
                <div className="comments__item-dateAndRate">
                  <Rating
                    size={16}
                    readonly
                    initialValue={comment.rating}
                    emptyIcon={<InactiveStarSmall />}
                    fillIcon={<ActiveStarSmall color={comment.rating} />}
                  />
                  <div className="comments__item-date">{comment.time}</div>
                </div>
                <div className="comments__item-text">
                  {comment.body.length > 250
                    ? comment.body.slice(0, 250) + "..."
                    : comment.body}
                </div>
                {comment.body.length > 250 ? (
                  <div
                    className="comments__item-text-more"
                    onClick={() => handleComment(event, comment.body)}
                  >
                    Читать дальше
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="comments__firstReview">
            <img className="comments__firstReview-img" src={firstReview} />

            <div className="comments__firstReview-title">
              Ваш отзыв может стать первым
            </div>
            <div className="comments__firstReview-text">
              Об этой организации ещё никто не писал, и вы можете это изменить
            </div>
            <input
              type="button"
              value="Оставить отзыв"
              className="comments__firstReview-btn"
              onClick={handleBlockComment}
            />
          </div>
        )}
      </div>
      {props.comments.length >= 1 ? (
        <div className="comments__footer">
          <input
            type="button"
            value="Оставить отзыв"
            className="comments__footer-btn"
            onClick={handleBlockComment}
          />
        </div>
      ) : (
        ""
      )}
      <form className={`comments__feedback ${review}`} onSubmit={addComment}>
        <div className="feedback-title">
          Ваша оценка и комментарий <br /> о компании Займер
        </div>
        <div className="feedback-rating">
          <Rating
            onClick={handleRating}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            transition
            className="feedback-rating-item"
            emptyIcon={<InactiveStar />}
            fillIcon={<ActiveStar rating={rating} hover={hover} />}
          />
        </div>
        <div className="feedback-textarea">
          <textarea className="feedback-textarea-input"></textarea>
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
    </div>
  );
};

Offers.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Offers;
