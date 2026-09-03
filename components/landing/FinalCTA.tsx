import React from 'react';
import { Button } from '@/components/ui/Button';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface FinalCTAProps {
  price?: number;
  ctaText?: string;
  externalPaymentUrl?: string;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  price = 20,
  ctaText = 'BUY NOW',
  externalPaymentUrl = 'https://superprofile.bio/vp/🔥-50-000--premium-digital-resources-—-सिर्फ-₹20-में-',
}) => {
  return (
    <section className="py-24 md:py-36 bg-[#071A2A] text-white text-center relative overflow-hidden border-t-4 border-[#D89A20]">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D89A20]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Eyebrow */}
        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#D89A20] bg-[#D89A20]/15 border border-[#E8C77A]/40 px-5 py-2 rounded-full inline-block">
          START YOUR DIGITAL JOURNEY TODAY
        </span>

        {/* Headings */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h2 className="font-devanagari-serif text-3xl sm:text-5xl md:text-6xl font-black text-[#FFF8E8] tracking-tight">
            अब सिर्फ सोचते मत रहो...
          </h2>
          <h3 className="font-devanagari-serif text-4xl sm:text-6xl md:text-7xl font-black text-[#D89A20] tracking-tight leading-tight">
            अपनी Digital Income की शुरुआत करो।
          </h3>
        </div>

        {/* Description */}
        <p className="text-lg md:text-2xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
          Premium Digital Resources एक ही Bundle में प्राप्त करें और आज ही शुरुआत करें।
        </p>

        {/* CTA Button */}
        <div className="pt-6 max-w-xl mx-auto">
          <a href={externalPaymentUrl} className="block w-full">
            <Button
              variant="gold"
              size="xl"
              fullWidth
              className="py-5 sm:py-6 text-xl sm:text-2xl font-black rounded-full shadow-2xl bg-gradient-to-r from-[#D89A20] via-[#E0A72B] to-[#E7B33E] hover:from-[#D89A20] hover:to-[#E7B33E] active:from-[#D89A20] active:to-[#E7B33E] focus:from-[#D89A20] focus:to-[#E7B33E] focus-visible:from-[#D89A20] focus-visible:to-[#E7B33E] border border-[#E8C77A] text-[#071A2A]"
            >
              <span>{ctaText}</span>
            </Button>
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400 font-bold pt-2">
          <ShieldCheck className="w-4 h-4 text-[#D89A20]" />
          <span>Instant Download • 100% Satisfaction Guaranteed</span>
        </div>

      </div>
    </section>
  );
};
