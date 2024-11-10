import { useState, useMemo } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../../public/Logo.png";
import { Outlet } from "react-router";

const sidebarItems = [
  { icon: "📊", label: "Dashboard" },
  { icon: "👤", label: "Profile" },
  { icon: "⚙️", label: "Settings" },
  { icon: "🚪", label: "Logout" }, 
];

const Sidebars = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const sidebarContent = useMemo(
    () => (
      <ul className="space-y-4 w-full ">
        {sidebarItems.map(({ icon, label }) => (
          <li
            key={label}
            className="flex items-center py-2 cursor-pointer hover:bg-gray-500 rounded-xl hover:text-[#5B4BAE] px-2"
          >
            <span className="inline-block h-6 w-6 mr-2">{icon}</span>
            {!isCollapsed && <span className="">{label}</span>}
          </li>
        ))}
      </ul>
    ),
    [isCollapsed]
  );

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={` rounded-3xl flex flex-col relative transition-all bg-[#2a2a2d9a] duration-300 m-3 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-2 right-2  w-8 h-8 rounded-full hover:bg-slate-500 flex items-center justify-center"
        >
          {isCollapsed ? <Menu size={16} /> : <X size={16} />}
        </button>
        {/* Toggle Button - Added flex classes for centering */}

        {/* Content Container */}
        <div className="p-4 pt-12 flex flex-col items-center w-full">
          {/* Avatar */}
          <img
            src={Logo}
            className="w-12 h-12 rounded-full mb-4 border"
          />

          {/* Sidebar Header */}
          {!isCollapsed && (
            <h2 className=" text-lg font-bold mb-4">Sidebar</h2>
          )}

          {/* Sidebar Items */}
          {sidebarContent}
        </div>
      </div>

      {/* Main Content */}
      <Outlet/>
    </div>
  );
};

export default Sidebars;
