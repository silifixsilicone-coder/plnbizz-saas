'use client';

import React from 'react';
import { triggerExternalCheckout } from '@/lib/analytics';

interface NavbarProps {
  price?: number;
  ctaText?: string;
  externalPaymentUrl?: string;
  landingPageId?: string;
  slug?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  price = 109,
  ctaText = '👉 अभी ₹109 में Bundle लें',
  externalPaymentUrl = 'https://checkout.example.com/pay/109',
  landingPageId = 'lp-default-001',
  slug = 'ultimate-bundle',
}) => {
  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerExternalCheckout(externalPaymentUrl, {
      landingPageId,
      slug,
      ctaId: 'navbar-main',
      ctaType: 'hero',
    });
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#071A2A] text-white border-b border-[#E8C77A]/30 px-4 sm:px-6 lg:px-8 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Name */}
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#D89A20] transition-colors">
            PLN<span className="text-[#D89A20]">BIZZ</span>
          </span>
        </a>

        {/* CTA Button */}
        <button
          onClick={handleCTAClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D89A20] via-[#E0A72B] to-[#E7B33E] hover:from-[#D89A20] hover:to-[#E7B33E] active:from-[#D89A20] active:to-[#E7B33E] focus:from-[#D89A20] focus:to-[#E7B33E] focus-visible:from-[#D89A20] focus-visible:to-[#E7B33E] border border-[#E8C77A] text-[#071A2A] font-black text-xs sm:text-sm shadow-lg transition-transform transform active:scale-95"
        >
          <span>{ctaText}</span>
        </button>

      </div>
    </nav>
  );
};
