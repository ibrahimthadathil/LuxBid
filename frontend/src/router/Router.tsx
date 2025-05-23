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
import PublicRoute, {
  AdminProtected,
  AdminPublicRoute,
} from "../service/PublicRoute";
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
import Chat from "@/pages/user/Community/Chat";
import ChatUI from "@/components/user/chats/ChatUi";
import GroupList from "@/components/user/chats/GroupList";
import Orders from "@/pages/user/Home/orders/Orders";
import Winnnings from "@/components/user/profile/winnings/winnnings";
import OrdersStatus from "@/components/user/profile/orders/orders";
import Transactions from "@/pages/user/Home/payment/Transactions";
import SetRole from "@/components/user/profile/Landing/SetRole";
import OrderDispatches from "@/components/user/profile/orders/orderDispatches";
import AboutPage from "@/pages/user/About/About";
const UserProfile = React.lazy(
  () => import("@/pages/user/Home/profile/UserProfile")
);
const Profile = React.lazy(() => import("../pages/user/Home/profile/profile"));

export const Router = createBrowserRouter([
  // USER ROUTE
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        element: <SideTextSection />,
        children: [
          {
            path: "registration",
            element: <PublicRoute element={<Registration />} route="/" />,
          },
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
            element: <PublicRoute element={<OTP />} route="/" />,
          },

          {
            path: "forgetpassword",
            element: <PublicRoute route="/" element={<Forgetpassword />} />,
          },
          {
            path: "resetpassword",
            element: <PublicRoute element={<ResetPassword />} route="/" />,
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
        path: "deals",
        element: <Deals />,
      },
      {
        path: "guide",
        element: <Guide />,
      },
      {
        path:"about",
        element:<AboutPage/>
      },
      {
        path: "AllDeals",
        element: <AllDeals />,
      },
      {
        path: "deals/auction",
        element: <AuctionPage />,
      },
      {
        path: "deals/auction/bids",
        element: <AuctionInterface />,
      },
      {
        path: "/community",
        element: <ProtectedRoute element={<Chat />}/>,
        children: [
          {
            path: "", // Default path showing the group list
            element: <GroupList />,
          },
          {
            path: ":groupId", // Dynamic path for the chat UI
            element: <ChatUI />,
          },
        ],
      },
    ],
  },
  {
    path: "/payment",
    element: <ProtectedRoute element={<Checkout />} />,
  },

  {
    path: "/return",
    element: <ProtectedRoute element={<Return />} />,
  },
  {
    path: "/user",
    element: (
      <Suspense
        fallback={
          <div className="bg-black h-screen items-center flex justify-center text-white">
            <Loader />
          </div>
        }
      >
        <UserProfile />
      </Suspense>
    
    ),
    children: [
      {
        path: "profile",
        element: (
            <RollProtected element={<Profile />} />

        ),
      },
      {
        path:'setrole',
        element:<RollProtected element={<SetRole/>} guest={true} />
      },
      {
        path: "product",
        element: <RollProtected element={<Products />} />,
      },
      {
        path: "auction",
        element: <RollProtected element={<ListAuction />} />,
      },
      {
        path: "myBids",
        element: <MyBids />,
      },
      {
        path: "orders",
        element: <Orders />,
        children: [
          {
            path:'',
            element:<Navigate to='history'/>
          },
          {
            path:'dispatch',
            element:<OrderDispatches/>
          },
          {
            path: "winnings",
            element:<Winnnings/>
          },
          {
            path:"history",
            element:<OrdersStatus/>
          }
        ],
      },
      {
        path:'transactions',
        element:<Transactions/>
      }
    ],
  },

  // ADMIN ROUTE
  {
    path: "/admin",
    children: [
      {
        path: "",
        element: <Navigate to="auth" replace />,
      },
      {
        path: "auth",
        element: <AdminPublicRoute element={<SignInAdmin />} />,
        index: true,
      },
      {
        path: "LB",
        element: <AdminProtected element={<AdminHome />} />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "users/:userRole",
            element: <Users />,
          },
          {
            path: "category",
            element: <Category />,
          },
          {
            path: "Posts/:child",
            element: <Posts />,
          },
          {
            path: "Auction/:child",
            element: <AllAuctions />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
