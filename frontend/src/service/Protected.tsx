import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element,store }: { element: JSX.Element ,store:string}) => {
    const token = localStorage.getItem(store);
    return token ? element : <Navigate to="/auth/signup" replace />;
};

export default ProtectedRoute;
