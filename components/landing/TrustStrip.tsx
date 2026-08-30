import React from 'react';
import { CheckCircle, ShieldCheck, Zap, Download } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  return (
    <section className="bg-[#FFF9EC] border-b border-[#E8C77A] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm font-extrabold text-[#071A2A]">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#D89A20]" />
            <span>Instant Google Drive Access</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#D89A20]" />
            <span>Master Resell Rights Included</span>
          </div>
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-[#D89A20]" />
            <span>Lifetime Unlimited Downloads</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D89A20]" />
            <span>100% Safe Payment & Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};
