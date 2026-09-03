import React from 'react';
import Link from 'next/link';
import { AuthGuard } from '@/components/admin/AuthGuard';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { MobileStickyBuyBar } from '@/components/landing/MobileStickyBuyBar';
import { LandingPageRenderer } from '@/components/sections/LandingPageRenderer';
import { getLandingPageById } from '@/lib/firestore';
import { DEMO_LANDING_PAGE } from '@/lib/mock-data';
import { createDefaultSections } from '@/lib/sections';
import { Eye, ArrowLeft } from 'lucide-react';

export default async function AdminLandingPagePreview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = (await getLandingPageById(id)) || DEMO_LANDING_PAGE;

  const pageSections =
    data.sections && data.sections.length > 0
      ? data.sections
      : createDefaultSections(data.hero, data.products);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FFF8E8] flex flex-col font-sans lang-hi selection:bg-[#D89A20]/30 pb-20 md:pb-0 relative">
        
        {/* Protected Top Preview Banner */}
        <div className="sticky top-0 z-50 bg-[#071A2A] text-[#D89A20] border-b-2 border-[#D89A20] px-4 py-2 flex items-center justify-between text-xs font-bold font-admin lang-en shadow-xl">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#D89A20]" />
            <span className="font-extrabold tracking-wider">PREVIEW MODE</span>
            <span className="text-slate-400 font-medium hidden sm:inline">
              — Showing current draft ({data.name})
            </span>
          </div>

          <Link
            href={`/admin/landing-pages/${id}/edit`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#D89A20] text-[#071A2A] text-xs font-extrabold hover:bg-[#E7B33E] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Editor</span>
          </Link>
        </div>

        <Navbar
          price={data.price}
          ctaText={data.ctaText}
          externalPaymentUrl={data.externalPaymentUrl}
          landingPageId={data.id}
          slug={data.slug}
        />

        <LandingPageRenderer
          sections={pageSections}
          landingPage={data}
          isEditingEnabled={false}
          isPreview={true}
        />

        <Footer />

        {/* Mobile Sticky Buy Bar */}
        <MobileStickyBuyBar
          price={data.price || 20}
          oldPrice={data.oldPrice || 999}
          ctaText={data.ctaText || 'BUY NOW'}
          externalPaymentUrl={data.externalPaymentUrl || 'https://superprofile.bio/vp/🔥-50-000--premium-digital-resources-—-सिर्फ-₹20-में-'}
          landingPageId={data.id}
          slug={data.slug}
        />
      </div>
    </AuthGuard>
  );
}
