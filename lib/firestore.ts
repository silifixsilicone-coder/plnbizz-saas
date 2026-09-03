import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { LandingPage, SectionVisibility, PageSection } from '@/types/landing-page';
import { createDefaultSections } from './sections';
import { DEMO_LANDING_PAGE } from './mock-data';

const COLLECTION_NAME = 'landingPages';
const LOCAL_STORAGE_KEY = 'plnbizz_local_landing_pages';

export const DEFAULT_SECTION_VISIBILITY: SectionVisibility = {
  hero: true,
  products: true,
  problem: true,
  benefits: true,
  preview: true,
  offer: true,
  faq: true,
  testimonials: true,
  finalCta: true,
};

/**
 * Local Storage Fallback Cache for Dev / Test Mode
 */
const getLocalPages = (): LandingPage[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveLocalPage = (page: LandingPage) => {
  if (typeof window === 'undefined') return;
  try {
    const existing = getLocalPages().filter((p) => p.id !== page.id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([page, ...existing]));
  } catch (e) {
    console.warn('localStorage save notice:', e);
  }
};

/**
 * Format raw Firestore document data into LandingPage object safely
 */
export const formatLandingPageDoc = (id: string, data: any, usePublishedVersion: boolean = false): LandingPage => {
  const source = usePublishedVersion && data.publishedData ? data.publishedData : data;

  const status: 'draft' | 'published' =
    data.status === 'published' || data.status === 'PUBLISHED' ? 'published' : 'draft';

  const hero = source.hero || DEMO_LANDING_PAGE.hero;
  const rawProducts = source.products || source.productItems || DEMO_LANDING_PAGE.products;
  const products = rawProducts.map((p: any, idx: number) => ({
    id: p.id || `p-${idx}`,
    number: p.number || String(idx + 1).padStart(2, '0'),
    title: p.title || 'Digital Product',
    description: p.description || p.shortDescription || '',
    image: p.image || p.url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    imageStoragePath: p.imageStoragePath || '',
    price: p.price ?? p.individualPrice ?? 20,
    originalPrice: p.originalPrice ?? p.oldPrice ?? 999,
    buttonText: p.buttonText || source.ctaText || 'BUY NOW',
    buttonUrl: p.buttonUrl || source.externalPaymentUrl || 'https://checkout.example.com/pay/20',
    badge: p.badge || 'Popular',
    individualPrice: p.individualPrice ?? p.price ?? 499,
    pricingType: p.pricingType || 'COMBO_INCLUDED',
    separateCheckoutUrl: p.separateCheckoutUrl || '',
  }));

  // Format or generate PageSections array
  let sections: PageSection[] = source.sections;
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    sections = createDefaultSections(hero, products);
  }

  const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString();
  const updatedAt = data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt || new Date().toISOString();

  return {
    id,
    name: data.name || source.productName || 'PLNBIZZ Bundle',
    slug: data.slug || 'bundle',
    status,
    sections,
    hero,
    products,
    benefits: source.benefits || DEMO_LANDING_PAGE.benefits,
    previewImages: source.previewImages || DEMO_LANDING_PAGE.previewImages,
    faq: source.faq || DEMO_LANDING_PAGE.faq,
    testimonials: source.testimonials || DEMO_LANDING_PAGE.testimonials,
    sectionVisibility: source.sectionVisibility || DEFAULT_SECTION_VISIBILITY,
    seo: source.seo || {},
    publishedData: data.publishedData,
    createdAt,
    updatedAt,
    // Compatibility fields
    productName: data.name || source.productName || 'PLNBIZZ Bundle',
    productImage: hero.heroImage,
    headline: hero.title,
    mainHeading: hero.highlightedTitle,
    description: hero.description,
    price: products[0]?.price ?? source.price ?? 20,
    oldPrice: products[0]?.originalPrice ?? source.oldPrice ?? 999,
    offerText: hero.badge,
    ctaText: hero.buttonText,
    externalPaymentUrl: hero.buttonUrl,
  };
};

/**
 * Fetch all landing pages safely (Cloud + Local Fallback)
 */
