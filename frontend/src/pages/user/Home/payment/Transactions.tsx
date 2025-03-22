import { useTheme } from '@/components/theme/theme-provider'
import Transaction from '@/components/user/stripe/Transaction'

const Transactions = () => {
    const {theme} = useTheme()
  return (
    <div className={`flex-1 flex flex-col  p-5 bg-[#1a191996]  m-4 ${theme=='dark'? 'bg-[#35333357]':'bg-gray-50'} rounded-3xl shadow-inner `}>
        <h1 className={`text-2xl text-center font-bold mb-4 ${theme=='dark'? 'text-gray-200':'text-indigo-900'} `}>
        Transactions
        </h1>
        <Transaction/>
    </div>
  )
}

export default Transactions
