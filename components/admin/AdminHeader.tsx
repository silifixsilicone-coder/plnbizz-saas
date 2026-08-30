'use client';

import React from 'react';
import { Menu, Bell, Plus, Search, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
  title?: string;
  description?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleSidebar,
  title = 'Dashboard',
  description = 'Manage your PLNBIZZ digital landing pages and bundles',
}) => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E8C77A] px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between shadow-xs">
      
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-[#071A2A] hover:bg-[#FFF8E8] transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#071A2A] tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xs sm:text-sm text-[#6B6255] font-medium hidden sm:block">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Search */}
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search pages, slugs..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#FFF8E8] border border-[#E8C77A] focus:outline-none focus:ring-2 focus:ring-[#D89A20]"
          />
        </div>

        {/* Notifications Icon */}
        <button
          title="Notifications"
          className="p-2 rounded-xl text-slate-600 hover:bg-[#FFF8E8] relative transition-colors"
        >
          <Bell className="w-5 h-5 text-[#071A2A]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D89A20] rounded-full" />
        </button>

        {/* Create Landing Page Button */}
        <Link
          href="/admin/landing-pages/new"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#071A2A] hover:bg-[#0A2236] text-white text-xs sm:text-sm font-bold shadow-md transition-all"
        >
          <Plus className="w-4 h-4 text-[#D89A20]" />
          <span className="hidden sm:inline">New Page</span>
        </Link>

        {/* Logout Quick Button */}
        <button
          onClick={handleLogout}
          title="Sign Out"
          className="p-2 rounded-xl text-[#6B6255] hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

    </header>
  );
};
