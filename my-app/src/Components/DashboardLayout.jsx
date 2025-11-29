import React, { useContext } from "react";
import AnimatedOutlet from "./AnimatedOutlet";
import { CursorProvider } from "../Components/Cursor/Cusror";
import { useState } from "react";
import Logo from "../Assets/Logo Removed (2) WithOut String .png";
import "../index.css";
import UserDataContext from "../Context/UserDataContext";
import {
  SettingsIcon,
  BellIcon,
  MoonIcon,
  User2Icon,
  ChevronsUpDown,
  BarChart2Icon,
  LogOut,
  PowerOffIcon,
  PowerIcon,
  ChartPie,
  SquaresIntersect,
  Atom,
} from "lucide-react";

import TrackContext from "../Context/TrackContext";
import {
  Layout,
  Button,
  Menu,
  theme,
  Dropdown,
  Spin,
  Space,
  Empty,
} from "antd";
import { Link } from "react-router";
const { Content, Sider } = Layout;
export default function DashboardLayout() {
  const Sideritems = [
    {
      key: "1",
      icon: <ChartPie size={18} />,
      label: (
        <Link
          to="/dashboard"
          style={{
            // /LearningPath
            textDecoration: "none",
          }}
        >
          Track Info
        </Link>
      ),
    },
    {
      key: "2",
      icon: <SquaresIntersect size={18} />,
      label: (
        <Link
          to="/dashboard/LearningPath"
          style={{
            textDecoration: "none",
          }}
        >
          Learning Path
        </Link>
      ),
    },
    {
      key: "3",
      icon: <Atom size={18} />,
      label: (
        <Link
          to="/dashboard/Insights"
          style={{
            textDecoration: "none",
          }}
        >
          Insights
        </Link>
      ),
    },
    {
      key: "4",
      icon: <Atom size={18} />,
      label: (
        <Link
          to="/dashboard/TrackSkills"
          style={{
            textDecoration: "none",
          }}
        >
          Skills
        </Link>
      ),
    },
    {
      key: "5",
      icon: <Atom size={18} />,
      label: (
        <Link
          to="/dashboard/Profile"
          style={{
            textDecoration: "none",
          }}
        >
          Account
        </Link>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: "Option 1",
    },
    {
      key: "2",
      label: "Option 2",
    },
    {
      key: "3",
      label: "Option 3",
    },
    {
      icon: <PowerIcon size={18} />,
      key: "4",
      danger: true,
      label: "Logout",
    },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { userData, isLoading } = useContext(UserDataContext);
  const { TrackData, Trackloading } = useContext(TrackContext);

  if (isLoading) {
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Spin className="Spinner" size="large" />
      </div>
    );
  }

  if (Trackloading) {
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }

  return (
    <div className="DashBoardLayout">
      <CursorProvider>
        <Layout style={{ minHeight: "calc(100vh)", padding: "10px" }}>
          <Sider
            className="d-flex flex-column align-items-center "
            style={{ background: colorBgContainer, padding: "10px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "30px",
              }}
            >
              <div
                className="image d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <img src={Logo} alt="" className="w-50" />
              </div>
              <Menu defaultSelectedKeys={["1"]} items={Sideritems} />
            </div>

            <Dropdown menu={{ items }} trigger={["click"]}>
              <div className="Setting">
                <SettingsIcon size={18} />
                <span className="sett">
                  <span>Settings</span>
                  <ChevronsUpDown size={18} />
                </span>
              </div>
            </Dropdown>
          </Sider>
          <Layout style={{ paddingLeft: "15px " }}>
            <Content
              style={{
                padding: "38px 30px",
                margin: 0,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <div className="DashPageheader">
                <div className="text">
                  <div className="status">
                    <span></span>
                    online
                  </div>
                  Hello, {userData.data.name}
                </div>
                <div className="img_icons">
                  <span className="d-flex gap-3 align-items-center justify-content-center">
                    <MoonIcon />
                    <BellIcon />
                    <Dropdown menu={{ items }} trigger={["click"]}>
                      <SettingsIcon />
                    </Dropdown>
                  </span>
                </div>
              </div>
              <AnimatedOutlet />
            </Content>
          </Layout>
        </Layout>
      </CursorProvider>
    </div>
  );
}
