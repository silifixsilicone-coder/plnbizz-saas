'use client';

import React, { useState } from 'react';
import { LandingProduct } from '@/types/landing-page';
import { Badge } from '@/components/ui/Badge';
import { ShoppingBag, ArrowRight, Edit3, X, Check } from 'lucide-react';
import { triggerExternalCheckout } from '@/lib/analytics';
import { EditableText } from '@/components/admin/editor/EditableText';
import { EditableImage } from '@/components/admin/editor/EditableImage';
import { EditableCTA } from '@/components/admin/editor/EditableCTA';

interface ProductSectionProps {
  items: LandingProduct[];
  landingPageId?: string;
  slug?: string;
  isEditingEnabled?: boolean;
  onItemChange?: (index: number, updatedItem: LandingProduct) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  items,
  landingPageId = 'lp-default-001',
  slug = 'ultimate-bundle',
  isEditingEnabled = false,
  onItemChange,
}) => {
  const [editingPriceIdx, setEditingPriceIdx] = useState<number | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(109);

  const [editingBadgeIdx, setEditingBadgeIdx] = useState<number | null>(null);
  const [tempBadge, setTempBadge] = useState<string>('');

  const handlePriceSave = (idx: number, item: LandingProduct) => {
    if (onItemChange) {
      onItemChange(idx, {
        ...item,
        price: tempPrice,
        individualPrice: tempPrice,
      });
    }
    setEditingPriceIdx(null);
  };

  const handleBadgeSave = (idx: number, item: LandingProduct) => {
    if (onItemChange) {
      onItemChange(idx, {
        ...item,
        badge: tempBadge,
      });
    }
    setEditingBadgeIdx(null);
  };

  return (
    <section className="py-16 md:py-24 bg-[#FFF9EC] border-t border-[#E8C77A] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
          <Badge variant="gold" size="lg" className="px-4 py-1.5 font-bold uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4 mr-1.5 inline-block" /> बंडल में क्या-क्या मिलेगा? (Product Bundle Items)
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#071A2A] tracking-tight leading-tight">
            डिजिटल रिसोर्सेज का पूरा खजाना
          </h2>
          <p className="text-lg md:text-xl text-[#6B6255] font-normal leading-relaxed">
            हर एक प्रोडक्ट हाई-क्वालिटी एसेट्स, रेडी-टू-यूज फाइल्स और लाइफटाइम एक्सेस के साथ आता है
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const displayPrice = item.individualPrice ?? item.price ?? 499;
            const targetUrl = item.buttonUrl || item.separateCheckoutUrl || 'https://checkout.example.com/pay/109';

            const handleProductClick = (e: React.MouseEvent) => {
              e.preventDefault();
              triggerExternalCheckout(targetUrl, {
                landingPageId,
                slug,
                ctaId: `product-${item.id || idx}`,
                ctaType: 'product',
                productId: item.id || `p-${idx}`,
              });
            };

            return (
              <div
                key={item.id || idx}
                className="rounded-3xl bg-white border-2 border-[#E8C77A] p-6 shadow-md flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 group relative"
              >
                
                {/* Top: Image & Info */}
                <div className="space-y-4">
                  
                  {/* Image Container with contain & Click-to-Edit */}
                  <EditableImage
                    src={item.image}
                    storagePath={item.imageStoragePath}
                    alt={item.title}
                    folderPath={`landing-pages/${landingPageId}/products`}
                    isEditingEnabled={isEditingEnabled}
                    onImageChange={(url, path) => {
                      if (onItemChange) {
                        onItemChange(idx, { ...item, image: url, imageStoragePath: path });
                      }
                    }}
                    className="relative w-full h-52 bg-[#071A2A] rounded-2xl overflow-hidden flex items-center justify-center p-3"
                    imgClassName="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Number & Pricing Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black bg-[#071A2A] text-[#D89A20] px-3 py-1 rounded-md">
                      #{item.number || String(idx + 1).padStart(2, '0')}
                    </span>

                    {/* Interactive Badge / Tag Editor */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          if (isEditingEnabled) {
                            setTempBadge(item.badge || 'Combo Included');
                            setEditingBadgeIdx(idx);
                          }
                        }}
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold transition-all ${
                          isEditingEnabled ? 'cursor-pointer hover:ring-2 hover:ring-[#D89A20]' : ''
                        } ${
                          item.pricingType === 'SEPARATE_PURCHASE'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}
                      >
                        {item.badge || (item.pricingType === 'SEPARATE_PURCHASE' ? 'Separate Purchase' : 'Combo Included')}
                      </button>

                      {editingBadgeIdx === idx && (
                        <div className="absolute right-0 top-7 z-50 bg-[#FFF9EC] border-2 border-[#E8C77A] p-3 rounded-2xl shadow-xl w-48 font-admin text-xs space-y-2">
                          <label className="font-extrabold uppercase text-[#6B6255]">Badge Text</label>
                          <input
                            type="text"
                            value={tempBadge}
                            onChange={(e) => setTempBadge(e.target.value)}
                            className="w-full px-2 py-1 border border-[#E8C77A] rounded-lg font-bold"
                          />
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setEditingBadgeIdx(null)}
                              className="px-2 py-1 text-[#6B6255]"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handleBadgeSave(idx, item)}
                              className="px-3 py-1 bg-[#D89A20] text-[#071A2A] rounded-lg font-black"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-xl font-black text-[#071A2A] leading-snug">
                    <EditableText
                      value={item.title}
                      onChange={(v) => {
                        if (onItemChange) onItemChange(idx, { ...item, title: v });
                      }}
                      isEditingEnabled={isEditingEnabled}
                    />
                  </h3>

                  {/* Product Description */}
                  <p className="text-sm text-[#6B6255] font-medium leading-relaxed">
                    <EditableText
                      value={item.description || item.shortDescription || ''}
                      onChange={(v) => {
                        if (onItemChange) onItemChange(idx, { ...item, description: v, shortDescription: v });
                      }}
                      isEditingEnabled={isEditingEnabled}
                      multiline
                    />
                  </p>
                </div>

                {/* Bottom: Price UI & Button */}
                <div className="pt-6 mt-6 border-t border-[#E8C77A]/60 space-y-4">
                  
                  {/* Price Section with Direct Click Edit */}
                  <div className="flex items-center justify-between relative">
                    <span className="text-sm font-extrabold text-[#6B6255]">Individual Value:</span>
                    
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => {
                          if (isEditingEnabled) {
                            setTempPrice(displayPrice);
                            setEditingPriceIdx(idx);
                          }
                        }}
                        className={`text-2xl sm:text-3xl font-black text-[#071A2A] transition-colors ${
                          isEditingEnabled ? 'hover:text-[#D89A20] cursor-pointer underline decoration-dotted' : ''
                        }`}
                      >
                        ₹{displayPrice}
                      </button>

                      {/* Inline Price Editor Popover */}
                      {editingPriceIdx === idx && (
                        <div className="absolute right-0 bottom-8 z-50 bg-[#FFF9EC] border-2 border-[#E8C77A] p-3 rounded-2xl shadow-xl w-48 font-admin text-xs space-y-2">
                          <label className="font-extrabold uppercase text-[#6B6255]">Set Price (₹)</label>
                          <input
                            type="number"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(Number(e.target.value))}
                            className="w-full px-2 py-1 border border-[#E8C77A] rounded-lg font-bold"
                          />
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setEditingPriceIdx(null)}
                              className="px-2 py-1 text-[#6B6255]"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handlePriceSave(idx, item)}
                              className="px-3 py-1 bg-[#D89A20] text-[#071A2A] rounded-lg font-black"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Buy / Get Bundle CTA Button */}
                  <EditableCTA
                    buttonText={item.buttonText || 'Get Bundle'}
                    buttonUrl={targetUrl}
                    isEditingEnabled={isEditingEnabled}
                    eventData={{
                      landingPageId,
                      slug,
                      ctaId: `product-${item.id || idx}`,
                      ctaType: 'product',
                      productId: item.id || `p-${idx}`,
                    }}
                    onCTAChange={(t, u) => {
                      if (onItemChange) {
                        onItemChange(idx, { ...item, buttonText: t, buttonUrl: u });
                      }
                    }}
                    className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#D89A20] via-[#E0A72B] to-[#E7B33E] hover:from-[#D89A20] hover:to-[#E7B33E] active:from-[#D89A20] active:to-[#E7B33E] focus:from-[#D89A20] focus:to-[#E7B33E] focus-visible:from-[#D89A20] focus-visible:to-[#E7B33E] text-[#071A2A] border border-[#E8C77A] font-black text-sm flex items-center justify-center gap-2 shadow-xl transition-transform transform active:scale-98 cursor-pointer"
                  />

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
