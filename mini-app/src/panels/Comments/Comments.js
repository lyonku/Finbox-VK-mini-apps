import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import "./Comments.css";
import firstReview from "img/firstReview.svg";
import Back from "img/chevron-back.svg";
import InactiveStar from "components/InactiveStar";
import ActiveStar from "components/ActiveStar";
import ActiveStarSmall from "components/ActiveStarSmall";
import CommentsItem from "components/CommentsItem";

import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
import { Rating } from "react-simple-star-rating";
import { Context } from "../..";
import firebase from "firebase/compat";

const Comments = ({ go, currentGroup, user, groups, chosenGroup }) => {
  const [review, addReview] = useState("");
  const [hover, setHover] = useState();
  const [rating, setRating] = useState(0);
  const [textReply, setTextReply] = useState();
  const [editText, setEditText] = useState();
  const [allComments, setAllComments] = useState(true);
  const [currentGroupRate, setCurrentGroupRate] = useState({});

  const commentsMainRef = useRef(null);
  const commentsHeaderRef = useRef(null);
  const plural = require("plural-ru");

  const { firestore } = useContext(Context);

  const [messages, loading] = useCollectionData(
    firestore.collection(currentGroup?.id + "")
  );

  const [messagesId, loadingMesId] = useCollection(
    firestore.collection(currentGroup?.id + "")
  );

  let messagesIdMass = [];

  messagesId?.forEach((element, index) => {
    messagesIdMass.push(element.id);
  });

  useEffect(() => {
    if (review === "inactive" || review === "") return;

    const handleClick = (e) => {
      if (
        commentsMainRef?.current?.contains(e.target) ||
        commentsHeaderRef?.current?.contains(e.target)
      ) {
        handleBlockComment();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [review]);

  useEffect(() => {
    const handleCommentCount = () => {
      for (let i = 0; i < groups?.length; i++) {
        if (groups[i]?.id == currentGroup?.id) {
          setCurrentGroupRate({
            averageRating: groups[i].averageRating,
            reviewsCount: groups[i].reviewsCount,
          });
        }
      }
    };
    handleCommentCount();
  }, [groups]);

  const addComment = async (event) => {
    firestore.collection(currentGroup.id + "").add({
      uid: user.id,
      displayName: user.first_name + " " + user.last_name[0] + ".",
      displayPhoto: user.photo_100,
      text: event.target[0].value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      rating: rating,
    });

    addReview(review === "active" ? "inactive" : "active");
    event.preventDefault();
  };

  const addReply = async (event) => {
    firestore
      .collection(currentGroup.id + "")
      .doc(textReply + "")
      .update({ reply: event.target[0].value });
    addReview(review === "active" ? "inactive" : "active");
    event.preventDefault();
  };

  const onPointerMove = (value) => {
    setHover(value);
  };

  const onPointerLeave = () => {
    setHover(rating);
  };

  const handleBlockComment = () => {
    addReview(review === "active" ? "inactive" : "active");
    setEditText("");
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleComment = (event, comment) => {
    event.target.parentElement.children[2].textContent = comment;
    event.target.style.display = "none";
  };

  let months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];

  const getDate = (date) => {
    let newDate = new Date(date * 1000);
    return newDate.getDate() + " " + months[newDate.getMonth()];
  };

  const fillColorArray = [
    "#FF6B77",
    "#FF6B77",
    "#FFA735",
    "#37C99E",
    "#37C99E",
  ];

  if (loading || !currentGroup) {
    return (
      <div className="loader-wrap">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="comments">
      <div className="comments__header" ref={commentsHeaderRef}>
        <img
          src={Back}
          alt="Back"
          className="header-back"
          onClick={go}
          data-to="offers"
          data-page="comments"
        />
        <div className="member-logo">
          <img
            src={currentGroup?.photo_50}
            alt="Logo"
            className="member-logo-img"
          />
        </div>
        <div className="member-info">
          <div className="member-title">{currentGroup?.name}</div>
          <div className="member-about">
            <div
              className="member-rating"
              style={{
                color:
                  fillColorArray[
                    Math.floor(Number(currentGroupRate?.averageRating)) - 1
                  ],
              }}
            >
              {
                <ActiveStarSmall
                  color={Math.floor(Number(currentGroupRate?.averageRating))}
                  height={14}
                  style={{ marginTop: -2 }}
                />
              }
              {currentGroupRate?.averageRating}
            </div>
            <div className="member-reviews">
              {messages.length +
                " " +
                plural(messages.length, "отзыв", "отзывa", "отзывов")}
            </div>
            <div className="member-delimetr"></div>
            <div className="member-representatives">Есть представители</div>
          </div>
        </div>
      </div>
      <div className="wrap"></div>
      <div
        className={`comments__main ${
          chosenGroup?.id == currentGroup?.id && "chosenGroup"
        }`}
        ref={commentsMainRef}
      >
        {chosenGroup?.id == currentGroup?.id && (
          <div className="comments__change">
            <div
              className={`comments__change-item ${allComments && "current"}`}
              onClick={() => {
                setAllComments(true);
              }}
            >
              Все
            </div>
            <div
              className={`comments__change-item-noReply ${
                !allComments && "current"
              }`}
              onClick={() => {
                setAllComments(false);
              }}
            >
              Неотвеченные
            </div>
          </div>
        )}
        {messages.length >= 1 ? (
          messages.map((comment, index) =>
            !allComments && !comment.reply ? (
              <CommentsItem
                index={index}
                comment={comment}
                handleComment={handleComment}
                group={currentGroup}
                setTextReply={setTextReply}
                handleBlockComment={handleBlockComment}
                messagesIdMass={messagesIdMass}
                chosenGroup={chosenGroup}
                setEditText={setEditText}
                getDate={getDate}
                key={index}
              />
            ) : (
              allComments && (
                <CommentsItem
                  index={index}
                  comment={comment}
                  handleComment={handleComment}
                  group={currentGroup}
                  setTextReply={setTextReply}
                  handleBlockComment={handleBlockComment}
                  messagesIdMass={messagesIdMass}
                  chosenGroup={chosenGroup}
                  setEditText={setEditText}
                  getDate={getDate}
                  key={index}
                />
              )
            )
          )
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
      {messages.length >= 0 && chosenGroup?.id != currentGroup?.id && (
        <div className="comments__footer">
          <input
            type="button"
            value="Оставить отзыв"
            className="comments__footer-btn"
            onClick={handleBlockComment}
          />
        </div>
      )}

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
                className="feedback-rating-item"
                emptyIcon={<InactiveStar />}
                fillIcon={<ActiveStar rating={rating} hover={hover} />}
              />
            </div>
          </>
        )}
        <div className="feedback-textarea">
          <textarea
            className="feedback-textarea-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
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
    </div>
  );
};

Comments.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Comments;
