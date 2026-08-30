'use client';

import React from 'react';
import { triggerExternalCheckout } from '@/lib/analytics';

interface MobileStickyBuyBarProps {
  price?: number;
  oldPrice?: number;
  ctaText?: string;
  externalPaymentUrl?: string;
  landingPageId?: string;
  slug?: string;
}

export const MobileStickyBuyBar: React.FC<MobileStickyBuyBarProps> = ({
  price = 109,
  oldPrice = 999,
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
      ctaId: 'mobile-sticky-bar',
      ctaType: 'sticky_bar',
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#FFF9EC]/95 backdrop-blur-md border-t-2 border-[#E8C77A] px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] font-admin">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        
        {/* Left Side: Price Display */}
        <div className="flex flex-col justify-center text-left pl-1">
          <span className="text-[10px] uppercase font-extrabold text-[#6B6255] leading-none">Offer Price</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-xl font-black text-[#071A2A]">₹{price}</span>
            {oldPrice && (
              <span className="text-xs text-[#6B6255] line-through font-semibold">₹{oldPrice}</span>
            )}
          </div>
        </div>

        {/* Right Side: Gold Pill Buy Button */}
        <button
          type="button"
          onClick={handleCTAClick}
          className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-[#D89A20] via-[#E0A72B] to-[#E7B33E] hover:from-[#D89A20] hover:to-[#E7B33E] active:from-[#D89A20] active:to-[#E7B33E] focus:from-[#D89A20] focus:to-[#E7B33E] focus-visible:from-[#D89A20] focus-visible:to-[#E7B33E] text-[#071A2A] border border-[#E8C77A] font-black text-xs sm:text-sm shadow-lg transition-transform transform active:scale-95 text-center truncate cursor-pointer"
        >
          <span className="truncate">{ctaText}</span>
        </button>

      </div>
    </div>
  );
};
