import GoogleIcon from "../../../assets/icons/Google"
import { GoogleAuthProvider, signInWithPopup ,getAuth} from "@firebase/auth";
import { app } from "../../../config/firebase";
import {  googleAuthSignIn } from "../../../service/Api/userApi";
const GoogleAuth = () => {

    const handleGoogleAuth=async()=>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const {user} = await signInWithPopup(auth,provider)
            console.log(user);
            
            await googleAuthSignIn({email:String(user.email),firstName:String(user.displayName),profile:String(user.photoURL)})
            
        } catch (error) {
            
        }
    }
  return (
    <>
        <button className="mt-3 flex gap-3 text-white p-2 px-5 rounded-md items-center border border-[#426ea683]"
        onClick={handleGoogleAuth}
        >
            <GoogleIcon /> Continue with Google
        </button>
    </>
  )
}

export default GoogleAuth
