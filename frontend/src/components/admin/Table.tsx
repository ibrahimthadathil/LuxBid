import { toast } from 'sonner';
import { UserStatus } from '../../service/Api/adminApi';
import { Iuser } from '../../types/user';

const Table = ({datas,fetch}:{datas:Iuser[],fetch:Function}) => {
  const handleStatus= async(id:string)=>{
    try {
     const {data}= await UserStatus(id)
     if(data){
       fetch()
      toast.success(data.message)
     }else{
      toast.error(data.message)
     }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <>
    <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 bg-gray-700">No</th>
                <th className="p-3 bg-gray-700">User name</th>
                <th className="p-3 bg-gray-700">Email</th>
                <th className="p-3 bg-gray-700">joined At</th>
                <th className="p-3 bg-gray-700">Status</th>
                <th className="p-3 bg-gray-700">Participants</th>
              </tr>
            </thead>
            <tbody>
              {
                datas.map((user,i)=>(
                <tr key={i} className="bg-gray-800">
                  <td className="p-3">LB10{i+1}</td>
                  <td className="p-3"><span className="text-blue-500">{user.firstName}</span></td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.createdAt?user.createdAt.toString().slice(0,10):""}</td>
                  <td className={`p-3  ${user.isActive ? 'text-green-500':'text-red-800'}`}>{user.isActive? 'Active':'Blocked'}</td>
                  <td className="p-3"><button className="participants-button bg-gray-700 text-white rounded-md px-4 py-2" onClick={()=>handleStatus(user.email)}>{user.isActive? 'Block':'Un-block'}</button></td>
                </tr>

                ))
              }
              
            </tbody>
          </table></>
  );
};

export default Table;
