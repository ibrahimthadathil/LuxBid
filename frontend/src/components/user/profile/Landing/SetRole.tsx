import ProfileCards from "@/components/global/ProfileCards"
import { useTheme } from "@/components/theme/theme-provider"
import { setRole } from "@/redux/slice/authSlice"
import { AppDispatch } from "@/redux/store/store"
import { setupBuyer, setupSeller } from "@/service/Api/userApi"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useDispatch  } from "react-redux"
import { toast } from "sonner"

const SetRole = () => {
    const {theme}= useTheme()
    const queryCLient = useQueryClient()
    const dispatch = useDispatch<AppDispatch>()
    const setBuyer=async()=>{
      try {
        const {data}= await setupBuyer()
        if(data.success){    
          queryCLient.invalidateQueries({queryKey:['User']})
          dispatch(setRole('Buyer'))
        }else{
          throw new Error(data.message)
        }
      } catch (error) {
        console.log('eroor from cards',error);
        toast.error(((error as AxiosError).response?.data as Record<string,string>).message)
      }
    }
  
    const setSeller =async()=>{
      try {
       const {data} = await setupSeller()
       if(data.success){      
        queryCLient.invalidateQueries({queryKey:['User']})
        dispatch(setRole('Seller'))
      }else{
        throw new Error(data.message)
      }
      } catch (error) {
        console.log('eroor from cards',error);
        toast.error(((error as AxiosError).response?.data as Record<string,string>).message)
      }
    }
    
  return (
    <div className={`flex-1 flex flex-col  p-5 ${theme=='dark'?'bg-[#1a191996]':'bg-gray-100'}  m-4  rounded-3xl shadow-inner `}>
    <h1 className={` text-2xl font-semibold mb-4 text-gray-200 ${theme=='dark'?'':'text-indigo-800'}`}></h1>
    <ProfileCards buyer={setBuyer} seller={setSeller} />
    </div>
  )
}

export default SetRole
