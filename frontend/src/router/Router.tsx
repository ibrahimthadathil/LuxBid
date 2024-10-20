import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/user/Auth/Auth";
import Signup from "../pages/user/Auth/Signup";


export const Router = createBrowserRouter([
    {
        path:'/auth',
        element: <Auth/>,
        children:[
            {
                path :'signup',
                element:<Signup/>
            }
        ]

    }
]) 