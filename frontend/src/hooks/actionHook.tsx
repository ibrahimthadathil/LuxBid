import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

const useActionHook = () => {
    const queryclient = useQueryClient();
 const handler=async (executer:Function,params?:any,refetchKey?:string)=>{
    try {
        const {data} = await executer(params)        
        if(data.success){
           if(refetchKey)await queryclient.invalidateQueries({queryKey:[refetchKey]})
            toast.success(data.message)
        return true
        }else{
            toast.error(data.message)
            return false
        } 
      } catch (error) {
        toast.error(((error as AxiosError).response?.data as Record<string,any>).message)
      }
  }
  return {handler}
}
export default useActionHook
