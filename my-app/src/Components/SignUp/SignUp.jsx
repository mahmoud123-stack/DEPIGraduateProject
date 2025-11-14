// import { useState } from "react";
// import axios from "axios";
// import "./SignUp.css";

// function SignUp() {
//   const [FormState, setFormState] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     age: "",
//   });

//   const HandleFormSubmit = async (e) => {
//     e.preventDefault();
//     console.log(FormState);
//     setFormState({ name: "", email: "", password: "", phone: "", age: "" });

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/signup",
//         FormState
//       );
//       console.log(`User ${FormState.name} signed up successfully`);
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const HandleChange = (e) => {
//     const { name, value } = e.target;
//     setFormState({ ...FormState, [name]: value });
//   };

//   return (
//     <div className="SignUp">
//       <div className="container">
//         <form action="">
//           <div className="InputElement">
//             <input
//               name="name"
//               type="text"
//               id="nameInput"
//               value={FormState.name}
//               onChange={HandleChange}
//               className={FormState.name ? "Filled" : ""}
//             />
//             <label htmlFor="nameInput">Name</label>
//           </div>

//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             id="EmailInput"
//             value={FormState.email}
//             onChange={HandleChange}
//           />
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             id="PasswordInput"
//             value={FormState.password}
//             onChange={HandleChange}
//           />

//           <input
//             name="phone"
//             type="tel"
//             id="TelNumInput"
//             placeholder="Phone Number"
//             value={FormState.phone}
//             onChange={HandleChange}
//           />

//           <input
//             name="age"
//             type="number"
//             id="AgeInput"
//             placeholder="Age"
//             value={FormState.age}
//             onChange={HandleChange}
//           />

//           <button onClick={HandleFormSubmit}>Sign Up</button>
//         </form>

//         <div className="LeftSide">
//           <div className="Info">
//             <h2>Create Your Account</h2>
//             <p>
//               Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
//               maiores labore corporis sunt tempore voluptatibus.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;

import React from "react";
import "../LogIn/LogIn.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCustomCursor } from "../Cursor/Cusror";
import LogInImage from "../../Assets/Sign up-amico.svg";
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
  Segmented,
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

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        values
      );
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
