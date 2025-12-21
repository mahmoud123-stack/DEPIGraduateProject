import "./LogIn.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useCustomCursor } from "../Cursor/Cusror";
import LogInImage from "../../Assets/Computer login-amico.svg";
import axios from "axios";
import Logo from "../../Assets/Logo Removed (2).png";
import Blob from "../../Assets/wave.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  message,
  Card,
  Divider,
  Button,
  Checkbox,
  Alert,
  Form,
  Input,
  Flex,
  Space,
  Result,
  notification,
  Radio,
  Tag,
} from "antd";
import {
  CircleCheckBig,
  Eye,
  EyeOff,
  Undo2,
  UserRound,
  Lock,
  icons,
  Check,
} from "lucide-react";

import TrackContext from "../../Context/TrackContext";
import AuthContext from "../../Context/AuthContext";

export default function LogIn() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [Success, setSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [messageApi, MessageHolder] = message.useMessage();
  const [notificationApi, NotificationHolder] = notification.useNotification();
  const key = "updatable";

  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();

  const { TrackData, Trackloading } = useContext(TrackContext);
  const { isLoggedIn, LogOut, isLoading, setIsLoggedIn } =
    useContext(AuthContext);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post("/api/auth/login", values);
      messageApi
        .open({
          key,
          type: "success",
          content: response.data.message,
          duration: 3,
        })
        .then(() => {
          setSuccess(true);
          setIsLoggedIn(true);
          navigate("/EntryPoint");
        });
    } catch (err) {
      const errMsg = err.response?.data?.message;
      messageApi.open({
        type: "error",
        content: errMsg || "Something went wrong",
        duration: 2,
      });
      setTimeout(() => {
        messageApi.open({
          type: "warning",
          content: "Enter Valid Data",
          duration: 1,
        });
      }, 2000);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  return (
    <div className=" LogIn ">
      {MessageHolder}
      {NotificationHolder}
      <div className="container">
        <div className="content">
          <div className="form">
            <div className="Text">
              <div>
                <h2>Welcome Back👋</h2>
                <p> Glad to see you again let's continue your journey</p>
              </div>
            </div>
            <Form
              form={form}
              autoComplete="off"
              layout="vertical"
              // requiredMark={customizeRequiredMark}
              className="FormElement"
              onFinish={onFinish}
            >
              <Form.Item
                required
                // label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input Valid Email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserRound size={20} color="#6b72808c" />}
                  placeholder="Enter Email"
                  size="large"
                  autoComplete="new-email"
                />
              </Form.Item>
              <Form.Item
                required
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<Lock size={20} color="#6b72808c" />}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter Password"
                  size="large"
                  autoComplete="new-password"
                  suffix={
                    passwordVisible ? (
                      <Eye
                        size={20}
                        color="#6b72808c"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      />
                    ) : (
                      <EyeOff
                        size={20}
                        color="#6b72808c"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      />
                    )
                  }
                />
              </Form.Item>
              <div
                className="create"
                style={{
                  justifyContent: "end",
                  width: "56%",
                  position: "relative",
                  top: "-13px",
                }}
              >
                <p>
                  <Link to="/ForgotPassword" style={{ color: "#023e8a" }}>
                    Forgot Password
                  </Link>
                </p>
              </div>
              <Form.Item>
                <Button
                  className="bottn"
                  loading={loading}
                  icon={Success ? <CircleCheckBig /> : ""}
                  size="large"
                  block
                  type={Success ? "default" : "primary"}
                  htmlType="submit"
                  disabled={Success}
                  onMouseEnter={handleHover}
                  onMouseLeave={handleLeave}
                >
                  {loading ? "Signing in..." : Success ? "" : "Sign in"}
                </Button>
              </Form.Item>

              <Form.Item>
                <div className="create">
                  <p>
                    Don't have an account ?{" "}
                    <Link to="/Register" style={{ color: "#023e8a" }}>
                      Register now!
                    </Link>
                  </p>
                </div>
              </Form.Item>
            </Form>
          </div>

          <div className="image">
            <img src={LogInImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
