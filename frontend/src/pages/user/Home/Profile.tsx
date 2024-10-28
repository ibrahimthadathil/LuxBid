import { useDispatch } from "react-redux"
import { logout } from "../../../redux/slice/authSlice"
import { useNavigate } from "react-router-dom"

const Profile = () => {
const dispatch = useDispatch()
const navigate =useNavigate()
    const handleClick=()=>{
        localStorage.removeItem('access-token')
        dispatch(logout())
        navigate('/')
    }

  return (
    <>
    <div className='flex items-center justify-center h-screen'> 
    <button className='p-4 text-red-300 bg-black rounded-xl' onClick={handleClick}>Logout</button>
</div>

    </>
  )
}

export default Profile
