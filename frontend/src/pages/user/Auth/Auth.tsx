import { Outlet } from "react-router-dom"
import NavBar from "../../../components/global/NavBar"

const Auth = () => {
  return (
   <>
   <div className="bg-black  min-h-screen w-full">
            <NavBar/>
            <Outlet/>
   </div>
   </>
  )
}

export default Auth
