import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import { Input } from './Input';

export const PasswordInput = React.forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <Input
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      leftIcon={<FiLock className="w-5 h-5" />}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
        >
          {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
        </button>
      }
      {...props}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
