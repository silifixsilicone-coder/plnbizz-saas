'use client';

import React, { useState } from 'react';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { Camera, X } from 'lucide-react';

interface EditableImageProps {
  src: string;
  storagePath?: string;
  alt?: string;
  folderPath?: string;
  isEditingEnabled?: boolean;
  onImageChange: (url: string, storagePath: string) => void;
  onImageRemove?: () => void;
  className?: string;
  imgClassName?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  storagePath = '',
  alt = 'Editable Image',
  folderPath = 'landing-pages/general',
  isEditingEnabled = true,
  onImageChange,
  onImageRemove,
  className = '',
  imgClassName = '',
}) => {
  const [showModal, setShowModal] = useState(false);

  if (!isEditingEnabled) {
    return (
      <div className={className}>
        <img src={src} alt={alt} className={imgClassName} />
      </div>
    );
  }

  return (
    <div className={`group relative cursor-pointer ${className}`}>
      {/* Target Image */}
      <img src={src} alt={alt} className={imgClassName} />

      {/* Gold Outline & Label overlay on hover */}
      <div
        onClick={() => setShowModal(true)}
        className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#D89A20] group-hover:bg-[#071A2A]/40 backdrop-blur-[1px] transition-all flex items-center justify-center"
      >
        <span className="hidden group-hover:inline-flex items-center gap-1.5 bg-[#071A2A] text-[#D89A20] border border-[#D89A20] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-xl">
          <Camera className="w-4 h-4" />
          <span>Click to Edit Image</span>
        </span>
      </div>

      {/* Inline Image Upload Control Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-[#071A2A]">Edit Image</h4>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ImageUploader
              label="Firebase Storage Image Upload"
              value={src}
              storagePath={storagePath}
              folderPath={folderPath}
              onUploadSuccess={(res) => {
                onImageChange(res.url, res.storagePath);
                setShowModal(false);
              }}
              onRemove={() => {
                if (onImageRemove) onImageRemove();
                setShowModal(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
