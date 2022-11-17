import React, { useState } from "react";
import PropTypes from "prop-types";

import "./Membership.css";
import accessDenied from "../../img/accessDenied.svg";
import Logo from "../../img/SmartMoneyLogo.png";
import Back from "../../img/chevron-back.svg";

const Membership = (props) => {
  return (
    <div className="membership">
      <div className="membership__header">
        <img
          src={Back}
          alt="Back"
          className="header-Back"
          onClick={props.go}
          data-to="home"
        />
        <div className="membership__logo">
          <img src={Logo} className="membership__logo-img" />
          <div className="membership__logo-text">Умные деньги</div>
        </div>
      </div>

      {props.trueUser == true ? (
        <div className="membership__accessAllowed">
          <div className="membership__accessAllowed-title">
            Выберите компанию, от имени которой хотите отвечать на отзывы:
          </div>
          {props.adminsGroup.map((group, index) => (
            <div className="membership__accessAllowed-item" key={index}>
              <input
                type="radio"
                name="checkbox"
                id={"membership__checkbox" + index}
                className="membership__checkbox"
              />
              <label htmlFor={"membership__checkbox" + index}></label>
              <div className="membership__accessAllowed-item-info">
                <img
                  src={props.adminsGroup[index].photo_50}
                  className="membership__accessAllowed-item-img"
                />
                <div className="membership__accessAllowed-item-name">
                  {props.adminsGroup[index].name}
                </div>
              </div>
            </div>
          ))}
          <div className="membership__footer">
            <input
              type="button"
              value="Показать отзывы"
              className="membership__footer-btn"
            />
          </div>
        </div>
      ) : props.trueUser == false ? (
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
                onClick={() => {
                  props.setCheckUser(true);
                }}
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
