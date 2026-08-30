'use client';

import React from 'react';
import { TestimonialItem } from '@/types/landing-page';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Star, MessageSquareQuote } from 'lucide-react';
import { EditableText } from '@/components/admin/editor/EditableText';
import { EditableImage } from '@/components/admin/editor/EditableImage';

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
  landingPageId?: string;
  isEditingEnabled?: boolean;
  onTestimonialChange?: (index: number, updatedItem: TestimonialItem) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials = [],
  landingPageId = 'lp-default-001',
  isEditingEnabled = false,
  onTestimonialChange,
}) => {
  return (
    <section className="py-16 md:py-24 bg-[#FFF8E8] border-b border-[#E8C77A]/60 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4 font-admin">
          <Badge variant="gold" size="lg" className="bg-[#D89A20]/15 text-[#071A2A] border border-[#E8C77A] px-4 py-1.5 font-bold uppercase tracking-wider">
            ⭐ कस्टमर फीडबैक (Testimonials)
          </Badge>
          <h2 className="font-devanagari-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#071A2A] tracking-tight leading-tight">
            हमारे संतुष्ट ग्राहकों के अनुभव
          </h2>
          <p className="text-lg md:text-xl text-[#6B6255] font-normal leading-relaxed">
            जानिए कैसे सैकड़ों डिजिटल क्रिएटर्स ने PLNBIZZ बंडल से अपनी इनकम शुरू की
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, idx) => (
            <Card key={item.id || idx} className="p-6 md:p-8 flex flex-col justify-between space-y-6 bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl shadow-md">
              
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D89A20] text-[#D89A20]" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-[#071A2A] text-base md:text-lg leading-relaxed font-medium italic relative">
                  "<EditableText
                    value={item.content}
                    onChange={(v) => onTestimonialChange && onTestimonialChange(idx, { ...item, content: v })}
                    isEditingEnabled={isEditingEnabled}
                    multiline
                  />"
                </p>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#E8C77A]/60">
                <EditableImage
                  src={item.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                  storagePath={item.avatarStoragePath}
                  alt={item.name}
                  folderPath={`landing-pages/${landingPageId}/testimonials`}
                  isEditingEnabled={isEditingEnabled}
                  onImageChange={(url, path) => {
                    if (onTestimonialChange) {
                      onTestimonialChange(idx, { ...item, avatar: url, avatarStoragePath: path });
                    }
                  }}
                  className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D89A20]"
                  imgClassName="w-full h-full object-cover"
                />
                
                <div>
                  <h4 className="font-bold text-[#071A2A] text-base">
                    <EditableText
                      value={item.name}
                      onChange={(v) => onTestimonialChange && onTestimonialChange(idx, { ...item, name: v })}
                      isEditingEnabled={isEditingEnabled}
                    />
                  </h4>
                  <p className="text-xs text-[#6B6255] font-semibold">
                    <EditableText
                      value={item.role || 'Digital Creator'}
                      onChange={(v) => onTestimonialChange && onTestimonialChange(idx, { ...item, role: v })}
                      isEditingEnabled={isEditingEnabled}
                    />
                  </p>
                </div>
              </div>

            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
