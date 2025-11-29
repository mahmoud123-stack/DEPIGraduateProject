import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import AuthContext from "../Context/AuthContext";
import "../index.css";

import { Spin } from "antd";

const ProtectedRoute = ({ children }) => {
  const Navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === null) {
    <div
      style={{ height: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Spin className="Spinner" size="large" />
    </div>;
  }

  if (isLoggedIn !== null && !isLoggedIn) {
    return (
      <>
        <Result
          status="error"
          title="Can not access this page"
          subTitle="You are not logged in to access this page please login and try again  if you are not registered please register first"
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => Navigate("/LogIn")}
            >
              Log In
            </Button>,
            <Button
              onClick={() => Navigate("/Register")}
              type="default"
              key="buy"
            >
              Register
            </Button>,
          ]}
        ></Result>
        {/* <Navigate to="/LogIn" /> */}
      </>
    );
  }
  return children;
};

export default ProtectedRoute;
