function MembershipMain({ handleUserRights }) {
  return (
    <div className="membership__main">
      <div className="membership__main-wrapper">
        <div className="membership__main-title">
          Вы представитель МФО / МКК?
        </div>
        <div className="membership__main-text">
          <p>Для ответов на отзывы пользователей, мы проверим:</p>
          <ul>
            <li>
              МФО / МКК должна быть представлена в мини-приложении «Умные займы»
            </li>
            <li>
              У МФО / МКК должно быть верифицированные сообщество ВКонтакте
            </li>
            <li>
              Вы должны обаладть правами администратора в сообществе МФО / МКК
            </li>
          </ul>
        </div>
      </div>
      <div className="membership__main-btnBlock">
        <div className="membership__footer">
          <input
            type="button"
            value="Я представитель МФО / МКК"
            className="membership__footer-btn"
            onClick={handleUserRights}
          />
          <div className="membership__footer-text">
            Нажимания на кнопку «Я представитель МФО / МКК», мы выполним
            проверку прав
          </div>
        </div>
      </div>
    </div>
  );
}
export default MembershipMain;
