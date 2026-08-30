import {
  collection,
  doc,
  getDocs,
  addDoc,
  query,
  where,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { isValidExternalUrl, sanitizeExternalUrl } from './url';

export interface AnalyticsData {
  landingPageId: string;
  date: string; // YYYY-MM-DD
  views: number;
  uniqueVisitors: number;
  ctaClicks: number;
}

export interface AnalyticsSummary {
  totalViews: number;
  totalUniqueVisitors: number;
  totalCtaClicks: number;
  conversionRate: string;
}

export interface CTAClickEvent {
  id?: string;
  landingPageId: string;
  slug: string;
  ctaId: string; // hero-main, product-{id}, offer-main, final-main
  ctaType: 'hero' | 'product' | 'offer' | 'final' | 'sticky_bar';
  productId?: string;
  timestamp?: any;
}

export interface ProductClickSummary {
  productId: string;
  title?: string;
  clicks: number;
}

export interface PageAnalyticsBreakdown {
  landingPageId: string;
  slug: string;
  views: number;
  ctaClicks: number;
  conversionRate: string;
  productClicks: ProductClickSummary[];
}

const ANALYTICS_SUMMARY_COLLECTION = 'landingPageAnalytics';
const CTA_EVENTS_COLLECTION = 'ctaClickEvents';

/**
 * Calculate Conversion Rate safely without NaN or Infinity
 */
export const calculateConversionRate = (clicks: number, views: number): string => {
  if (!views || views <= 0) {
    return '—';
  }
  const rate = (clicks / views) * 100;
  return `${rate.toFixed(1)}%`;
};

/**
 * Record public CTA Click event (Non-blocking: Never delays user redirect)
 */
export const recordPublicCTAClick = async (
  eventData: Omit<CTAClickEvent, 'timestamp'>
): Promise<void> => {
  try {
    const colRef = collection(db, CTA_EVENTS_COLLECTION);
    await addDoc(colRef, {
      ...eventData,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    // Non-blocking catch: Ignore tracking errors so checkout always succeeds
    console.warn('CTA tracking event write skipped:', error);
  }
};

/**
 * Safe External Checkout Trigger
 * 1. Attempts light tracking write
 * 2. Opens external URL in new tab safely
 */
export const triggerExternalCheckout = (
  url: string,
  eventData?: Omit<CTAClickEvent, 'timestamp'>,
  isAdminOrPreview: boolean = false
) => {
  const safeUrl = sanitizeExternalUrl(url);
  if (safeUrl === '#') return;

  // Track click ONLY for public visitors (Exclude Admin & Preview)
  if (!isAdminOrPreview && eventData) {
    recordPublicCTAClick(eventData).catch(() => {});
  }

  // Open external checkout immediately
  window.open(safeUrl, '_blank', 'noopener,noreferrer');
};

/**
 * Fetch Analytics Summary from Firestore
 */
export const getAnalyticsSummary = async (
  days: number = 30,
  landingPageId?: string
): Promise<AnalyticsSummary> => {
  try {
    const eventsRef = collection(db, CTA_EVENTS_COLLECTION);
    const eventsSnap = await getDocs(eventsRef);

    let clicks = 0;
    if (!eventsSnap.empty) {
      eventsSnap.docs.forEach((d) => {
        const data = d.data();
        if (!landingPageId || data.landingPageId === landingPageId) {
          clicks++;
        }
      });
    }

    const summaryRef = collection(db, ANALYTICS_SUMMARY_COLLECTION);
    const summarySnap = await getDocs(summaryRef);

    let views = 0;
    let visitors = 0;

    if (!summarySnap.empty) {
      summarySnap.docs.forEach((d) => {
        const data = d.data();
        if (!landingPageId || data.landingPageId === landingPageId) {
          views += data.views || 0;
          visitors += data.uniqueVisitors || 0;
        }
      });
    }

    return {
      totalViews: views,
      totalUniqueVisitors: visitors,
      totalCtaClicks: clicks,
      conversionRate: calculateConversionRate(clicks, views),
    };
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    return {
      totalViews: 0,
      totalUniqueVisitors: 0,
      totalCtaClicks: 0,
      conversionRate: '—',
    };
  }
};

/**
 * Fetch CTA Clicks breakdown per Product
 */
export const getProductCTAClicks = async (
  landingPageId: string
): Promise<ProductClickSummary[]> => {
  try {
    const colRef = collection(db, CTA_EVENTS_COLLECTION);
    const q = query(
      colRef,
      where('landingPageId', '==', landingPageId),
      where('ctaType', '==', 'product')
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) return [];

    const counts: Record<string, number> = {};
    snapshot.docs.forEach((d) => {
      const data = d.data();
      if (data.productId) {
        counts[data.productId] = (counts[data.productId] || 0) + 1;
      }
    });

    return Object.entries(counts).map(([productId, clicks]) => ({
      productId,
      clicks,
    }));
  } catch (error) {
    console.error('Error fetching product CTA clicks:', error);
    return [];
  }
};
