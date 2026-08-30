'use client';

import React, { useState, useEffect } from 'react';
import { listAllStorageMedia, deleteImageFromStorage } from '@/lib/storage';
import { StorageImageData } from '@/types/landing-page';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  FileImage,
  Copy,
  Trash2,
  ExternalLink,
  Loader2,
  CheckCircle,
  RefreshCw,
  Search,
} from 'lucide-react';

export const MediaLibrary: React.FC = () => {
  const [mediaList, setMediaList] = useState<StorageImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [deletingPath, setDeletingPath] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadMedia = async () => {
    setLoading(true);
    try {
      const items = await listAllStorageMedia('landing-pages');
      setMediaList(items);
    } catch (err) {
      console.error('Failed to load media library:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Image URL copied to clipboard!');
  };

  const handleDeleteMedia = async (storagePath: string) => {
    if (!confirm('Are you sure you want to delete this file from Firebase Storage?')) {
      return;
    }

    setDeletingPath(storagePath);
    try {
      await deleteImageFromStorage(storagePath);
      setMediaList((prev) => prev.filter((m) => m.storagePath !== storagePath));
      showToast('Image deleted from Storage.');
    } catch (err) {
      console.error('Delete media error:', err);
      showToast('Failed to delete image.');
    } finally {
      setDeletingPath(null);
    }
  };

  const filteredMedia = mediaList.filter(
    (m) =>
      (m.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.storagePath || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-[#E8C77A] shadow-xs overflow-hidden font-admin lang-en">
      
      {/* Toast Notification */}
      {toast && (
        <div className="bg-[#071A2A] text-[#D89A20] px-6 py-3 text-xs sm:text-sm font-bold flex items-center justify-between border-b border-[#E8C77A]/30 shadow-md">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#D89A20]" />
            <span>{toast}</span>
          </span>
          <span className="text-xs bg-[#D89A20] text-[#071A2A] px-2 py-0.5 rounded font-black">Storage</span>
        </div>
      )}

      {/* Header Controls */}
      <div className="p-5 border-b border-[#E8C77A] flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#071A2A]">Media Library</h3>
          <p className="text-xs text-[#6B6255]">
            Manage all uploaded images stored in Firebase Storage
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-60">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter images..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#FFF8E8] border border-[#E8C77A] focus:outline-none focus:ring-2 focus:ring-[#D89A20]"
            />
          </div>

          <button
            onClick={loadMedia}
            disabled={loading}
            title="Refresh Library"
            className="p-2 rounded-xl border border-[#E8C77A] hover:bg-[#FFF8E8] text-[#071A2A]"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Media Grid / Table */}
      {loading ? (
        <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#D89A20] animate-spin" />
          <p className="text-sm font-bold text-[#6B6255]">Loading Firebase Storage files...</p>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="p-12 text-center flex flex-col items-center justify-center space-y-3 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#FFF8E8] text-[#D89A20] border-2 border-[#E8C77A] flex items-center justify-center">
            <FileImage className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-[#071A2A]">No uploaded media files found</h4>
          <p className="text-xs text-[#6B6255]">
            Images uploaded from the Landing Page builder will automatically appear in this library.
          </p>
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((item, idx) => (
            <div
              key={item.storagePath || idx}
              className="bg-[#FFF9EC] rounded-2xl border border-[#E8C77A] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group"
            >
              {/* Image Thumbnail with object-contain */}
              <div className="relative w-full h-40 bg-[#071A2A] flex items-center justify-center p-2">
                <img
                  src={item.url}
                  alt={item.name || 'Media item'}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info & Actions */}
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#071A2A] truncate" title={item.name}>
                    {item.name || 'Uploaded File'}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 truncate" title={item.storagePath}>
                    {item.storagePath}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#6B6255] font-semibold border-t border-[#E8C77A]/40 pt-2">
                  <span>{item.size ? `${(item.size / 1024).toFixed(1)} KB` : 'Firebase'}</span>
                  <Badge variant="gold" size="sm" className="text-[10px] py-0 px-2">
                    Storage
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => handleCopyUrl(item.url)}
                    className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-[#FFF8E8] border border-[#E8C77A] text-xs font-bold text-[#071A2A] hover:bg-[#D89A20] transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </button>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open Image"
                    className="p-1.5 rounded-lg border border-[#E8C77A] hover:bg-[#FFF8E8] text-[#071A2A]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {item.storagePath && (
                    <button
                      onClick={() => handleDeleteMedia(item.storagePath!)}
                      disabled={deletingPath === item.storagePath}
                      title="Delete File"
                      className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
