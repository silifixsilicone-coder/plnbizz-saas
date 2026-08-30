'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LandingPage,
  LandingProduct,
  PageSection,
  SectionType,
} from '@/types/landing-page';
import { updateLandingPage } from '@/lib/firestore';
import { isValidExternalUrl } from '@/lib/url';
import { createNewSection, createDefaultSections } from '@/lib/sections';

import { EditorToolbar } from './EditorToolbar';
import { SectionPickerModal } from './SectionPickerModal';
import { LandingPageRenderer } from '@/components/sections/LandingPageRenderer';

import {
  Plus,
  Monitor,
  Tablet,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Layers,
} from 'lucide-react';

interface DirectLandingPageEditorProps {
  initialData: LandingPage;
}

export const DirectLandingPageEditor: React.FC<DirectLandingPageEditorProps> = ({
  initialData,
}) => {
  const router = useRouter();

  // Local Page & Section Builder State
  const [page, setPage] = useState<LandingPage>(initialData);
  const [sections, setSections] = useState<PageSection[]>(
    initialData.sections && initialData.sections.length > 0
      ? initialData.sections
      : createDefaultSections(initialData.hero, initialData.products)
  );

  const [isDirty, setIsDirty] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSectionPicker, setShowSectionPicker] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const updatePage = (updater: (prev: LandingPage) => LandingPage) => {
    setPage((prev) => {
      const updated = updater(prev);
      setIsDirty(true);
      return updated;
    });
  };

  const updateSections = (newSections: PageSection[]) => {
    setSections(newSections);
    setPage((prev) => ({ ...prev, sections: newSections }));
    setIsDirty(true);
  };

  // Section Builder Actions
  const handleAddSection = (type: SectionType) => {
    const newSec = createNewSection(type, sections.length);
    const updated = [...sections, newSec];
    updateSections(updated);
    showToast(`Added ${type.replace('_', ' ')} section to landing page.`);
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;

    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;

    // Recalculate orders
    updated.forEach((s, i) => (s.order = i));
    updateSections(updated);
  };

  const handleDuplicateSection = (index: number) => {
    const target = sections[index];
    const copy: PageSection = {
      ...target,
      id: `sec_${target.type}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      order: index + 1,
    };

    const updated = [...sections];
    updated.splice(index + 1, 0, copy);
    updated.forEach((s, i) => (s.order = i));
    updateSections(updated);
    showToast(`Duplicated ${target.type.replace('_', ' ')} section.`);
  };

  const handleToggleVisibility = (index: number) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], visible: !updated[index].visible };
    updateSections(updated);
  };

  const handleDeleteSection = (index: number) => {
    const updated = sections.filter((_, i) => i !== index);
    updated.forEach((s, i) => (s.order = i));
    updateSections(updated);
    showToast('Section removed.');
  };

  const handleSectionUpdate = (sectionId: string, newData: any) => {
    const updated = sections.map((s) => (s.id === sectionId ? { ...s, data: newData } : s));
    updateSections(updated);
  };

  // Pre-Publish Validation (Requirement 42)
  const validateBeforePublish = (): boolean => {
    setError(null);

    // Validate active visible sections
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      if (!sec.visible) continue;

      if (sec.type === 'hero') {
        const hData = sec.data || page.hero;
        if (!hData.buttonUrl || !hData.buttonUrl.startsWith('http')) {
          setError('Hero Checkout URL is missing or invalid. Please enter a valid http:// or https:// URL.');
          return false;
        }
      }
    }

    return true;
  };

  // Save / Publish Handlers
  const handleSaveDraft = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await updateLandingPage(page.id, {
        ...page,
        sections,
        status: 'draft',
      });
      setIsDirty(false);
      showToast('Draft changes saved to Firestore.');
    } catch (err: any) {
      console.error('Save Draft Error:', err);
      setError('Failed to save draft. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!validateBeforePublish()) {
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      await updateLandingPage(page.id, {
        ...page,
        sections,
        status: 'published',
      });
      setIsDirty(false);
      showToast('Landing page published successfully!');
    } catch (err: any) {
      console.error('Publish Error:', err);
      setError('Failed to publish landing page. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Viewport Container Width Helper
  const getViewportContainerClass = () => {
    if (viewportMode === 'mobile') return 'max-w-[375px] mx-auto border-x-2 border-[#E8C77A] shadow-2xl my-4 rounded-3xl overflow-hidden';
    if (viewportMode === 'tablet') return 'max-w-[768px] mx-auto border-x-2 border-[#E8C77A] shadow-2xl my-4 rounded-3xl overflow-hidden';
    return 'w-full';
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8] text-[#071A2A] flex flex-col font-sans lang-hi selection:bg-[#D89A20]/30">
      
      {/* Editor Top Toolbar */}
      <EditorToolbar
        pageName={page.name}
        slug={page.slug}
        isDirty={isDirty}
        isPreview={isPreview}
        isSaving={isSaving}
        seo={page.seo}
        landingId={page.id}
        defaultDescription={page.hero?.description}
        defaultHeroImage={page.hero?.heroImage}
        onSEOChange={(newSEO) => {
          updatePage((prev) => ({ ...prev, seo: newSEO }));
        }}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        onTogglePreview={() => setIsPreview(!isPreview)}
        onExit={() => router.push('/admin/landing-pages')}
      />

      {/* Viewport Switcher & Add Section Top Bar (Requirement 34) */}
      {!isPreview && (
        <div className="sticky top-[57px] z-40 bg-[#0A2236] text-white px-4 py-2 border-b border-[#D89A20]/40 flex flex-wrap items-center justify-between gap-3 font-admin lang-en shadow-md">
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold hidden sm:inline">Preview Width:</span>
            <div className="flex items-center bg-[#071A2A] border border-slate-700 rounded-xl p-0.5">
              <button
                type="button"
                onClick={() => setViewportMode('desktop')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                  viewportMode === 'desktop' ? 'bg-[#D89A20] text-[#071A2A]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Desktop</span>
              </button>

              <button
                type="button"
                onClick={() => setViewportMode('tablet')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                  viewportMode === 'tablet' ? 'bg-[#D89A20] text-[#071A2A]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Tablet</span>
              </button>

              <button
                type="button"
                onClick={() => setViewportMode('mobile')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                  viewportMode === 'mobile' ? 'bg-[#D89A20] text-[#071A2A]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Mobile</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowSectionPicker(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#D89A20] hover:bg-[#E7B33E] text-[#071A2A] text-xs font-black shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Section</span>
          </button>

        </div>
      )}

      {/* Notification Toast */}
      {toast && (
        <div className="fixed top-24 right-4 z-50 bg-[#071A2A] text-[#D89A20] border-2 border-[#D89A20] px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold font-admin flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#D89A20]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="fixed top-24 right-4 z-50 bg-red-50 text-red-800 border-2 border-red-200 px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold font-admin flex items-center gap-2 max-w-md">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Section Builder Canvas */}
      <main className={`flex-1 transition-all duration-300 ${getViewportContainerClass()}`}>
        <LandingPageRenderer
          sections={sections}
          landingPage={page}
          isEditingEnabled={!isPreview}
          isPreview={isPreview}
          onSectionUpdate={handleSectionUpdate}
          onMoveSection={handleMoveSection}
          onDuplicateSection={handleDuplicateSection}
          onToggleVisibility={handleToggleVisibility}
          onDeleteSection={handleDeleteSection}
        />

        {/* Bottom Add Section CTA */}
        {!isPreview && (
          <div className="py-12 bg-[#FFF8E8] border-t border-[#E8C77A] text-center font-admin">
            <button
              type="button"
              onClick={() => setShowSectionPicker(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#071A2A] text-[#D89A20] border-2 border-[#D89A20] hover:bg-[#0A2236] text-sm font-black shadow-xl transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Section to Landing Page</span>
            </button>
          </div>
        )}
      </main>

      {/* Section Picker Modal */}
      <SectionPickerModal
        isOpen={showSectionPicker}
        onClose={() => setShowSectionPicker(false)}
        onSelectSection={handleAddSection}
      />

    </div>
  );
};
