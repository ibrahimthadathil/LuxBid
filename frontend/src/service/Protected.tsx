import { Rootstate } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element}: { element: JSX.Element}) => {
    
    const authenticated = useSelector((state:Rootstate)=>state.user.isAuthenticated)    
    if(!authenticated)return <Navigate to="/auth/signup" replace />
    return authenticated ?  element : <Navigate to="/auth/signup" replace />;
};

export default ProtectedRoute;
