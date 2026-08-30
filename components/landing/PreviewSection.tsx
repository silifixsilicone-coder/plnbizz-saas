import React from 'react';
import { PreviewImage } from '@/types/landing-page';
import { Badge } from '@/components/ui/Badge';
import { Eye } from 'lucide-react';

interface PreviewSectionProps {
  images?: PreviewImage[];
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({ images = [] }) => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
          <Badge variant="gold" size="lg" className="px-4 py-1.5 font-bold uppercase tracking-wider">
            <Eye className="w-4 h-4 mr-1.5 inline-block" /> लाइव प्रिव्यू (Resource Preview)
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B132B] tracking-tight leading-tight">
            प्रीमियम क्वालिटी एसेट्स की एक झलक देखें
          </h2>
          <p className="text-lg md:text-xl text-[#5A6578] font-normal leading-relaxed">
            हर एक फाइल HD और Ultra HD 4K रेजोल्यूशन में व्यवस्थित तरीके से उपलब्ध है
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((img) => (
            <div
              key={img.id}
              className="rounded-2xl border-2 border-[#E2D9CC] bg-[#0B132B]/5 p-4 sm:p-6 flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image container ensuring object-fit contain and no distortion */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl bg-[#0B132B] overflow-hidden flex items-center justify-center p-3">
                <img
                  src={img.url}
                  alt={img.altText || img.caption || 'Preview Resource'}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {img.caption && (
                <div className="mt-4 pt-3 border-t border-[#E2D9CC] flex items-center justify-between">
                  <p className="text-base sm:text-lg font-bold text-[#0B132B]">
                    {img.caption}
                  </p>
                  <span className="text-xs bg-[#D4AF37]/20 text-[#8C6D13] font-extrabold px-2.5 py-1 rounded-md">
                    HD Preview
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
