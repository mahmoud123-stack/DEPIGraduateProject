import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import router from "./Components/Routers.jsx";
import "./index.css";
import "antd/dist/reset.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
