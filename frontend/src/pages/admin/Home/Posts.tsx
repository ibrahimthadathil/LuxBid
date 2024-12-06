import AlertModal from '@/components/global/AlertModal'
import DataTable from '@/components/global/dataTable'
import Loader from '@/components/global/Loader'
import { PostModal } from '@/components/global/PostModal'
import useActionHook from '@/hooks/actionHook'
import { approvePost, getAllproducts, rejectPost, removePost } from '@/service/Api/adminApi'
import { Iuser, Tcategory, Tproduct } from '@/types/types'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useQuery } from '@tanstack/react-query'
import {  ShieldAlert, ShieldCheck } from 'lucide-react'
import {useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'



const Posts = () => {
  const {child}=useParams()
  const route = child?.toLowerCase() == 'approved' ? true:false
  const {handler}=useActionHook()
  const {data,isLoading,refetch}=useQuery({
    queryKey:['product'],
    queryFn:async () => await getAllproducts(route),

  })
  useEffect(() => {
    refetch()
  },[route])
  const deletePost=async(id:string)=>{
    await handler(removePost,id,'product')
  }
  const updatePost=async(id:string)=>{
    await handler(approvePost,id,'product')
  }
  const reject_Post =async(id:string)=>{
    await handler(rejectPost,id,'product')
  }
    const columns = useMemo(()=>[
    {header:'No',render:(post:Tproduct,i:number)=>`LBP${i+101}`},
    {key:'title',header:'Title' ,render:(post:Tproduct)=>(
      <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border rounded-full ">
            <AvatarImage 
              src={post.images[0]} 
              alt={post.title} 
              className="object-cover w-8 h-8 rounded-full" 
            />
            </Avatar>
            <span>{post.title}</span>
            </div>)},
    {key:'createdAt',header:'Posted',render:(post:Tproduct)=>new Date(post.createdAt as Date).toLocaleDateString()},
    {key:'price',header:'Price (₹)'},
    {key:'isApproved',header:'Status', render :(post:Tproduct)=>(
      <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
            post.status=='Approved' ? "text-green-700" :post.status=='Rejected'? "text-red-700":"text-yellow-700"
          }`}
        >
          {post.status}
        </span>
    )},{header:'Details',render:(post:Tproduct)=>(
      <PostModal data={post} sideContent={contents}/>
    )}
  ],[])
  const contents = useMemo(()=>[
    {
      header: 'Title of The post',
      render: (item: Tproduct) => (
        <p className="font-medium text-sm">{item.title}</p>
      )
    },
    {
      header: 'Category',
      render: (item: Tproduct) => (
        <p>{(item.category as Tcategory)?.name}</p>
      )
    },
    {
      header: 'Seller',
      render: (item: Tproduct) => (
        <div className="space-y-1">
          <p className="text-sm font-medium">{(item.seller as Iuser)?.firstName}</p>
          <p className="text-xs text-muted-foreground">{(item.seller as Iuser)?.email}</p>
        </div>
      )
    },
    {
      header: 'Price',
      render: (item: Tproduct) => (
        <p className="font-semibold">₹{item.price.toFixed(2)}</p>
      )
    },
    {
      header: 'Description',
      render: (item: Tproduct) => (
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
      )
    },
    {
      header: 'Actions',
      render: (item: Tproduct) => (
        <div className="flex gap-2">
          <AlertModal contents={['Delete','Ar you sure To Delete This Post ?']} style='bg-red-900' data={item} action={deletePost}/>
          {item.status!='Approved'&&<AlertModal contents={['Approve','Ar you sure To Approve This Post ?']} style='outline-green-900 outline-1 outline hover:bg-green-900 ' data={item} action={updatePost}/>}
          {item.status!='Rejected'&&<AlertModal contents={['Reject','Ar you sure To Reject This Post ?']} style='outline-red-900 outline outline-1 hover:bg-red-900' data={item} action={reject_Post}/>}
        </div>
      )
    }
  ],[])
  
  return (
    <>
    {isLoading ? <Loader/>:<div className="container m mx-auto px-4 py-4">
      <div className='flex justify-center items-center mb-5'>
    <h1 className="text-2xl font-bold flex items-center gap-2">
      {route?<><ShieldCheck/>Approved Posts</>:<><ShieldAlert/>Posts Requestes</>}
      </h1>
      </div>
      <DataTable data={data?.data.data} columns={columns} />
    </div>}
    </>
  )
}

export default Posts
