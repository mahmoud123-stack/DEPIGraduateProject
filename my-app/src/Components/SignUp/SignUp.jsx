import "../LogIn/LogIn.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCustomCursor } from "../Cursor/Cusror";
import LogInImage from "../../Assets/Sign up-amico.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message, Button, Form, Input, notification, Tag } from "antd";
import {
  CircleCheckBig,
  Eye,
  EyeOff,
  Undo2,
  UserRound,
  Lock,
  Mail,
} from "lucide-react";
export default function SignUp() {
  const customizeRequiredMark = (label, { required }) => (
    <>
      {required ? (
        <Tag color="error">Required</Tag>
      ) : (
        <Tag color="warning">optional</Tag>
      )}
      {label}
    </>
  );
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [Success, setSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [messageApi, MessageHolder] = message.useMessage();
  const [notificationApi, NotificationHolder] = notification.useNotification();
  const { handleHover, handleLeave, handleTextEnter, handleTextLeave } =
    useCustomCursor();

  const api = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: "http://localhost:5000",
  });

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post("/api/auth/signup", values);
      messageApi.open({
        type: "success",
        content: response?.data?.Message,
        duration: 3,
      });
      setTimeout(() => {
        messageApi
          .open({
            type: "loading",
            content: "Let's Sign you in",
            duration: 2,
          })
          .then(() => {
            navigate("/LogIn");
          });
      }, 3000);
      setSuccess(true);
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.response?.data?.Message || "Something went wrong",
        duration: 5,
      });
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
                <h2> Create Your Account</h2>
                <p>Join us today to take control of your career journey</p>
              </div>
            </div>
            <Form
              form={form}
              autoComplete="off"
              layout="vertical"
              className="FormElement"
              onFinish={onFinish}
            >
              <Form.Item
                required
                name="name"
                rules={[
                  {
                    required: true,
                    type: "text",
                    message: "Please input your Name!",
                  },
                ]}
              >
                <Input
                  prefix={<UserRound size={20} color="#6b72808c" />}
                  placeholder="Full name"
                  size="large"
                  autoComplete="new-name"
                />
              </Form.Item>

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
                  prefix={<Mail size={20} color="#6b72808c" />}
                  placeholder="Email"
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
                  placeholder="Password"
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
                  {loading ? "Registering..." : Success ? "" : "Register"}
                </Button>
              </Form.Item>

              <Form.Item>
                <div className="create">
                  <p>
                    Already have an account ?{" "}
                    <Link to="/LogIn" style={{ color: "#023e8a" }}>
                      Sign in!
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
