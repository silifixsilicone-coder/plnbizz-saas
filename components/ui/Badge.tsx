import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'navy' | 'cream' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-semibold rounded-full tracking-wide';

  const variants = {
    gold: 'bg-[#D4AF37]/15 text-[#8C6D13] border border-[#D4AF37]/40',
    navy: 'bg-[#0B132B] text-white',
    cream: 'bg-[#F4EFE6] text-[#0B132B] border border-[#E2D9CC]',
    success: 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-700 border border-amber-500/30',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs md:text-sm',
    lg: 'px-4 py-1.5 text-sm md:text-base',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
