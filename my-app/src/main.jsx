import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import router from "./Components/Routers.jsx";
import "./index.css";
import "antd/dist/reset.css";
import { AuthProvider } from "./Context/AuthProvider";
import TrackProvider from "./Context/TrackProvider";
import UserDataProvider from "./Context/UserDataProvider";
import ArticleProvider from "./Context/ArticleProvider";
import {CursorProvider} from "./Components/Cursor/Cusror";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <CursorProvider>
    <AuthProvider>
      <UserDataProvider>
        <TrackProvider>
          <ArticleProvider>
            <RouterProvider router={router} />
          </ArticleProvider>
        </TrackProvider>
      </UserDataProvider>
    </AuthProvider>
  </CursorProvider>
  // </StrictMode>
);
