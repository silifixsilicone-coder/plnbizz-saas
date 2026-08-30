'use client';

import React from 'react';
import { ProductBenefit } from '@/types/landing-page';
import { Badge } from '@/components/ui/Badge';
import { Sparkles } from 'lucide-react';
import { EditableText } from '@/components/admin/editor/EditableText';

interface BenefitsSectionProps {
  benefits?: ProductBenefit[];
  isEditingEnabled?: boolean;
  onBenefitChange?: (index: number, updatedItem: ProductBenefit) => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  benefits = [],
  isEditingEnabled = false,
  onBenefitChange,
}) => {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-[#FFF8E8] border-b border-[#E8C77A]/60 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
          <Badge variant="gold" size="lg" className="bg-[#D89A20]/15 text-[#071A2A] border border-[#E8C77A] px-4 py-1.5 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 mr-1.5 text-[#D89A20] inline-block" /> बंडल के अनूठे फायदे
          </Badge>
          
          <h2 className="font-devanagari-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#071A2A] tracking-tight leading-tight">
            ये सिर्फ एक Bundle नहीं है।
          </h2>
          
          <p className="text-lg md:text-xl text-[#6B6255] font-normal leading-relaxed">
            यह आपकी डिजिटल इनकम और ऑनलाइन ग्रोथ का कम्पलीट बिजनेस सॉल्यूशन है।
          </p>
        </div>

        {/* Numbered Editorial Cards Grid (01 - 07) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id || index}
              className="p-8 rounded-2xl bg-[#FFF9EC] border border-[#E8C77A] hover:border-[#D89A20] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8C77A]/40 pb-3">
                  <span className="font-devanagari-serif text-3xl sm:text-4xl font-black text-[#D89A20]">
                    <EditableText
                      value={benefit.number || `0${index + 1}`}
                      onChange={(v) => onBenefitChange && onBenefitChange(index, { ...benefit, number: v })}
                      isEditingEnabled={isEditingEnabled}
                    />
                  </span>
                  <span className="text-xs bg-[#D89A20]/15 text-[#071A2A] font-bold px-2.5 py-1 rounded-full border border-[#E8C77A]">
                    Verified
                  </span>
                </div>

                <h3 className="font-devanagari-serif text-2xl font-bold text-[#071A2A] group-hover:text-[#D89A20] transition-colors leading-snug">
                  <EditableText
                    value={benefit.title}
                    onChange={(v) => onBenefitChange && onBenefitChange(index, { ...benefit, title: v })}
                    isEditingEnabled={isEditingEnabled}
                  />
                </h3>

                <p className="text-[#6B6255] text-base leading-relaxed">
                  <EditableText
                    value={benefit.description}
                    onChange={(v) => onBenefitChange && onBenefitChange(index, { ...benefit, description: v })}
                    isEditingEnabled={isEditingEnabled}
                    multiline
                  />
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
