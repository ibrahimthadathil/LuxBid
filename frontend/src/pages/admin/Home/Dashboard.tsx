import React, { useState } from 'react';
import Toggle from '../../../assets/icons/toggle';
import Logo from '../../../../public/Logo.png'
import Sidebar from '../../../components/admin/Sidebar';

interface AppProps {}

const Dashboard: React.FC<AppProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row">
        <p></p>
      <div className={`sidebar ${isSidebarOpen ? 'w-full md:w-1/4' : 'w-16'} h-screen p-4 bg-black text-white `}>
      <p className='text-end text-red-600'>{isSidebarOpen ? "LOGOUT" : ''}</p>
        <div className="mb-8 flex justify-between items-center">
          {isSidebarOpen && (
            <div className="flex items-center">
              <img alt="UX Bid Logo" className="mb-2" height="50" src={Logo} width="100" />
            </div>
          )}
          <button onClick={toggleSidebar} className="text-white">
            <Toggle/>
          </button>
        </div>
       <Sidebar isSidebarOpen={isSidebarOpen}/>
      </div>
      <div className={`w-full ${isSidebarOpen ? 'md:w-3/4' : 'md:w-full'} p-8`}>
        <div className="mb-4">
          <button className="tab-button bg-gray-700 text-white rounded-md px-4 py-2 mr-2">Buyer</button>
          <button className="tab-button bg-gray-700 text-white rounded-md px-4 py-2">Seller</button>
        </div>
        <div className="table-container bg-gray-800 text-white rounded-md p-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 bg-gray-700">No</th>
                <th className="p-3 bg-gray-700">User name</th>
                <th className="p-3 bg-gray-700">Email</th>
                <th className="p-3 bg-gray-700">Created At</th>
                <th className="p-3 bg-gray-700">Status</th>
                <th className="p-3 bg-gray-700">Participants</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-800">
                <td className="p-3">LB01</td>
                <td className="p-3"><a className="text-blue-500" href="#">John Samuel</a></td>
                <td className="p-3">john@gmail.com</td>
                <td className="p-3">12/03/2023</td>
                <td className="p-3 text-green-500">Active</td>
                <td className="p-3"><button className="participants-button bg-gray-700 text-white rounded-md px-4 py-2">View</button></td>
              </tr>
              <tr className="bg-gray-700">
                <td className="p-3">LB02</td>
                <td className="p-3"><a className="text-blue-500" href="#">Peter Orlam</a></td>
                <td className="p-3">peter@gmail.com</td>
                <td className="p-3">12/03/2023</td>
                <td className="p-3 text-red-500">Blocked</td>
                <td className="p-3"><button className="participants-button bg-gray-700 text-white rounded-md px-4 py-2">View</button></td>
              </tr>
              <tr className="bg-gray-800">
                <td className="p-3">LB03</td>
                <td className="p-3"><a className="text-blue-500" href="#">Abraham Philip</a></td>
                <td className="p-3">abraham@gmail.com</td>
                <td className="p-3">12/03/2023</td>
                <td className="p-3 text-green-500">Active</td>
                <td className="p-3"><button className="participants-button bg-gray-700 text-white rounded-md px-4 py-2">View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard
