import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'navy' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-black transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.99]';

  const variants = {
    gold: 'bg-gradient-to-r from-[#D89A20] via-[#E0A72B] to-[#E7B33E] hover:from-[#D89A20] hover:to-[#E7B33E] active:from-[#D89A20] active:to-[#E7B33E] focus:from-[#D89A20] focus:to-[#E7B33E] focus-visible:from-[#D89A20] focus-visible:to-[#E7B33E] text-[#071A2A] rounded-full border border-[#E8C77A] shadow-xl hover:shadow-2xl focus:ring-[#D89A20]',
    navy: 'bg-[#071A2A] hover:bg-[#0A2236] text-white shadow-md hover:shadow-lg focus:ring-[#071A2A]',
    outline: 'border-2 border-[#071A2A] text-[#071A2A] hover:bg-[#071A2A] hover:text-white focus:ring-[#071A2A]',
    ghost: 'bg-transparent text-[#071A2A] hover:bg-[#FBF1D8] focus:ring-[#071A2A]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs rounded-full gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-full gap-2',
    lg: 'px-7 py-3.5 text-base rounded-full gap-2.5',
    xl: 'px-9 py-5 text-xl sm:text-2xl rounded-full gap-3 shadow-2xl',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
