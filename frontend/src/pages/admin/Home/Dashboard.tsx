import React, { useEffect, useState } from 'react';
import Toggle from '../../../assets/icons/toggle';
import Logo from '../../../../public/Logo.png'
import Sidebar from '../../../components/admin/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, Rootstate } from '../../../redux/store/store';
import { Logout } from '../../../redux/slice/adminSlice';
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/admin/Table';
import { FetchUsers } from '../../../service/Api/adminApi';
import { Iuser } from '../../../types/user';

interface AppProps {}

const Dashboard: React.FC<AppProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const name = useSelector((state:Rootstate)=>state.admin.adminName)
  const dispatch =useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [users,setUsers]=useState<Iuser | {}[]>([{}])
  const [fetching,setFetching]=useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async()=>{
      try {
       const users =  await FetchUsers()
       setUsers(users.data)
       setLoading(false)
       
      } catch (error) {
        
      }
      finally{
        setLoading(false)
      }
    })()
  },[fetching])

  const setFetch=()=>{
    setFetching(!fetching)
  }

  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout =()=>{ 
    dispatch(Logout())
    navigate('/api/admin/auth')
    
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className={`sidebar ${isSidebarOpen ? 'w-full md:w-1/4' : 'w-16'} h-screen p-4 bg-black text-white `}>
        <p className='text-white'>{isSidebarOpen ? name : ''}</p>
      
      <p className='text-end text-red-600' onClick={logout}>{isSidebarOpen ? "LOGOUT" : ''}</p>
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
      <div className={`w-full ${isSidebarOpen ? 'md:w-3/4' : 'md:w-full'} bg-zinc-900 p-8`}>
        <div className="mb-4">
          {/* <button className="tab-button bg-gray-700 text-white rounded-md px-4 py-2 mr-2">Buyer</button>
          <button className="tab-button bg-gray-700 text-white rounded-md px-4 py-2">Seller</button> */}
        </div>
        <div className="table-container bg-gray-800 text-white rounded-md p-4 overflow-x-auto">
          {loading ?
            <div className="spinner-container">
            <div className="spinner" />
            Loading...
          </div> :
          <Table fetch={setFetch} datas={users as Iuser[]}/> 

          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard
