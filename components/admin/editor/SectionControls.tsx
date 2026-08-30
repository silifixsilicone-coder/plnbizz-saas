'use client';

import React from 'react';
import { Eye, EyeOff, Layers } from 'lucide-react';

interface SectionControlsProps {
  title: string;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

export const SectionControls: React.FC<SectionControlsProps> = ({
  title,
  isVisible,
  onToggleVisibility,
}) => {
  return (
    <div className="absolute top-3 right-3 z-30 font-admin">
      <div className="bg-[#071A2A] text-white border border-[#D89A20] rounded-xl px-3 py-1.5 shadow-xl flex items-center gap-2 text-xs font-bold">
        <Layers className="w-3.5 h-3.5 text-[#D89A20]" />
        <span className="hidden sm:inline text-[#D89A20]">{title}</span>

        <button
          type="button"
          onClick={onToggleVisibility}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-extrabold transition-colors ${
            isVisible
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
          }`}
        >
          {isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          <span>{isVisible ? 'Visible' : 'Hidden'}</span>
        </button>
      </div>
    </div>
  );
};
