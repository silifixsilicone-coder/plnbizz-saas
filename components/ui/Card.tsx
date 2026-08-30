import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-[#E2D9CC] shadow-sm ${
        hoverEffect ? 'transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-[#D4AF37]/50' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
