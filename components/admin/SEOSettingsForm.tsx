'use client';

import React, { useState } from 'react';
import { SEOMetadata } from '@/types/landing-page';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { Globe, Search, Sparkles, AlertCircle } from 'lucide-react';

interface SEOSettingsFormProps {
  value?: SEOMetadata;
  pageName: string;
  slug: string;
  defaultDescription?: string;
  defaultHeroImage?: string;
  landingId?: string;
  onChange: (newSEO: SEOMetadata) => void;
}

export const SEOSettingsForm: React.FC<SEOSettingsFormProps> = ({
  value = {},
  pageName,
  slug,
  defaultDescription = '',
  defaultHeroImage = '',
  landingId = 'general',
  onChange,
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://plnbizz.com';

  const [seo, setSeo] = useState<SEOMetadata>({
    title: value.title || `${pageName} | PLNBIZZ`,
    description: value.description || defaultDescription,
    keywords: value.keywords || ['PLNBIZZ', 'Digital Bundle'],
    ogTitle: value.ogTitle || `${pageName} | PLNBIZZ`,
    ogDescription: value.ogDescription || defaultDescription,
    ogImage: value.ogImage || defaultHeroImage,
    ogImageStoragePath: value.ogImageStoragePath || '',
    twitterTitle: value.twitterTitle || value.title || `${pageName} | PLNBIZZ`,
    twitterDescription: value.twitterDescription || value.description || defaultDescription,
    twitterImage: value.twitterImage || value.ogImage || defaultHeroImage,
    canonicalUrl: value.canonicalUrl || `${siteUrl}/lp/${slug}`,
  });

  const updateField = (field: keyof SEOMetadata, val: any) => {
    const updated = { ...seo, [field]: val };
    setSeo(updated);
    onChange(updated);
  };

  const titleLength = (seo.title || '').length;
  const descLength = (seo.description || '').length;

  return (
    <div className="bg-white rounded-2xl border border-[#E8C77A] p-6 space-y-6 shadow-xs font-admin lang-en text-[#071A2A]">
      
      <div className="flex items-center gap-2 border-b border-[#E8C77A]/60 pb-3">
        <Globe className="w-5 h-5 text-[#D89A20]" />
        <div>
          <h3 className="text-lg font-bold text-[#071A2A]">SEO & Social Metadata</h3>
          <p className="text-xs text-[#6B6255]">Configure Google Search preview, Open Graph, and Twitter Cards</p>
        </div>
      </div>

      {/* Google Search Live Visual Preview Card (Requirement 27) */}
      <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Search className="w-3.5 h-3.5 text-blue-600" />
          <span>Google Search Live Preview</span>
        </div>

        <div className="space-y-1 font-sans">
          <div className="text-xs text-[#202124] truncate font-normal">
            {siteUrl.replace(/^https?:\/\//, '')} › lp › {slug}
          </div>
          <div className="text-lg font-normal text-[#1a0dab] hover:underline cursor-pointer truncate">
            {seo.title || `${pageName} | PLNBIZZ`}
          </div>
          <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
            {seo.description || defaultDescription || 'PLNBIZZ Premium Digital Product Landing Page.'}
          </div>
        </div>
      </div>

      {/* Basic Meta Fields */}
      <div className="space-y-4">
        
        {/* Meta Title */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-[#6B6255]">
              SEO Title *
            </label>
            <span
              className={`text-[11px] font-bold ${
                titleLength >= 50 && titleLength <= 60 ? 'text-emerald-600' : 'text-slate-500'
              }`}
            >
              {titleLength} / 60 characters (recommended: 50-60)
            </span>
          </div>
          <input
            type="text"
            value={seo.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder={`${pageName} | PLNBIZZ`}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] text-sm font-semibold"
          />
        </div>

        {/* Meta Description */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-[#6B6255]">
              SEO Description *
            </label>
            <span
              className={`text-[11px] font-bold ${
                descLength >= 140 && descLength <= 160 ? 'text-emerald-600' : 'text-slate-500'
              }`}
            >
              {descLength} / 160 characters (recommended: 140-160)
            </span>
          </div>
          <textarea
            rows={3}
            value={seo.description || ''}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Description for Google search results..."
            className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] text-sm"
          />
        </div>

        {/* Canonical URL */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-[#6B6255]">
            Canonical URL
          </label>
          <input
            type="url"
            value={seo.canonicalUrl || ''}
            onChange={(e) => updateField('canonicalUrl', e.target.value)}
            placeholder={`${siteUrl}/lp/${slug}`}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] text-sm font-mono"
          />
        </div>

        {/* Open Graph Social Image Upload */}
        <ImageUploader
          label="Open Graph (OG) Social Share Image"
          value={seo.ogImage || defaultHeroImage}
          storagePath={seo.ogImageStoragePath}
          folderPath={`landing-pages/${landingId}/seo`}
          onUploadSuccess={(res) => {
            updateField('ogImage', res.url);
            updateField('ogImageStoragePath', res.storagePath);
          }}
          onRemove={() => {
            updateField('ogImage', '');
            updateField('ogImageStoragePath', '');
          }}
        />

      </div>

    </div>
  );
};
