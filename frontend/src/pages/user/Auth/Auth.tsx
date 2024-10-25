import { Outlet } from "react-router-dom"
import NavBar from "../../../components/global/NavBar"

const Auth = () => {
  return (
    <>
      <div className="flex flex-col h-screen w-full bg-black">
        <div className="flex-shrink-0">
          <NavBar />
        </div>
        
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Auth
