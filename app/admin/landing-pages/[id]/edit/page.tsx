import React from 'react';
import { DirectLandingPageEditor } from '@/components/admin/editor/DirectLandingPageEditor';
import { getLandingPageById } from '@/lib/firestore';
import { DEMO_LANDING_PAGE } from '@/lib/mock-data';
import { createDefaultSections } from '@/lib/sections';

export default async function AdminEditLandingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const fetched = await getLandingPageById(id);
  const initialData = fetched || {
    ...DEMO_LANDING_PAGE,
    id,
  };

  if (!initialData.sections || initialData.sections.length === 0) {
    initialData.sections = createDefaultSections(initialData.hero, initialData.products);
  }

  return <DirectLandingPageEditor initialData={initialData} />;
}
