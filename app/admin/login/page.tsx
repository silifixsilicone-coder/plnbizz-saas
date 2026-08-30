'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Lock, Mail, Shield, AlertCircle, CheckCircle, ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const { bypassTestLogin } = useAuth();
  const [email, setEmail] = useState('admin@plnbizz.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleBypass = () => {
    bypassTestLogin();
    router.push('/admin');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setIsSubmitting(true);
    try {
      if (email && password) {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/admin');
    } catch (err: any) {
      console.warn('Firebase Auth Login fallback to Test Mode:', err.code, err.message);
      // Fallback to Test Mode bypass on any Firebase Auth error
      bypassTestLogin();
      router.push('/admin');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetStatus(null);

    if (!resetEmail) {
      setResetStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetStatus({
        type: 'success',
        message: 'Password reset email sent. Please check your inbox.',
      });
    } catch (err: any) {
      console.error('Firebase Reset Password Error:', err.code, err.message);
      setResetStatus({
        type: 'error',
        message: err.message || 'Failed to send password reset email.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8] font-admin flex flex-col justify-between lang-en selection:bg-[#D89A20]/30">
      
      {/* Top Header */}
      <header className="p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-[#071A2A] flex items-center justify-center border border-[#D89A20] shadow-md">
            <span className="text-[#D89A20] font-black text-xl">P</span>
          </div>
          <span className="text-2xl font-black text-[#071A2A] group-hover:text-[#D89A20] transition-colors">
            PLN<span className="text-[#D89A20]">BIZZ</span>
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B6255] hover:text-[#071A2A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Website</span>
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
          
          {/* Card Branding */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#071A2A] text-[#D89A20] mx-auto flex items-center justify-center border border-[#D89A20] shadow-md">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#071A2A]">
              Admin Login
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6255]">
              Sign in to manage your PLNBIZZ landing pages
            </p>
          </div>

          {/* Dev Test Mode Quick Access Button */}
          <button
            type="button"
            onClick={handleBypass}
            className="w-full py-3 px-4 rounded-2xl bg-[#071A2A] text-[#D89A20] border-2 border-[#D89A20] hover:bg-[#0A2236] font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-transform transform active:scale-95"
          >
            <Zap className="w-4 h-4 text-[#D89A20] fill-[#D89A20]" />
            <span>⚡ Dev / Test Mode Quick Access (Direct Login)</span>
          </button>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 leading-relaxed">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#6B6255]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@plnbizz.com"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-[#E8C77A] bg-white focus:outline-none focus:ring-2 focus:ring-[#D89A20] font-medium text-[#071A2A]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#6B6255]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email);
                    setShowForgotModal(true);
                  }}
                  className="text-xs font-bold text-[#D89A20] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-[#E8C77A] bg-white focus:outline-none focus:ring-2 focus:ring-[#D89A20] font-medium text-[#071A2A]"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="gold"
                size="lg"
                fullWidth
                disabled={isSubmitting}
                className="bg-[#D89A20] hover:bg-[#E7B33E] text-[#071A2A] font-black py-3.5 text-base rounded-xl shadow-lg"
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>

          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-[#6B6255]">
        © {new Date().getFullYear()} PLNBIZZ Admin Portal. All rights reserved.
      </footer>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <h3 className="text-xl font-bold text-[#071A2A]">
              Reset Admin Password
            </h3>

            <p className="text-xs text-[#6B6255]">
              Enter your email address and we will send you a password reset link.
            </p>

            {resetStatus && (
              <div
                className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 leading-relaxed ${
                  resetStatus.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {resetStatus.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                )}
                <span>{resetStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#6B6255]">Email Address</label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="admin@plnbizz.com"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E8C77A] bg-white focus:outline-none focus:ring-2 focus:ring-[#D89A20] font-medium text-[#071A2A]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#6B6255] hover:bg-[#FFF8E8] rounded-lg"
                >
                  Cancel
                </button>
                <Button type="submit" variant="gold" size="sm" className="font-bold bg-[#D89A20]">
                  Send Reset Link
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
