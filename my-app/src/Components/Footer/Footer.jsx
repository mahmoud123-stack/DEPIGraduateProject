import React from "react";
import { useState } from "react";
import { useCustomCursor } from "../Cursor/Cusror";
import { color, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Select } from "antd";
import ButtonElement from "../Button/ButtonElement";

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
import "./Footer.css";
import Logo from "../../Assets/Logo Removed (2).png";

export default function Footer() {
  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();

  const handleChange = (value) => {
    console.log(`selected ${value}`);

    if (value === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  return (
    <div className="Footer">
      <div className="container">
        <div className="content">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <ul className="links">
            <li>
              <Link to="/">
                <ButtonElement text="Home"></ButtonElement>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <ButtonElement text="About"></ButtonElement>
              </Link>
            </li>
            <li>
              <Link to="/blog">
                <ButtonElement text="Blog"></ButtonElement>
              </Link>
            </li>
          </ul>
          <div className="Btns">
            <div className="social">
              <Link to="/">
                <Facebook size={20} />
              </Link>
              <Link to="/">
                <Instagram size={20} />
              </Link>
              <Link to="/">
                <Linkedin size={20} />
              </Link>
            </div>
            <div className="mode">
              <Select
                className="custom-select"
                labelInValue
                suffixIcon={<ChevronDown size={20} />}
                size="middle"
                defaultValue={{
                  value: "light",
                  label: (
                    <span>
                      <Sun size={20} />
                      light
                    </span>
                  ),
                }}
                style={{ width: 100 }}
                onChange={handleChange}
                options={[
                  {
                    label: (
                      <span>
                        <Moon size={20} />
                        Dark
                      </span>
                    ),
                    value: "dark",
                  },
                  {
                    label: (
                      <span>
                        <Sun size={20} />
                        Light
                      </span>
                    ),
                    value: "light",
                  },
                  {
                    label: (
                      <span>
                        <MonitorCog size={20} />
                        Auto
                      </span>
                    ),
                    value: "Auto",
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <p>Copyright © 2025 Jobify. All rights reserved.</p>
      </div>
    </div>
  );
}
