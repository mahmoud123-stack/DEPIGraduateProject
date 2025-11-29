import React from "react";
import "./CTA.css";
import { useState, useContext } from "react";
import { useCustomCursor } from "../Cursor/Cusror";
import { motion } from "framer-motion";
import CTAImage from "../../Assets/Launching-amico.svg";
import ButtonElement from "../Button/ButtonElement";
import AuthContext from "../../Context/AuthContext";

export default function CTA() {
  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="CTA">
      <div className="container">
        <div className="image">
          <img src={CTAImage} alt="" />
        </div>
        <div className="content">
          <span
            className="btn"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            Starting Point
          </span>
          <h2>Ready to get started?</h2>
          <p>
            {" "}
            Join our community of learners and unlock your potential in the
            world of career development.{" "}
          </p>
          {!isLoggedIn ? (
            <ButtonElement text="Join Us Now" Path="/LogIn" />
          ) : (
            <ButtonElement text="Continue.." Path="/dashboard" />
          )}
        </div>
      </div>
    </div>
  );
}
