'use client';

import React, { useState } from 'react';
import { isValidExternalUrl, buildExternalCheckoutUrl, UTMParams } from '@/lib/url';
import { triggerExternalCheckout, CTAClickEvent } from '@/lib/analytics';
import { Link2, Edit3, Check, X, ExternalLink, AlertCircle, Info, Settings2 } from 'lucide-react';

interface EditableCTAProps {
  buttonText: string;
  buttonUrl: string;
  isEditingEnabled?: boolean;
  eventData?: Omit<CTAClickEvent, 'timestamp'>;
  utmParams?: UTMParams;
  onCTAChange?: (newText: string, newUrl: string, newUtm?: UTMParams) => void;
  className?: string;
  containerClassName?: string;
}

export const EditableCTA: React.FC<EditableCTAProps> = ({
  buttonText,
  buttonUrl,
  isEditingEnabled = false,
  eventData,
  utmParams,
  onCTAChange,
  className = '',
  containerClassName = 'w-full',
}) => {
  const [showModal, setShowModal] = useState(false);
  const [tempText, setTempText] = useState(buttonText);
  const [tempUrl, setTempUrl] = useState(buttonUrl);
  const [showUTM, setShowUTM] = useState(false);
  const [utm, setUtm] = useState<UTMParams>(utmParams || {});
  const [error, setError] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (isEditingEnabled) {
      e.preventDefault();
      setTempText(buttonText);
      setTempUrl(buttonUrl);
      setError(null);
      setShowModal(true);
    } else {
      e.preventDefault();
      const finalUrl = buildExternalCheckoutUrl(buttonUrl, utmParams);
      triggerExternalCheckout(finalUrl, eventData, isEditingEnabled);
    }
  };

  const handleTestCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isValidExternalUrl(tempUrl)) {
      setError('Please enter a valid external URL to test.');
      return;
    }
    const finalUrl = buildExternalCheckoutUrl(tempUrl, utm);
    triggerExternalCheckout(finalUrl, undefined, true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!tempText.trim()) {
      setError('Button text cannot be empty.');
      return;
    }

    if (!isValidExternalUrl(tempUrl)) {
      setError('Please enter a valid external checkout URL starting with http:// or https://');
      return;
    }

    if (onCTAChange) {
      onCTAChange(tempText.trim(), tempUrl.trim(), utm);
    }
    setShowModal(false);
  };

  return (
    <div className={`relative font-admin ${containerClassName}`}>
      
      {/* Target CTA Button */}
      <button
        type="button"
        onClick={handleClick}
        className={`group relative inline-flex items-center justify-center font-black transition-transform transform active:scale-95 cursor-pointer whitespace-nowrap px-8 ${className}`}
      >
        <span className="truncate">{buttonText}</span>

        {/* Edit Hover Badge */}
        {isEditingEnabled && (
          <span className="absolute -top-3 -right-2 hidden group-hover:flex items-center gap-1 bg-[#071A2A] text-[#D89A20] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-[#D89A20] shadow-xl z-30 pointer-events-none">
            <Edit3 className="w-2.5 h-2.5" />
            <span>Edit Button</span>
          </span>
        )}
      </button>

      {/* Inline CTA Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-6 space-y-4 shadow-2xl text-[#071A2A] font-admin">
            
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-[#071A2A]">Edit External Checkout CTA</h4>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#071A2A] text-[#D89A20] border border-[#D89A20] text-xs font-bold flex items-center gap-2">
              <Info className="w-4 h-4 flex-shrink-0" />
              <span>This button opens an external checkout page.</span>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              
              {/* Button Text */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-[#6B6255]">
                  Button Text *
                </label>
                <input
                  type="text"
                  required
                  value={tempText}
                  onChange={(e) => setTempText(e.target.value)}
                  placeholder="BUY NOW"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E8C77A] bg-white font-bold"
                />
              </div>

              {/* Checkout URL & Test Button */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase text-[#6B6255]">
                    External Checkout URL *
                  </label>
                  <button
                    type="button"
                    onClick={handleTestCheckout}
                    className="text-[11px] font-black text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Test Checkout Link</span>
                  </button>
                </div>
                <div className="relative">
                  <Link2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    required
                    value={tempUrl}
                    onChange={(e) => setTempUrl(e.target.value)}
                    placeholder="https://example.com/checkout"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8C77A] bg-white font-mono"
                  />
                </div>
              </div>

              {/* Tracking Parameters Expander */}
              <div className="pt-2 border-t border-[#E8C77A]/60">
                <button
                  type="button"
                  onClick={() => setShowUTM(!showUTM)}
                  className="text-xs font-bold text-[#6B6255] hover:text-[#071A2A] flex items-center gap-1.5"
                >
                  <Settings2 className="w-3.5 h-3.5 text-[#D89A20]" />
                  <span>Optional Tracking Parameters (UTM & External Product ID)</span>
                </button>

                {showUTM && (
                  <div className="mt-3 p-3 rounded-xl bg-white border border-[#E8C77A] space-y-2 text-xs">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500">
                        External Product ID (optional)
                      </label>
                      <input
                        type="text"
                        value={utm.externalProductId || ''}
                        onChange={(e) => setUtm({ ...utm, externalProductId: e.target.value })}
                        placeholder="digital_bundle_109"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500">UTM Source</label>
                        <input
                          type="text"
                          value={utm.utmSource || ''}
                          onChange={(e) => setUtm({ ...utm, utmSource: e.target.value })}
                          placeholder="planbizz"
                          className="w-full px-2 py-1 rounded-lg border border-slate-300 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500">UTM Medium</label>
                        <input
                          type="text"
                          value={utm.utmMedium || ''}
                          onChange={(e) => setUtm({ ...utm, utmMedium: e.target.value })}
                          placeholder="landing_page"
                          className="w-full px-2 py-1 rounded-lg border border-slate-300 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500">UTM Campaign</label>
                        <input
                          type="text"
                          value={utm.utmCampaign || ''}
                          onChange={(e) => setUtm({ ...utm, utmCampaign: e.target.value })}
                          placeholder="digital_bundle"
                          className="w-full px-2 py-1 rounded-lg border border-slate-300 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-2 text-xs font-bold text-[#6B6255] hover:bg-[#FFF8E8] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-black text-[#071A2A] bg-[#D89A20] hover:bg-[#E7B33E] rounded-xl shadow-md flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Button</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
