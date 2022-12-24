import ActiveStarSmall from "components/ActiveStarSmall";

function CommentsHeader({
  Back,
  currentGroup,
  currentGroupRate,
  commentsHeaderRef,
  messages,
}) {
  const fillColorArray = [
    "#FF6B77",
    "#FF6B77",
    "#FFA735",
    "#37C99E",
    "#37C99E",
  ];
  const plural = require("plural-ru");

  return (
    <div className="comments__header" ref={commentsHeaderRef}>
      <img
        src={Back}
        alt="Back"
        className="header-back"
        onClick={() => window.history.back()}
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
  );
}
export default CommentsHeader;
