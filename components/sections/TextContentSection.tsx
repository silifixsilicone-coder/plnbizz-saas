'use client';

import React from 'react';
import { EditableText } from '@/components/admin/editor/EditableText';

interface TextContentSectionProps {
  data: {
    heading?: string;
    content?: string;
  };
  isEditingEnabled?: boolean;
  onDataChange?: (newData: any) => void;
}

export const TextContentSection: React.FC<TextContentSectionProps> = ({
  data,
  isEditingEnabled = false,
  onDataChange,
}) => {
  const heading = data?.heading || 'डिजिटल क्रिएटर क्रांति का हिस्सा बनें';
  const content = data?.content || 'आज के डिजिटल युग में सही टूल्स का होना बेहद जरूरी है। PLNBIZZ आपको वे सभी रिसोर्सेज प्रदान करता है जिनकी मदद से आप तेजी से आगे बढ़ सकते हैं।';

  return (
    <section className="py-12 md:py-16 bg-[#FFF8E8] border-t border-[#E8C77A] font-admin">
      <div className="max-w-4xl mx-auto px-4 space-y-4 text-[#071A2A]">
        <h2 className="text-2xl sm:text-3xl font-black text-[#071A2A] border-b-2 border-[#D89A20] pb-3 inline-block">
          <EditableText
            value={heading}
            onChange={(v) => onDataChange && onDataChange({ ...data, heading: v })}
            isEditingEnabled={isEditingEnabled}
          />
        </h2>

        <div className="text-base sm:text-lg text-[#6B6255] font-medium leading-relaxed">
          <EditableText
            value={content}
            onChange={(v) => onDataChange && onDataChange({ ...data, content: v })}
            isEditingEnabled={isEditingEnabled}
            multiline
          />
        </div>
      </div>
    </section>
  );
};
