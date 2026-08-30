import React from 'react';
import { FileText, CheckCircle2, Clock, EyeOff } from 'lucide-react';
import { LandingPage } from '@/types/landing-page';

interface StatsOverviewProps {
  pages: LandingPage[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ pages }) => {
  const totalPages = pages.length;
  const publishedCount = pages.filter((p) => p.status === 'published' || p.status === 'PUBLISHED').length;
  const draftCount = pages.filter((p) => p.status === 'draft' || p.status === 'DRAFT').length;
  const unpublishedCount = pages.filter((p) => p.status === 'UNPUBLISHED' || (p.status !== 'published' && p.status !== 'PUBLISHED' && p.status !== 'draft' && p.status !== 'DRAFT')).length;

  const stats = [
    {
      title: 'Total Landing Pages',
      value: totalPages,
      icon: FileText,
      color: 'bg-[#071A2A] text-[#D89A20]',
      border: 'border-[#E8C77A]',
    },
    {
      title: 'Published',
      value: publishedCount,
      icon: CheckCircle2,
      color: 'bg-emerald-600 text-white',
      border: 'border-emerald-200',
    },
    {
      title: 'Draft',
      value: draftCount,
      icon: Clock,
      color: 'bg-amber-500 text-white',
      border: 'border-amber-200',
    },
    {
      title: 'Unpublished',
      value: unpublishedCount,
      icon: EyeOff,
      color: 'bg-slate-700 text-white',
      border: 'border-slate-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-admin lang-en">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className={`p-5 rounded-2xl bg-white border ${stat.border} shadow-xs flex items-center justify-between hover:shadow-md transition-shadow`}
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#6B6255] uppercase tracking-wider">
                {stat.title}
              </span>
              <div className="text-3xl font-black text-[#071A2A]">
                {stat.value}
              </div>
            </div>
            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center shadow-sm`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
