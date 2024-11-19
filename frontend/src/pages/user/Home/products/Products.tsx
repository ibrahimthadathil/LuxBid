import Modal from "@/components/global/Modal";
import { useRQ } from "@/hooks/userRQ";
import { fetchCategory } from "@/service/Api/productApi";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Loader from "@/components/global/Loader";

const Products = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {isLoading,data}=useRQ(fetchCategory,'category')
  
    
  return (
    <>
      <div className="flex-1 flex flex-col  p-5 bg-[#1a191996]  m-4  rounded-3xl shadow-inner ">
        <h1 className="text-2xl font-semibold mb-4 text-gray-200">Products</h1>
        {
          isLoading ? <Loader/> : <div className="flex flex-col items-center h-full">
          <div className="w-[95%] h-[8.4rem] border-2 border-dashed rounded-xl border-[#5b4baeaf]">
            <div className="flex h-full">
                <div className="w-[70%] h-full flex justify-center items-center text-[#cbcacf] text-xl">
                    <h5 className="font-light">Welcome to <span className="text-[#5b4bae]">LuxBid!</span> Here, you can create an auction post to showcase
                    <br/> your items and attract potential bidders.</h5>
                </div>
                <div className="w-[30%] flex justify-center flex-1 items-center">
                    <button className=" py-3 px-8 rounded-lg border border-[#5b4bae] flex gap-2 hover:bg-[#5b4bae75]" onClick={() =>setIsOpen(true)}><FaPlusCircle className="mt-[6px]" /> Create post</button>
                </div>
            </div>
          </div>
          <div className="bg-zinc-950 w-[95%] flex-1 h-full  rounded-xl mt-3 ">
        
          </div>
        </div>
        }
      </div>
      
      {isOpen&&<Modal open={setIsOpen} category={data} />}
    </>
  );
};

export default Products;
