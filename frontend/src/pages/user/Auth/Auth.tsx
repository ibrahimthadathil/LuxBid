import { Outlet } from "react-router-dom"
import NavBar from "../../../components/global/NavBar"
import { HeroHighlight } from "@/components/ui/hero-highlight"
import { useTheme } from "@/components/theme/theme-provider"


const Auth = () => {
  const {theme} = useTheme()
  return (
    <>
    <HeroHighlight bg={`${theme=='dark'?"bg-black":"bg-white"}`}>
      <div className="flex flex-col h-screen w-full bg-transparent">
        <div className="flex-shrink-0">
          <NavBar />
        </div>
        
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
      </HeroHighlight>
    </>
  )
}

export default Auth
