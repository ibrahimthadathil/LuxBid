import DataTable from "@/components/global/dataTable"
import { Tbuyer } from "@/types/types"

const MyBids = () => {
  const data=[]
    const Columns =[
      {
        header:'No',
        render:(item:Tbuyer,i:number)=>`LBMB 00${i+1}`
      },
      {
        header:'Auction',
        render:()=>{}
      },
      {
        header:'Auction Type',
        render:()=>{}
      },
      {
        header:'Auction Status',
        render:()=>{}
      }
    ]
  return (
    <div className="flex-1 flex flex-col  p-5 bg-[#1a191996] m-4 rounded-3xl shadow-inner">
      <h1 className="text-3xl self-center font-semibold text-zinc-300">Commited Bids</h1>
      <div className="h-14 min-h-5 w-[95%] bg- flex justify-between items-center px-3">
        {/* <DataTable columns={Columns} data={data}/> */}
      </div>
    </div>
  )
}

export default MyBids
