import React from "react";
import LogIn from "../Components/LogIn/LogIn";
import { Link } from "react-router-dom";
import { useCustomCursor } from "../Components/Cursor/Cusror";

export default function SignInPage() {
  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();

  return (
    <div>
      <LogIn />
    </div>
  );
}
