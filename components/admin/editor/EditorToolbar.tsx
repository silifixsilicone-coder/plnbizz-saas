'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SEOMetadata } from '@/types/landing-page';
import { SEOSettingsForm } from '@/components/admin/SEOSettingsForm';
import {
  Save,
  Eye,
  EyeOff,
  Send,
  LogOut,
  Sparkles,
  Loader2,
  AlertTriangle,
  FileCheck,
  Globe,
  Link2,
  ExternalLink,
  X,
} from 'lucide-react';

interface EditorToolbarProps {
  pageName: string;
  slug: string;
  isDirty: boolean;
  isPreview: boolean;
  isSaving: boolean;
  seo?: SEOMetadata;
  landingId?: string;
  defaultDescription?: string;
  defaultHeroImage?: string;
  onSEOChange?: (newSEO: SEOMetadata) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  onTogglePreview: () => void;
  onExit: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  pageName,
  slug,
  isDirty,
  isPreview,
  isSaving,
  seo,
  landingId,
  defaultDescription,
  defaultHeroImage,
  onSEOChange,
  onSaveDraft,
  onPublish,
  onTogglePreview,
  onExit,
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const [showExitModal, setShowExitModal] = useState(false);
  const [showSEOModal, setShowSEOModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleExitClick = () => {
    if (isDirty) {
      setShowExitModal(true);
    } else {
      onExit();
    }
  };

  const handleCopyLink = () => {
    const fullUrl = `${siteUrl}/lp/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    showToast('Link copied successfully.');
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-16 right-4 z-50 bg-[#071A2A] text-[#D89A20] border-2 border-[#D89A20] px-4 py-2 rounded-xl text-xs font-bold font-admin shadow-2xl">
          {toast}
        </div>
      )}

      {/* Floating Top Toolbar */}
      <header className="sticky top-0 z-50 bg-[#071A2A] text-white border-b-2 border-[#D89A20] px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xl font-admin lang-en">
        
        {/* Left: Brand & Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/admin/landing-pages" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#D89A20] text-[#071A2A] font-black text-base flex items-center justify-center">
              P
            </div>
            <span className="text-lg font-black tracking-tight text-white hidden sm:inline">
              PLN<span className="text-[#D89A20]">BIZZ</span>
            </span>
          </Link>

          <div className="h-5 w-px bg-slate-700 hidden sm:block flex-shrink-0" />

          <div className="flex items-center gap-2 truncate">
            <span className="text-xs text-slate-400 font-bold hidden md:inline">Editing:</span>
            <span className="text-xs sm:text-sm font-extrabold text-white truncate max-w-[100px] sm:max-w-xs">
              {pageName}
            </span>

            {isDirty ? (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-black uppercase tracking-wide flex-shrink-0">
                Unsaved
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wide flex-shrink-0 hidden sm:inline flex items-center gap-1">
                <FileCheck className="w-3 h-3" /> Saved
              </span>
            )}
          </div>
        </div>

        {/* Right: Editor Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          
          {/* SEO Settings Button */}
          {onSEOChange && (
            <button
              type="button"
              onClick={() => setShowSEOModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D2436] hover:bg-[#123047] text-[#D89A20] border border-[#D89A20]/40 text-xs font-bold transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden md:inline">SEO Settings</span>
            </button>
          )}

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            title="Copy Link"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#0D2436] hover:bg-[#123047] text-slate-200 border border-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
          >
            <Link2 className="w-3.5 h-3.5 text-[#D89A20]" />
            <span className="hidden lg:inline">Copy Link</span>
          </button>

          {/* Preview Toggle */}
          <button
            type="button"
            onClick={onTogglePreview}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              isPreview
                ? 'bg-[#D89A20] text-[#071A2A] font-extrabold shadow-md'
                : 'bg-[#0D2436] hover:bg-[#123047] text-slate-200 border border-slate-700'
            }`}
          >
            {isPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPreview ? 'Edit Mode' : 'Preview'}</span>
          </button>

          {/* Save Draft */}
          <button
            type="button"
            disabled={isSaving}
            onClick={onSaveDraft}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D2436] hover:bg-[#123047] text-slate-200 border border-[#D89A20]/40 text-xs font-bold transition-colors disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5 text-[#D89A20]" />}
            <span className="hidden sm:inline">Save Draft</span>
          </button>

          {/* Publish */}
          <button
            type="button"
            disabled={isSaving}
            onClick={onPublish}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#D89A20] hover:bg-[#E7B33E] text-[#071A2A] text-xs font-black shadow-lg transition-colors disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>Publish</span>
          </button>

          {/* Exit Editor */}
          <button
            type="button"
            onClick={handleExitClick}
            title="Exit Editor"
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-red-950 hover:text-red-400 text-slate-400 text-xs font-bold transition-colors flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Exit</span>
          </button>
        </div>

      </header>

      {/* SEO Settings Drawer / Modal */}
      {showSEOModal && onSEOChange && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-[#071A2A]">SEO & Metadata Configuration</h4>
              <button
                type="button"
                onClick={() => setShowSEOModal(false)}
                className="p-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <SEOSettingsForm
              value={seo}
              pageName={pageName}
              slug={slug}
              defaultDescription={defaultDescription}
              defaultHeroImage={defaultHeroImage}
              landingId={landingId}
              onChange={(newSEO) => {
                onSEOChange(newSEO);
              }}
            />

            <div className="flex justify-end pt-2">
              <Button
                type="button"
                variant="gold"
                size="sm"
                onClick={() => setShowSEOModal(false)}
                className="bg-[#D89A20] font-bold"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Unsaved Changes Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#071A2A]">Unsaved changes</h4>
            </div>

            <p className="text-xs text-[#6B6255] leading-relaxed">
              You have unsaved changes. Are you sure you want to leave the editor without saving?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="px-4 py-2 text-xs font-bold text-[#071A2A] bg-[#FFF8E8] border border-[#E8C77A] rounded-xl hover:bg-[#E8C77A]/30"
              >
                Stay
              </button>
              <button
                type="button"
                onClick={onExit}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-md"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
