import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';

export interface OrderItem {
  id: string;
  orderNumber: string;
  landingPageId: string;
  landingPageSlug: string;
  productId: string | null;
  productName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  currency: 'INR';
  status: OrderStatus;
  paymentMethod: string | null;
  paymentId: string | null;
  source: 'external_checkout' | 'admin_test';
  isTest?: boolean;
  createdAt: string;
  updatedAt: string;
}

const COLLECTION_NAME = 'orders';

/**
 * Format raw Firestore document into OrderItem safely
 */
export const formatOrderDoc = (id: string, data: any): OrderItem => {
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
    orderNumber: data.orderNumber || `PLN-${id.substring(0, 6).toUpperCase()}`,
    landingPageId: data.landingPageId || '',
    landingPageSlug: data.landingPageSlug || 'bundle',
    productId: data.productId || null,
    productName: data.productName || 'PLNBIZZ Digital Product',
    customerName: data.customerName || 'Customer',
    customerEmail: data.customerEmail || '',
    customerPhone: data.customerPhone || '',
    amount: data.amount || 0,
    currency: 'INR',
    status: data.status || 'pending',
    paymentMethod: data.paymentMethod || null,
    paymentId: data.paymentId || null,
    source: data.source || 'external_checkout',
    isTest: Boolean(data.isTest),
    createdAt,
    updatedAt,
  };
};

/**
 * Fetch all orders from Firestore
 */
export const getOrders = async (): Promise<OrderItem[]> => {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      const fallbackSnap = await getDocs(colRef);
      return fallbackSnap.docs.map((d) => formatOrderDoc(d.id, d.data()));
    }

    return snapshot.docs.map((d) => formatOrderDoc(d.id, d.data()));
  } catch (error) {
    console.error('Error fetching orders:', error);
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map((d) => formatOrderDoc(d.id, d.data()));
    } catch (e) {
      return [];
    }
  }
};

/**
 * Fetch single order by ID
 */
export const getOrderById = async (id: string): Promise<OrderItem | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return formatOrderDoc(docSnap.id, docSnap.data());
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return null;
  }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (id: string, newStatus: OrderStatus): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    status: newStatus,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Create Admin Test Order (Marked isTest: true)
 */
export const createTestOrder = async (orderData: Partial<OrderItem>): Promise<string> => {
  const colRef = collection(db, COLLECTION_NAME);
  const randomNum = Math.floor(100000 + Math.random() * 900000);

  const payload = {
    orderNumber: `PLN-${randomNum}`,
    landingPageId: orderData.landingPageId || 'lp-default-001',
    landingPageSlug: orderData.landingPageSlug || 'ultimate-bundle',
    productId: orderData.productId || 'p1',
    productName: orderData.productName || 'Test Digital Product',
    customerName: orderData.customerName || 'Test Customer',
    customerEmail: orderData.customerEmail || 'test@example.com',
    customerPhone: orderData.customerPhone || '9876543210',
    amount: orderData.amount || 109,
    currency: 'INR',
    status: orderData.status || 'pending',
    paymentMethod: orderData.paymentMethod || 'Manual Admin Test',
    paymentId: orderData.paymentId || `PAY-${randomNum}`,
    source: 'admin_test',
    isTest: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(colRef, payload);
  return docRef.id;
};

/**
 * Delete order from Firestore
 */
export const deleteOrder = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

/**
 * Calculate Real Revenue (Sum of amount where status == 'paid' AND isTest != true)
 */
export const calculateTotalRevenue = (orders: OrderItem[]): number => {
  return orders
    .filter((o) => (o.status === 'paid' || o.status === ('PAID' as any)) && !o.isTest)
    .reduce((sum, o) => sum + (o.amount || 0), 0);
};

/**
 * Export Orders to CSV
 */
export const exportOrdersToCSV = (orders: OrderItem[]): void => {
  if (orders.length === 0) return;

  const headers = [
    'Order Number',
    'Customer Name',
    'Customer Email',
    'Customer Phone',
    'Product Name',
    'Landing Page Slug',
    'Amount (INR)',
    'Status',
    'Is Test Order',
    'Created At',
  ];

  const rows = orders.map((o) => [
    `"${o.orderNumber}"`,
    `"${o.customerName.replace(/"/g, '""')}"`,
    `"${o.customerEmail.replace(/"/g, '""')}"`,
    `"${o.customerPhone.replace(/"/g, '""')}"`,
    `"${o.productName.replace(/"/g, '""')}"`,
    `"${o.landingPageSlug}"`,
    o.amount,
    o.status,
    o.isTest ? 'Yes' : 'No',
    `"${o.createdAt}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `plnbizz_orders_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
