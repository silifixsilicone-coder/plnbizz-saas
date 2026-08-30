'use client';

import React, { useState } from 'react';
import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';
import { Button } from '@/components/ui/Button';
import { Settings, Globe, Shield, CheckCircle, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const [siteName, setSiteName] = useState('PLNBIZZ');
  const [defaultTitle, setDefaultTitle] = useState('PLNBIZZ — Premium Digital Bundle Landing Page Builder');
  const [defaultDesc, setDefaultDesc] = useState('Create premium, high-converting digital product landing pages on one domain.');
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast('Settings saved successfully.');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AdminLayoutWrapper
      title="System Settings"
      description="Configure master brand name, site URL, and global SEO defaults"
    >
      <div className="max-w-3xl space-y-6 font-admin lang-en text-[#071A2A]">
        
        {/* Toast Notification */}
        {toast && (
          <div className="p-3 rounded-xl bg-[#071A2A] text-[#D89A20] text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#D89A20]" />
            <span>{toast}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-[#E8C77A] p-6 space-y-6 shadow-xs">
          
          <div className="flex items-center gap-3 border-b border-[#E8C77A]/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#071A2A] text-[#D89A20] border border-[#D89A20] flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#071A2A]">Global Website Settings</h3>
              <p className="text-xs text-[#6B6255]">Master settings applied across all landing pages</p>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Site Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#6B6255]">
                Brand / Site Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] font-bold text-sm"
              />
            </div>

            {/* Site URL */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#6B6255] flex items-center justify-between">
                <span>Site Domain URL (NEXT_PUBLIC_SITE_URL)</span>
                <span className="text-[11px] text-emerald-600 font-bold">Production Ready</span>
              </label>
              <input
                type="url"
                disabled
                value={siteUrl}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] bg-[#FFF8E8] font-mono text-xs font-bold text-[#071A2A]"
              />
            </div>

            {/* Default SEO Title */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#6B6255]">
                Global Default SEO Title
              </label>
              <input
                type="text"
                value={defaultTitle}
                onChange={(e) => setDefaultTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] text-sm font-medium"
              />
            </div>

            {/* Default SEO Description */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#6B6255]">
                Global Default SEO Description
              </label>
              <textarea
                rows={3}
                value={defaultDesc}
                onChange={(e) => setDefaultDesc(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] text-sm font-medium"
              />
            </div>

          </div>

          <div className="pt-4 border-t border-[#E8C77A]/60 flex justify-end">
            <Button
              type="submit"
              variant="gold"
              size="md"
              className="bg-[#D89A20] hover:bg-[#E7B33E] text-[#071A2A] font-extrabold px-6"
            >
              <Save className="w-4 h-4 mr-2" />
              <span>Save System Settings</span>
            </Button>
          </div>

        </form>

      </div>
    </AdminLayoutWrapper>
  );
}
