import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { MobileStickyBuyBar } from '@/components/landing/MobileStickyBuyBar';
import { LandingPageRenderer } from '@/components/sections/LandingPageRenderer';
import { getLandingPageBySlug } from '@/lib/firestore';
import { DEMO_LANDING_PAGE } from '@/lib/mock-data';
import { createDefaultSections } from '@/lib/sections';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPageBySlug(slug);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://plnbizz.com';

  if (!page) {
    return {
      title: 'Page Not Found | PLNBIZZ',
      description: 'यह Landing Page उपलब्ध नहीं है।',
      robots: { index: false, follow: false },
    };
  }

  const title = page.seo?.title || `${page.name} | PLNBIZZ`;
  const description = page.seo?.description || page.hero?.description || page.description || 'PLNBIZZ Premium Digital Bundle';
  const ogImage = page.seo?.ogImage || page.hero?.heroImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
  const canonical = page.seo?.canonicalUrl || `${siteUrl}/lp/${page.slug}`;

  return {
    title,
    description,
    keywords: page.seo?.keywords || ['PLNBIZZ', 'Digital Bundle', 'Canva Templates', 'Reels'],
    alternates: {
      canonical,
    },
    openGraph: {
      title: page.seo?.ogTitle || title,
      description: page.seo?.ogDescription || description,
      url: canonical,
      siteName: 'PLNBIZZ',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seo?.twitterTitle || page.seo?.ogTitle || title,
      description: page.seo?.twitterDescription || page.seo?.ogDescription || description,
      images: [page.seo?.twitterImage || ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LandingPageBySlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Query Firestore for published landing page by slug
  const firestoreData = await getLandingPageBySlug(slug);

  let data = firestoreData;
  if (!data && (slug === 'ultimate-bundle' || slug === 'demo' || slug === 'digital-bundle')) {
    data = {
      ...DEMO_LANDING_PAGE,
      slug: slug,
    };
  }

  // 404 Not Found Page
  if (!data) {
    return (
      <main className="min-h-screen bg-[#FFF8E8] font-sans flex flex-col justify-between lang-hi text-[#071A2A]">
        <Navbar />
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-lg mx-auto my-20 font-admin">
          <div className="w-20 h-20 rounded-3xl bg-[#071A2A] text-[#D89A20] border-2 border-[#E8C77A] flex items-center justify-center font-black text-3xl shadow-xl">
            404
          </div>
          <div className="space-y-2">
            <h1 className="font-devanagari-serif text-3xl sm:text-4xl font-black text-[#071A2A]">
              Page Not Found
            </h1>
            <p className="text-sm sm:text-base text-[#6B6255] leading-relaxed font-medium">
              यह Landing Page उपलब्ध नहीं है। (This landing page is not published or does not exist.)
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#D89A20] text-[#071A2A] font-black text-base shadow-lg hover:bg-[#E7B33E] transition-transform transform active:scale-95"
          >
            Go Home (मुख्य पेज)
          </Link>
        </div>

        <Footer />
      </main>
    );
  }

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
