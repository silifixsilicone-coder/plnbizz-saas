import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071A2A] text-white border-t border-[#E8C77A]/30 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand & Hindi Description */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-white">
                PLN<span className="text-[#D89A20]">BIZZ</span>
              </span>
            </div>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-md">
              PLNBIZZ भारत का सबसे भरोसेमंद प्रीमियम डिजिटल प्रोडक्ट और बंडल प्लेटफॉर्म है। हम नए क्रिएटर्स और उद्यमियों को ऑनलाइन इनकम शुरू करने में मदद करते हैं।
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-6 flex flex-wrap gap-10 justify-start md:justify-end items-start pt-2">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#D89A20] uppercase tracking-widest">
                Navigation
              </h4>
              <ul className="space-y-2 text-sm text-slate-300 font-semibold">
                <li>
                  <a href="#" className="hover:text-[#D89A20] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#bundle-content" className="hover:text-[#D89A20] transition-colors">
                    Landing Pages
                  </a>
                </li>
                <li>
                  <a href="#offer" className="hover:text-[#D89A20] transition-colors">
                    Special Offer
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#D89A20] uppercase tracking-widest">
                Legal & Support
              </h4>
              <ul className="space-y-2 text-sm text-slate-300 font-semibold">
                <li>
                  <a href="#" className="hover:text-[#D89A20] transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D89A20] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D89A20] transition-colors">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} PLNBIZZ. सर्वाधिकार सुरक्षित (All Rights Reserved).</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300">Terms & Conditions</span>
            <span>•</span>
            <Link href="/admin" className="text-[#D89A20] font-bold hover:underline">
              Admin Panel
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
