import VerificationStar from "img/verificationStar.svg";
import InactiveStarSmall from "components/InactiveStarSmall";
import ActiveStarSmall from "components/ActiveStarSmall";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";

function CommentsItem({
  index,
  comment,
  group,
  setTextReply,
  handleBlockComment,
  messagesIdMass,
  chosenGroup,
  setEditText,
}) {
  const [fullText, setFullText] = useState(false);
  const [fullTextReply, setFullTextReply] = useState(false);

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

  return (
    <div className="comments__item-wrap" key={index}>
      <div className="comments__item">
        <div className="comments__item-avatar">
          <img
            src={comment.displayPhoto}
            className="comments__item-avatar-img"
          />
        </div>
        <div className="comments__item-other">
          <div className="comments__item-name">{comment.displayName}</div>
          <div className="comments__item-dateAndRate">
            <Rating
              size={16}
              readonly
              initialValue={comment.rating}
              emptyIcon={<InactiveStarSmall />}
              fillIcon={<ActiveStarSmall color={comment?.rating} />}
            />
            <div className="comments__item-date">
              {getDate(comment.createdAt?.seconds)}
            </div>
          </div>
          <div className="comments__item-text">
            {fullText || comment.text.length < 350
              ? comment.text
              : comment.text.slice(0, 350) + "..."}
          </div>
          {comment.text.length > 350 && (
            <div
              className="comments__item-text-more"
              onClick={() => {
                setFullText(!fullText);
              }}
            >
              {!fullText ? "Читать дальше" : "Скрыть"}
            </div>
          )}
        </div>
      </div>

      {comment.reply ? (
        <div className="comments__item-reply-wrap">
          <img className="comments__item-reply-avatar" src={group?.photo_50} />
          <div className="comments__item-reply">
            <div className="comments__item-reply-title">
              <div className="comments__item-title-text">
                {"Ответ " + group?.screen_name}
              </div>
              <img
                src={VerificationStar}
                className="comments__item-reply-title-img"
              />
            </div>
            <div className="comments__item-reply-text">
              {fullTextReply || comment.reply.length < 200
                ? comment.reply
                : comment.reply.slice(0, 200) + "..."}
            </div>
            {comment.reply.length > 200 && (
              <div
                className="comments__item-text-more"
                onClick={() => {
                  setFullTextReply(!fullTextReply);
                }}
              >
                {!fullTextReply ? "Читать дальше" : "Скрыть"}
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {chosenGroup?.id == group?.id && !comment.reply ? (
        <div
          className="comments__item-reply-btn"
          onClick={(e) => {
            setTextReply(e.target.id);
            handleBlockComment();
          }}
          id={messagesIdMass.length > 1 ? messagesIdMass[index] : undefined}
        >
          Ответить
        </div>
      ) : (
        chosenGroup?.id == group?.id &&
        comment.reply && (
          <div
            className="comments__item-reply-btn change"
            onClick={(e) => {
              setTextReply(e.target.id);
              handleBlockComment();
              setEditText(comment.reply);
            }}
            id={messagesIdMass.length > 1 ? messagesIdMass[index] : undefined}
          >
            Изменить ответ
          </div>
        )
      )}
    </div>
  );
}
export default CommentsItem;
