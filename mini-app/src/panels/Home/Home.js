import React, { useCallback } from "react";
import PropTypes from "prop-types";

import "./Home.css";
import logo from "img/SmartMoneyLogo.png";
import info from "img/SmartMoneyInfo.png";

const Home = ({ goToPage, onChange, rngValue }) => {
  const getBackgroundSize = () => {
    return { backgroundSize: `${(rngValue * 99) / 100000}% 100%` };
  };

  const handleSumChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="main">
      <div className="header">
        <div className="header__logo">
          <img src={logo} className="header__logo-img" />
          <div className="header__logo-text">Умные займы</div>
        </div>
        <div className="header__content">Бесплатный подбор займов</div>
      </div>

      <div className="block-form">
        <div className="block-form__title">Сумма кредита</div>
        <div className="block-form__price">
          <span className="block-form__price-text">
            {rngValue.toLocaleString("ru") + " ₽"}
          </span>
        </div>
        <div className="block-form__slidecontainer">
          <input
            type="range"
            min="5000"
            max="100000"
            step="1000"
            className="slider"
            value={rngValue}
            onChange={handleSumChange}
            style={getBackgroundSize()}
          />
        </div>
        <div className="block-form__price-range">
          <span className="price__range-item">от 5 000 ₽</span>
          <span className="price__range-item">до 100 000 ₽</span>
        </div>
        <form action="./form.html" className="block-form__btnform">
          <input
            type="submit"
            value="Подобрать займ"
            className="block-form__button"
            onClick={() => goToPage("offers")}
          />
        </form>
      </div>

      <div className="block__second">
        <div className="block__info">
          <img src={info} className="block__info-img" />
          <div className="block__info-text">
            Умные займы позволяют получить займ и оценить качество работы
            МФО и МКК
          </div>
        </div>
        <div
          onClick={() => goToPage("membership")}
          className="block-membership"
        >
          Я – представитель МФО/МКК
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Home;