export const getLandingPages = async (): Promise<LandingPage[]> => {
  const localList = getLocalPages();
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const cloudPages = snapshot.docs.map((doc) => formatLandingPageDoc(doc.id, doc.data()));

    const map = new Map<string, LandingPage>();
    cloudPages.forEach((p) => map.set(p.id, p));
    localList.forEach((p) => {
      if (!map.has(p.id)) map.set(p.id, p);
    });

    if (map.size === 0) {
      return [DEMO_LANDING_PAGE];
    }

    return Array.from(map.values());
  } catch (error: any) {
    console.warn('Notice fetching cloud landing pages (Using local cache):', error);
    return localList.length > 0 ? localList : [DEMO_LANDING_PAGE];
  }
};

/**
 * Fetch single published landing page by Slug for public route /lp/[slug]
 */
export const getLandingPageBySlug = async (slug: string): Promise<LandingPage | null> => {
  const cleanSlug = slug.toLowerCase().trim();
  const localList = getLocalPages();
  const localMatch = localList.find((p) => p.slug.toLowerCase() === cleanSlug);

  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, where('slug', '==', cleanSlug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const data = docSnap.data();
      if (data.status === 'published' || data.status === 'PUBLISHED') {
        return formatLandingPageDoc(docSnap.id, data, true);
      }
    }
  } catch (error) {
    console.warn('Notice fetching landing page by slug:', error);
  }

  if (localMatch) {
    return localMatch;
  }

  if (cleanSlug === 'ultimate-bundle' || cleanSlug === 'demo' || cleanSlug === 'digital-bundle') {
    return formatLandingPageDoc(DEMO_LANDING_PAGE.id, DEMO_LANDING_PAGE, true);
  }

  return null;
};

/**
 * Fetch single landing page by Document ID for Admin Edit
 */
export const getLandingPageById = async (id: string): Promise<LandingPage | null> => {
  const localList = getLocalPages();
  const localMatch = localList.find((p) => p.id === id);

  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return formatLandingPageDoc(docSnap.id, docSnap.data(), false);
    }
  } catch (error) {
    console.warn('Notice fetching landing page by ID:', error);
  }

  if (localMatch) {
    return localMatch;
  }

  if (id === 'lp-default-001') {
    return formatLandingPageDoc(DEMO_LANDING_PAGE.id, DEMO_LANDING_PAGE, false);
  }

  return null;
};

/**
 * Validate unique slug in Firestore safely
 */
