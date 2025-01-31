import { Rootstate } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RollProtected = ({ element, guest }: { element: JSX.Element,guest?:boolean}) => {
   const {role,isAuthenticated} = useSelector((state:Rootstate)=>state.user);
  if (!isAuthenticated) return <Navigate to="/auth/signin" replace={true} />;
  if (role === 'Guest' && !guest) return <Navigate to="/user/setrole" replace={true} />;
  if (role === 'Seller' && guest||role === 'Buyer' && guest) return <Navigate to="/user/profile" replace={true} />;
  return element;

};

export default RollProtected;
