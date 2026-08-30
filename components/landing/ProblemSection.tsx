'use client';

import React from 'react';
import { ProblemCardItem } from '@/types/landing-page';
import { HelpCircle, Search, Clock, DollarSign, BookOpen, TrendingDown, AlertTriangle } from 'lucide-react';
import { EditableText } from '@/components/admin/editor/EditableText';

interface ProblemSectionProps {
  problems: ProblemCardItem[];
  isEditingEnabled?: boolean;
  onProblemChange?: (index: number, updatedItem: ProblemCardItem) => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({
  problems,
  isEditingEnabled = false,
  onProblemChange,
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    HelpCircle: <HelpCircle className="w-6 h-6 text-[#D89A20]" />,
    Search: <Search className="w-6 h-6 text-[#D89A20]" />,
    Clock: <Clock className="w-6 h-6 text-[#D89A20]" />,
    DollarSign: <DollarSign className="w-6 h-6 text-[#D89A20]" />,
    BookOpen: <BookOpen className="w-6 h-6 text-[#D89A20]" />,
    TrendingDown: <TrendingDown className="w-6 h-6 text-[#D89A20]" />,
  };

  return (
    <section className="py-20 md:py-28 bg-[#071A2A] text-white border-y border-[#E8C77A]/30 relative overflow-hidden font-sans">
      
      {/* Decorative Gold Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D89A20]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4 font-admin">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#D89A20] bg-[#D89A20]/10 border border-[#E8C77A]/30 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#D89A20]" />
            <span>आम डिजिटल समस्याएं</span>
          </span>

          <h2 className="font-devanagari-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#FFF8E8] tracking-tight leading-tight">
            Online कमाई शुरू करना चाहते हैं लेकिन शुरुआत कहाँ से करें?
          </h2>

          <p className="text-lg md:text-xl text-slate-300 font-normal leading-relaxed">
            सैकड़ों नए क्रिएटर्स और डिजिटल उद्यमियों को इन 6 बड़ी चुनौतियों का सामना करना पड़ता है
          </p>
        </div>

        {/* 6 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, idx) => (
            <div
              key={problem.id || idx}
              className="p-8 rounded-2xl bg-[#0D2436] border border-[#E8C77A]/30 hover:border-[#D89A20] shadow-xl transition-all duration-300 flex flex-col space-y-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#071A2A] flex items-center justify-center border border-[#E8C77A]/40 shadow-inner">
                {iconMap[problem.icon || 'HelpCircle'] || <HelpCircle className="w-6 h-6 text-[#D89A20]" />}
              </div>

              <h3 className="font-devanagari-serif text-xl sm:text-2xl font-bold text-[#FFF8E8] group-hover:text-[#E7B33E] transition-colors">
                <EditableText
                  value={problem.title}
                  onChange={(v) => onProblemChange && onProblemChange(idx, { ...problem, title: v })}
                  isEditingEnabled={isEditingEnabled}
                />
              </h3>

              <p className="text-slate-300 text-base leading-relaxed">
                <EditableText
                  value={problem.description}
                  onChange={(v) => onProblemChange && onProblemChange(idx, { ...problem, description: v })}
                  isEditingEnabled={isEditingEnabled}
                  multiline
                />
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
