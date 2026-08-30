'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Mock Test User for Dev / Test Mode Bypass
const MOCK_TEST_ADMIN: any = {
  uid: 'test-admin-001',
  email: 'admin@plnbizz.com',
  displayName: 'Admin (Test Mode)',
  emailVerified: true,
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  bypassTestLogin: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: MOCK_TEST_ADMIN,
  loading: false,
  logout: async () => {},
  resetPassword: async () => {},
  bypassTestLogin: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(MOCK_TEST_ADMIN);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // If Firebase Auth has a logged-in user, use it; otherwise fallback to test admin user
      setUser(currentUser || MOCK_TEST_ADMIN);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('SignOut warning:', e);
    }
    setUser(MOCK_TEST_ADMIN); // Maintain test mode access
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const bypassTestLogin = () => {
    setUser(MOCK_TEST_ADMIN);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user: user || MOCK_TEST_ADMIN, loading, logout, resetPassword, bypassTestLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
