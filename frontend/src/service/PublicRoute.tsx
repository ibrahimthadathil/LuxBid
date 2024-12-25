import { Rootstate } from '@/redux/store/store'
import { useSelector } from 'react-redux'
import { Navigate, replace } from 'react-router-dom'

const PublicRoute = ({element,route}:{element:JSX.Element,route:string}) => {
  const authenticated = useSelector((state:Rootstate)=>state.user.isAuthenticated)
  if(authenticated) return  <Navigate to={route} replace={true}/> 
  return element
}

export const AdminPublicRoute =({element}:{element:JSX.Element})=>{
  const isAdmin =useSelector((state:Rootstate)=>state.admin.isAdmin)
  if(isAdmin) return <Navigate to={'/admin/LB/dashboard'} replace={true}/>
  return element
}

export const AdminProtected =({element}:{element:JSX.Element})=>{
  const isAdmin =useSelector((state:Rootstate)=>state.admin.isAdmin)
  if(isAdmin)return element
  else return <Navigate to={'/admin/auth'}/>

}

export default PublicRoute
