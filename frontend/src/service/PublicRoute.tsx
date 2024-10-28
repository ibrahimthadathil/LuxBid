import { Navigate } from 'react-router-dom'

const PublicRoute = ({element}:{element:JSX.Element}) => {
  const token = localStorage.getItem('access-token')
  if(token) return  <Navigate to={'/'} replace={true}/> 
  return element
}

export default PublicRoute
