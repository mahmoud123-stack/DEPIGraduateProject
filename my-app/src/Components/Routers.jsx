import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import AuthLayout from "./AuthLayout";
import Home from "../Pages/HomePage";
import About from "../Pages/AboutPage";
import Dashboard from "../Pages/DashboardPage";
import SignInPage from "../Pages/SignInPage";
import RegisterPage from "../Pages/RegisterPage";
import Blog from "../Pages/BlogPage";
import NotFound from "../Pages/NotFoundPage";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage";
import ResetPasswordPage from "../Pages/ResetPasswordPage";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "/blog", element: <Blog /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/LogIn", element: <SignInPage /> },
      { path: "/Register", element: <RegisterPage /> },
      { path: "/ForgotPassword", element: <ForgotPasswordPage /> },
      { path: "/reset-password/:token", element: <ResetPasswordPage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
