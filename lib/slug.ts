import { checkSlugExists } from './firestore';

export const RESERVED_SLUGS = [
  'admin',
  'api',
  'login',
  'signup',
  'settings',
  'dashboard',
  'lp',
  'favicon',
  'robots',
  'sitemap',
  'public',
  'assets',
];

/**
 * Sanitize raw user input into a valid clean slug format
 */
export const cleanSlug = (input: string): string => {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

/**
 * Validate slug format and check against reserved slugs
 */
export const validateSlugFormat = (slug: string): { valid: boolean; error?: string } => {
  const clean = cleanSlug(slug);

  if (!clean) {
    return { valid: false, error: 'Slug cannot be empty.' };
  }

  if (RESERVED_SLUGS.includes(clean)) {
    return { valid: false, error: 'This URL is reserved. Please choose another slug.' };
  }

  return { valid: true };
};

/**
 * Perform real-time Firestore slug availability check
 */
export const checkSlugAvailability = async (
  slug: string,
  currentDocId?: string
): Promise<{ available: boolean; message: string }> => {
  const formatCheck = validateSlugFormat(slug);
  if (!formatCheck.valid) {
    return { available: false, message: formatCheck.error || 'Invalid slug format.' };
  }

  const clean = cleanSlug(slug);
  const exists = await checkSlugExists(clean, currentDocId);

  if (exists) {
    return { available: false, message: '✕ Already in use' };
  }

  return { available: true, message: '✓ Available' };
};
