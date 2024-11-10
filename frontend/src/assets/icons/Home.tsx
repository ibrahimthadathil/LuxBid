import React from 'react';

const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = React.memo(({color}) => {
  return (
    <svg
      width="15px"
      height="15px"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // This allows passing any props to the SVG element
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z"
        fill={color} // Set fill to white
      />
    </svg>
  );
})

export default HomeIcon;
