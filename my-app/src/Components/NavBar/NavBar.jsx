import React from "react";
import { useState } from "react";
import Logo from "../../Assets/Logo Removed (2).png";
import { useCustomCursor } from "../Cursor/Cusror";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

import "./NavBar.css";
import { Select } from "antd";
import {
  Facebook,
  Instagram,
  Linkedin,
  Moon,
  Sun,
  Twitter,
  Github,
  ChevronDown,
  MonitorCog,
} from "lucide-react";

function NavBar() {
  const HandleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [islogedIn, setIslogedIn] = useState(false);
  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();
  return (
    <div className="NavBar">
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
          <Button text="Get Started" Path="/LogIn" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
