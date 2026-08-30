'use client';

import React, { useState } from 'react';
import { createLead } from '@/lib/leads';
import { CheckCircle, AlertCircle, Send, Loader2 } from 'lucide-react';

interface LeadFormProps {
  landingPageId?: string;
  landingPageSlug?: string;
  buttonText?: string;
  onSuccess?: () => void;
  className?: string;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  landingPageId = 'lp-default-001',
  landingPageSlug = 'ultimate-bundle',
  buttonText = 'Submit Details (सबमिट करें)',
  onSuccess,
  className = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (str: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await createLead({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        landingPageId,
        landingPageSlug,
        source: 'landing_page',
      });
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Lead submission failed:', err);
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-2xl bg-[#071A2A] text-white border-2 border-[#D89A20] text-center space-y-3 font-admin shadow-xl">
        <div className="w-12 h-12 rounded-full bg-[#D89A20] text-[#071A2A] flex items-center justify-center mx-auto">
          <CheckCircle className="w-7 h-7" />
        </div>
        <h4 className="text-xl font-black text-[#D89A20]">धन्यवाद! (Thank you!)</h4>
        <p className="text-xs text-slate-300">Your details have been recorded successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 font-admin text-[#071A2A] ${className}`}>
      
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Name */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase text-[#6B6255]">
          Full Name (आपका नाम) *
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Rahul Sharma"
          className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] text-sm bg-white font-semibold"
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase text-[#6B6255]">
          Email Address (ईमेल) *
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="rahul@example.com"
          className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] text-sm bg-white font-medium"
        />
      </div>

      {/* Phone */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase text-[#6B6255]">
          Phone / WhatsApp Number (मोबाइल नंबर)
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="9876543210"
          className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] text-sm bg-white font-mono"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-4 rounded-xl bg-[#D89A20] hover:bg-[#E7B33E] text-[#071A2A] font-black text-sm shadow-lg transition-transform transform active:scale-95 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        <span>{buttonText}</span>
      </button>

    </form>
  );
};
