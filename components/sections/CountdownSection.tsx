'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { EditableText } from '@/components/admin/editor/EditableText';

interface CountdownSectionProps {
  data: {
    title?: string;
    endDate?: string;
  };
  isEditingEnabled?: boolean;
  onDataChange?: (newData: any) => void;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  data,
  isEditingEnabled = false,
  onDataChange,
}) => {
  const title = data?.title || 'विशेष ऑफर समाप्त होने में बचा समय:';
  const endDate = data?.endDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const [timeLeft, setTimeLeft] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        setTimeLeft({ hours: '00', minutes: '00', seconds: '00', isExpired: true });
        return;
      }

      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
        isExpired: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <section className="py-8 bg-[#071A2A] text-white border-y-2 border-[#D89A20] font-admin">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        
        <div className="flex items-center justify-center gap-2 text-[#D89A20] text-xs font-black uppercase tracking-wider">
          <Clock className="w-4 h-4" />
          <EditableText
            value={title}
            onChange={(v) => onDataChange && onDataChange({ ...data, title: v })}
            isEditingEnabled={isEditingEnabled}
          />
        </div>

        {timeLeft.isExpired ? (
          <div className="text-xl font-black text-red-400">Offer Expired (ऑफर समाप्त हो गया है)</div>
        ) : (
          <div className="flex items-center justify-center gap-3 font-mono text-2xl sm:text-4xl font-black">
            <div className="bg-[#0D2436] px-4 py-2 rounded-2xl border border-[#D89A20]/40 text-[#D89A20] min-w-[70px]">
              <div>{timeLeft.hours}</div>
              <span className="text-[10px] text-slate-400 font-sans uppercase font-bold block -mt-1">Hours</span>
            </div>
            <span className="text-[#D89A20] animate-pulse">:</span>
            <div className="bg-[#0D2436] px-4 py-2 rounded-2xl border border-[#D89A20]/40 text-[#D89A20] min-w-[70px]">
              <div>{timeLeft.minutes}</div>
              <span className="text-[10px] text-slate-400 font-sans uppercase font-bold block -mt-1">Mins</span>
            </div>
            <span className="text-[#D89A20] animate-pulse">:</span>
            <div className="bg-[#0D2436] px-4 py-2 rounded-2xl border border-[#D89A20]/40 text-[#D89A20] min-w-[70px]">
              <div>{timeLeft.seconds}</div>
              <span className="text-[10px] text-slate-400 font-sans uppercase font-bold block -mt-1">Secs</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