export const checkSlugExists = async (slug: string, currentId?: string): Promise<boolean> => {
  try {
    const cleanSlug = slug.toLowerCase().trim();
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, where('slug', '==', cleanSlug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return false;
    }

    if (currentId) {
      const existingDoc = snapshot.docs.find((d) => d.id === currentId);
      if (existingDoc && snapshot.docs.length === 1) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.warn('Notice checking slug existence:', error);
    return false;
  }
};

/**
 * Create a new Landing Page (Seamless local fallback on permission error)
 */
export const createLandingPage = async (pageData: Partial<LandingPage>): Promise<string> => {
  const newId = pageData.id || `lp-page-${Date.now()}`;
  const isPublished = pageData.status === 'published';

  const defaultHero = pageData.hero || DEMO_LANDING_PAGE.hero;
  const defaultProducts = pageData.products || DEMO_LANDING_PAGE.products;
  const sections = pageData.sections || createDefaultSections(defaultHero, defaultProducts);

  const contentSnapshot = {
    id: newId,
    name: pageData.name || 'New Landing Page',
    slug: pageData.slug ? pageData.slug.toLowerCase().trim() : 'landing-page',
    sections,
    hero: defaultHero,
    products: defaultProducts,
    benefits: pageData.benefits || DEMO_LANDING_PAGE.benefits,
    previewImages: pageData.previewImages || DEMO_LANDING_PAGE.previewImages,
    faq: pageData.faq || DEMO_LANDING_PAGE.faq,
    testimonials: pageData.testimonials || DEMO_LANDING_PAGE.testimonials,
    sectionVisibility: pageData.sectionVisibility || DEFAULT_SECTION_VISIBILITY,
    seo: pageData.seo || {},
    status: isPublished ? 'published' : 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Always save to local test cache first
  const localFormatted = formatLandingPageDoc(newId, contentSnapshot);
  saveLocalPage(localFormatted);

  // Attempt Cloud Firestore Sync
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const docPayload: any = {
      ...contentSnapshot,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    if (isPublished) {
      docPayload.publishedData = contentSnapshot;
    }

    const docRef = await addDoc(colRef, docPayload);
    return docRef.id;
  } catch (error: any) {
    console.warn('Cloud Firestore create notice (Using local test mode page ID):', error?.message || error);
    return newId;
  }
};

/**
 * Update an existing Landing Page in Firestore (Seamless local fallback)
 */
export const updateLandingPage = async (id: string, pageData: Partial<LandingPage>): Promise<void> => {
  const current = (await getLandingPageById(id)) || formatLandingPageDoc(id, DEMO_LANDING_PAGE);
  const isPublished = pageData.status === 'published';

  const updatedLocal = {
    ...current,
    ...pageData,
    status: pageData.status !== undefined ? (isPublished ? 'published' : 'draft') : current.status,
    updatedAt: new Date().toISOString(),
  } as LandingPage;

  if (isPublished) {
    updatedLocal.publishedData = { ...updatedLocal };
  }

  saveLocalPage(updatedLocal);

  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updatePayload: any = {
      updatedAt: serverTimestamp(),
    };

    if (pageData.name !== undefined) updatePayload.name = pageData.name;
    if (pageData.slug !== undefined) updatePayload.slug = pageData.slug.toLowerCase().trim();
    if (pageData.status !== undefined) updatePayload.status = isPublished ? 'published' : 'draft';
    if (pageData.sections !== undefined) updatePayload.sections = pageData.sections;
    if (pageData.hero !== undefined) updatePayload.hero = pageData.hero;
    if (pageData.products !== undefined) updatePayload.products = pageData.products;
    if (pageData.benefits !== undefined) updatePayload.benefits = pageData.benefits;
    if (pageData.previewImages !== undefined) updatePayload.previewImages = pageData.previewImages;
    if (pageData.faq !== undefined) updatePayload.faq = pageData.faq;
    if (pageData.testimonials !== undefined) updatePayload.testimonials = pageData.testimonials;
    if (pageData.sectionVisibility !== undefined) updatePayload.sectionVisibility = pageData.sectionVisibility;
    if (pageData.seo !== undefined) updatePayload.seo = pageData.seo;

    if (isPublished) {
      updatePayload.publishedData = {
        name: pageData.name || current.name,
        slug: pageData.slug || current.slug,
        sections: pageData.sections || current.sections,
        hero: pageData.hero || current.hero,
        products: pageData.products || current.products,
        benefits: pageData.benefits || current.benefits,
        previewImages: pageData.previewImages || current.previewImages,
        faq: pageData.faq || current.faq,
        testimonials: pageData.testimonials || current.testimonials,
        sectionVisibility: pageData.sectionVisibility || current.sectionVisibility,
        seo: pageData.seo || current.seo,
      };
    }

    await updateDoc(docRef, updatePayload);
  } catch (error: any) {
    console.warn('Cloud Firestore update notice (Saved to local test storage):', error?.message || error);
  }
};

/**
 * Delete a Landing Page document
 */
export const deleteLandingPage = async (id: string): Promise<void> => {
  if (typeof window !== 'undefined') {
    try {
      const remaining = getLocalPages().filter((p) => p.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(remaining));
    } catch (e) {}
  }

  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error: any) {
    console.warn('Notice deleting landing page from Firestore:', error);
  }
};

/**
 * Toggle Published / Draft Status in Firestore
 */
export const toggleLandingPageStatus = async (
  id: string,
  currentStatus: 'draft' | 'published'
): Promise<'draft' | 'published'> => {
  const newStatus: 'draft' | 'published' = currentStatus === 'published' ? 'draft' : 'published';
  await updateLandingPage(id, { status: newStatus });
  return newStatus;
};

/**
 * Duplicate a Landing Page document
 */
export const duplicateLandingPage = async (id: string): Promise<string> => {
  const original = (await getLandingPageById(id)) || DEMO_LANDING_PAGE;

  let baseSlug = `${original.slug}-copy`;
  let newSlug = baseSlug;
  let counter = 1;

  while (await checkSlugExists(newSlug)) {
    counter++;
    newSlug = `${baseSlug}-${counter}`;
  }

  const duplicatedPayload: Partial<LandingPage> = {
    name: `${original.name} (Copy)`,
    slug: newSlug,
    status: 'draft',
    sections: original.sections,
    hero: original.hero,
    products: original.products,
    benefits: original.benefits,
    previewImages: original.previewImages,
    faq: original.faq,
    testimonials: original.testimonials,
    sectionVisibility: original.sectionVisibility || DEFAULT_SECTION_VISIBILITY,
    seo: original.seo,
  };

  return await createLandingPage(duplicatedPayload);
};
