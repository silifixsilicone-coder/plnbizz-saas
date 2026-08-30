/**
 * Validate external URL to accept ONLY http:// or https:// protocols
 * Strictly rejects javascript:, data:, vbscript:, file:, etc.
 */
export const isValidExternalUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  const clean = url.trim().toLowerCase();
  
  // Reject dangerous protocols
  if (
    clean.startsWith('javascript:') ||
    clean.startsWith('data:') ||
    clean.startsWith('vbscript:') ||
    clean.startsWith('file:') ||
    clean.startsWith('blob:')
  ) {
    return false;
  }

  return clean.startsWith('http://') || clean.startsWith('https://');
};

/**
 * Sanitize URL for safe external anchor tags
 */
export const sanitizeExternalUrl = (url: string): string => {
  if (!isValidExternalUrl(url)) {
    return '#';
  }
  return url.trim();
};

export interface UTMParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  externalProductId?: string;
}

/**
 * Build external checkout URL safely appending optional UTM parameters and external product ID
 */
export const buildExternalCheckoutUrl = (
  baseUrl: string,
  params?: UTMParams
): string => {
  if (!isValidExternalUrl(baseUrl)) {
    return '#';
  }

  try {
    const urlObj = new URL(baseUrl.trim());
    if (params?.utmSource && params.utmSource.trim()) {
      urlObj.searchParams.set('utm_source', params.utmSource.trim());
    }
    if (params?.utmMedium && params.utmMedium.trim()) {
      urlObj.searchParams.set('utm_medium', params.utmMedium.trim());
    }
    if (params?.utmCampaign && params.utmCampaign.trim()) {
      urlObj.searchParams.set('utm_campaign', params.utmCampaign.trim());
    }
    if (params?.externalProductId && params.externalProductId.trim()) {
      urlObj.searchParams.set('ext_product_id', params.externalProductId.trim());
    }
    return urlObj.toString();
  } catch (e) {
    return baseUrl.trim();
  }
};
