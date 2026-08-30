import React from 'react';
import { Flame, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface OfferSectionProps {
  price?: number;
  oldPrice?: number;
  offerText?: string;
  ctaText?: string;
  externalPaymentUrl?: string;
}

export const OfferSection: React.FC<OfferSectionProps> = ({
  price = 109,
  oldPrice = 999,
  offerText = "🔥 Limited Premium Digital Bundle",
  ctaText = "BUY NOW",
  externalPaymentUrl = "#offer",
}) => {
  return (
    <section id="offer" className="py-20 md:py-28 bg-[#FFF8E8] relative overflow-hidden border-b border-[#E8C77A]">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Flame Badge */}
        <div className="inline-flex items-center gap-2 bg-[#D89A20]/20 border border-[#E8C77A] text-[#071A2A] px-4 py-2 rounded-full font-black text-sm md:text-base mb-8 shadow-sm">
          <Flame className="w-5 h-5 text-[#D89A20] fill-current animate-bounce" />
          <span>विशेष ऑफर — सीमित समय के लिए सिर्फ ₹109 में!</span>
        </div>

        {/* Offer Container Card */}
        <div className="bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 max-w-2xl mx-auto">
          
          <div className="space-y-3">
            <h2 className="font-devanagari-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#071A2A] tracking-tight">
              {offerText}
            </h2>
            <p className="text-base sm:text-lg text-[#6B6255]">
              आज ही अपना प्रीमियम बंडल क्लेम करें और तुरंत लाइफटाइम एक्सेस पाएं
            </p>
          </div>

          <hr className="border-[#E8C77A]/60" />

          {/* Pricing Hierarchy */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D89A20]">
              Today's Discounted Investment
            </span>

            <div className="flex items-baseline justify-center gap-4">
              <span className="font-devanagari-serif text-6xl sm:text-7xl font-black text-[#D89A20]">
                ₹{price}
              </span>
              <span className="text-3xl text-[#6B6255] line-through font-bold">
                ₹{oldPrice}+
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#6B6255] font-semibold pt-1">
              One-Time Payment • No Monthly Subscriptions • Instant Access
            </p>
          </div>

          {/* Checklist */}
          <ul className="text-left text-sm sm:text-base space-y-3 text-[#071A2A] font-semibold max-w-md mx-auto bg-[#FFF8E8] p-5 rounded-2xl border border-[#E8C77A]">
            <li className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-[#D89A20] flex-shrink-0" />
              <span>50,000+ Instant Downloads Included</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-[#D89A20] flex-shrink-0" />
              <span>100% Master Resell Rights (MRR) Included</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-[#D89A20] flex-shrink-0" />
              <span>Instant Google Drive Access Link</span>
            </li>
          </ul>

          {/* Gold CTA */}
          <div className="pt-2">
            <a href={externalPaymentUrl} className="block w-full">
              <Button
                variant="gold"
                size="xl"
                fullWidth
                className="py-5 text-xl sm:text-2xl font-black rounded-full shadow-2xl bg-gradient-to-r from-[#D89A20] via-[#E0A72B] to-[#E7B33E] hover:from-[#D89A20] hover:to-[#E7B33E] active:from-[#D89A20] active:to-[#E7B33E] focus:from-[#D89A20] focus:to-[#E7B33E] focus-visible:from-[#D89A20] focus-visible:to-[#E7B33E] border border-[#E8C77A] text-[#071A2A]"
              >
                <span>{ctaText}</span>
              </Button>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#6B6255] font-bold">
            <ShieldCheck className="w-4 h-4 text-[#D89A20]" />
            <span>256-bit Secure Checkout • 100% Instant Delivery</span>
          </div>

        </div>

      </div>
    </section>
  );
};
