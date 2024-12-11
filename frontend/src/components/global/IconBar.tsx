import { useState, useEffect, useRef } from 'react';
import AboutIcon from '../../assets/icons/About';
import Deals from '../../assets/icons/Deals';
import GuideIcon from '../../assets/icons/Guide';
import HomeIcon from '../../assets/icons/Home';
import CommunityIcon from '../../assets/icons/Pepole';
import CustomButton from '@/components/ux/customButon';
import { useNavigate } from 'react-router-dom';

const IconBar = () => {
  const [activeIcon, setActiveIcon] = useState<string>('home');
  const [sliderPosition, setSliderPosition] = useState<number>(0);
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]); 
  const navigate = useNavigate()

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
    navigate(`/${route}`)
  }

  const isActive = (icon: string) => icon === activeIcon;

  return (
    
      <div className="relative flex justify-between  h-[4.2rem] w-[40rem] rounded-lg bg-[#4241414b] shadow-inner p-2">
        
        {/* Slider */}
        <div
          className="absolute ms-[-5px] h-[3.1rem] bg-[#4c4c5246] rounded-lg shadow-2xl transition-all duration-500 ease-in-out"
          style={{
            transform: `translateX(${sliderPosition}px)`,
            width: `${sliderWidth}px`, 
          }}
        />

        {/* Home Icon */}
        <div
          ref={(el) => (iconRefs.current[0] = el)} // Store reference
          onClick={() => handleIconClick('home')}
          className={`ps-3 pe-2 pt-3 flex gap-3 text-white font-thin text-[15px] cursor-pointer relative z-10`}
        >
          <span className="pt-1">
            <HomeIcon color={isActive('home') ? '#5B4BAE' : 'white'} />
          </span>
          Home
        </div>

        {/* Guide Icon */}
        <div
          ref={(el) => (iconRefs.current[1] = el)} // Store reference
          onClick={() => handleIconClick('guide')}
          className={`ps-3 pe-2 pt-3 flex gap-3 text-white font-thin text-[15px] cursor-pointer relative z-10`}
        >
          <span className="pt-1">
            <GuideIcon color={isActive('guide') ? '#5B4BAE' : 'white'} />
          </span>
          Guide
        </div>

        {/* Deals Icon */}
        <div
          ref={(el) => (iconRefs.current[2] = el)} // Store reference
          onClick={() => handleIconClick('deals')}
          className={`ps-3 pe-2 pt-3 flex gap-3 text-white font-thin text-[15px] cursor-pointer relative z-10`}
        >
          <span className="pt-1">
            <Deals color={isActive('deals') ? '#5B4BAE' : 'white'} />
          </span>
          Deals
        </div>

        {/* About Icon */}
        <div
          ref={(el) => (iconRefs.current[3] = el)} // Store reference
          onClick={() => handleIconClick('about')}
          className={`ps-3 pe-2 pt-3 flex gap-3 text-white font-thin text-[15px] cursor-pointer relative z-10`}
        >
          <span className="pt-1">
            <AboutIcon color={isActive('about') ? '#5B4BAE' : 'white'} />
          </span>
          About
        </div>

        {/* Community Icon */}
        <div
          ref={(el) => (iconRefs.current[4] = el)} // Store reference
          onClick={() => handleIconClick('community')}
          className={`ps-3 pe-2 pt-3 flex gap-3 text-white font-thin text-[15px] cursor-pointer relative z-10`}
        >
          <span className="pt-1">
            <CommunityIcon color={isActive('community') ? '#5B4BAE' : 'white'} />
          </span>
          Community
        </div>

        {/* Custom Button */}
        <div className=" mt-[-4px] relative z-10">
          <CustomButton />
        </div>
      </div>
    
  );
}

export default IconBar;
