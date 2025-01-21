import React, { useRef, useCallback } from 'react';
import { useTheme } from '../theme/theme-provider';

interface OTPInputProps {
  onChange?: (value: string) => void;
  
}

const OTPInput: React.FC<OTPInputProps> = ({ onChange}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const {theme} = useTheme()
  const handleChange = useCallback((index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Move to next input
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Move to previous input
    if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (onChange) {
      const otpValue = inputRefs.current.reduce((acc, ref) => acc + (ref?.value || ''), '');
      onChange(otpValue);
      
    }
  }, [onChange]);

  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: 6 }, (_, index) => (
        <React.Fragment key={index}>
          <input
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            className={`w-8 h-8 text-center ${theme=='dark'?"text-white bg-zinc-800":'text-black bg-gray-100'} rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out`}
            onChange={(e) => handleChange(index, e)}
          />
          {index < 5 && <span className="mx-1 text-lg">-</span>}
        </React.Fragment>
      ))}
        
    </div>
  );
};

export default React.memo(OTPInput);
