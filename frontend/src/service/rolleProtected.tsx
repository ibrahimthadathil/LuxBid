import { Rootstate } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

const RollProtected = ({ element, }: { element: JSX.Element}) => {
   const role = useSelector((state:Rootstate)=>state.user.role)
   if(role=='Seller')return element
   else toast.warning('Invalid Access , Switch In to Organizer')
   return <Navigate to={'/user/profile'}/>
};

export default RollProtected;
