'use client';

import React from 'react';
import { Video } from 'lucide-react';
import { EditableText } from '@/components/admin/editor/EditableText';

interface VideoSectionProps {
  data: {
    title?: string;
    description?: string;
    videoUrl?: string;
  };
  isEditingEnabled?: boolean;
  onDataChange?: (newData: any) => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  data,
  isEditingEnabled = false,
  onDataChange,
}) => {
  const title = data?.title || 'बंडल डेमो वीडियो देखें';
  const description = data?.description || 'देखें कि कैसे आप 5 मिनट में फाइल्स एडिट कर सकते हैं';
  const videoUrl = data?.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ';

  // Format YouTube watch URL to embed URL safely
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  return (
    <section className="py-12 md:py-16 bg-[#FFF9EC] border-t border-[#E8C77A] font-admin">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071A2A] text-[#D89A20] text-xs font-bold uppercase">
            <Video className="w-3.5 h-3.5 text-[#D89A20]" />
            <span>Video Overview</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#071A2A]">
            <EditableText
              value={title}
              onChange={(v) => onDataChange && onDataChange({ ...data, title: v })}
              isEditingEnabled={isEditingEnabled}
            />
          </h2>
          <p className="text-sm text-[#6B6255] font-medium">
            <EditableText
              value={description}
              onChange={(v) => onDataChange && onDataChange({ ...data, description: v })}
              isEditingEnabled={isEditingEnabled}
            />
          </p>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-[#071A2A] border-4 border-[#E8C77A] shadow-2xl">
          <iframe
            src={getEmbedUrl(videoUrl)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Edit Video URL in Edit Mode */}
        {isEditingEnabled && (
          <div className="p-3 bg-white border border-[#E8C77A] rounded-xl text-left space-y-1">
            <label className="text-xs font-bold text-[#6B6255] uppercase">Video Embed URL</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => onDataChange && onDataChange({ ...data, videoUrl: e.target.value })}
              placeholder="https://www.youtube.com/embed/..."
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 font-mono"
            />
          </div>
        )}

      </div>
    </section>
  );
};
