'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  FileText,
  ShoppingBag,
  Users,
  FileImage,
  BarChart3,
  Settings,
  User,
  LogOut,
  Sparkles,
  ExternalLink,
  Shield,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen = true, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const managementNav = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Landing Pages', href: '/admin/landing-pages', icon: FileText },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Media Library', href: '/admin/media', icon: FileImage },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  ];

  const settingsNav = [
    { name: 'Settings', href: '/admin/settings', icon: Settings },
    { name: 'Profile', href: '/admin/profile', icon: User },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#071A2A] text-white flex flex-col justify-between border-r border-[#E8C77A]/30 transition-transform duration-300 transform lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white">
                PLAN<span className="text-[#D89A20]">BIZZ</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest -mt-1">
                Admin CMS
              </span>
            </div>
          </Link>
        </div>

        {/* Public Site Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0D2436] hover:bg-[#123047] text-xs font-bold text-[#D89A20] border border-[#E8C77A]/30 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 px-4 py-6 overflow-y-auto space-y-6">
        
        {/* Group 1: Management */}
        <div className="space-y-1">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Management
          </div>
          {managementNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#D89A20] text-[#071A2A] shadow-md font-extrabold'
                    : 'text-slate-300 hover:bg-[#0D2436] hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#071A2A]' : 'text-[#D89A20]'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Group 2: System Settings */}
        <div className="space-y-1">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Settings
          </div>
          {settingsNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#D89A20] text-[#071A2A] shadow-md font-extrabold'
                    : 'text-slate-300 hover:bg-[#0D2436] hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#071A2A]' : 'text-[#D89A20]'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

      </div>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-slate-800 bg-[#04111C]">
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#0D2436] border border-slate-800">
          <Link href="/admin/profile" className="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-80">
            <div className="w-8 h-8 rounded-full bg-[#D89A20]/20 border border-[#D89A20] text-[#D89A20] font-bold flex items-center justify-center text-xs flex-shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-extrabold text-white truncate">Administrator</span>
              <span className="text-[10px] text-slate-400 font-medium truncate">
                {user?.email || 'admin@plnbizz.com'}
              </span>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-slate-800 flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
