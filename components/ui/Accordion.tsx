'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '@/types/landing-page';

interface AccordionProps {
  items: FAQItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border border-[#E2D9CC] rounded-xl bg-white overflow-hidden transition-all duration-200 shadow-sm"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 bg-white hover:bg-[#F4EFE6]/30 transition-colors"
            >
              <span className="text-lg md:text-xl font-bold text-[#0B132B] leading-snug">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-6 text-[#5A6578] text-base md:text-lg leading-relaxed border-t border-[#E2D9CC]/50 pt-4">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
