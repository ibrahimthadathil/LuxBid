
import { saveEdit } from '@/service/Api/userApi'
import { Iuser } from '@/types/types'
import { errorFn, TZprofile, ZeditProfile } from '@/utils/validation/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import {  AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useTheme } from '../theme/theme-provider'

const UserForm = ({user}:{user:Iuser}) => {
  const [changed,setChange]=useState(true);
  const queryClient = useQueryClient()
  const {theme} =useTheme()

  const {handleSubmit,register}=useForm<TZprofile>({resolver:zodResolver(ZeditProfile),defaultValues:{
    firstName: user.firstName,
      lastName: user.lastName ,
      email: user.email,
      phone: user.phone 
  }})
const editProfile =async(datas:TZprofile)=>{
    try {
    const {data}= await saveEdit(datas)
    if(data.success){
      setChange(true)
      await queryClient.invalidateQueries({queryKey:[user.role]})
      await queryClient.invalidateQueries({queryKey:['User']});
      // refetch()
      toast.success(data.message)
    }else toast.error(data.message)
    } catch (error) {
      toast.error(((error as AxiosError).response?.data as Record<string,string>).message)
    }
}
  return (
    <>
    <div className={`col-span-2 ${theme=='dark'?'bg-black':'bg-gray-100'} shadow-inner rounded-2xl p-4`}>
      <h2 className={`text-xl font-bold  mb-3 ${theme=='dark'?'text-gray-200':'text-indigo-900'}`}>Change details</h2>
      <form className="space-y-4" onSubmit={(handleSubmit(editProfile,errorFn))}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm ${theme=='dark'?'text-gray-400':'text-black'} mb-1`}>First name</label>
            <input
            {...register('firstName')}
            onChange={()=>setChange(false)}
              type="text"
              className={`w-full ${theme=='dark'?'bg-[#1a1a1a] ':'bg-gray-200'}  rounded-xl px-4 py-[10px] focus:outline-none focus:ring-[.5px] focus:ring-purple-500 text-gray-200"`}
            />
          </div>
          <div>
            <label className={`block text-sm ${theme=='dark'?'text-gray-400':'text-black'} mb-1`}>Last name</label>
            <input
            {...register('lastName')}
            onChange={()=>setChange(false)}
              type="text"
              placeholder='Optional'
              className={`w-full ${theme=='dark'?'bg-[#1a1a1a] ':'bg-gray-200'} bg-[#1a1a1a]  rounded-xl px-4 py-[10px] focus:outline-none focus:ring-[.5px] focus:ring-purple-500 text-gray-200"`}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm ${theme=='dark'?'text-gray-400':'text-black'} mb-1`}>Email</label>
            <input
            {...register('email')}
              type="email"
              placeholder='email'
              className={`w-full ${theme=='dark'?'bg-[#1a1a1a] ':'bg-gray-200'} bg-[#1a1a1a]  rounded-xl px-4 py-[10px] focus:outline-none focus:ring-[.5px] focus:ring-purple-500 text-gray-200"`}
            />
          </div>
          <div>
            <label className={`block text-sm ${theme=='dark'?'text-gray-400':'text-black'} mb-1`}>Phone ( IND )</label>
            <input
            {...register('phone')}
              type="text"
              placeholder='Phone'
              className={`w-full ${theme=='dark'?'bg-[#1a1a1a] ':'bg-gray-200'} bg-[#1a1a1a]  rounded-xl px-4 py-[10px] focus:outline-none focus:ring-[.5px] focus:ring-purple-500 text-gray-200"`}
            />
          </div>
        </div>
        
        <button disabled={changed} className={` ${theme=='dark'?'text-white':'text-indigo-800'} px-8 py-3 border border-dashed border-[#5b4bae96] rounded-xl hover:bg-[#5b4bae85] transition-colors shadow-lg ${changed? 'opacity-50':''}`}>
         {changed ? 'Edit To save':'Save changes'}
        </button>
      </form>
    </div>

    
  </>
  )
}

export default UserForm
