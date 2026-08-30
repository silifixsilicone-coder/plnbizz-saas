import { MetadataRoute } from 'next';
import { getLandingPages } from '@/lib/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://plnbizz.com';

  const pages = await getLandingPages();
  const publishedPages = pages.filter((p) => p.status === 'published' || p.status === 'PUBLISHED');

  const landingPageUrls = publishedPages.map((page) => ({
    url: `${siteUrl}/lp/${page.slug}`,
    lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...landingPageUrls,
  ];
}
