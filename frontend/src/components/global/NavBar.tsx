import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../public/Logo.png";
import IconBar from "./IconBar";
import Mode from "./Mode";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../theme/theme-provider";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {theme} = useTheme()
  
  const showIconBar =
    location.pathname !== "/auth/signup" &&
    location.pathname !== "/auth/signin" &&
    location.pathname !== "/auth/otp/verify" &&
    location.pathname !== "/auth/registration" &&
    location.pathname !== "/auth/forgetpassword" &&
    location.pathname !== "/auth/resetpassword";

  return (
    <>
      {/* Mobile/Tablet Navigation */}
      <nav className="flex items-center justify-between w-full p-4 lg:hidden">
        <div onClick={() => navigate('/')} className="flex-shrink-0">
          <img src={Logo} alt="Logo" className="w-16 sm:w-20" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <Mode />
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile/Tablet Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0   bg-indigo-700/20 z-40 lg:hidden"
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className={`fixed right-0 top-0 h-full w-64$ ${theme=='dark'?'bg-black':'bg-gray-50'} p-4 z-50 shadow-inner`}
            >
              <button 
                onClick={() => setIsSidebarOpen(false)} 
                className="absolute top-4 right-4 text-indigo-900 hover:text-indigo-400 transition-colors"
              >
                <X size={24} />
              </button>
              <div className="mt-12">
                {showIconBar && <IconBar isMobile={true} onCloseSidebar={() => setIsSidebarOpen(false)} />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex w-full">
        <div className="ps-8 w-[10%]" onClick={() => navigate('/')}>
          <img src={Logo} alt="Logo" className="w-28"/>
        </div>
        <div className="w-[70%] p-6 relative">
          {showIconBar && <IconBar />}
        </div>
        <div className="w-[20%] p-8 flex justify-end">
          <Mode />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
