import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import "./Comments.css";
import firstReview from "img/firstReview.svg";
import Back from "img/chevron-back.svg";
import "animate.css";

import CommentsItem from "panels/Comments/components/CommentsItem";
import CommentsHeader from "./components/CommentsHeader";

import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
import { Context } from "../..";
import firebase from "firebase/compat/app";
import CommentsForm from "./components/CommentsForm";

const Comments = ({ currentGroup, user, groups, chosenGroup }) => {
  const [review, addReview] = useState("");
  const [rating, setRating] = useState(0);
  const [textReply, setTextReply] = useState();
  const [editText, setEditText] = useState();
  const [allComments, setAllComments] = useState(true);
  const [currentGroupRate, setCurrentGroupRate] = useState({});
  const [messagesReply, setMessagesReply] = useState(true);
  const [animate, setAnimate] = useState({});

  const commentsMainRef = useRef(null);
  const commentsHeaderRef = useRef(null);

  const { firestore } = useContext(Context);

  const [messages, loading] = useCollectionData(
    firestore.collection(currentGroup?.id + "").orderBy("createdAt", "desc")
  );

  const [messagesId, loadingMesId] = useCollection(
    firestore.collection(currentGroup?.id + "").orderBy("createdAt", "desc")
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
    let count = 0;
    for (let i = 0; i < messages?.length; i++) {
      if (messages[i]?.reply) {
        count += 1;
      }
    }
    if (count == messages?.length) {
      setMessagesReply(true);
    } else {
      setMessagesReply(false);
    }
  }, [messages]);

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
    if (rating && event.target[0].value) {
      firestore.collection(currentGroup.id + "").add({
        uid: user.id,
        displayName: user.first_name + " " + user.last_name[0] + ".",
        displayPhoto: user.photo_100,
        text: event.target[0].value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        rating: rating,
        reply: "",
        isModerated: false,
      });

      addReview(review === "active" ? "inactive" : "active");
    } else {
      setAnimate({
        textarea: !event.target[0].value ? true : false,
        rate: !rating ? true : false,
      });
    }
    setTimeout(() => setAnimate({ ...animate, rating: false }), 1000);

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

  const handleBlockComment = () => {
    addReview(review === "active" ? "inactive" : "active");
    setEditText("");
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  if (loading || !currentGroup) {
    return (
      <div className="loader-wrap">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="comments">
      <CommentsHeader
        Back={Back}
        currentGroup={currentGroup}
        currentGroupRate={currentGroupRate}
        commentsHeaderRef={commentsHeaderRef}
        messages={messages}
      />
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
          messages.map(
            (comment, index) =>
              (!allComments ? !comment.reply : allComments) && (
                <CommentsItem
                  index={index}
                  comment={comment}
                  group={currentGroup}
                  setTextReply={setTextReply}
                  handleBlockComment={handleBlockComment}
                  messagesIdMass={messagesIdMass}
                  chosenGroup={chosenGroup}
                  setEditText={setEditText}
                  key={index}
                />
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
        {messagesReply && !allComments && (
          <div className="comments__firstReview">
            <img className="comments__firstReview-img" />
            <div className="comments__firstReview-title">
              Неотвеченных отзывов нет
            </div>
            <div className="comments__firstReview-text">
              Вы ответили на все доступные отзывы, так держать!
            </div>
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
      <CommentsForm
        chosenGroup={chosenGroup}
        review={review}
        currentGroup={currentGroup}
        addComment={addComment}
        addReply={addReply}
        handleRating={handleRating}
        rating={rating}
        setEditText={setEditText}
        editText={editText}
        handleBlockComment={handleBlockComment}
        animate={animate}
      />
    </div>
  );
};

Comments.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Comments;
