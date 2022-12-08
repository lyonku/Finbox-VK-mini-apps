import React, { useState } from "react";
import PropTypes from "prop-types";

import "./Membership.css";

import accessDenied from "img/accessDenied.svg";
import Logo from "img/SmartMoneyLogo.png";
import Back from "img/chevron-back.svg";

const Membership = ({ go, setAdminInfo, adminInfo }) => {
  const showReviews = (event) => {
    event.preventDefault();
    for (let i = 0; i < event.target.length; i++) {
      if (event.target[i]?.checked) {
        adminInfo.adminsGroups.map((group) => {
          if (group.id == event.target[i].id) {
            setAdminInfo({ ...adminInfo, chosenGroup: group });
          }
        });
      }
    }
  };

  const handleUserRights = () => {
    setAdminInfo({ ...adminInfo, userRights: true });
  };

  if (adminInfo.chosenGroup) {
    return (
      <div className="membership">
        <div className="membership__header">
          <img
            src={Back}
            alt="Back"
            className="header-Back"
            onClick={go}
            data-to="home"
          />
          <div className="membership__logo">
            <img src={Logo} className="membership__logo-img" />
            <div className="membership__logo-text">Умные деньги</div>
          </div>
        </div>
        <div className="membership__chosenGroup">
          <img
            src={adminInfo.chosenGroup.photo_100}
            className="membership__chosenGroup-img"
          />
          <div className="membership__chosenGroup-text">
            {"Вы можете отвечать на отзывы о компании " +
              adminInfo.chosenGroup.name}
          </div>
        </div>
        <div className="membership__footer">
          <input
            type="submit"
            value="Показать отзывы"
            className="membership__footer-btn"
            onClick={go}
            data-to="comments"
            data-page="membership"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="membership">
      <div className="membership__header">
        <img
          src={Back}
          alt="Back"
          className="header-Back"
          onClick={go}
          data-to="home"
        />
        <div className="membership__logo">
          <img src={Logo} className="membership__logo-img" />
          <div className="membership__logo-text">Умные деньги</div>
        </div>
      </div>

      {adminInfo?.trueUser == true ? (
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
      ) : adminInfo?.trueUser == false ? (
        <div className="membership__accessDenied">
          <img src={accessDenied} className="membership__accessDenied-img" />
          <div className="membership__accessDenied-title">
            Мы не нашли у вас доступа к компаниям
          </div>
        </div>
      ) : (
        <div className="membership__main">
          <div className="membership__main-wrapper">
            <div className="membership__main-title">
              Вы представитель МФО / МКК?
            </div>
            <div className="membership__main-text">
              <p>Для ответов на отзывы пользователей, мы проверим:</p>
              <ul>
                <li>
                  МФО / МКК должна быть представлена в мини-приложении «Умные
                  деньги»
                </li>
                <li>
                  У МФО / МКК должно быть верифицированные сообщество ВКонтакте
                </li>
                <li>
                  Вы должны обаладть правами администратора в сообществе
                  МФО / МКК
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
                Нажимания на кнопку «Я представитель МФО / МКК», мы выполним
                проверку прав
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Membership.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Membership;
