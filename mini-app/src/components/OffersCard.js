import highChance from "img/highChance.svg";
import ActiveStarSmall from "components/ActiveStarSmall";

function OffersCard({ rngValue, go, group }) {
  const fillColorArray = [
    "#FF6B77",
    "#FF6B77",
    "#FFA735",
    "#37C99E",
    "#37C99E",
  ];
  const plural = require("plural-ru");
  return (
    <div className="card">
      <div className="block__header">
        <div className="block__logo">
          <img src={group.imgSrc} alt="Back" className="block__logo-img" />
        </div>
        <div className="block__chance">
          <div className="block__chance-total">
            <span>Высокий</span>
            <div className="block__chance-title">Шанс одобрения</div>
          </div>
          <img className="block__chance-img" src={highChance} />
        </div>
      </div>
      <form action={group.actionSrc} target="_blank" className="block__btns">
        <input
          type="submit"
          value={"Получить " + rngValue.toLocaleString("ru") + " ₽"}
          className="block__btns-getMoney"
        />

        <div
          type="button"
          className="block__btns-reviews"
          id={group.id}
          onClick={go}
          data-to="comments"
          style={{
            color: fillColorArray[Math.floor(Number(group.averageRating)) - 1],
          }}
        >
          {
            <ActiveStarSmall
              color={Math.floor(Number(group?.averageRating))}
              height={14}
              style={{ marginTop: -2 }}
              id={group.id}
            />
          }
          {group.averageRating}
          <div className="block__btns-reviews-count" id={group.id}>
            {group.reviewsCount
              ? group.reviewsCount +
                " " +
                plural(group.reviewsCount, "отзыв", "отзывa", "отзывов")
              : ""}
          </div>
        </div>
      </form>
    </div>
  );
}
export default OffersCard;
