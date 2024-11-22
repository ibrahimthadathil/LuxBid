import Modal from "@/components/global/Modal";
import { useRQ } from "@/hooks/userRQ";
import {  fetchPost } from "@/service/Api/productApi";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loader from "@/components/global/Loader";
import ProductCard from "@/components/global/ProductCard";
import { Tproduct } from "@/types/user";
import { useAuth } from "@/hooks/useAuth";

const Products = () => {
  useAuth()
  const [isOpen, setIsOpen] = useState(false);
  const {isLoading,data,isSuccess}=useRQ(fetchPost,'post')
  console.log(')))))',data);
  
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
                <button
                  className=" py-3 px-8 rounded-lg border border-[#5b4bae] flex gap-2 hover:bg-[#5b4bae75]"
                  onClick={() => setIsOpen(true)}
                >
                  <FaPlusCircle className="mt-[6px]" /> Create post
                </button>
              </div>
            </div>
          </div>
          <div className="bg-zinc-950 flex flex-col w-[95%] flex-1 min-h-[20rem] max-h-[20rem]  rounded-xl mt-3 ">
            {isLoading ? 
              <Loader/> :isSuccess&&<ScrollArea className="h-full w-full rounded-md  p-4">
              <p className="justify-self-center p-5 text-2xl font-semibold hover:text-[#5b4baee0]  transition-colors duration-300 ">Posts</p>
                <div className="w-full h-full flex flex-wrap items-center  justify-center  gap-5 ">
                  {data.length  ?
                    (data as Tproduct[]).map((e)=>(
                      <ProductCard key={e._id} item={e}/>
                    )) : <p className="text-red-400">Create New Post</p>
                  }
                </div>
              </ScrollArea>}
          </div>
        </div>
      </div>

      {isOpen && <Modal open={setIsOpen} />}
    </>
  );
};

export default Products;
