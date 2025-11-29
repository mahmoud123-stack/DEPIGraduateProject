import NotFoundImage from "../Assets/new 404 Error.svg";
import { Button, Result } from "antd";
import "../index.css";
export default function NotFoundPage() {
  return (
    <div
      className="NotFoundPage"
      style={{
        height: "100vh",
        display: 'flex',
        alignItems: "center",
        justifyContent : "center"
      }}
    >
      <div className="d-flex align-items-center justify-content-center w-75">
        <img className="w-75" src={NotFoundImage} alt="" />
      </div>
    </div>
  );
}
