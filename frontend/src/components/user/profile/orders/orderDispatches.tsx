import DataTable from "@/components/global/dataTable"
import Loader from "@/components/global/Loader"
import { useTheme } from "@/components/theme/theme-provider"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRQ } from "@/hooks/userRQ"
import { dispatchOrder, fetchDispatchOrders } from "@/service/Api/orderApi"
import { TOrder } from "@/types/types"
import { useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { toast } from "sonner"

const OrderDispatches = () => {
const {theme}=useTheme()
const {isLoading,data}=useRQ(fetchDispatchOrders,'dispatchOrder')
const queryclient = useQueryClient()
const shipmentOptions = [
  "Pending",
  "Shipped",
  "Canceled",
  "Delivered"
];
const getStatusColor =(status:string)=>{
  switch (status) {
    case "Shipped":
      return "bg-green-300 hover:bg-green-500"
    case "Delivered":
      return "bg-green-500 hover:bg-green-600"
    case "Pending":
      return "bg-yellow-500 hover:bg-yellow-600"
    case "Canceled":
      return "bg-red-500 hover:bg-red-600"
    default:
      return "bg-gray-500 hover:bg-gray-600"
  }
}

const handleShipmentChange = async(value: string, order: string) => {
  try {
    const data = await dispatchOrder(value,order)
    if(data?.success){
      toast.success(data.message)
      queryclient.invalidateQueries({queryKey:['dispatchOrder']})
    }else toast.error(data.message)
  } catch (error) {
    
  }
};
const columns = useMemo(() =>[
  {
    
    header: "No",
    render: (_item: any, i: number) => `LBA 00${i + 1}`,
  },{
    header: "Auction",
      render: (auction: any) => (
        <div className="flex items-center justify-center gap-2">
          <Avatar className="h-8 w-8 border rounded-full ">
            <AvatarImage
              src={auction?.auction?.post?.images[0]}
              alt={auction?.auction?.title}
              className="object-cover w-8 h-8 rounded-full"
            />
          </Avatar>
          <span>{auction?.auction?.title}</span>
        </div>)
  },
  {
    header:'Order Amount',
    render:(order:TOrder)=>(
      <p>$ {order?.orderAmt}</p>
    )
  },
  {
    header:'Order Status',
    render:(order:TOrder)=>(
      <Badge  className={getStatusColor(order.orderStatus)}>{order?.orderStatus}</Badge>
    )
  },
  {
    header:'Shipment ',
    render: (order: TOrder) => (
      <div className="justify-center flex">
        <Select
      
      defaultValue={order.orderStatus || "Processing"}
      onValueChange={(value) => handleShipmentChange(value, order._id)}
    >
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {shipmentOptions.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
      </div>
    )
  }

] , [data])
  return (
    <div className="w-full max-h-full h-full overflow-y-auto flex flex-col gap-3  p-2">
    <h1 className={`text-2xl text-center font-bold mb-4 ${theme=='dark'? 'text-gray-200':'text-indigo-900'} `}>
    Order Dispatches
    </h1>
      {isLoading?<Loader/>:<DataTable data={data} columns={columns}/>}
    </div>
  )
}

export default OrderDispatches
