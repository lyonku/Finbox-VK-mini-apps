function MembershipForm({ showReviews, adminInfo }) {
  return (
    <form className="membership__accessAllowed" onSubmit={showReviews}>
      <div className="membership__accessAllowed-title">
        Выберите компанию, от имени которой хотите отвечать на отзывы:
      </div>
      {adminInfo.adminsGroups.map((group, index) => (
        <div className="membership__accessAllowed-item" key={index}>
          <input
            type="radio"
            name="checkbox"
            id={group.id + ""}
            className="membership__checkbox"
          />
          <label htmlFor={group.id + ""}></label>
          <div className="membership__accessAllowed-item-info">
            <img
              src={adminInfo?.adminsGroups[index].photo_50}
              className="membership__accessAllowed-item-img"
            />
            <div className="membership__accessAllowed-item-name">
              {adminInfo?.adminsGroups[index].name}
            </div>
          </div>
        </div>
      ))}
      <div className="membership__footer">
        <input
          type="submit"
          value="Показать отзывы"
          className="membership__footer-btn"
        />
      </div>
    </form>
  );
}
export default MembershipForm;
