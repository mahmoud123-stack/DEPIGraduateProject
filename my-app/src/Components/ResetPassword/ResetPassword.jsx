import React from "react";
import "../LogIn/LogIn.css";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useCustomCursor } from "../Cursor/Cusror";
import LogInImage from "../../Assets/Reset password-amico.svg";
import axios from "axios";
import Blob from "../../Assets/wave.svg";
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
import { CircleCheckBig, Eye, EyeOff, UserRound, Lock } from "lucide-react";
export default function ResetPassword() {
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
  const token = useParams();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log({ token: token.token, newPassword: values.password });
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { token: token.token, newPassword: values.password }
      );
      console.log(response.data);
      messageApi.open({
        type: "success",
        content: response.data.message,
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
      const errMsg = err.response?.data?.message;
      messageApi.open({
        type: "error",
        content: errMsg || "Something went wrong",
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
                <h2>Reset Your Password</h2>
                <p> Enter your New Password </p>
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
                name="password"
                rules={[
                  {
                    required: true,
                    type: "password",
                    message: "Please input password!",
                  },
                ]}
              >
                <Input
                  prefix={<UserRound size={20} color="#6b72808c" />}
                  placeholder="Enter new password"
                  size="large"
                  autoComplete="new-password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    marginTop: "20px",
                  }}
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
                  {loading ? "Sending..." : Success ? "" : "Reset Password"}
                </Button>
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
