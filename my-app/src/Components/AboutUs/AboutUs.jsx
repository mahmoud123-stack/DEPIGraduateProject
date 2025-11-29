import React from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";
import { useCustomCursor } from "../Cursor/Cusror";
import { motion } from "framer-motion";
import paperplane from "../../Assets/paper-plane.png";
import WhoUs2 from "../../Assets/Road Planning.svg";
import ButtonElement from "../Button/ButtonElement";

export default function AboutUs() {
  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();
  return (
    <div className="AboutUs">
      <div className="container">
        <div className="image">
          <img className="PaperPlaneImg" src={paperplane} alt="" />
          <img src={WhoUs2} alt="" />
        </div>
        <div className="Explain">
          <div className="heading">
            <span
              className="btn"
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              Who We Are
            </span>
            <h3>We Help You Discover, Plan, and Grow Your Career..</h3>
          </div>
          <div className="content">
            <p>
              Jobify is a smart career planning platform that helps you discover
              yourself, choose the right career path, and build a personalized
              learning roadmap to reach your goals step by step all powered by
              intelligent insights into your skills and interests.
            </p>
          </div>

          <ButtonElement text="Read More" Path="/about" />
        </div>
      </div>
    </div>
  );
}
