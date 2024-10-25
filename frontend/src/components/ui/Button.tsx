import React from 'react';
import { Link } from 'react-router-dom';

const CustomButton: React.FC = () => {
  return (
  <button className="h-[50px] w-[120px] mx-1 my-1 bg-black text-[rgb(203,201,201)] text-[16px] font-thin rounded-[10px] flex justify-center items-center cursor-pointer transition duration-[500ms] hover:shadow-[1px_1px_13px_#5B4BAE,-1px_-1px_6px_#5B4BAE] hover:text-[#d6d6d6] active:shadow-[1px_1px_14px_#20232e,-1px_-1px_33px_#545b78] active:text-[#d6d6d6] active:transition-[100ms] ">
  <Link to={'/auth/signup'}>SignUp / In</Link>
</button>

  );
}

export default CustomButton;
