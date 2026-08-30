'use client';

import React, { useState, useRef } from 'react';
import {
  uploadImageToStorage,
  replaceImageInStorage,
  deleteImageFromStorage,
  validateImageFile,
} from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import {
  Upload,
  RefreshCw,
  Trash2,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  Link as LinkIcon,
} from 'lucide-react';

interface ImageUploaderProps {
  value?: string;
  storagePath?: string;
  folderPath?: string;
  label?: string;
  onUploadSuccess: (result: { url: string; storagePath: string }) => void;
  onRemove: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value = '',
  storagePath = '',
  folderPath = 'landing-pages/general',
  label = 'Upload Image',
  onUploadSuccess,
  onRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);

  const showSuccessToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file.');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      if (value && storagePath) {
        // Replace existing image: Upload new first, then delete old
        const result = await replaceImageInStorage(file, storagePath, folderPath, (pct) => {
          setProgress(pct);
        });
        onUploadSuccess({ url: result.url, storagePath: result.storagePath });
        showSuccessToast('Image replaced successfully.');
      } else {
        // New Upload
        const result = await uploadImageToStorage(file, folderPath, (pct) => {
          setProgress(pct);
        });
        onUploadSuccess({ url: result.url, storagePath: result.storagePath });
        showSuccessToast('Image uploaded successfully.');
      }
    } catch (err: any) {
      console.error('Upload Error:', err);
      setError(err.message || 'Image upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveConfirm = async () => {
    setDeleteModal(false);
    if (storagePath) {
      try {
        await deleteImageFromStorage(storagePath);
      } catch (err) {
        console.warn('Could not delete storage file:', err);
      }
    }
    onRemove();
    showSuccessToast('Image removed.');
  };

  const handleManualUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;
    onUploadSuccess({ url: manualUrl.trim(), storagePath: '' });
    setShowUrlInput(false);
    showSuccessToast('Image URL saved.');
  };

  return (
    <div className="space-y-3 font-admin text-[#071A2A]">
      {label && (
        <label className="text-xs font-bold uppercase tracking-wider text-[#6B6255] flex items-center justify-between">
          <span>{label}</span>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] text-[#D89A20] hover:underline font-bold inline-flex items-center gap-1"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? 'Hide URL Input' : 'Paste External URL'}</span>
          </button>
        </label>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Toast Notification */}
      {toast && (
        <div className="p-2.5 rounded-xl bg-[#071A2A] text-[#D89A20] text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#D89A20]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* External URL Input Modal/Bar */}
      {showUrlInput && (
        <form onSubmit={handleManualUrlSubmit} className="flex gap-2">
          <input
            type="url"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E8C77A] bg-white font-mono"
          />
          <Button type="submit" variant="navy" size="sm" className="text-xs">
            Save URL
          </Button>
        </form>
      )}

      {/* Image Preview & Actions Area */}
      {value ? (
        <div className="relative rounded-2xl border-2 border-[#E8C77A] bg-[#FFF9EC] p-3 space-y-3 shadow-xs">
          
          {/* Image Container with object-contain */}
          <div className="relative w-full h-44 sm:h-52 bg-[#071A2A] rounded-xl overflow-hidden flex items-center justify-center p-2">
            <img
              src={value}
              alt="Uploaded Resource"
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FFF8E8] border border-[#E8C77A] text-xs font-bold text-[#071A2A] hover:bg-[#D89A20] hover:text-[#071A2A] transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${uploading ? 'animate-spin' : ''}`} />
              <span>{uploading ? `Replacing (${progress}%)` : 'Replace Image'}</span>
            </button>

            <button
              type="button"
              disabled={uploading}
              onClick={() => setDeleteModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Image</span>
            </button>
          </div>

        </div>
      ) : (
        /* Dropzone / Upload Box */
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed border-[#E8C77A] hover:border-[#D89A20] rounded-2xl p-6 bg-[#FFF9EC] text-center flex flex-col items-center justify-center space-y-3 cursor-pointer transition-all ${
            uploading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="w-8 h-8 text-[#D89A20] animate-spin" />
              <span className="text-xs font-extrabold text-[#071A2A]">
                Uploading to Firebase Storage... {progress}%
              </span>
              <div className="w-48 bg-[#E8C77A]/40 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#D89A20] h-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8E8] border border-[#E8C77A] text-[#D89A20] flex items-center justify-center shadow-xs">
                <Upload className="w-6 h-6" />
              </div>

              <div>
                <p className="text-sm font-extrabold text-[#071A2A]">
                  Click to Upload Image
                </p>
                <p className="text-[11px] text-[#6B6255] font-medium mt-0.5">
                  JPG, PNG, WEBP up to 10 MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-6 space-y-4 shadow-2xl">
            <h4 className="text-base font-bold text-[#071A2A]">Remove this image?</h4>
            <p className="text-xs text-[#6B6255]">
              This will remove the image from this landing page.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 text-xs font-bold text-[#6B6255] hover:bg-[#FFF8E8] rounded-xl"
              >
                Cancel
              </button>
              <Button
                type="button"
                variant="gold"
                size="sm"
                onClick={handleRemoveConfirm}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 text-xs"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
