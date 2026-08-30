'use client';

import React from 'react';
import { FAQItem } from '@/types/landing-page';
import { Accordion } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';
import { HelpCircle } from 'lucide-react';
import { EditableText } from '@/components/admin/editor/EditableText';

interface FAQSectionProps {
  faq?: FAQItem[];
  isEditingEnabled?: boolean;
  onFAQChange?: (index: number, updatedItem: FAQItem) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faq = [],
  isEditingEnabled = false,
  onFAQChange,
}) => {
  return (
    <section className="py-16 md:py-24 bg-[#FFF8E8] border-b border-[#E8C77A]/60 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-4 font-admin">
          <Badge variant="gold" size="lg" className="bg-[#D89A20]/15 text-[#071A2A] border border-[#E8C77A] px-4 py-1.5 font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 mr-1.5 text-[#D89A20] inline-block" /> अक्सर पूछे जाने वाले सवाल (FAQ)
          </Badge>
          <h2 className="font-devanagari-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#071A2A] tracking-tight leading-tight">
            आपके सवालों के सीधे और साफ जवाब
          </h2>
          <p className="text-lg md:text-xl text-[#6B6255] font-normal">
            बंडल खरीदने से पहले अपनी सभी शंकाएं दूर करें
          </p>
        </div>

        {isEditingEnabled ? (
          <div className="space-y-4">
            {faq.map((item, idx) => (
              <div key={item.id || idx} className="p-4 bg-[#FFF9EC] border border-[#E8C77A] rounded-2xl space-y-2">
                <div className="font-bold text-[#071A2A]">
                  <EditableText
                    value={item.question}
                    onChange={(v) => onFAQChange && onFAQChange(idx, { ...item, question: v })}
                    isEditingEnabled={true}
                  />
                </div>
                <div className="text-sm text-[#6B6255]">
                  <EditableText
                    value={item.answer}
                    onChange={(v) => onFAQChange && onFAQChange(idx, { ...item, answer: v })}
                    isEditingEnabled={true}
                    multiline
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Accordion items={faq} />
        )}

      </div>
    </section>
  );
};
