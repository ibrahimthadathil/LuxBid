import { logout, setRole } from "@/redux/slice/authSlice";
import { AppDispatch } from "@/redux/store/store";
import { fetchuser } from "@/service/Api/userApi";
import {  useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAuth=()=>{
    const navigate =useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    
    useEffect(() => {
        (async () => {
          try {
            const {data} = await fetchuser()
            dispatch(setRole(data.data.role))
          } catch (error) {
            console.log('from middle auth');
            navigate('/auth/signin')
            localStorage.removeItem('access-token')
            dispatch(logout())
          }
        })();
       
      }, []);

      
}