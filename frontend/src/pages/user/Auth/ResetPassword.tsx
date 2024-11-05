import { useState } from "react"
import FormInput from "../../../components/global/formInput"
import { toast } from "sonner"
import { resetPassword } from "../../../service/Api/userApi"
import { useNavigate } from "react-router-dom"

const ResetPassword = () => {
    const [password,setPassword] = useState('')
    const [newpassword,setnewPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit =async()=>{
        try {
            const token = localStorage.getItem('rptkn')
            if(token){
               const {data}= await resetPassword(password,newpassword,token)
               if(data.success){
                    localStorage.removeItem('rptkn')
                    toast.success(data.message)
                    navigate('/auth/signin')
               }
            }else{
                toast.error('Invalid access')
            }
            
        } catch (error) {
            
        }
    }

  return (
    <>
    <div className="lg:w-[50%] w-full flex justify-center pt-6 lg:pt-[7rem] px-4 lg:ps-[4rem]">
      <div className="w-full max-w-md flex flex-col items-center text-[#7b7575] text-center">
        <h1 className="text-[1.8rem] md:text-[2.2rem] font-thin bg-text-gradient bg-clip-text text-transparent">
          Enter Password
        </h1>
        <h2 className="mt-4 text-gray-400">Enter new password to Restore .</h2>
        <br />
        <label className="pe-[13rem] pb-1 text-gray-400" htmlFor=""> Password</label>
        <FormInput
          type="password"
          value={password}
          holder=""
          setter= {setPassword}
        />
        <label className="pe-44 pb-1 text-gray-400" htmlFor="">New password</label>
        <FormInput
          type="password"
          value={newpassword}
          holder=""
          setter= {setnewPassword}
        />
        <button
          type="submit"
          className="mt-3 w-[35%] sm:w-[35%] text-white p-2 rounded-md bg-zinc-800"
          onClick={handleSubmit}
        >
          Verify
        </button>
      </div>
    </div>

    </>
  )
}

export default ResetPassword
