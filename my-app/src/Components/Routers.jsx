import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import AuthLayout from "./AuthLayout";
import Home from "../Pages/HomePage";
import About from "../Pages/AboutPage";
import Dashboard from "../Pages/DashboardPage";
import LogIn from "../Pages/SignInPage";
import Register from "../Pages/SignUpPage";
import Blog from "../Pages/BlogPage";
import NotFound from "../Pages/NotFoundPage";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/blog", element: <Blog /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/LogIn", element: <LogIn /> },
      { path: "/Register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
