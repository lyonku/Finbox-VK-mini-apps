import VerificationStar from "img/verificationStar.svg";
import InactiveStarSmall from "components/InactiveStarSmall";
import ActiveStarSmall from "components/ActiveStarSmall";
import { Rating } from "react-simple-star-rating";

function CommentsItem({
  index,
  comment,
  handleComment,
  group,
  setTextReply,
  handleBlockComment,
  messagesIdMass,
  chosenGroup,
  setEditText,
  getDate,
}) {
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
            {comment.text.length > 250
              ? comment.text.slice(0, 250) + "..."
              : comment.text}
          </div>
          {comment.text.length > 250 && (
            <div
              className="comments__item-text-more"
              onClick={() => handleComment(event, comment.text)}
            >
              Читать дальше
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
            <div className="comments__item-reply-text">{comment.reply}</div>
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
