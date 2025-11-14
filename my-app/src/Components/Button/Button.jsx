import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";
import { useCustomCursor } from "../Cursor/Cusror";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";

export default function Button({ Path, text, icon }) {
  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();

  return (
    <Link
      to={Path}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="btn"
    >
      <button>
        <div>{text}</div>
        {icon}
      </button>
    </Link>
  );
}
