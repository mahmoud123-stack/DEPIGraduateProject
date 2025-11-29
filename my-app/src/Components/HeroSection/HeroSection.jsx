import React, { useContext } from "react";
import LandingImage from "../../Assets/Thesis-amico.png";
import IntroIcon from "../../Assets/mortarboard.png";
import { useCustomCursor } from "../Cursor/Cusror";
import { Link } from "react-router-dom";
import Blob from "../../Assets/wave.svg";
import ButtonElement from "../Button/ButtonElement";
import AuthContext from "../../Context/AuthContext";
import "./HeroSection.css";

export default function HeroSection() {
  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="Landing">
      <img src={Blob} alt="" />

      <div className="container">
        <div className="Intro">
          <span onMouseEnter={handleHover} onMouseLeave={handleLeave}>
            Career Development Platform
          </span>
          <h1>Rule Your Path to Success... </h1>
          <img src={IntroIcon} alt="" />
          <p onMouseEnter={handleTextEnter} onMouseLeave={handleLeave}>
            {" "}
            <span>Jobify</span> guides you to explore your potential, unlock
            your abilities, and embark on a transformative career journey.{" "}
          </p>

          {!isLoggedIn ? (
            <ButtonElement text="Let's Make a Change" Path="/LogIn" />
          ) : (
            <ButtonElement text="Open Your Dashboard" Path="/dashboard" />
          )}
        </div>
        <div className="image">
          <img src={LandingImage} alt="" />
        </div>
      </div>
    </div>
  );
}
