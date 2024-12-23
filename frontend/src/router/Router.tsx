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
import PublicRoute, { AdminPublicRoute } from "../service/PublicRoute";
import NotFoundPage from "../components/global/NotFoundPage";
import Forgetpassword from "../pages/user/Auth/Forgetpassword";
import SideTextSection from "../components/global/SideTextSection";
import ResetPassword from "../pages/user/Auth/ResetPassword";
import AdminHome from "@/pages/admin/Home/home";
import Loader from "@/components/global/Loader";
import Products from "@/pages/user/Home/Posts/Posts";
import RollProtected from "@/service/rolleProtected";
import Dashboard from "@/pages/admin/Home/Dashboard";
import Users from "@/pages/admin/Home/Users";
import Category from "@/pages/admin/Home/Category";
import Posts from "@/pages/admin/Home/Posts";
import ListAuction from "@/pages/user/Home/auction/ListAuction";
import Deals from "@/pages/user/Deals/Deals";
import Guide from "@/pages/user/Guide/Guide";
import AuctionPage from "@/pages/user/ViewAuction/Auction";
import AuctionInterface from "@/components/user/auction/AuctionInterface";
import Checkout from "@/components/user/stripe/Checkout";
import Return from "@/components/user/stripe/Return";
import MyBids from "@/components/user/profile/mybids/MyBids";
import AllDeals from "@/pages/user/Deals/AllDeals";
import AllAuctions from "@/components/admin/AllAuctions";
const UserProfile = React.lazy(()=>import('@/pages/user/Home/profile/UserProfile'))
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
      {
        path :'deals',
        element: <Deals/>,
      
      },
      {
        path:'guide',
        element : <Guide/>
      },
      {
        path:'AllDeals',
       element:<AllDeals/>
      },
      {
        path:'deals/auction',
        element:<AuctionPage/>,
      },
      {
        path:'deals/auction/bids',
        element :<AuctionInterface />
      },
      
    ],
  },
  {
    path:'/payment',
    element:<ProtectedRoute element={<Checkout/>} store="access-token"/>
  },
  {
    path:'/return',
    element:<Return/>
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
        element: <Suspense fallback={<Loader />}>
            <Profile />
          </Suspense>
      },
      {
        path: "product",
        element: <RollProtected element={<Products />} />,
      },
      {
        path:'auction',
        element:<RollProtected element={<ListAuction/>}/>
      },
      {
        path:'myBids',
        element:<MyBids/>
      }
    ],
  },

  // ADMIN ROUTE
  {
    path:'/admin',
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
           path:'users/:userRole' ,
           element:<Users/>
          },
          {
            path:'category',
            element:<Category/>
          },
          {
            path:'Posts/:child',
            element:<Posts/>
          },
          {
            path:'Auction/:child',
            element : <AllAuctions/>
          }
        ]
      }
    ]
  },

 
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
