import React, { useState } from "react";
import PropTypes from "prop-types";

import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import "../panels/Offers.css";
import Logo from "../img/LogoOffers.svg";
import Back from "../img/chevron-back.svg";
import cardLogo from "../img/zaimer.svg";
import checkMark from "../img/checkMark.svg";
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
            <div className="card__logo">
              <img src={cardLogo} alt="Back" className="card__logo-img" />
            </div>
            <div className="card__block">
              <div className="card__title">Займер</div>
              <div className="card__interpreter">
                <img src={checkMark} className="card__interpreter-img" />
                <span>Есть представитель</span>
              </div>
              <div className="card__wrap">
                <div className="card__sum">
                  <div className="card__sum-title">Сумма</div>
                  <div className="card__sum-total">
                    {props.rngValue.toLocaleString("ru") + " ₽"}
                  </div>
                </div>
                <div className="card__chance">
                  <div className="card__chance-title">Шанс одобрения</div>
                  <div className="card__chance-total">
                    <img className="card__chance-img" src={highChance} />
                    <span>Высокий</span>
                  </div>
                </div>
              </div>

              <div className="card__btns">
                <input
                  type="button"
                  value="Получить деньги"
                  className="card__btns-getMoney"
                />
                <input
                  type="button"
                  value="12 отзывов"
                  className="card__btns-reviews"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="blocks">
          <div className="card">
            <div className="card__logo">
              <img src={cardLogo} alt="Back" className="card__logo-img" />
            </div>
            <div className="card__block">
              <div className="card__title">Займер</div>
              <div className="card__interpreter">
                <img src={checkMark} className="card__interpreter-img" />
                <span>Есть представитель</span>
              </div>
              <div className="card__wrap">
                <div className="card__sum">
                  <div className="card__sum-title">Сумма</div>
                  <div className="card__sum-total">
                    {props.rngValue.toLocaleString("ru") + " ₽"}
                  </div>
                </div>
                <div className="card__chance">
                  <div className="card__chance-title">Шанс одобрения</div>
                  <div className="card__chance-total">
                    <img className="card__chance-img" src={lowChance} />
                    <span>Низкий</span>
                  </div>
                </div>
              </div>

              <div className="card__btns">
                <input
                  type="button"
                  value="Получить деньги"
                  className="card__btns-getMoney"
                />
                <input
                  type="button"
                  value="12 отзывов"
                  className="card__btns-reviews"
                />
              </div>
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
          <div className="card">
            <div className="card__logo">
              <img src={cardLogo} alt="Back" className="card__logo-img" />
            </div>
            <div className="card__block">
              <div className="card__title">Займер</div>
              <div className="card__interpreter"></div>
              <div className="card__wrap">
                <div className="card__sum">
                  <div className="card__sum-title">Сумма</div>
                  <div className="card__sum-total">
                    {props.rngValue.toLocaleString("ru") + " ₽"}
                  </div>
                </div>
                <div className="card__chance">
                  <div className="card__chance-title">Шанс одобрения</div>
                  <div className="card__chance-total">
                    <img className="card__chance-img" src={middleChance} />
                    <span>Средний</span>
                  </div>
                </div>
              </div>

              <div className="card__btns">
                <input
                  type="button"
                  value="Получить деньги"
                  className="card__btns-getMoney"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="blocks">
          <div className="card">
            <div className="card__logo">
              <img src={cardLogo} alt="Back" className="card__logo-img" />
            </div>
            <div className="card__block">
              <div className="card__title">Займер</div>
              <div className="card__interpreter"></div>
              <div className="card__wrap">
                <div className="card__sum">
                  <div className="card__sum-title">Сумма</div>
                  <div className="card__sum-total">
                    {props.rngValue.toLocaleString("ru") + " ₽"}
                  </div>
                </div>
                <div className="card__chance">
                  <div className="card__chance-title">Шанс одобрения</div>
                  <div className="card__chance-total">
                    <img className="card__chance-img" src={lowChance} />
                    <span>Низкий</span>
                  </div>
                </div>
              </div>

              <div className="card__btns">
                <input
                  type="button"
                  value="Получить деньги"
                  className="card__btns-getMoney"
                />
              </div>
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
