import React from "react";
import "./Article.css";
import { Link } from "react-router-dom";
import { useCustomCursor } from "../Cursor/Cusror";
import { motion } from "framer-motion";

export default function Article() {
  return (
    <div className="ArticleCard">
      <div className="image">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
      </div>
      <div className="content">
        <span onMouseEnter={handleHover} onMouseLeave={handleLeave}>
          Career Development Platform
        </span>
        <h3>Rule Your Path to Success... </h3>
        <img src={IntroIcon} alt="" />
        <p onMouseEnter={handleTextEnter} onMouseLeave={handleLeave}>
          {" "}
          <span>Jobify</span> guides you to explore your potential, unlock your
          abilities, and embark on a transformative career journey.{" "}
        </p>
        <Link className="btn" to="/about">
          {" "}
          Read More{" "}
        </Link>
      </div>
    </div>
  );
}
