import React from "react";
import LandingImage from "../../Assets/Thesis-amico.png";
import IntroIcon from "../../Assets/mortarboard.png";
import { useCustomCursor } from "../Cursor/Cusror";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Blob from "../../Assets/wave.svg";

import "./HeroSection.css";

export default function HeroSection() {
  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();

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

          <Button text="Let's Make a Change" Path="/LogIn" />
        </div>
        <div className="image">
          <img src={LandingImage} alt="" />
        </div>
      </div>
    </div>
  );
}
