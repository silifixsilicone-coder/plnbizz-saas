import React from 'react';
import { ProductFeature } from '@/types/landing-page';
import { Zap, DollarSign, Cloud, Sparkles } from 'lucide-react';

interface FeaturesSectionProps {
  features?: ProductFeature[];
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features = [] }) => {
  const iconMap: Record<string, React.ReactNode> = {
    Zap: <Zap className="w-6 h-6 text-[#D4AF37]" />,
    DollarSign: <DollarSign className="w-6 h-6 text-[#D4AF37]" />,
    Cloud: <Cloud className="w-6 h-6 text-[#D4AF37]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
  };

  return (
    <section className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={feature.id || idx}
              className="p-6 rounded-2xl bg-white border border-[#E2D9CC] shadow-sm flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0B132B] flex items-center justify-center flex-shrink-0 border border-[#D4AF37]/40 shadow">
                {iconMap[feature.icon || 'Zap'] || <Zap className="w-6 h-6 text-[#D4AF37]" />}
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#0B132B]">
                  {feature.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#5A6578] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
