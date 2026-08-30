'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E8] flex flex-col items-center justify-center space-y-4 font-admin">
        <div className="w-12 h-12 rounded-2xl bg-[#071A2A] flex items-center justify-center border-2 border-[#D89A20] shadow-xl">
          <span className="text-[#D89A20] font-black text-2xl">P</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#071A2A]">
          <Loader2 className="w-4 h-4 animate-spin text-[#D89A20]" />
          <span>Verifying Admin Access...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
