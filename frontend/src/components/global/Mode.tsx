import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../theme/theme-provider';
import { motion } from 'framer-motion';

const ToggleSwitch = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.label 
      whileTap={{ scale: 0.95 }}
      className="relative inline-block w-8 h-5 sm:w-10 sm:h-6 md:w-14 md:h-7 cursor-pointer"
    >
      <input
        type="checkbox"
        className="absolute opacity-0 w-0 h-0"
        checked={theme === 'light'}
        onChange={handleToggle}
      />
      <motion.span
        layout
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          theme === 'light' ? 'bg-[#e1e1ea]' : 'bg-[#4444499c]'
        }`}
      />
      <motion.span
        layout
        className={`absolute transition-all duration-300 
          left-0.5 bottom-0.5 
          w-4 h-4 
          sm:w-5 sm:h-5 
          md:w-6 md:h-6 
          rounded-full 
          ${theme === 'light' ? 'bg-[#2d2dcf]' : 'bg-black'}
          ${theme === 'light' ? 'translate-x-3 sm:translate-x-4 md:translate-x-7' : 'translate-x-0'}`}
      >
        {theme === 'light' ? (
          <FaSun className="absolute 
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            text-[#ffffffba] 
            w-2 h-2 
            sm:w-3 sm:h-3 
            md:w-4 md:h-4" 
          />
        ) : (
          <FaMoon className="absolute 
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            text-[#ffffff7a] 
            w-2 h-2 
            sm:w-3 sm:h-3 
            md:w-4 md:h-4" 
          />
        )}
      </motion.span>
    </motion.label>
  );
};

export default ToggleSwitch;