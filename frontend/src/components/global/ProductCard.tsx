import { Tproduct } from "@/types/types"

const ProductCard = ({item}:{item:Tproduct}) => {

  return (
    <>
    <div className="max-w-md  p-4 h-fit rounded-xl  bg-[#504e4e79] sm:flex sm:space-x-6   ">
	<div className="flex-shrink-0 w-full  mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
		<img src={item.images[0]} alt="" className=" w-full h-full rounded dark:bg-gray-500 " />
	</div>
	<div className="flex flex-col h-fit space-y-4">
		<div>
			<h2 className="text-2xl font-normal">{item.title}</h2>
			<span className="text-sm dark:text-gray-600"></span>
		</div>
		<div className="space-y-1">
			<span className="flex items-center space-x-2">₹
				
				<span className=" ps-2">{item.price}</span>
			</span>
			<span className="flex items-center space-x-2">
				status : 
				<span className={`${item.isApproved ?'text-green-900':'text-orange-700'} ps-1`} >{item.isApproved ? 'Approved':'Pending'}</span>
                
			</span>
            <button className=' flex justify-self-center border-[#5b4baea9] hover:bg-[#5b4bae] rounded-lg px-4 py-2 border '>View</button>
		</div>
	</div>
</div>
    </>
  )
}

export default ProductCard
