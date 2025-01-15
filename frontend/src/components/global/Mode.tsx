
import  { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => setIsChecked(!isChecked);

  return (
    <label className="relative inline-block w-10 h-6 md:w-16 md:h-8">
      <input
        type="checkbox"
        className="absolute opacity-0 w-0 h-0"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span
        className={`absolute inset-0 rounded-full transition-all duration-400 ${
          isChecked ? 'bg-[#e1e1ea]' : 'bg-[#4444499c]'
        }`}
      />
      <span
        className={`absolute transition-all duration-400 left-1 bottom-1 w-4 h-4 md:w-6 md:h-6 rounded-full ${
          isChecked ? 'bg-[#2d2dcf]' : 'bg-black'
        } ${isChecked ? 'translate-x-8' : ''}`}
      >
        {isChecked ? (
          <FaSun className="absolute top-1 left-1 text-[#ffffffba] w-3 h-3 md:w-4 md:h-4" />
        ) : (
          <FaMoon className="absolute top-1 left-1 text-[#ffffff7a] w-3 h-3 md:w-4 md:h-4" />
        )}
      </span>
    </label>
  );
};

export default ToggleSwitch;
