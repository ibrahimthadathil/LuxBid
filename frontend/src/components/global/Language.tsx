// import React, { useState } from 'react';
// import WorldIcon from '../../assets/icons/World';
// import DownArrow from '../../assets/icons/DownArrow';

// const Language = () => {
//     const [isActive, setIsActive] = useState(false);

//     const handleToggle = () => {
//         setIsActive(!isActive);
//     };

//     return (
//         <div
//             className={`h-[3rem] w-[50%] rounded-lg ps-4 pe-4 flex items-center justify-between transition-all duration-300 ease-in-out ${isActive ? ' shadow-lg shadow-[#5b4bae25]' : 'bg-[#15131386] shadow-inner'}`}
//             onClick={handleToggle}
//         >
//             <WorldIcon color={isActive ? '#5B4BAE' : 'white'} />
//             <span className={`text-white transition-colors duration-300 `}>ENG</span>
//             <DownArrow />
//         </div>
//     );
// };

// export default Language;
import React, { useState } from 'react';
import WorldIcon from '../../assets/icons/World';
import DownArrow from '../../assets/icons/DownArrow';

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
      <WorldIcon color={isActive ? '#5B4BAE' : 'white'} />
      <span className="text-white transition-colors duration-300">ENG</span>
      <DownArrow />
    </div>
  );
};

export default Language;
