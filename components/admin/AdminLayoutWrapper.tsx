'use client';

import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AuthGuard } from './AuthGuard';

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const AdminLayoutWrapper: React.FC<AdminLayoutWrapperProps> = ({
  children,
  title = 'Dashboard',
  description = 'Manage your PLNBIZZ digital landing pages and bundles',
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FFF8E8] text-[#071A2A] font-admin flex lang-en selection:bg-[#D89A20]/30">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-xs"
          />
        )}

        {/* Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
          <AdminHeader
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            title={title}
            description={description}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
};
