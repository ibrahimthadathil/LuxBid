import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element,store }: { element: JSX.Element ,store:string}) => {
    const token = localStorage.getItem(store);
    const passwordtoken = localStorage.getItem('rpotp')
    if(!passwordtoken&&!token)return <Navigate to="/auth/signup" replace />
    return token || passwordtoken ? element : <Navigate to="/auth/signup" replace />;
};

export default ProtectedRoute;
