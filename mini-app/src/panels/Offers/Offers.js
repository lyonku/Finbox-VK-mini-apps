import React, { useState } from "react";
import PropTypes from "prop-types";

import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import "./Offers.css";
import logo from "../../img/SmartMoneyLogo.png";
import Back from "../../img/chevron-back.svg";
import cardLogoZaimer from "../../img/zaimer.png";
import cardLogoMoneyMan from "../../img/moneyman.jpg";
import cardLogoWebBankir from "../../img/webbankir-logo.jpg";

import highChance from "../../img/highChance.svg";
import delimeter from "../../img/delimeter.svg";

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
        <div className="OffersHeader__logo">
          <img src={logo} className="OffersHeader__logo-img" />
          <div className="OffersHeader__logo-text">Умные деньги</div>
        </div>
      </div>
      <div className="offers__main">
        <div className="title">Доступные предложения</div>
        <div className="blocks">
          <div className="card">
            <div className="block__header">
              <div className="block__logo">
                <img
                  src={cardLogoZaimer}
                  alt="Back"
                  className="block__logo-img"
                />
              </div>
              <div className="block__chance">
                <div className="block__chance-total">
                  <span>Высокий</span>
                  <div className="block__chance-title">Шанс одобрения</div>
                </div>
                <img className="block__chance-img" src={highChance} />
              </div>
            </div>
            <form
              action="https://www.zaymer.ru/"
              className="block__btns"
              target="_blank"
            >
              <input
                type="submit"
                value={"Получить " + props.rngValue.toLocaleString("ru") + " ₽"}
                className="block__btns-getMoney"
              />
              <input
                type="button"
                value="3.5"
                className="block__btns-reviews"
                id="129542706"
                onClick={props.go}
                data-to="comments"
              />
            </form>
          </div>
          <div className="card">
            <div className="block__header">
              <div className="block__logo">
                <img
                  src={cardLogoMoneyMan}
                  alt="Back"
                  className="block__logo-img"
                />
              </div>
              <div className="block__chance">
                <div className="block__chance-total">
                  <span>Высокий</span>
                  <div className="block__chance-title">Шанс одобрения</div>
                </div>
                <img className="block__chance-img" src={highChance} />
              </div>
            </div>
            <form
              action="https://moneyman.ru/"
              target="_blank"
              className="block__btns"
            >
              <input
                type="submit"
                value={"Получить " + props.rngValue.toLocaleString("ru") + " ₽"}
                className="block__btns-getMoney"
              />
              <input
                type="button"
                value="4.2"
                className="block__btns-reviews"
                id="55652521"
                onClick={props.go}
                data-to="comments"
              />
            </form>
          </div>
          <div className="card">
            <div className="block__header">
              <div className="block__logo">
                <img
                  src={cardLogoWebBankir}
                  alt="Back"
                  className="block__logo-img"
                />
              </div>
              <div className="block__chance">
                <div className="block__chance-total">
                  <span>Высокий</span>
                  <div className="block__chance-title">Шанс одобрения</div>
                </div>
                <img className="block__chance-img" src={highChance} />
              </div>
            </div>
            <form
              action="https://webbankir.com/"
              className="block__btns"
              target="_blank"
            >
              <input
                type="submit"
                value={"Получить " + props.rngValue.toLocaleString("ru") + " ₽"}
                className="block__btns-getMoney"
              />
              <input
                type="button"
                value="4.2"
                className="block__btns-reviews"
                id="42172377"
                onClick={props.go}
                data-to="comments"
              />
            </form>
          </div>
        </div>

        <div className="delimeter">
          <div className="delimeter-row"></div>
          <img className="delimeter-img" src={delimeter} />
          <div className="delimeter-row"></div>
        </div>
        <div className="delimeter__title">
          Дальше организации без предствителей
        </div>
        <div className="delimeter__text">
          Такие организации не отвечают на отзывы пользователей
        </div>

        <div className="blocks">
          <div className="card-withoutMember">
            <div className="block__header">
              <div className="block__logo">
                <img
                  src={cardLogoMoneyMan}
                  alt="Back"
                  className="block__logo-img"
                />
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
            </div>
          </div>
          <div className="card-withoutMember">
            <div className="block__header">
              <div className="block__logo">
                <img
                  src={cardLogoMoneyMan}
                  alt="Back"
                  className="block__logo-img"
                />
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
            </div>
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
