
import  { useState } from 'react';
import DownArrow from '../../assets/icons/DownArrow';
import { EarthIcon } from 'lucide-react';

const Language = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => setIsActive(!isActive);

  return (
    <div
      className={`flex items-center justify-between h-12 w-24 md:w-32 rounded-lg p-2 transition-all duration-300 ease-in-out ${
        isActive ? 'shadow-lg shadow-[#5b4bae25]' : 'bg-[#15131386] shadow-inner'
      }`}
      onClick={handleToggle}
    >
      <EarthIcon color={isActive ? '#5B4BAE' : 'white'}/>
      <span className="text-white transition-colors duration-300">ENG</span>
      <DownArrow />
    </div>
  );
};

export default Language;
