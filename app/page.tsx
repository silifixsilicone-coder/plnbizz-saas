import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { TrustStrip } from '@/components/landing/TrustStrip';
import { ProductSection } from '@/components/landing/ProductSection';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { PreviewSection } from '@/components/landing/PreviewSection';
import { OfferSection } from '@/components/landing/OfferSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';
import { DEMO_LANDING_PAGE, DEMO_PROBLEMS } from '@/lib/mock-data';

export default function PublicHomePage() {
  const data = DEMO_LANDING_PAGE;

  return (
    <main className="min-h-screen flex flex-col bg-[#FFF8E8] lang-hi">
      <Navbar
        price={data.price}
        ctaText={data.ctaText}
        externalPaymentUrl={data.externalPaymentUrl}
      />
      <Hero data={data} />
      <TrustStrip />
      <ProductSection items={data.products} />
      <ProblemSection problems={DEMO_PROBLEMS} />
      <BenefitsSection benefits={data.benefits} />
      <PreviewSection images={data.previewImages} />
      <OfferSection
        price={data.price}
        oldPrice={data.oldPrice}
        offerText={data.offerText}
        ctaText={data.ctaText}
        externalPaymentUrl={data.externalPaymentUrl}
      />
      <TestimonialsSection testimonials={data.testimonials} />
      <FAQSection faq={data.faq} />
      <FinalCTA
        price={data.price}
        ctaText={data.ctaText}
        externalPaymentUrl={data.externalPaymentUrl}
      />
      <Footer />
    </main>
  );
}
