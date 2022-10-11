import React, { useState } from "react";
import PropTypes from "prop-types";

import { Range, getTrackBackground } from "react-range";

import "./Home.css";
import logo from "../img/Logo.png";
import warning from "../img/Union.svg";

const Home = ({ go, onChange, rngValue }) => {
  // const [rngValue, setRngValue] = useState([50000]);
  const handleSumChange = (event) => {
    onChange(event);
  };

  const STEP = 1000;
  const MIN = 5000;
  const MAX = 100000;

  return (
    <div className="main">
      <div className="header">
        <img src={logo} className="header__logo"></img>
        <div className="header__content">Бесплатный подбор займов</div>
      </div>
      <div className="block">
        <div className="block-form">
          <div className="block-form__title">Сумма кредита</div>
          <div className="block-form__price">
            <span className="block-form__price-text">
              {rngValue.toLocaleString("ru") + " ₽"}
            </span>
          </div>
          <div className="block-form__slidecontainer">
            <Range
              values={rngValue}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={handleSumChange}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: "20px",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "6px",
                      width: "100%",
                      borderRadius: "2px",
                      background: getTrackBackground({
                        values: rngValue,
                        colors: ["#37C99E", "#EEF0F3"],
                        min: MIN,
                        max: MAX,
                      }),
                      alignSelf: "center",
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "24px",
                    width: "36px",
                    borderRadius: "24px",
                    backgroundColor: "#FFF",
                    display: "flex",
                    justifyContent: "center",
                    gap: "3px",
                    alignItems: "center",
                    boxShadow:
                      "0px 0px 4px rgba(81, 89, 133, 0.08), 0px 12px 12px -4px rgba(81, 89, 133, 0.1)",
                  }}
                >
                  <div
                    style={{
                      height: "8px",
                      width: "2px",
                      backgroundColor: "#DDDDE3",
                    }}
                  />
                  <div
                    style={{
                      height: "8px",
                      width: "2px",
                      backgroundColor: "#DDDDE3",
                    }}
                  />
                </div>
              )}
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
              onClick={go}
              data-to="offers"
            />
          </form>
          <div className="block-form__desc">
            <img
              src={warning}
              alt="warning"
              className="block-form__desc-logo"
            />
            <div className="block__desc-text">
              Финбокс позволяет получить займ и оценить качество работы МФО и
              МКК
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Home;
