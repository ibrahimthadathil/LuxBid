import { useSelector } from 'react-redux'
import Navbar from '../../../components/global/NavBar'
import { Rootstate } from '../../../redux/store/store'

const Home = () => {
  const user = useSelector((state:Rootstate)=>state.user.userName)
  console.log(user,'kkkk');
  
  return (
    <>
    <div className='bg-black w-full h-screen'>
        <Navbar/>
    </div>
    </>
  )
}

export default Home
