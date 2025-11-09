import { useState } from "react";
import axios from "axios";
import "./SignUp.css";




function SignUp() {
  const [FormState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
  });

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(FormState);
    setFormState({ name: "", email: "", password: "", phone: "", age: "" });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        FormState
      );
      console.log(`User ${FormState.name} signed up successfully`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...FormState, [name]: value });
  };

  return (
    <div className="SignUp">
      <div className="container">
        <form action="">
          <div className="InputElement">
            <input
              name="name"
              type="text"
              id="nameInput"
              value={FormState.name}
              onChange={HandleChange}
              className={FormState.name ? "Filled" : ""}
            />
            <label htmlFor="nameInput">Name</label>
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email"
            id="EmailInput"
            value={FormState.email}
            onChange={HandleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            id="PasswordInput"
            value={FormState.password}
            onChange={HandleChange}
          />

          <input
            name="phone"
            type="tel"
            id="TelNumInput"
            placeholder="Phone Number"
            value={FormState.phone}
            onChange={HandleChange}
          />

          <input
            name="age"
            type="number"
            id="AgeInput"
            placeholder="Age"
            value={FormState.age}
            onChange={HandleChange}
          />

          <button onClick={HandleFormSubmit}>Sign Up</button>
        </form>

        <div className="LeftSide">
          <div className="Info">
            <h2>Create Your Account</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
              maiores labore corporis sunt tempore voluptatibus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

// import React from "react";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Checkbox, Form, Input, Flex } from "antd";
// const App = () => {
//   const onFinish = (values) => {
//     console.log("Received values of form: ", values);
//   };
//   return (
//     <Form
//       name="login"
//       initialValues={{ remember: true }}
//       style={{ maxWidth: 360 }}
//       onFinish={onFinish}
//     >
//       <Form.Item
//         name="username"
//         rules={[{ required: true, message: "Please input your Username!" }]}
//       >
//         <Input prefix={<UserOutlined />} placeholder="Username" />
//       </Form.Item>
//       <Form.Item
//         name="password"
//         rules={[{ required: true, message: "Please input your Password!" }]}
//       >
//         <Input
//           prefix={<LockOutlined />}
//           type="password"
//           placeholder="Password"
//         />
//       </Form.Item>
//       <Form.Item>
//         <Flex justify="space-between" align="center">
//           <Form.Item name="remember" valuePropName="checked" noStyle>
//             <Checkbox>Remember me</Checkbox>
//           </Form.Item>
//           <a href="">Forgot password</a>
//         </Flex>
//       </Form.Item>

//       <Form.Item>
//         <Button block type="primary" htmlType="submit">
//           Log in
//         </Button>
//         or <a href="">Register now!</a>
//       </Form.Item>
//     </Form>
//   );
// };
