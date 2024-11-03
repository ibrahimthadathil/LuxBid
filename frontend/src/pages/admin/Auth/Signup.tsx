import React, { useState } from 'react';
import Logo from '../../../../public/Logo.png'
import { adminSignin } from '../../../service/Api/adminApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';
import { signInSuccess } from '../../../redux/slice/adminSlice';
const SignInAdmin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disaptch = useDispatch<AppDispatch>()

  const handleSignIn = async(e: React.FormEvent) => {
    e.preventDefault();
   try {
    const {data} = await adminSignin({email,password})
    if(data.success){
      localStorage.setItem('accessToken',data.token)
      localStorage.setItem('admin',JSON.stringify({email:data.email,name:data.name}))
      disaptch(signInSuccess({adminName:String(data.name) ,email:String(data.email)}))
      navigate('/api/admin/users')
      toast.success(data.message)
      }else{
        toast.error('invalid credential')
      }
    
   } catch (error) {
    toast.error((error as Error).message)
   }
      
    
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-md  rounded-lg shadow-md p-6">
        
        {/* Image Section */}
        <div className="flex justify-center mb-6">
          <img
            src={Logo}  // Replace with actual image path
            alt="Sign In"
            className="w-24 h-24 rounded-full "
          />
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-zinc-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-zinc-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInAdmin;
