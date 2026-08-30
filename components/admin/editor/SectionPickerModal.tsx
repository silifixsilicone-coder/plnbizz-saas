'use client';

import React, { useState } from 'react';
import { SectionType } from '@/types/landing-page';
import {
  X,
  Sparkles,
  Layout,
  ShoppingBag,
  Clock,
  HelpCircle,
  MessageSquareQuote,
  Video,
  FileText,
  Image,
  Send,
  Shield,
  Layers,
} from 'lucide-react';

interface SectionPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (type: SectionType) => void;
}

type CategoryType = 'all' | 'basic' | 'marketing' | 'product' | 'social_proof' | 'conversion';

interface SectionOption {
  type: SectionType;
  title: string;
  description: string;
  category: CategoryType;
  icon: any;
}

export const SECTION_OPTIONS: SectionOption[] = [
  {
    type: 'hero',
    title: 'Hero Section',
    description: 'Main headline, badge, CTA button, and hero image',
    category: 'basic',
    icon: Layout,
  },
  {
    type: 'benefits',
    title: 'Benefits Section',
    description: 'Grid of benefit cards highlighting key value props',
    category: 'marketing',
    icon: Sparkles,
  },
  {
    type: 'products',
    title: 'Products Section',
    description: 'Digital resource cards with price and checkout links',
    category: 'product',
    icon: ShoppingBag,
  },
  {
    type: 'features',
    title: 'Features Section',
    description: 'Detailed feature list with custom icons',
    category: 'product',
    icon: Layers,
  },
  {
    type: 'testimonials',
    title: 'Testimonials',
    description: 'Social proof cards with avatar, rating, and review text',
    category: 'social_proof',
    icon: MessageSquareQuote,
  },
  {
    type: 'faq',
    title: 'FAQ Accordion',
    description: 'Frequently asked questions with accordion answers',
    category: 'social_proof',
    icon: HelpCircle,
  },
  {
    type: 'offer',
    title: 'Special Offer Section',
    description: 'Discount pricing banner, image, and high-converting CTA',
    category: 'conversion',
    icon: Sparkles,
  },
  {
    type: 'countdown',
    title: 'Countdown Timer',
    description: 'Real-time countdown timer to create urgency',
    category: 'conversion',
    icon: Clock,
  },
  {
    type: 'image_banner',
    title: 'Image Banner',
    description: 'Full-width banner image with text overlay and link',
    category: 'marketing',
    icon: Image,
  },
  {
    type: 'video',
    title: 'Video Embed',
    description: 'Responsive YouTube/Vimeo video player container',
    category: 'marketing',
    icon: Video,
  },
  {
    type: 'text_content',
    title: 'Text Content',
    description: 'Rich text paragraph content for detailed descriptions',
    category: 'basic',
    icon: FileText,
  },
  {
    type: 'final_cta',
    title: 'Final CTA Banner',
    description: 'Bottom call-to-action banner with high contrast',
    category: 'conversion',
    icon: Send,
  },
  {
    type: 'footer',
    title: 'Footer',
    description: 'Brand name, copyright, and social links',
    category: 'basic',
    icon: Shield,
  },
];

export const SectionPickerModal: React.FC<SectionPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectSection,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  if (!isOpen) return null;

  const categories: { label: string; value: CategoryType }[] = [
    { label: 'All Sections', value: 'all' },
    { label: 'Basic', value: 'basic' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Product', value: 'product' },
    { label: 'Social Proof', value: 'social_proof' },
    { label: 'Conversion', value: 'conversion' },
  ];

  const filteredOptions = SECTION_OPTIONS.filter(
    (opt) => activeCategory === 'all' || opt.category === activeCategory
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-6 space-y-6 shadow-2xl relative max-h-[85vh] flex flex-col font-admin lang-en text-[#071A2A]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8C77A]/60 pb-4 flex-shrink-0">
          <div>
            <h3 className="text-xl font-extrabold text-[#071A2A]">Add New Section</h3>
            <p className="text-xs text-[#6B6255]">Select a pre-designed section template to insert into your landing page</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === cat.value
                  ? 'bg-[#071A2A] text-[#D89A20] border border-[#D89A20]'
                  : 'bg-white text-[#6B6255] border border-[#E8C77A] hover:bg-[#FFF8E8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Section Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pr-1">
          {filteredOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.type}
                type="button"
                onClick={() => {
                  onSelectSection(opt.type);
                  onClose();
                }}
                className="p-4 rounded-2xl bg-white border border-[#E8C77A] hover:border-[#D89A20] hover:shadow-md transition-all text-left space-y-2 group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#071A2A] text-[#D89A20] flex items-center justify-center border border-[#D89A20] group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#071A2A] group-hover:text-[#D89A20] transition-colors">
                      {opt.title}
                    </h4>
                    <p className="text-[11px] text-[#6B6255] leading-relaxed mt-0.5">
                      {opt.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-[10px] font-black uppercase text-[#D89A20] flex items-center justify-end">
                  + Add Section
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
