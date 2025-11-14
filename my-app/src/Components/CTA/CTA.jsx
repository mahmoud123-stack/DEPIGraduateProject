import React from "react";
import "./CTA.css";
import { useState } from "react";
import Button from "../Button/Button";
import { useCustomCursor } from "../Cursor/Cusror";
import { motion } from "framer-motion";
import CTAImage from "../../Assets/Launching-amico.svg";
export default function CTA() {
  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();

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

          <Button text="Get Started" Path="/LogIn" />
        </div>
      </div>
    </div>
  );
}
