import GoogleIcon from "../../../assets/icons/Google"
import { GoogleAuthProvider, signInWithPopup ,getAuth} from "@firebase/auth";
import { app } from "../../../config/firebase";
const GoogleAuth = () => {

    const handleGoogleAuth=async()=>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider)
            console.log(result);
            
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
