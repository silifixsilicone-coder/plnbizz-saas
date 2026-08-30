import React from 'react';
import { Button } from '@/components/ui/Button';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface CTASectionProps {
  price?: number;
  ctaText?: string;
  externalPaymentUrl?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  price = 109,
  ctaText = '👉 अभी ₹109 में Bundle लें',
  externalPaymentUrl = '#offer',
}) => {
  return (
    <section className="py-16 md:py-20 bg-[#FAF8F5] border-t border-[#E2D9CC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B132B]">
          क्या आप अपनी डिजिटल इनकम की शुरुआत करने के लिए तैयार हैं?
        </h2>

        <p className="text-lg md:text-xl text-[#5A6578] max-w-2xl mx-auto">
          देर न करें — यह ऑफर सीमित समय के लिए सिर्फ ₹{price} में उपलब्ध है।
        </p>

        <div className="pt-4 max-w-md mx-auto">
          <a href={externalPaymentUrl} className="block w-full">
            <Button variant="gold" size="xl" fullWidth className="py-5 text-xl font-black shadow-xl">
              <span>{ctaText}</span>
            </Button>
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-[#5A6578] pt-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>Instant Download • 100% Satisfaction Guaranteed</span>
        </div>

      </div>
    </section>
  );
};
