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
  user: null,
  loading: true,
  logout: async () => {},
  resetPassword: async () => {},
  bypassTestLogin: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        const isLocalAuth = typeof window !== 'undefined' && sessionStorage.getItem('plnbizz_admin_authenticated') === 'true';
        if (isLocalAuth) {
          setUser(MOCK_TEST_ADMIN);
        } else {
          setUser(null);
        }
      }
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
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('plnbizz_admin_authenticated');
    }
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const bypassTestLogin = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('plnbizz_admin_authenticated', 'true');
    }
    setUser(MOCK_TEST_ADMIN);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, resetPassword, bypassTestLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
