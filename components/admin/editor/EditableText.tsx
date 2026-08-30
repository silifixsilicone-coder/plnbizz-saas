'use client';

import React, { useState, useEffect } from 'react';
import { Edit2, Check, X } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  isEditingEnabled?: boolean;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  label?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  isEditingEnabled = true,
  multiline = false,
  className = '',
  placeholder = 'Click to edit text...',
  label = 'Edit Text',
  as: Component = 'span',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  if (!isEditingEnabled) {
    return <Component className={className}>{value || placeholder}</Component>;
  }

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative inline-block w-full z-20 font-admin my-1">
        {multiline ? (
          <textarea
            autoFocus
            rows={3}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full p-2.5 text-sm font-bold rounded-xl border-2 border-[#D89A20] bg-[#FFF9EC] text-[#071A2A] focus:outline-none shadow-xl"
          />
        ) : (
          <input
            autoFocus
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            className="w-full px-3 py-1.5 text-sm font-bold rounded-lg border-2 border-[#D89A20] bg-[#FFF9EC] text-[#071A2A] focus:outline-none shadow-xl"
          />
        )}

        <div className="flex items-center gap-1.5 mt-1.5 justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="p-1 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1 px-2"
          >
            <X className="w-3 h-3" />
            <span>Cancel</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="p-1 rounded-md bg-[#D89A20] hover:bg-[#E7B33E] text-[#071A2A] text-xs font-extrabold flex items-center gap-1 px-2.5 shadow-sm"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      title="Click to edit text"
      className={`group relative cursor-pointer rounded-lg transition-all duration-200 hover:outline-2 hover:outline-[#D89A20] hover:bg-[#D89A20]/10 ${className}`}
    >
      <Component>{value || placeholder}</Component>
      
      {/* Gold hover badge */}
      <span className="absolute -top-3 -right-2 hidden group-hover:flex items-center gap-1 bg-[#071A2A] text-[#D89A20] text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-[#D89A20] shadow-md z-30 pointer-events-none">
        <Edit2 className="w-2.5 h-2.5" />
        <span>{label}</span>
      </span>
    </div>
  );
};
