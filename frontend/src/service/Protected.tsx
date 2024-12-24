import { Rootstate } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element,store }: { element: JSX.Element ,store:string}) => {
    // const token = localStorage.getItem(store);
    const authenticated = useSelector((state:Rootstate)=>state.user.isAuthenticated)
    const passwordtoken = localStorage.getItem('rpotp')
    if(!passwordtoken&&!authenticated)return <Navigate to="/auth/signup" replace />
    return authenticated || passwordtoken ? element : <Navigate to="/auth/signup" replace />;
};

export default ProtectedRoute;
