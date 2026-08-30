export type LandingPageStatus = 'draft' | 'published' | 'DRAFT' | 'PUBLISHED' | 'UNPUBLISHED';

export interface StorageImageData {
  url: string;
  storagePath?: string;
  name?: string;
  size?: number;
  type?: string;
  uploadedAt?: string;
}

export interface SectionVisibility {
  hero: boolean;
  products: boolean;
  problem: boolean;
  benefits: boolean;
  preview: boolean;
  offer: boolean;
  faq: boolean;
  testimonials: boolean;
  finalCta: boolean;
}

export interface SEOMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageStoragePath?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
}

export interface HeroContent {
  badge?: string;
  title?: string;
  highlightedTitle?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  heroImage: string;
  heroImageStoragePath?: string;
}

export interface LandingProduct {
  id: string;
  number?: string | number;
  title: string;
  description?: string;
  shortDescription?: string;
  image: string;
  imageStoragePath?: string;
  price?: number;
  originalPrice?: number;
  buttonText?: string;
  buttonUrl?: string;
  badge?: string;
  individualPrice?: number;
  pricingType?: 'COMBO_INCLUDED' | 'SEPARATE_PURCHASE';
  separateCheckoutUrl?: string;
}

export type ProductCardItem = LandingProduct;

export interface ProductFeature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ProductBenefit {
  id: string;
  number?: string;
  title: string;
  description: string;
  icon?: string;
}

export interface PreviewImage {
  id: string;
  url: string;
  storagePath?: string;
  caption?: string;
  altText?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  avatarStoragePath?: string;
  content: string;
  rating: number;
}

export interface ProblemCardItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

// ----------------------------------------------------
// SECTION-BASED LANDING PAGE BUILDER TYPES
// ----------------------------------------------------
export type SectionType =
  | 'hero'
  | 'benefits'
  | 'products'
  | 'features'
  | 'testimonials'
  | 'faq'
  | 'offer'
  | 'countdown'
  | 'image_banner'
  | 'video'
  | 'text_content'
  | 'final_cta'
  | 'footer';

export interface PageSection {
  id: string; // Stable unique ID (e.g. sec_hero_123)
  type: SectionType;
  order: number;
  visible: boolean;
  data: any;
}

export interface LandingPage {
  id: string;
  name: string;
  slug: string;
  status: 'draft' | 'published' | 'DRAFT' | 'PUBLISHED' | 'UNPUBLISHED';
  
  // Section Builder Architecture
  sections?: PageSection[];

  // Legacy/Default Fallbacks
  hero: HeroContent;
  products: LandingProduct[];
  features?: ProductFeature[];
  benefits?: ProductBenefit[];
  previewImages?: PreviewImage[];
  faq?: FAQItem[];
  testimonials?: TestimonialItem[];
  sectionVisibility?: SectionVisibility;
  seo?: SEOMetadata;
  publishedData?: any;
  createdAt?: any;
  updatedAt?: any;

  // Compatibility fields
  productName?: string;
  productImage?: string;
  headline?: string;
  mainHeading?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  offerText?: string;
  ctaText?: string;
  externalPaymentUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
}
