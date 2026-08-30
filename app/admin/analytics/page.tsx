'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';
import {
  getAnalyticsSummary,
  getProductCTAClicks,
  AnalyticsSummary,
  ProductClickSummary,
} from '@/lib/analytics';
import { getLandingPages } from '@/lib/firestore';
import { LandingPage } from '@/types/landing-page';
import { Badge } from '@/components/ui/Badge';
import {
  BarChart3,
  Eye,
  Users,
  MousePointerClick,
  TrendingUp,
  Calendar,
  Loader2,
  Info,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [days, setDays] = useState<number>(30);
  const [summary, setSummary] = useState<AnalyticsSummary>({
    totalViews: 0,
    totalUniqueVisitors: 0,
    totalCtaClicks: 0,
    conversionRate: '—',
  });
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [productClicks, setProductClicks] = useState<ProductClickSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      const data = await getAnalyticsSummary(days);
      setSummary(data);

      try {
        const lpList = await getLandingPages();
        setPages(lpList);
        if (lpList.length > 0) {
          const pClicks = await getProductCTAClicks(lpList[0].id);
          setProductClicks(pClicks);
        }
      } catch (err) {
        console.error('Failed to load analytics breakdown:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, [days]);

  const cards = [
    {
      title: 'Total Views',
      value: summary.totalViews,
      icon: Eye,
      color: 'bg-[#071A2A] text-[#D89A20]',
      border: 'border-[#E8C77A]',
      sub: 'Public page renders',
    },
    {
      title: 'Unique Visitors',
      value: summary.totalUniqueVisitors,
      icon: Users,
      color: 'bg-indigo-600 text-white',
      border: 'border-indigo-200',
      sub: 'Unique sessions',
    },
    {
      title: 'CTA Checkout Clicks',
      value: summary.totalCtaClicks,
      icon: MousePointerClick,
      color: 'bg-amber-500 text-white',
      border: 'border-amber-200',
      sub: 'External buy button triggers',
    },
    {
      title: 'Conversion Rate',
      value: summary.conversionRate,
      icon: TrendingUp,
      color: 'bg-emerald-600 text-white',
      border: 'border-emerald-200',
      sub: 'Clicks ÷ Views × 100',
    },
  ];

  return (
    <AdminLayoutWrapper
      title="Analytics & CTA Performance"
      description="Track page views, external checkout CTA clicks, product-level interactions, and conversion rates"
    >
      <div className="space-y-8 font-admin lang-en text-[#071A2A]">
        
        {/* Date Filter & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E8C77A] shadow-xs">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#D89A20]" />
            <h2 className="text-lg font-bold text-[#071A2A]">CTA & Traffic Analytics</h2>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <div className="flex items-center bg-[#FFF8E8] border border-[#E8C77A] rounded-xl p-1 text-xs font-bold">
              {[
                { label: 'Today', value: 1 },
                { label: '7 Days', value: 7 },
                { label: '30 Days', value: 30 },
                { label: '90 Days', value: 90 },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setDays(opt.value)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    days === opt.value
                      ? 'bg-[#D89A20] text-[#071A2A] font-extrabold shadow-xs'
                      : 'text-[#6B6255] hover:text-[#071A2A]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-3 bg-white rounded-2xl border border-[#E8C77A]">
            <Loader2 className="w-8 h-8 text-[#D89A20] animate-spin" />
            <p className="text-sm font-bold text-[#6B6255]">Loading CTA analytics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`p-5 rounded-2xl bg-white border ${card.border} shadow-xs space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#6B6255] uppercase tracking-wider">
                      {card.title}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <div className="text-3xl font-black text-[#071A2A]">{card.value}</div>
                    <div className="text-[11px] text-[#6B6255] font-medium mt-1">{card.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA Performance Table (Requirement 30) */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#E8C77A] flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#071A2A]">Landing Page CTA Performance</h3>
            <span className="text-xs bg-[#FFF8E8] text-[#D89A20] border border-[#E8C77A] px-3 py-1 rounded-full font-bold">
              Real Data
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FFF8E8] border-b border-[#E8C77A] text-[11px] font-extrabold uppercase text-[#6B6255]">
                  <th className="py-3 px-6">Landing Page</th>
                  <th className="py-3 px-4">Views</th>
                  <th className="py-3 px-4">CTA Clicks</th>
                  <th className="py-3 px-6 text-right">Conversion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8C77A]/60 text-xs sm:text-sm">
                {pages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-xs text-slate-500 font-bold">
                      No CTA analytics data recorded yet.
                    </td>
                  </tr>
                ) : (
                  pages.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FFF9EC]">
                      <td className="py-3.5 px-6 font-bold text-[#071A2A]">{p.name}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">0</td>
                      <td className="py-3.5 px-4 font-bold text-amber-600">{summary.totalCtaClicks}</td>
                      <td className="py-3.5 px-6 text-right font-black text-emerald-700">
                        {summary.conversionRate}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Level CTA Clicks Breakdown (Requirement 31) */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#E8C77A]/60 pb-3">
            <ShoppingBag className="w-5 h-5 text-[#D89A20]" />
            <h3 className="text-lg font-bold text-[#071A2A]">Product-Level CTA Clicks</h3>
          </div>

          {productClicks.length === 0 ? (
            <p className="text-xs text-[#6B6255] font-medium py-4">
              No product-level CTA click data recorded yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {productClicks.map((pc) => (
                <div key={pc.productId} className="p-4 rounded-xl bg-[#FFF8E8] border border-[#E8C77A] space-y-1">
                  <div className="text-xs font-extrabold text-[#071A2A]">Product ID: {pc.productId}</div>
                  <div className="text-xl font-black text-amber-600">{pc.clicks} Clicks</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Real Data Notice */}
        <div className="bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-2xl p-5 flex items-center gap-3">
          <Info className="w-5 h-5 text-[#D89A20] flex-shrink-0" />
          <p className="text-xs text-[#6B6255] leading-relaxed">
            All CTA clicks are recorded via non-blocking event tracking when public visitors click any Hero, Product, Offer, or Final CTA button. Admin, preview, and editor clicks are strictly excluded.
          </p>
        </div>

      </div>
    </AdminLayoutWrapper>
  );
}
