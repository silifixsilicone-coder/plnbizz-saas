'use client';

import React from 'react';
import { EditableImage } from '@/components/admin/editor/EditableImage';
import { EditableText } from '@/components/admin/editor/EditableText';
import { EditableCTA } from '@/components/admin/editor/EditableCTA';

interface ImageBannerSectionProps {
  data: {
    heading?: string;
    description?: string;
    image?: string;
    imageStoragePath?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  landingPageId?: string;
  slug?: string;
  sectionId?: string;
  isEditingEnabled?: boolean;
  onDataChange?: (newData: any) => void;
}

export const ImageBannerSection: React.FC<ImageBannerSectionProps> = ({
  data,
  landingPageId = 'lp-default-001',
  slug = 'bundle',
  sectionId = 'banner',
  isEditingEnabled = false,
  onDataChange,
}) => {
  const heading = data?.heading || 'प्रीमियम डिजिटल एसेट्स';
  const description = data?.description || 'अपने बिजनेस को नई ऊंचाइयों पर ले जाएं';
  const image = data?.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
  const buttonText = data?.buttonText || 'अभी खरीदें';
  const buttonUrl = data?.buttonUrl || 'https://superprofile.bio/vp/🔥-50-000--premium-digital-resources-—-सिर्फ-₹20-में-';

  return (
    <section className="py-12 md:py-16 bg-[#FFF8E8] border-t border-[#E8C77A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#071A2A] text-white border-2 border-[#E8C77A] shadow-2xl p-6 sm:p-12 flex flex-col md:flex-row items-center gap-8">
          
          {/* Image */}
          <div className="w-full md:w-1/2">
            <EditableImage
              src={image}
              storagePath={data?.imageStoragePath}
              alt={heading}
              folderPath={`landing-pages/${landingPageId}/banner`}
              isEditingEnabled={isEditingEnabled}
              onImageChange={(url, path) =>
                onDataChange && onDataChange({ ...data, image: url, imageStoragePath: path })
              }
              className="w-full h-64 bg-[#04111C] rounded-2xl overflow-hidden"
              imgClassName="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-[#D89A20]">
              <EditableText
                value={heading}
                onChange={(v) => onDataChange && onDataChange({ ...data, heading: v })}
                isEditingEnabled={isEditingEnabled}
              />
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              <EditableText
                value={description}
                onChange={(v) => onDataChange && onDataChange({ ...data, description: v })}
                isEditingEnabled={isEditingEnabled}
                multiline
              />
            </p>

            <div className="pt-2">
              <EditableCTA
                buttonText={buttonText}
                buttonUrl={buttonUrl}
                isEditingEnabled={isEditingEnabled}
                eventData={{
                  landingPageId,
                  slug,
                  ctaId: `banner-${sectionId}`,
                  ctaType: 'offer',
                }}
                onCTAChange={(t, u) =>
                  onDataChange && onDataChange({ ...data, buttonText: t, buttonUrl: u })
                }
                className="px-6 py-3 rounded-xl bg-[#D89A20] text-[#071A2A] font-black text-sm shadow-md"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
