import GoogleIcon from "../../../assets/icons/Google"
import { GoogleAuthProvider, signInWithPopup ,getAuth} from "@firebase/auth";
import { app } from "../../../config/firebase";
import {  googleAuthSignIn } from "../../../service/Api/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const GoogleAuth = () => {
  const navigate = useNavigate()
    const handleGoogleAuth=async()=>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const {user} = await signInWithPopup(auth,provider)
            const {data} = await googleAuthSignIn({email:String(user.email),firstName:String(user.displayName),profile:String(user.photoURL)})
            
            if(data.success){
              localStorage.setItem('access-token',data.AccessToken)
              navigate('/')
              toast.success(data.message)
            }
            
        } catch (error) {
            toast.error( (error as Error).message)
        }
    }
  return (
    <>
      <button 
        className="mt-3 w-[85%] sm:w-[58%] flex justify-center items-center gap-3 text-white p-2 px-4 md:px-5 rounded-md border border-[#426ea683]  hover:bg-[#312474c1] hover:border-black transition-colors duration-200"
        onClick={handleGoogleAuth}>
       <GoogleIcon /> Continue with Google
      </button>
    </>
  )
}

export default GoogleAuth