import React from 'react';

const CustomButton: React.FC = () => {
  return (
    <button className="h-[50px] w-[120px] mx-1 my-1 bg-black border border-[#5b4baed7] text-[rgb(203,201,201)] text-[16px] font-mono rounded-[10px]  flex justify-center items-center cursor-pointer transition duration-[500ms] hover:shadow-[1px_1px_13px_#20232e,-1px_-1px_13px_#545b78] hover:text-[#d6d6d6] active:shadow-[1px_1px_13px_#20232e,-1px_-1px_33px_#545b78] active:text-[#d6d6d6] active:transition-[100ms]">
      Button
    </button>
  );
}

export default CustomButton;
