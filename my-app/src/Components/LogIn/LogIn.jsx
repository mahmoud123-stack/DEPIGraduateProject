import React from "react";
import "./LogIn.css";
import { Link } from "react-router-dom";
import { useCustomCursor } from "../Cursor/Cusror";

export default function LogIn() {
  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();
  return (
    <div>
      LogIn
      <Link className="btn" to="/">
        Return
      </Link>
    </div>
  );
}
