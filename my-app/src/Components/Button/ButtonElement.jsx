import "./Button.css";
import { Link } from "react-router-dom";
import { useCustomCursor } from "../Cursor/Cusror";
export default function ButtonElement({ Path, text }) {
  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();

  return (
    <Link
      to={Path}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="btn"
    >
      <button onMouseEnter={handleHover} onMouseLeave={handleLeave}>
        {text}
      </button>
    </Link>
  );
}
