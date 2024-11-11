import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth from "../pages/user/Auth/Auth";
import Signup from "../pages/user/Auth/Signup";
import Home from "../pages/user/Home/Home";
import SignIn from "../pages/user/Auth/SignIn";
import OTP from "../pages/user/Auth/OTP";
import Registration from "../pages/user/Auth/Registration";
import SignInAdmin from "../pages/admin/Auth/Signup";
import ProtectedRoute from "../service/Protected";
import Dashboard from "../pages/admin/Home/Dashboard";
import PublicRoute, { AdminPublicRoute } from "../service/PublicRoute";
import UserProfile from "../pages/user/Home/UserProfile";
import NotFoundPage from "../components/global/NotFoundPage";
import Forgetpassword from "../pages/user/Auth/Forgetpassword";
import SideTextSection from "../components/global/SideTextSection";
import ResetPassword from "../pages/user/Auth/ResetPassword";
import AdminHome from "@/pages/admin/Home/home";
import Profile from "@/pages/user/Home/Profile";

export const Router = createBrowserRouter([
  // USER ROUTE
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "registration",
        element: (
          <ProtectedRoute
            element={<Registration />}
            store="registration-token"
          />
        ),
      },
      {
        element: <SideTextSection />,
        children: [
          {
            path: "",
            element: <Navigate to="/auth/signup" />,
          },
          {
            path: "signup",
            element: <PublicRoute element={<Signup />} route="/" />,
          },
          {
            path: "signin",
            element: <PublicRoute element={<SignIn />} route="/" />,
          },
          {
            path: "otp/verify",
            element: <ProtectedRoute element={<OTP />} store="otp-token" />,
          },

          {
            path: "forgetpassword",
            element: <PublicRoute route="/" element={<Forgetpassword />} />,
          },
          {
            path: "resetpassword",
            element: (
              <ProtectedRoute store="rptkn" element={<ResetPassword />} />
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "home",
        element: <Navigate to="/" />,
      },
    ],
  },
  {
    path: "/user",
    element: <ProtectedRoute element={<UserProfile />} store="access-token" />,
    children: [
      
      {
        path: "profile",
        element:<ProtectedRoute element={<Profile />} store="access-token"/>,
      },
     
    ],
  },

  // ADMIN ROUTE
  {
    path: "/api/admin/auth",
    element: <AdminPublicRoute element={<SignInAdmin />} />,
  },
  {
    path: "/api/admin/users",
    element: <ProtectedRoute element={<Dashboard />} store="accessToken" />,
  },
  {
    path: "/api/admin/",
    element: <AdminHome />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
