'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';
import { createLandingPage, checkSlugExists } from '@/lib/firestore';
import { cleanSlug, validateSlugFormat } from '@/lib/slug';
import { createDefaultSections } from '@/lib/sections';
import { Button } from '@/components/ui/Button';
import { Plus, ArrowLeft, Loader2, Sparkles, Globe, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CreateLandingPageScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugUserEdited, setIsSlugUserEdited] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isSlugUserEdited) {
      setSlug(cleanSlug(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setIsSlugUserEdited(true);
    setSlug(cleanSlug(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter a landing page name.');
      return;
    }

    const clean = cleanSlug(slug);
    const slugRes = validateSlugFormat(clean);
    if (!slugRes.valid && slugRes.error) {
      setError(slugRes.error);
      return;
    }

    setLoading(true);
    try {
      const isTaken = await checkSlugExists(clean);
      if (isTaken) {
        setError(`Slug "${clean}" is already in use by another landing page.`);
        setLoading(false);
        return;
      }

      // Generate Starter Sections
      const starterSections = createDefaultSections();

      const newId = await createLandingPage({
        name: name.trim(),
        slug: clean,
        status: 'draft',
        sections: starterSections,
      });

      // Redirect immediately to editor
      router.push(`/admin/landing-pages/${newId}/edit`);
    } catch (err: any) {
      console.error('Failed to create landing page:', err);
      setError(err.message || 'Failed to create landing page. Please try again.');
      setLoading(false);
    }
  };

  return (
    <AdminLayoutWrapper
      title="Create Landing Page"
      description="Create a new single-domain digital product landing page with starter sections"
    >
      <div className="max-w-xl mx-auto font-admin lang-en text-[#071A2A] space-y-6">
        
        <Link
          href="/admin/landing-pages"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B6255] hover:text-[#071A2A]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Pages</span>
        </Link>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E8C77A] p-6 sm:p-8 space-y-6 shadow-md">
          
          <div className="flex items-center gap-3 border-b border-[#E8C77A]/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#071A2A] text-[#D89A20] border border-[#D89A20] flex items-center justify-center font-black">
              +
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#071A2A]">New Landing Page</h3>
              <p className="text-xs text-[#6B6255]">Enter page details to launch the section builder</p>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Page Name */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase text-[#6B6255]">
                Landing Page Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. 5000+ Viral Reels Bundle"
                className="w-full px-4 py-3 text-sm rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] font-bold"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase text-[#6B6255]">
                  Page Slug / URL Prefix *
                </label>
                <span className="text-[10px] text-slate-400 font-mono">/lp/{slug || 'slug'}</span>
              </div>
              <div className="relative">
                <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="digital-bundle"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] font-mono text-xs"
                />
              </div>
            </div>

          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              fullWidth
              disabled={loading}
              className="bg-[#D89A20] hover:bg-[#E7B33E] text-[#071A2A] font-black py-3.5 text-base rounded-xl shadow-lg"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-[#071A2A]" />
                  <span>Launching Section Editor...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  <span>Create Landing Page</span>
                </span>
              )}
            </Button>
          </div>

        </form>

      </div>
    </AdminLayoutWrapper>
  );
}
