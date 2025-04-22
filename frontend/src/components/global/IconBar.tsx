import { useState, useEffect, useRef } from 'react';
import CustomButton from '@/components/ux/customButon';
import { useNavigate,useLocation } from 'react-router-dom';
import { CircleAlert, Handshake } from 'lucide-react';
import { FaGuilded, FaHouseDamage } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';
import { useTheme } from '../theme/theme-provider';
import { motion } from "framer-motion";

interface IconBarProps {
  isMobile?: boolean;
  onCloseSidebar?: () => void;
}

const IconBar = ({ isMobile = false, onCloseSidebar }: IconBarProps) => {
  const [activeIcon, setActiveIcon] = useState<string>('home');
  const location = useLocation();
  const [sliderPosition, setSliderPosition] = useState<number>(0);
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]); 
  const navigate = useNavigate();
  const { theme } = useTheme();

  // useEffect(() => {
  //   const activeIndex = ['home', 'guide', 'deals', 'about', 'community'].indexOf(activeIcon);
  //   if (iconRefs.current[activeIndex]) {
  //     const iconElement = iconRefs.current[activeIndex];
  //     const iconOffset = iconElement?.offsetLeft || 0;
  //     const iconWidth = iconElement?.offsetWidth || 0;
  //     setSliderPosition(iconOffset); 
  //     setSliderWidth(iconWidth); 
  //   }
  // }, [activeIcon]);

  // const handleIconClick = (route: string) => {
  //   setActiveIcon(route);
  //   navigate(`/${route}`);
  //   if (isMobile && onCloseSidebar) {
  //     onCloseSidebar();
  //   }
  // };

  const routeIcons = ['home', 'guide', 'deals', 'about', 'community'];

  // get active route name from pathname
  const getRouteName = (pathname: string) => {
    const match = routeIcons.find(route => pathname.includes(route));
    return match || 'home';
  }; 

  useEffect(() => {
    // update activeIcon when route changes
    setActiveIcon(getRouteName(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const activeIndex = routeIcons.indexOf(activeIcon);
    if (iconRefs.current[activeIndex]) {
      const iconElement = iconRefs.current[activeIndex];
      const iconOffset = iconElement?.offsetLeft || 0;
      const iconWidth = iconElement?.offsetWidth || 0;
      setSliderPosition(iconOffset); 
      setSliderWidth(iconWidth); 
    }
  }, [activeIcon]);

  const handleIconClick = (route: string) => {
    navigate(`/${route}`);
    if (isMobile && onCloseSidebar) {
      onCloseSidebar();
    }
  };
  const isActive = (icon: string) => icon === activeIcon;

  const getTextColor = (icon: string) => {
    if (isMobile) {
      return '#fff'; // White text for mobile sidebar
    }
    if (isActive(icon)) {
      return theme !== 'dark' ? '#fff' : '#ffff'; // Original active text color
    }
    return theme === 'dark' ? '#ffff' : '#5b4bae'; // Original inactive text color
  };

  const getIconColor = (icon: string) => {
    if (isMobile) {
      return '#fff'; // White icons for mobile sidebar
    }
    if (isActive(icon)) {
      return theme !== 'dark' ? '#fff' : '#5b4bae'; // Original active icon color
    }
    return theme === 'dark' ? '#ffff' : '#5b4bae'; // Original inactive icon color
  };

  return (
    <motion.div 
      initial={isMobile ? { x: 20, opacity: 0 } : false}
      animate={isMobile ? { x: 0, opacity: 1 } : {}}
      transition={{ staggerChildren: 0.1 }}
      className={`relative ${
        isMobile 
          ? 'flex flex-col gap-4 w-full' 
          : `flex justify-between h-[4.2rem] w-full max-w-[40rem] rounded-lg ${theme === 'dark' ? 'bg-[#4241414b]' : 'bg-gray-100'} shadow-inner p-2`
      }`}
    >
      {/* Slider - Only show on desktop */}
      {!isMobile && (
        <motion.div
          layout
          className={`absolute ms-[-5px] h-[3.1rem] ${
            theme === 'dark' ? 'bg-[#a098981c]' : 'bg-[#321e94]'
          } rounded-lg transition-all duration-500 ease-in-out`}
          style={{
            transform: `translateX(${sliderPosition}px)`,
            width: `${sliderWidth}px`,
          }}
        />
      )}

      {/* Icons */}
      {[
        { icon: FaHouseDamage, name: 'home' },
        { icon: FaGuilded, name: 'guide' },
        { icon: Handshake, name: 'deals' },
        { icon: CircleAlert, name: 'about' },
        { icon: MdPeople, name: 'community' },
      ].map(({ icon: Icon, name }, index) => (
        <motion.div
          key={name}
          ref={(el) => (iconRefs.current[index] = el)}
          onClick={() => handleIconClick(name)}
          whileHover={isMobile ? { scale: 1.05 } : {}}
          whileTap={isMobile ? { scale: 0.95 } : {}}
          initial={isMobile ? { x: 20, opacity: 0 } : false}
          animate={isMobile ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: index * 0.1 }}
          className={`${
            isMobile 
              ? 'p-3 flex gap-3 hover:bg-indigo-600/20 text-white rounded-lg transition-colors duration-200'
              : 'ps-3 pe-2 pt-3 flex gap-3 font-medium'
          } text-[15px] cursor-pointer relative z-10`}
          style={{ color: getTextColor(name) }}
        >
          <span className={isMobile ? '' : 'pt-1'}>
            <Icon size={18} color={getIconColor(name)} />
          </span>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </motion.div>
      ))}

      {/* Custom Button */}
      
        <div className={`mt-[-4px] relative z-10 ${isMobile ? 'border-indigo-900 border rounded-xl':''}`}>
          <CustomButton />
        </div>
      
    </motion.div>
  );
};

export default IconBar;
