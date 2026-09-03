import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { MobileStickyBuyBar } from '@/components/landing/MobileStickyBuyBar';
import { LandingPageRenderer } from '@/components/sections/LandingPageRenderer';
import { getLandingPageBySlug } from '@/lib/firestore';
import { DEMO_LANDING_PAGE } from '@/lib/mock-data';
import { createDefaultSections } from '@/lib/sections';

export default async function PublicHomePage() {
  const firestoreData = await getLandingPageBySlug('ultimate-bundle');
  const data = firestoreData || DEMO_LANDING_PAGE;

  const pageSections =
    data.sections && data.sections.length > 0
      ? data.sections
      : createDefaultSections(data.hero, data.products);

  return (
    <main className="min-h-screen flex flex-col bg-[#FFF8E8] lang-hi pb-20 md:pb-0 relative">
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
        isPreview={false}
      />

      <Footer />

      {/* Mobile-Only Sticky Buy Bar */}
      <MobileStickyBuyBar
        price={data.price || 20}
        oldPrice={data.oldPrice || 999}
        ctaText={data.ctaText || 'BUY NOW'}
        externalPaymentUrl={data.externalPaymentUrl || 'https://superprofile.bio/vp/🔥-50-000--premium-digital-resources-—-सिर्फ-₹20-में-'}
        landingPageId={data.id}
        slug={data.slug}
      />
    </main>
  );
}
