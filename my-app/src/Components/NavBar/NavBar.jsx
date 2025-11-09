import React from "react";
import { useState } from "react";
import Logo from "../../Assets/Logo Removed (2).png";
import { useCustomCursor } from "../Cursor/Cusror";
import Blob from "../../Assets/wave.svg";
import { Link } from "react-router-dom";

import "./NavBar.css";
function NavBar() {
  const [islogedIn, setIslogedIn] = useState(false);
  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();
  return (
    <div className="NavBar">
      <img src={Blob} alt="" />
      <div className="container">
        <div className="Header">
          <ul className="Links">
            <li>
              <Link
                to="/"
                className="btn"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="btn"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="btn"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="btn"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                Blog
              </Link>
            </li>
          </ul>

          <div className="logo">
            <img src={Logo} alt="" />
          </div>

          <Link to="/LogIn">
            <button
              className="btn"
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
