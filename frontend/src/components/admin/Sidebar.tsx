import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaFileAlt, FaGavel, FaList, FaShoppingCart } from 'react-icons/fa';
import User from '../../assets/icons/Users';

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => (
  <nav className="flex flex-col space-y-2">
    <Link to="" className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      <User />
      {isSidebarOpen && <span className="ml-4">Users</span>}
    </Link>
    <Link to="" className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      <FaTachometerAlt />
      {isSidebarOpen && <span className="ml-4">Dashboard</span>}
    </Link>
    {/* <Link to="" className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      <FaFileAlt />
      {isSidebarOpen && <span className="ml-4">Auction Request</span>}
    </Link>
    <Link to="" className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      <FaGavel />
      {isSidebarOpen && <span className="ml-4">Auctions</span>}
    </Link>
    <Link to="" className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      <FaList />
      {isSidebarOpen && <span className="ml-4">Category</span>}
    </Link>
    <Link to="" className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      <FaShoppingCart />
      {isSidebarOpen && <span className="ml-4">Orders</span>}
    </Link> */}
  </nav>
);

export default Sidebar;
