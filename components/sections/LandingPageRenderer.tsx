'use client';

import React, { useState } from 'react';
import { PageSection, SectionType, LandingPage } from '@/types/landing-page';

// Existing Landing Components
import { Hero } from '@/components/landing/Hero';
import { ProductSection } from '@/components/landing/ProductSection';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { OfferSection } from '@/components/landing/OfferSection';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';
import { DEMO_PROBLEMS } from '@/lib/mock-data';

// New Dynamic Section Components
import { CountdownSection } from './CountdownSection';
import { ImageBannerSection } from './ImageBannerSection';
import { VideoSection } from './VideoSection';
import { TextContentSection } from './TextContentSection';

import {
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Edit3,
  Layers,
  AlertTriangle,
} from 'lucide-react';

interface LandingPageRendererProps {
  sections: PageSection[];
  landingPage: LandingPage;
  isEditingEnabled?: boolean;
  isPreview?: boolean;
  onSectionUpdate?: (sectionId: string, newSectionData: any) => void;
  onMoveSection?: (index: number, direction: 'up' | 'down') => void;
  onDuplicateSection?: (index: number) => void;
  onToggleVisibility?: (index: number) => void;
  onDeleteSection?: (index: number) => void;
}

export const LandingPageRenderer: React.FC<LandingPageRendererProps> = ({
  sections,
  landingPage,
  isEditingEnabled = false,
  isPreview = false,
  onSectionUpdate,
  onMoveSection,
  onDuplicateSection,
  onToggleVisibility,
  onDeleteSection,
}) => {
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);

  // Render individual section based on type
  const renderSectionComponent = (sec: PageSection, idx: number) => {
    const data = sec.data || {};
    const canEdit = isEditingEnabled && !isPreview;

    switch (sec.type) {
      case 'hero':
        return (
          <Hero
            data={{ ...landingPage, hero: { ...landingPage.hero, ...data } }}
            isEditingEnabled={canEdit}
            landingPageId={landingPage.id}
            slug={landingPage.slug}
            onDataChange={(newData) => onSectionUpdate && onSectionUpdate(sec.id, newData)}
          />
        );

      case 'benefits':
        return (
          <BenefitsSection
            benefits={data.items || landingPage.benefits || []}
            isEditingEnabled={canEdit}
            onBenefitChange={(itemIdx, updatedItem) => {
              const list = [...(data.items || landingPage.benefits || [])];
              list[itemIdx] = updatedItem;
              if (onSectionUpdate) onSectionUpdate(sec.id, { ...data, items: list });
            }}
          />
        );

      case 'products':
        return (
          <ProductSection
            items={data.items || landingPage.products || []}
            landingPageId={landingPage.id}
            slug={landingPage.slug}
            isEditingEnabled={canEdit}
            onItemChange={(itemIdx, updatedItem) => {
              const list = [...(data.items || landingPage.products || [])];
              list[itemIdx] = updatedItem;
              if (onSectionUpdate) onSectionUpdate(sec.id, { ...data, items: list });
            }}
          />
        );

      case 'testimonials':
        return (
          <TestimonialsSection
            testimonials={data.items || landingPage.testimonials || []}
            landingPageId={landingPage.id}
            isEditingEnabled={canEdit}
            onTestimonialChange={(itemIdx, updatedItem) => {
              const list = [...(data.items || landingPage.testimonials || [])];
              list[itemIdx] = updatedItem;
              if (onSectionUpdate) onSectionUpdate(sec.id, { ...data, items: list });
            }}
          />
        );

      case 'faq':
        return (
          <FAQSection
            faq={data.items || landingPage.faq || []}
            isEditingEnabled={canEdit}
            onFAQChange={(itemIdx, updatedItem) => {
              const list = [...(data.items || landingPage.faq || [])];
              list[itemIdx] = updatedItem;
              if (onSectionUpdate) onSectionUpdate(sec.id, { ...data, items: list });
            }}
          />
        );

      case 'offer':
        return (
          <OfferSection
            price={data.price || landingPage.price || 109}
            oldPrice={data.oldPrice || landingPage.oldPrice || 999}
            offerText={data.badge || landingPage.offerText}
            ctaText={data.buttonText || landingPage.ctaText}
            externalPaymentUrl={data.buttonUrl || landingPage.externalPaymentUrl}
          />
        );

      case 'countdown':
        return (
          <CountdownSection
            data={data}
            isEditingEnabled={canEdit}
            onDataChange={(newData) => onSectionUpdate && onSectionUpdate(sec.id, newData)}
          />
        );

      case 'image_banner':
        return (
          <ImageBannerSection
            data={data}
            landingPageId={landingPage.id}
            slug={landingPage.slug}
            sectionId={sec.id}
            isEditingEnabled={canEdit}
            onDataChange={(newData) => onSectionUpdate && onSectionUpdate(sec.id, newData)}
          />
        );

      case 'video':
        return (
          <VideoSection
            data={data}
            isEditingEnabled={canEdit}
            onDataChange={(newData) => onSectionUpdate && onSectionUpdate(sec.id, newData)}
          />
        );

      case 'text_content':
        return (
          <TextContentSection
            data={data}
            isEditingEnabled={canEdit}
            onDataChange={(newData) => onSectionUpdate && onSectionUpdate(sec.id, newData)}
          />
        );

      case 'final_cta':
        return (
          <FinalCTA
            price={landingPage.price || 109}
            ctaText={data.buttonText || landingPage.ctaText}
            externalPaymentUrl={data.buttonUrl || landingPage.externalPaymentUrl}
          />
        );

      case 'footer':
        return <Footer />;

      default:
        return (
          <div className="p-8 text-center text-xs text-slate-500 bg-white border border-[#E8C77A]">
            Section: {sec.type}
          </div>
        );
    }
  };

  return (
    <div className="w-full flex flex-col font-sans lang-hi">
      {sections.map((sec, idx) => {
        // Skip rendering hidden sections for public visitors
        if (!sec.visible && (!isEditingEnabled || isPreview)) {
          return null;
        }

        return (
          <div
            key={sec.id}
            className={`relative group ${
              !sec.visible ? 'opacity-50 grayscale-20 bg-slate-100' : ''
            }`}
          >
            {/* Admin Overlay Controls (Visible ONLY in Edit Mode) */}
            {isEditingEnabled && !isPreview && (
              <div className="absolute top-2 left-4 right-4 z-40 hidden group-hover:flex items-center justify-between bg-[#071A2A] text-white p-2 rounded-2xl border-2 border-[#D89A20] shadow-2xl font-admin text-xs">
                
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#D89A20]" />
                  <span className="font-extrabold capitalize text-[#D89A20]">
                    {sec.type.replace('_', ' ')} Section
                  </span>
                  {!sec.visible && (
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] px-2 py-0.5 rounded font-black uppercase">
                      Hidden
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  
                  {/* Reorder Up */}
                  <button
                    type="button"
                    onClick={() => onMoveSection && onMoveSection(idx, 'up')}
                    disabled={idx === 0}
                    title="Move Up"
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30"
                  >
                    <ArrowUp className="w-4 h-4 text-emerald-400" />
                  </button>

                  {/* Reorder Down */}
                  <button
                    type="button"
                    onClick={() => onMoveSection && onMoveSection(idx, 'down')}
                    disabled={idx === sections.length - 1}
                    title="Move Down"
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30"
                  >
                    <ArrowDown className="w-4 h-4 text-emerald-400" />
                  </button>

                  {/* Duplicate */}
                  <button
                    type="button"
                    onClick={() => onDuplicateSection && onDuplicateSection(idx)}
                    title="Duplicate Section"
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    <Copy className="w-4 h-4 text-amber-400" />
                  </button>

                  {/* Hide / Show */}
                  <button
                    type="button"
                    onClick={() => onToggleVisibility && onToggleVisibility(idx)}
                    title={sec.visible ? 'Hide Section' : 'Show Section'}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    {sec.visible ? (
                      <Eye className="w-4 h-4 text-blue-400" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  {/* Delete Section */}
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmIdx(idx)}
                    title="Delete Section"
                    className="p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-950"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>

              </div>
            )}

            {/* Render Section Component */}
            {renderSectionComponent(sec, idx)}
          </div>
        );
      })}

      {/* Delete Section Confirmation Modal */}
      {deleteConfirmIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-6 space-y-4 shadow-2xl font-admin text-[#071A2A]">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="text-base font-bold text-[#071A2A]">Delete Section?</h4>
            </div>

            <p className="text-xs text-[#6B6255]">
              Are you sure you want to delete this section from your landing page?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmIdx(null)}
                className="px-4 py-2 text-xs font-bold text-[#6B6255] hover:bg-[#FFF8E8] rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onDeleteSection) onDeleteSection(deleteConfirmIdx);
                  setDeleteConfirmIdx(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md"
              >
                Delete Section
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
