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
import PublicRoute from "../service/PublicRoute";
import Profile from "../pages/user/Home/Profile";
import NotFoundPage from "../components/global/NotFoundPage";


export const Router = createBrowserRouter([
    // USER ROUTE
        {
            path: '/auth',
            element: <Auth />,
            children: [
              {
                path: '', 
                element: <Navigate to="/auth/signup" />
              },
              {
                path: 'signup', 
                element: <PublicRoute element={<Signup />}/>
              },
              {
                path :'signin',
                element : <PublicRoute element={<SignIn/>}/>
              },
              {
                path:'otp/verify',
                element :<ProtectedRoute element={<OTP/>} store="otp-token"/>
              },
              {
                path :'registration',
                element :<ProtectedRoute element={<Registration/>} store='registration-token'/>
              }
            ]
          },
          {
            path:'/',
            element:<Home/>,
           children:[
            {
              path:'home',
              element: <Navigate to ='/'/>
            }
           ]
          },
          {
            path :'/user/profile',
            element:<ProtectedRoute element={<Profile/>} store="access-token" />            
             
          },

  // ADMIN ROUTE
    {
      path :'/api/admin/auth',
      element:<SignInAdmin/>,
      
    },
    {
      path :'/api/admin/dashboard',
      element: <ProtectedRoute element={<Dashboard/> } store="accessToken"/>,
      
    },
    {
      path:'*',
      element :<NotFoundPage/>
    }



]) 