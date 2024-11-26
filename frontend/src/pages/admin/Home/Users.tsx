import DataTable from '@/components/global/dataTable'
import { findAllUserByRole, UserStatus } from '@/service/Api/adminApi';
import {  useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom'
import Loading from '@/components/global/Loader'
import { Iuser } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { UserDetailsModal } from '@/components/global/userModal';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
const Users = () => {
  const {userRole}=useParams();
  const role = userRole?.toLowerCase() == 'seller' ? 'Seller' : 'Buyer';
  const queryclient = useQueryClient()
  const {isLoading,data}=useQuery({
    queryKey:[role],
    queryFn:async()=>{return await findAllUserByRole(role)}
  })
  const blockuser =async(email:string)=>{
    try {
      const {data}= await UserStatus(email)   
    if(data){
      await queryclient.invalidateQueries({queryKey:[role]})
     toast.success(data.message)
    }else{
     toast.error(data.message)
    }
    } catch (error) {
      toast.error(((error as AxiosError).response?.data as Record<string,any>).message)
    }
  }
const columns = [
  {
    header:'No',render: (e:Iuser,i:number)=>`LB${i+101}`
  },
  {
    key :'firstName',header:'User',render:(user:Iuser)=>(
      <div className="flex items-center text-c gap-2">
          <Avatar className="h-8 w-8 border rounded-full">
            <AvatarImage 
              src={user.profile} 
              alt={user.firstName} 
              className="object-cover w-8 h-8 rounded-full" 
            />
            <AvatarFallback className=''>
              {user.firstName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-yellow-500">{user.firstName}</span>
        </div>
    )
  },
  { key:'email',header:'Email' },
  { key:'role',header:'Role' },
  { header:'Joined',render : (user:Iuser)=> new Date(user.createdAt as Date).toLocaleDateString()},
  {
    
    header:'Status',
    render :(user:Iuser)=>(
      <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
            user.isActive ? "text-green-700" : "text-red-700"
          }`}
        >
          {user.isActive ? 'Active' : 'Blocked'}
        </span>
    )
  },
  {
    header:'Details',
    render:(user:Iuser)=>(<UserDetailsModal data={user} action={blockuser}/>)
  }
]

  return (
    <>{
      isLoading ? <Loading/>:<DataTable data={data?.data?.data} columns ={columns} />
    }
    
    </>
  )
}

export default Users
