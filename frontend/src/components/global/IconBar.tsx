import { useState, useEffect, useRef } from 'react';
import CustomButton from '@/components/ux/customButon';
import { useNavigate } from 'react-router-dom';
import { CircleAlert, Handshake } from 'lucide-react';
import { FaGuilded, FaHouseDamage } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';
import { useTheme } from '../theme/theme-provider';

const IconBar = () => {
  const [activeIcon, setActiveIcon] = useState<string>('home');
  const [sliderPosition, setSliderPosition] = useState<number>(0);
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]); 
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const activeIndex = ['home', 'guide', 'deals', 'about', 'community'].indexOf(activeIcon);
    if (iconRefs.current[activeIndex]) {
      const iconElement = iconRefs.current[activeIndex];
      const iconOffset = iconElement?.offsetLeft || 0;
      const iconWidth = iconElement?.offsetWidth || 0;
      setSliderPosition(iconOffset); 
      setSliderWidth(iconWidth); 
    }
  }, [activeIcon]);

  const handleIconClick = (route: string) => {
    setActiveIcon(route);
    navigate(`/${route}`);
  };

  const isActive = (icon: string) => icon === activeIcon;

  const getTextColor = (icon: string) => {
    if (isActive(icon)) {
      return theme !== 'dark' ? '#fff' : '#ffff'; // Active text color
    }
    return theme === 'dark' ? '#ffff' : '#5b4bae'; // Inactive text color
  };

  const getIconColor = (icon: string) => {
    if (isActive(icon)) {
      return theme !== 'dark' ? '#fff' : '#5b4bae'; // Active icon color
    }
    return theme === 'dark' ? '#ffff ' : '#5b4bae'; // Inactive icon color
  };

  return (
    <div className="relative flex justify-between h-[4.2rem] w-[40rem] rounded-lg bg-[#4241414b] shadow-inner p-2">
      {/* Slider */}
      <div
        className={`absolute ms-[-5px] h-[3.1rem] ${
          theme === 'dark' ? 'bg-[#a098981c]' : 'bg-[#51458ced]'
        } rounded-lg transition-all duration-500 ease-in-out`}
        style={{
          transform: `translateX(${sliderPosition}px)`,
          width: `${sliderWidth}px`,
        }}
      />

      {/* Icons */}
      {[
        { icon: FaHouseDamage, name: 'home' },
        { icon: FaGuilded, name: 'guide' },
        { icon: Handshake, name: 'deals' },
        { icon: CircleAlert, name: 'about' },
        { icon: MdPeople, name: 'community' },
      ].map(({ icon: Icon, name }, index) => (
        <div
          key={name}
          ref={(el) => (iconRefs.current[index] = el)} // Store reference
          onClick={() => handleIconClick(name)}
          className={`ps-3 pe-2 pt-3 flex gap-3 font-thin text-[15px] cursor-pointer relative z-10`}
          style={{ color: getTextColor(name) }} // Apply text color
        >
          <span className="pt-1">
            <Icon size={18} color={getIconColor(name)} /> {/* Apply icon color */}
          </span>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </div>
      ))}

      {/* Custom Button */}
      <div className="mt-[-4px] relative z-10">
        <CustomButton />
      </div>
    </div>
  );
};

export default IconBar;
