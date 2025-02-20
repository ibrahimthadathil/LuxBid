import { useTheme } from "@/components/theme/theme-provider"

const OrderDispatches = () => {
const {theme}=useTheme()
  return (
    <div className="w-full max-h-full h-full overflow-y-auto flex flex-col gap-3  p-2">
    <h1 className={`text-2xl text-center font-bold mb-4 ${theme=='dark'? 'text-gray-200':'text-indigo-900'} `}>
    Order Dispatches
    </h1>
      
    </div>
  )
}

export default OrderDispatches
