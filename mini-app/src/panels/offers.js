import React, { useState } from "react";
import PropTypes from "prop-types";

import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import "../panels/Offers.css";
import Logo from "../img/LogoOffers.svg";
import Back from "../img/chevron-back.svg";
import cardLogo from "../img/zaimer.png";
import highChance from "../img/highChance.svg";
import middleChance from "../img/middleChance.svg";
import lowChance from "../img/lowChance.svg";
import delimeter from "../img/delimeter.svg";

const Offers = (props) => {
  return (
    <div className="offers">
      <div className="offers__header">
        <img
          src={Back}
          alt="Back"
          className="header-Back"
          onClick={props.go}
          data-to="home"
        />
        <img src={Logo} alt="Logo" className="header-logo" />
      </div>
      <div className="offers__main">
        <div className="title">Доступные предложения</div>
        <div className="blocks">
          <div className="card">
            <div className="block__header">
              <div className="block__logo">
                <img src={cardLogo} alt="Back" className="block__logo-img" />
              </div>
              <div className="block__chance">
                <div className="block__chance-total">
                  <span>Высокий</span>
                  <div className="block__chance-title">Шанс одобрения</div>
                </div>
                <img className="block__chance-img" src={highChance} />
              </div>
            </div>
            <div className="block__btns">
              <input
                type="button"
                value={"Получить " + props.rngValue.toLocaleString("ru") + " ₽"}
                className="block__btns-getMoney"
              />
              <input
                type="button"
                value="12 отзывов"
                className="block__btns-reviews"
                onClick={props.go}
                data-to="comments"
              />
            </div>
          </div>
          <div className="card">
            <div className="block__header">
              <div className="block__logo">
                <img src={cardLogo} alt="Back" className="block__logo-img" />
              </div>
              <div className="block__chance">
                <div className="block__chance-total">
                  <span>Высокий</span>
                  <div className="block__chance-title">Шанс одобрения</div>
                </div>
                <img className="block__chance-img" src={highChance} />
              </div>
            </div>
            <div className="block__btns">
              <input
                type="button"
                value={"Получить " + props.rngValue.toLocaleString("ru") + " ₽"}
                className="block__btns-getMoney"
              />
              <input
                type="button"
                value="12 отзывов"
                className="block__btns-reviews"
                onClick={props.go}
                data-to="comments"
              />
            </div>
          </div>
        </div>

        <div className="delimeter">
          <div className="delimeter-row"></div>
          <img className="delimeter-img" src={delimeter} />
          <div className="delimeter-row"></div>
        </div>
        <div className="delimeter__title">
          Дальше только организации без предствителей
        </div>
        <div className="delimeter__text">
          Такие организации не отвечают на отзывы пользователей
        </div>

        <div className="blocks">
          <div className="card-withoutMember">
            <div className="block__header">
              <div className="block__logo">
                <img src={cardLogo} alt="Back" className="block__logo-img" />
              </div>
              <div className="block__chance">
                <div className="block__chance-total">
                  <span>Высокий</span>
                  <div className="block__chance-title">Шанс одобрения</div>
                </div>
                <img className="block__chance-img" src={highChance} />
              </div>
            </div>
            <input
              type="button"
              value={"Получить " + props.rngValue.toLocaleString("ru") + " ₽"}
              className="block__btns-getMoney"
            />
          </div>
          <div className="card-withoutMember">
            <div className="block__header">
              <div className="block__logo">
                <img src={cardLogo} alt="Back" className="block__logo-img" />
              </div>
              <div className="block__chance">
                <div className="block__chance-total">
                  <span>Высокий</span>
                  <div className="block__chance-title">Шанс одобрения</div>
                </div>
                <img className="block__chance-img" src={highChance} />
              </div>
            </div>
            <input
              type="button"
              value={"Получить " + props.rngValue.toLocaleString("ru") + " ₽"}
              className="block__btns-getMoney"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Offers.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Offers;
