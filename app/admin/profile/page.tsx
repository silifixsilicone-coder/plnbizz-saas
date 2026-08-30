'use client';

import React, { useState } from 'react';
import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { User, Shield, Mail, Key, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

export default function AdminProfilePage() {
  const { user, resetPassword } = useAuth();
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendReset = async () => {
    if (!user?.email) return;
    setLoading(true);
    setStatus(null);
    try {
      await resetPassword(user.email);
      setStatus({
        type: 'success',
        message: 'Password reset link sent to your email. Check your inbox.',
      });
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'Failed to send password reset email.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayoutWrapper
      title="Admin Profile"
      description="Manage account preferences, authentication status, and security credentials"
    >
      <div className="max-w-3xl space-y-6 font-admin lang-en text-[#071A2A]">
        
        {/* Status Notification */}
        {status && (
          <div
            className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
              status.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] p-6 space-y-6 shadow-xs">
          
          <div className="flex items-center gap-4 border-b border-[#E8C77A]/60 pb-5">
            <div className="w-16 h-16 rounded-2xl bg-[#071A2A] text-[#D89A20] border-2 border-[#D89A20] flex items-center justify-center text-2xl font-black shadow-md">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#071A2A]">Administrator Account</h3>
              <p className="text-xs text-[#6B6255]">PLNBIZZ Master CMS Administrator</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#6B6255] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D89A20]" />
                <span>Admin Email</span>
              </label>
              <input
                type="text"
                disabled
                value={user?.email || 'admin@plnbizz.com'}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] bg-[#FFF8E8] font-bold text-sm text-[#071A2A]"
              />
            </div>

            {/* Auth Provider */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-[#6B6255] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#D89A20]" />
                <span>Authentication Method</span>
              </label>
              <input
                type="text"
                disabled
                value="Firebase Email/Password Auth"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] bg-[#FFF8E8] font-bold text-sm text-emerald-700"
              />
            </div>

          </div>

          {/* Account Security Actions */}
          <div className="pt-4 border-t border-[#E8C77A]/60 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm font-bold text-[#071A2A] flex items-center gap-1.5">
                <Key className="w-4 h-4 text-[#D89A20]" />
                <span>Password Reset</span>
              </div>
              <p className="text-xs text-[#6B6255]">
                Send a password reset email via Firebase Authentication
              </p>
            </div>

            <Button
              type="button"
              variant="gold"
              size="sm"
              disabled={loading}
              onClick={handleSendReset}
              className="bg-[#D89A20] font-bold text-xs"
            >
              Send Reset Link
            </Button>
          </div>

        </div>

      </div>
    </AdminLayoutWrapper>
  );
}
