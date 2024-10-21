import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleSwitch: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="relative inline-block w-16 h-8">
      <input
        type="checkbox"
        className="absolute opacity-0 w-0 h-0"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className={`absolute inset-0 rounded-full transition-all duration-400 bg-[#2323aa] ${isChecked ? 'bg-[#e1e1ea]' : ''}`}></span>
      <span className={`absolute transition-all duration-400 left-1 bottom-1 w-6 h-6 rounded-full ${isChecked ? 'bg-[#2323aa]' : 'bg-black'}  ${isChecked ? 'translate-x-8' : ''}`}>
        {isChecked ? (
          <FaSun className="absolute top-1 left-1 text-white w-4 h-4" />
        ) : (
          <FaMoon className="absolute top-1 left-1 text-white w-4 h-4" />
        )}
      </span>
    </label>
  );
};

export default ToggleSwitch;
