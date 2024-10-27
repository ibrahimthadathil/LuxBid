import React, {  useState } from 'react';
import { registration } from '../../../service/Api/userApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
    const navigate = useNavigate()
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      const token = localStorage.getItem('registration-token') as string
      const {data} = await registration({ firstName, lastName, password, phone, gender },token) 
      if(data.token){
        localStorage.removeItem('registration-token')
        localStorage.setItem('otp-token',data.token)
        navigate('/auth/otp/verify')
        toast.success(data.message)
      }
      
      
    };
  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="max-w-xl mx-auto rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Registration </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
            <input
              type="text"
              placeholder="Last Name (Optional)"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
          </div>

          <div className="mb-4">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={isPolicyAccepted}
              onChange={() => setIsPolicyAccepted(!isPolicyAccepted)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
            />
            <label className="ml-2 text-sm text-gray-400">
              I accept the <a href="/policy" className="text-indigo-600 hover:underline">policy</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full p-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
