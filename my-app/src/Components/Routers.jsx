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
import TrackChoosingPage from "../Pages/TrackChoosingPage";
import ProtectedRoute from "../Components/ProtectedRoute";
import DashboardLayout from "../Components/DashboardLayout";
import LearningPathPage from "../Pages/LearningPathPage";
import ProfilePage from "../Pages/ProfilePage";
import EntryGate from "../Pages/EntryGate";
import ArticleDetailsPage from "../Pages/ArticleDetailsPage";
import TrackSkillsPage from "../Pages/TrackSkillsPage";
import InsightsPage from "../Pages/InsightsPage";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/article_Details", element: <ArticleDetailsPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/LogIn", element: <SignInPage /> },
      { path: "/Register", element: <RegisterPage /> },
      { path: "/ForgotPassword", element: <ForgotPasswordPage /> },
      { path: "/reset-password/:token", element: <ResetPasswordPage /> },
      { path: "/EntryPoint", element: <EntryGate /> },
      { path: "*", element: <NotFound /> },

      {
        path: "/trackChoosing",
        element: (
          <ProtectedRoute>
            <TrackChoosingPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/TrackSkills", element: <TrackSkillsPage /> },
      { path: "/dashboard/Profile", element: <ProfilePage /> },
      { path: "/dashboard/LearningPath", element: <LearningPathPage /> },
      { path: "/dashboard/Insights", element: <InsightsPage /> },
    ],
  },
]);

export default router;
