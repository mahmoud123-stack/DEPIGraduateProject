import { useContext, useEffect, useState } from "react";
import axios from "axios";
import userDataContext from "../../Context/UserDataContext";
import AuthContext from "../../Context/AuthContext";
import "./tracksChoosing.css";
import { Link } from "react-router";
import Goal from "../../Assets/goal.png";
import TrackContext from "../../Context/TrackContext";
import { useNavigate } from "react-router-dom";
import { BrushIcon, BrainCircuit, Code2Icon, SearchCode } from "lucide-react";
import {
  Empty,
  message,
  notification,
  Spin,
  Button,
  Form,
  Modal,
  Input,
} from "antd";

axios.defaults.withCredentials = true;
export default function TracksChoosing() {
  const key = "updatable";
  const [messageApi, MessageHolder] = message.useMessage();
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const { TrackData, Trackloading, Status, chooseTrack, UpdateTrack } =
    useContext(TrackContext);

  const Tracks = [
    {
      key: "frontend",
      label: "Front-End",
      icon: <Code2Icon color="#315079" />,
    },
    {
      key: "backend",
      label: "Back-End",
      icon: <BrainCircuit color="#315079" />,
    },
    { key: "uiux", label: "UI/UX", icon: <BrushIcon color="#315079" /> },
    { key: "devOps", label: "DevOps", icon: <BrainCircuit color="#315079" /> },
  ];

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

  if (!userData) {
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }

  const HandleChoose = async (track) => {
    messageApi.open({
      key,
      type: "loading",
      content: `Fetching ${track} Data..`,
      duration: 0,
    });
    const result = await chooseTrack(track);
    if (result.ok) {
      messageApi.open({
        key,
        type: "success",
        content: "We Are Ready.",
        duration: 3,
      });
      navigate("/dashboard");
    } else {
      if (TrackData) {
        messageApi
          .open({
            key,
            type: "error",
            content: "You Already Have a Track",
            duration: 3,
          })
          .then(() => {
            messageApi
              .open({
                key,
                type: "loading",
                content: "Redirecting you..",
                duration: 5,
              })
              .then(() => {
                navigate("/dashboard");
              });
          });
      } else {
        messageApi.open({
          key,
          type: "error",
          content: "Error",
          duration: 3,
        });
      }
    }
  };
  return (
    <div className="tracksChoosing">
      {MessageHolder}
      <div className="container gap-3 d-flex justify-content-between align-items-center">
        <div className="content">
          <h1>Welcome Warrior 👋</h1>
          <p>Choose the Track you want to start..</p>
          <div className="btns d-flex gap-3 mt-5">
            {Tracks.map((track) => {
              return (
                <div key={track.key} className="Track">
                  <Button
                    className="btn"
                    onClick={() => {
                      HandleChoose(track.key);
                    }}
                    // disabled={Trackloading}
                    // loading={Trackloading}
                  >
                    {track.icon}
                    {track.label}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="image w-50">
          <img className="w-75" src={Goal} alt="" />
        </div>
      </div>
    </div>
  );
}
