import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface LeadItem {
  id: string;
  landingPageId: string;
  landingPageSlug: string;
  name: string;
  email: string;
  phone: string;
  source: 'landing_page' | 'admin_test';
  createdAt: string;
  updatedAt: string;
}

const COLLECTION_NAME = 'leads';

/**
 * Format raw Firestore document into LeadItem safely
 */
export const formatLeadDoc = (id: string, data: any): LeadItem => {
  const createdAt =
    data.createdAt instanceof Timestamp
      ? data.createdAt.toDate().toISOString()
      : data.createdAt || new Date().toISOString();
  const updatedAt =
    data.updatedAt instanceof Timestamp
      ? data.updatedAt.toDate().toISOString()
      : data.updatedAt || new Date().toISOString();

  return {
    id,
    landingPageId: data.landingPageId || '',
    landingPageSlug: data.landingPageSlug || 'bundle',
    name: data.name || 'Lead',
    email: data.email || '',
    phone: data.phone || '',
    source: data.source || 'landing_page',
    createdAt,
    updatedAt,
  };
};

/**
 * Fetch all leads from Firestore
 */
export const getLeads = async (): Promise<LeadItem[]> => {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      const fallbackSnap = await getDocs(colRef);
      return fallbackSnap.docs.map((d) => formatLeadDoc(d.id, d.data()));
    }

    return snapshot.docs.map((d) => formatLeadDoc(d.id, d.data()));
  } catch (error) {
    console.error('Error fetching leads:', error);
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map((d) => formatLeadDoc(d.id, d.data()));
    } catch (e) {
      return [];
    }
  }
};

/**
 * Fetch single lead by ID
 */
export const getLeadById = async (id: string): Promise<LeadItem | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return formatLeadDoc(docSnap.id, docSnap.data());
  } catch (error) {
    console.error('Error fetching lead by ID:', error);
    return null;
  }
};

/**
 * Create Lead with basic duplicate prevention
 */
export const createLead = async (leadData: Partial<LeadItem>): Promise<string> => {
  const colRef = collection(db, COLLECTION_NAME);

  // Duplicate Check: Same email and same landing page
  if (leadData.email && leadData.landingPageId) {
    const q = query(
      colRef,
      where('email', '==', leadData.email.trim().toLowerCase()),
      where('landingPageId', '==', leadData.landingPageId)
    );
    const existingSnap = await getDocs(q);
    if (!existingSnap.empty) {
      // Return existing doc ID without throwing error to user
      return existingSnap.docs[0].id;
    }
  }

  const payload = {
    landingPageId: leadData.landingPageId || 'lp-default-001',
    landingPageSlug: leadData.landingPageSlug || 'ultimate-bundle',
    name: leadData.name ? leadData.name.trim() : 'Lead User',
    email: leadData.email ? leadData.email.trim().toLowerCase() : '',
    phone: leadData.phone ? leadData.phone.trim() : '',
    source: leadData.source || 'landing_page',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(colRef, payload);
  return docRef.id;
};

/**
 * Delete lead from Firestore
 */
export const deleteLead = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

/**
 * Export Leads to CSV
 */
export const exportLeadsToCSV = (leads: LeadItem[]): void => {
  if (leads.length === 0) return;

  const headers = ['Name', 'Email', 'Phone', 'Landing Page Slug', 'Source', 'Created At'];

  const rows = leads.map((l) => [
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.email.replace(/"/g, '""')}"`,
    `"${l.phone.replace(/"/g, '""')}"`,
    `"${l.landingPageSlug}"`,
    `"${l.source}"`,
    `"${l.createdAt}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `plnbizz_leads_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
