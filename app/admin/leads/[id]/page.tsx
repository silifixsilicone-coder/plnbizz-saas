import React from 'react';
import Link from 'next/link';
import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';
import { getLeadById } from '@/lib/leads';
import { Users, ArrowLeft, Mail, Phone, Calendar, Globe } from 'lucide-react';

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) {
    return (
      <AdminLayoutWrapper title="Lead Not Found" description="The requested lead document does not exist">
        <div className="p-12 text-center space-y-4 max-w-md mx-auto font-admin">
          <h3 className="text-xl font-bold text-[#071A2A]">Lead Not Found</h3>
          <p className="text-xs text-[#6B6255]">The lead ID "{id}" could not be found in Firestore.</p>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D89A20] text-[#071A2A] text-xs font-extrabold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Leads</span>
          </Link>
        </div>
      </AdminLayoutWrapper>
    );
  }

  return (
    <AdminLayoutWrapper
      title={`Lead Details: ${lead.name}`}
      description="View captured lead contact information and origin landing page"
    >
      <div className="max-w-3xl space-y-6 font-admin lang-en text-[#071A2A]">
        
        {/* Back Link */}
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B6255] hover:text-[#071A2A]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Leads List</span>
        </Link>

        {/* Lead Card */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] p-6 space-y-6 shadow-xs">
          
          <div className="flex items-center gap-4 border-b border-[#E8C77A]/60 pb-5">
            <div className="w-14 h-14 rounded-2xl bg-[#071A2A] text-[#D89A20] border-2 border-[#D89A20] flex items-center justify-center text-xl font-black shadow-md">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#071A2A]">{lead.name}</h3>
              <p className="text-xs text-[#6B6255]">
                Captured on {lead.createdAt.slice(0, 10)} via {lead.source}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#6B6255] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D89A20]" />
                <span>Email Address</span>
              </label>
              <input
                type="text"
                disabled
                value={lead.email}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] bg-[#FFF8E8] font-bold text-sm text-[#071A2A]"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#6B6255] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D89A20]" />
                <span>Phone Number</span>
              </label>
              <input
                type="text"
                disabled
                value={lead.phone || 'Not Provided'}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] bg-[#FFF8E8] font-mono text-sm text-[#071A2A]"
              />
            </div>

            {/* Landing Page Slug */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#6B6255] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#D89A20]" />
                <span>Origin Landing Page</span>
              </label>
              <input
                type="text"
                disabled
                value={`/lp/${lead.landingPageSlug}`}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] bg-[#FFF8E8] font-mono text-xs font-bold text-[#D89A20]"
              />
            </div>

            {/* Created At */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#6B6255] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D89A20]" />
                <span>Submission Date</span>
              </label>
              <input
                type="text"
                disabled
                value={lead.createdAt}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] bg-[#FFF8E8] text-xs font-bold text-slate-700"
              />
            </div>

          </div>

        </div>

      </div>
    </AdminLayoutWrapper>
  );
}
