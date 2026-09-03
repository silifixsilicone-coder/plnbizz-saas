'use client';

import React from 'react';
import { Flame, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LandingPage } from '@/types/landing-page';
import { EditableText } from '@/components/admin/editor/EditableText';
import { EditableImage } from '@/components/admin/editor/EditableImage';
import { EditableCTA } from '@/components/admin/editor/EditableCTA';

interface HeroProps {
  data?: Partial<LandingPage>;
  isEditingEnabled?: boolean;
  landingPageId?: string;
  slug?: string;
  onDataChange?: (newData: any) => void;
}

export const Hero: React.FC<HeroProps> = ({
  data,
  isEditingEnabled = false,
  landingPageId = 'lp-default-001',
  slug = 'ultimate-bundle',
  onDataChange,
}) => {
  const headline = data?.headline || data?.hero?.title || "दूसरों को Online कमाते देखते रहोगे या खुद शुरुआत करोगे?";
  const mainHeading = data?.mainHeading || data?.hero?.highlightedTitle || "2026 खत्म होने से पहले अपनी Digital Income की शुरुआत करो!";
  const description = data?.description || data?.hero?.description || "AI Videos बनाओ, YouTube पर Upload करो और कमाई की शुरुआत करो — या इन Premium Digital Resources को Resell करके अपना Online Income Source शुरू करो!";
  const offerText = data?.offerText || data?.hero?.badge || "🔥 हजारों Premium Digital Resources — सिर्फ ₹20 में!";
  const ctaText = data?.ctaText || data?.hero?.buttonText || "BUY NOW";
  const externalPaymentUrl = data?.externalPaymentUrl || data?.hero?.buttonUrl || "https://superprofile.bio/vp/🔥-50-000--premium-digital-resources-—-सिर्फ-₹20-में-";
  const productImage = data?.productImage || data?.hero?.heroImage || "/hero-bundle.jpg";

  return (
    <section id="about" className="relative py-12 md:py-20 lg:py-24 bg-[#FFF8E8] overflow-hidden border-b border-[#E8C77A]/60 font-sans">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D89A20]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Copy & Offer */}
          <div className="lg:col-span-7 flex flex-col text-left space-y-6">
            
            {/* Small premium badge */}
            <div className="inline-flex items-center self-start">
              <Badge variant="gold" size="lg" className="bg-[#D89A20]/15 text-[#071A2A] border border-[#E8C77A] py-2 px-4 gap-2 rounded-full font-bold">
                <Flame className="w-4 h-4 text-[#D89A20] animate-pulse" />
                <span className="text-xs sm:text-sm md:text-base font-bold">
                  <EditableText
                    value={offerText}
                    onChange={(v) => onDataChange && onDataChange({ ...data, badge: v, offerText: v })}
                    isEditingEnabled={isEditingEnabled}
                  />
                </span>
              </Badge>
            </div>

            {/* Small headline */}
            <p className="text-base sm:text-lg md:text-xl font-bold text-[#D89A20] tracking-wide leading-snug">
              <EditableText
                value={headline}
                onChange={(v) => onDataChange && onDataChange({ ...data, title: v, headline: v })}
                isEditingEnabled={isEditingEnabled}
              />
            </p>

            {/* Main heading - EDITORIAL DEVANAGARI SERIF FONT */}
            <h1 className="font-devanagari-serif text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] xl:text-[80px] font-black text-[#071A2A] tracking-tight leading-[1.12]">
              <EditableText
                value={mainHeading}
                onChange={(v) => onDataChange && onDataChange({ ...data, highlightedTitle: v, mainHeading: v })}
                isEditingEnabled={isEditingEnabled}
              />
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#6B6255] font-normal leading-relaxed max-w-2xl">
              <EditableText
                value={description}
                onChange={(v) => onDataChange && onDataChange({ ...data, description: v })}
                isEditingEnabled={isEditingEnabled}
                multiline
              />
            </p>

            {/* Price / Offer Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF9EC] border border-[#E8C77A] flex flex-wrap items-center justify-between gap-4 max-w-xl shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#071A2A] flex items-center justify-center text-[#D89A20] font-black text-2xl shadow">
                  ₹
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#071A2A]">₹{data?.price || 20}</span>
                    <span className="text-lg text-[#6B6255] line-through font-semibold">₹{data?.oldPrice || 999}+</span>
                    <span className="text-xs bg-gradient-to-r from-[#D89A20] to-[#E7B33E] text-[#071A2A] font-extrabold px-2.5 py-0.5 rounded-md">89% OFF</span>
                  </div>
                  <p className="text-xs text-[#6B6255] font-medium mt-0.5">
                    One-Time Investment • Lifetime Google Drive Access
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#071A2A] font-bold bg-[#D89A20]/20 px-3 py-1.5 rounded-lg border border-[#E8C77A]">
                <Zap className="w-4 h-4 text-[#D89A20] fill-current" />
                <span>Instant Access</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 max-w-xl">
              <EditableCTA
                buttonText={ctaText}
                buttonUrl={externalPaymentUrl}
                isEditingEnabled={isEditingEnabled}
                eventData={{
                  landingPageId,
                  slug,
                  ctaId: 'hero-main',
                  ctaType: 'hero',
                }}
                onCTAChange={(t, u) =>
                  onDataChange && onDataChange({ ...data, buttonText: t, buttonUrl: u, ctaText: t, externalPaymentUrl: u })
                }
                className="w-full py-5 text-xl sm:text-2xl font-black rounded-full shadow-2xl bg-gradient-to-r from-[#D89A20] via-[#E0A72B] to-[#E7B33E] hover:from-[#D89A20] hover:to-[#E7B33E] active:from-[#D89A20] active:to-[#E7B33E] focus:from-[#D89A20] focus:to-[#E7B33E] focus-visible:from-[#D89A20] focus-visible:to-[#E7B33E] border border-[#E8C77A] text-[#071A2A]"
              />
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#6B6255] font-bold pt-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D89A20]" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D89A20]" />
                <span>Premium Resources</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D89A20]" />
                <span>Mobile Friendly</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Large Product Bundle Visual */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-md lg:max-w-none group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#D89A20]/20 to-[#071A2A]/20 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden bg-[#FFF9EC] border-2 border-[#E8C77A] shadow-2xl p-3">
                <EditableImage
                  src={productImage}
                  storagePath={data?.hero?.heroImageStoragePath}
                  alt="PLNBIZZ Digital Product Bundle Visual"
                  folderPath={`landing-pages/${landingPageId}/hero`}
                  isEditingEnabled={isEditingEnabled}
                  onImageChange={(url, path) =>
                    onDataChange && onDataChange({ ...data, heroImage: url, heroImageStoragePath: path, productImage: url })
                  }
                  className="w-full max-h-[460px] md:max-h-[520px] mx-auto block rounded-xl overflow-hidden"
                  imgClassName="w-full h-auto object-contain max-h-[460px] md:max-h-[520px] mx-auto block rounded-xl transform hover:scale-[1.02] transition-transform duration-500"
                />
                
                <div className="mt-3 bg-[#071A2A] text-white p-3.5 rounded-xl flex items-center justify-between border border-[#E8C77A]/50 shadow-md font-admin">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#D89A20] animate-ping" />
                    <span className="text-xs sm:text-sm font-bold text-[#E7B33E]">
                      50,000+ Digital Assets Ready
                    </span>
                  </div>
                  <span className="text-xs text-slate-300 font-semibold">Instant Download</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
