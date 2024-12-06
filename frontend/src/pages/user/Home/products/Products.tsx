import Modal from "@/components/global/Modal";
import { useRQ } from "@/hooks/userRQ";
import {  fetchPost, removePost } from "@/service/Api/productApi";
import { useMemo, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Loader from "@/components/global/Loader";
import { Tcategory, Tproduct } from "@/types/types";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import DataTable from "@/components/global/dataTable";
import { PostModal } from "@/components/global/PostModal";
import AlertModal from "@/components/global/AlertModal";
import useActionHook from "@/hooks/actionHook";
import { Button } from "@/components/ui/Button";
import { Edit } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";

const Products = () => {
  useAuth()
  const {isLoading,data}=useRQ(fetchPost,'post')
  const {handler}=useActionHook()
  const deletePost=async(id:string)=>{
    await handler(removePost,id,'post')
  }  
  const Columns = useMemo(()=>[
    {header:'No',render:(post:Tproduct,i:number)=>`LBP 0${i+1}`},
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
    {key:'createdAt',header:'Created',render:(post:Tproduct)=>new Date(post.createdAt as Date).toLocaleDateString()},
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
      <PostModal data={post} sideContent={content}/>
    )},
    {
      header:'Edit',
      render:(post:Tproduct)=>(
        <Dialog>
          <DialogTrigger asChild>
          <Button variant={'outline'} className="text-gray-300 hover:b" ><Edit/> Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <Modal post={post}/>
          </DialogContent>
        </Dialog>

      )
    }
  ],[data])
  const content = useMemo(()=>[
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
      header :'Status',
      render:(post:Tproduct)=>(
        <p className={`${post.status=='Approved'?'text-green-500':post.status=='Pending'?'text-yellow-500':'text-red-500'}`}>{post.status=='Pending'?'Requested for Approval':post.status=='Rejected'?'This post Rejected from The Authority':'This Post Approved for Auction'}</p>
      )
    },
    {
      header: 'Actions',
      render: (item: Tproduct) => (
        <div className="flex gap-2">
          <AlertModal contents={['Delete','Ar you sure To Delete This Post ?']} style='bg-red-900' data={item} action={deletePost}/>
        </div>
      )
    }
  ],[data])
  return (
    <>
      <div className="flex-1 flex flex-col  p-5 bg-[#1a191996]  m-4  rounded-3xl shadow-inner ">
        <h1 className="text-2xl font-semibold mb-4 text-gray-200">Products</h1>
        <div className="flex flex-col items-center h-full">
          <div className="w-[95%] h-[8.4rem] border-2 border-dashed rounded-xl border-[#5b4baeaf]">
            <div className="flex h-full">
              <div className="w-[70%] h-full flex justify-center items-center text-[#cbcacf] text-xl">
                <h5 className="font-light">
                  Welcome to <span className="text-[#5b4bae]">LuxBid!</span>{" "}
                  Here, you can create an auction post to showcase
                  <br /> your items and attract potential bidders.
                </h5>
              </div>
              <div className="w-[30%] flex justify-center flex-1 items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="py-3 px-8 rounded-lg border border-[#5b4bae] flex gap-2 hover:bg-[#5b4bae75]"
                    >
                      <FaPlusCircle className="mt-[6px]" /> Create post
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <Modal />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <div className="bg-zinc-950 flex flex-col w-[95%] flex-1 min-h-[20rem] max-h-[20rem]  rounded-xl mt-3 ">
            {isLoading ? 
              <Loader/> :<div className="p-10"> <DataTable columns={Columns} data={data} itemsPerPage={3}/></div>}
          </div>
        </div>
      </div>

    </>
  );
};

export default Products;



