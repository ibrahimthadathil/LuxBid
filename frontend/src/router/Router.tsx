import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import Auth from "../pages/user/Auth/Auth";
import Signup from "../pages/user/Auth/Signup";
import Home from "../pages/user/Home/Home";
import SignIn from "../pages/user/Auth/SignIn";
import OTP from "../pages/user/Auth/OTP";
import Registration from "../pages/user/Auth/Registration";
import SignInAdmin from "../pages/admin/Auth/Signup";
import ProtectedRoute from "../service/Protected";
import User from "../pages/admin/Home/User";
import PublicRoute, { AdminPublicRoute } from "../service/PublicRoute";
import UserProfile from "../pages/user/Home/profile/UserProfile";
import NotFoundPage from "../components/global/NotFoundPage";
import Forgetpassword from "../pages/user/Auth/Forgetpassword";
import SideTextSection from "../components/global/SideTextSection";
import ResetPassword from "../pages/user/Auth/ResetPassword";
import AdminHome from "@/pages/admin/Home/home";
import Loader from "@/components/global/Loader";
import Products from "@/pages/user/Home/products/Products";
import RollProtected from "@/service/rolleProtected";
import Dashboard from "@/pages/admin/Home/Dashboard";
import DataTable from "@/components/global/dataTable";
const Profile = React.lazy(() => import("../pages/user/Home/profile/SetRole"));

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
    element: (
      <ProtectedRoute
        element={
          <Suspense
            fallback={
              <div className="bg-black h-screen items-center flex justify-center text-white">
                <Loader />
              </div>
            }
          >
            <UserProfile />
          </Suspense>
        }
        store="access-token"
      />
    ),
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "product",
        element: <RollProtected element={<Products />} />,
      },
    ],
  },

  // ADMIN ROUTE
  {
    path:'/api/admin',
    children: [
      {
        path: '',
        element: <Navigate to="auth" replace />, 
      },
      {
        path: 'auth',
        element: <AdminPublicRoute element={<SignInAdmin/>}/>,
        index:true
      },
      {
        path:'LB',
        element : <ProtectedRoute element={<AdminHome/>} store="accessToken" />,
        children:[
          {
            path:'dashboard',
            element:<Dashboard/>
          },
          {
           path:'users' ,
           
          }
        ]
      }
    ]
  },

  // {
  //   path: "/api/admin/auth",
  //   element: <AdminPublicRoute element={<SignInAdmin />} />,
  // },
  
  {
    path: "/api/admin/users",
    element: <ProtectedRoute element={<User />} store="accessToken" />,
  },
  // {
  //   path: "/api/admin",
  //   element: <AdminHome />,
  //   children: [
  //     {
  //       path: "dashboard",
  //       element: <Dash />,
  //     },
  //     {
  //       path: "us",
  //       element: <DataTable />,
  //     },
  //   ],
  // },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
