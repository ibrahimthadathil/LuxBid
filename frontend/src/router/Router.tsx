import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth from "../pages/user/Auth/Auth";
import Signup from "../pages/user/Auth/Signup";
import Home from "../pages/user/Home/Home";


export const Router = createBrowserRouter([
    
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
                element: <Signup />
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
          }

    
]) 