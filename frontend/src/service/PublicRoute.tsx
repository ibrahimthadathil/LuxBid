import { Navigate, replace } from 'react-router-dom'

const PublicRoute = ({element,route}:{element:JSX.Element,route:string}) => {
  const token = localStorage.getItem( 'access-token')
  if(token) return  <Navigate to={route} replace={true}/> 
  return element
}

export const AdminPublicRoute =({element}:{element:JSX.Element})=>{
  const token = localStorage.getItem('accessToken')
  if(token) return <Navigate to={'/admin/LB/dashboard'} replace={true}/>
  return element
}

export default PublicRoute
