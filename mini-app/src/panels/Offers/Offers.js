import React from "react";
import PropTypes from "prop-types";
import "./Offers.css";
import logo from "img/SmartMoneyLogo.png";
import Back from "img/chevron-back.svg";

import highChance from "img/highChance.svg";
import delimeter from "img/delimeter.svg";
import OffersCard from "components/OffersCard";

const Offers = ({ go, rngValue, groups }) => {
  return (
    <div className="offers">
      <div className="offers__header">
        <img
          src={Back}
          alt="Back"
          className="header-Back"
          onClick={go}
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
          {groups.map((group, index) => {
            return (
              <OffersCard
                rngValue={rngValue}
                group={group}
                go={go}
                key={group.id}
              />
            );
          })}
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
                <img src="" alt="Back" className="block__logo-img" />
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
                value={"Получить " + rngValue.toLocaleString("ru") + " ₽"}
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
