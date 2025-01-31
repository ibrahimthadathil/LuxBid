import { useTheme } from '@/components/theme/theme-provider'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ShoppingBag, Trophy } from 'lucide-react'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Orders = () => {
    const {theme}=useTheme()
    const location = useLocation();
    const [showWinnings, setShowWinnings] = useState(location.pathname.includes('winnings'))
    const navigate = useNavigate()

    const handleChange=()=>{
        if(showWinnings)navigate('/user/orders/status')
        else navigate('/user/orders/winnings') 
    }
  return (
    <div className={`flex-1 flex flex-col  p-5 bg-[#1a191996]  m-4 ${theme=='dark'? 'bg-[#35333357]':'bg-gray-50'} rounded-3xl shadow-inner `}>
        <h1 className={`text-2xl text-center font-bold mb-4 ${theme=='dark'? 'text-gray-200':'text-indigo-900'} `}>
        Winnings & Orders
        </h1>
        <div className="flex items-center gap-3 justify-end space-x-2 mb-4 ">
            <Switch id="winnings-orders-switch" checked={showWinnings} onCheckedChange={setShowWinnings} onClick={()=>handleChange()}/>
            <Label htmlFor="winnings-orders-switch">{showWinnings ? (<div className='flex gap-1'><ShoppingBag size={18}/>Winnings</div>) : (<div className='flex gap-1'><Trophy size={18}/>Orders</div>)}</Label>
        </div>
            <Outlet/>
    </div>
  )
}

export default Orders
