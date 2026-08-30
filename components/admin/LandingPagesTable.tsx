'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LandingPage } from '@/types/landing-page';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  getLandingPages,
  deleteLandingPage,
  duplicateLandingPage,
  toggleLandingPageStatus,
} from '@/lib/firestore';
import {
  Eye,
  Edit,
  Copy,
  CheckCircle,
  EyeOff,
  Trash2,
  ExternalLink,
  Plus,
  Loader2,
  AlertTriangle,
  FileText,
  Link2,
} from 'lucide-react';

interface LandingPagesTableProps {
  initialPages?: LandingPage[];
}

export const LandingPagesTable: React.FC<LandingPagesTableProps> = ({ initialPages }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const [pages, setPages] = useState<LandingPage[]>(initialPages || []);
  const [loading, setLoading] = useState<boolean>(true);
  const [toast, setToast] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string; name: string } | null>(null);
  const [unpublishModal, setUnpublishModal] = useState<{ isOpen: boolean; id: string; name: string } | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getLandingPages();
      setPages(data);
    } catch (err) {
      console.error('Failed to load landing pages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopyLink = (slug: string) => {
    const fullUrl = `${siteUrl}/lp/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    showToast('Link copied successfully.');
  };

  const handleToggleStatus = async (id: string, currentStatus: 'draft' | 'published') => {
    setActionLoading(id);
    try {
      const newStatus = await toggleLandingPageStatus(id, currentStatus);
      setPages((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus, updatedAt: 'Just now' } : p))
      );
      showToast(
        newStatus === 'published'
          ? 'Landing page published successfully.'
          : 'Landing page unpublished successfully.'
      );
    } catch (err) {
      console.error('Status toggle failed:', err);
      showToast('Failed to update status.');
    } finally {
      setActionLoading(null);
      setUnpublishModal(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    setActionLoading(id);
    try {
      await duplicateLandingPage(id);
      showToast('Landing page duplicated successfully.');
      await loadData();
    } catch (err) {
      console.error('Duplicate failed:', err);
      showToast('Failed to duplicate landing page.');
    } finally {
      setActionLoading(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteModal) return;
    setActionLoading(deleteModal.id);
    try {
      await deleteLandingPage(deleteModal.id);
      setPages((prev) => prev.filter((p) => p.id !== deleteModal.id));
      showToast('Landing page deleted successfully.');
    } catch (err) {
      console.error('Delete failed:', err);
      showToast('Failed to delete landing page.');
    } finally {
      setActionLoading(null);
      setDeleteModal(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const isPub = status === 'published' || status === 'PUBLISHED';
    const isUnpub = status === 'UNPUBLISHED';

    if (isPub) return <Badge variant="success">Published</Badge>;
    if (isUnpub) return <Badge variant="navy">Unpublished</Badge>;
    return <Badge variant="warning">Draft</Badge>;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8C77A] shadow-xs overflow-hidden font-admin lang-en">
      
      {/* Toast Notification */}
      {toast && (
        <div className="bg-[#071A2A] text-[#D89A20] px-6 py-3 text-xs sm:text-sm font-bold flex items-center justify-between border-b border-[#E8C77A]/30 shadow-md">
          <span>{toast}</span>
          <span className="text-xs bg-[#D89A20] text-[#071A2A] px-2 py-0.5 rounded font-black">PLNBIZZ CMS</span>
        </div>
      )}

      {/* Table Header */}
      <div className="p-5 border-b border-[#E8C77A] flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#071A2A]">Landing Pages</h3>
          <p className="text-xs text-[#6B6255]">
            Manage, edit, publish, preview, and share dynamic landing pages
          </p>
        </div>
        
        <Link
          href="/admin/landing-pages/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D89A20] hover:bg-[#E7B33E] text-[#071A2A] text-xs sm:text-sm font-extrabold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Landing Page</span>
        </Link>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#D89A20] animate-spin" />
          <p className="text-sm font-bold text-[#6B6255]">Loading landing pages from Firestore...</p>
        </div>
      ) : pages.length === 0 ? (
        <div className="p-12 text-center flex flex-col items-center justify-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#FFF8E8] text-[#D89A20] border-2 border-[#E8C77A] flex items-center justify-center">
            <FileText className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-[#071A2A]">No landing pages yet</h4>
            <p className="text-xs text-[#6B6255] leading-relaxed">
              Create your first landing page to get started with custom digital bundle pages.
            </p>
          </div>
          <Link href="/admin/landing-pages/new">
            <Button variant="gold" size="md" className="font-extrabold bg-[#D89A20]">
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Create Landing Page</span>
            </Button>
          </Link>
        </div>
      ) : (
        /* Table View */
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFF8E8] border-b border-[#E8C77A] text-[11px] font-extrabold uppercase text-[#6B6255] tracking-wider">
                <th className="py-4 px-6">Landing Page Name</th>
                <th className="py-4 px-4">Slug / Public URL</th>
                <th className="py-4 px-4">Checkout Links</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Updated</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8C77A]/60 text-xs sm:text-sm">
              {pages.map((page) => {
                const isPub = page.status === 'published' || page.status === 'PUBLISHED';
                const isItemLoading = actionLoading === page.id;

                return (
                  <tr key={page.id} className="hover:bg-[#FFF9EC] transition-colors">
                    
                    {/* Landing Page Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {page.hero?.heroImage || page.productImage ? (
                          <img
                            src={page.hero?.heroImage || page.productImage}
                            alt={page.name}
                            className="w-10 h-10 rounded-lg object-contain bg-[#071A2A]/5 border border-[#E8C77A]"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-[#071A2A] text-[#D89A20] font-black flex items-center justify-center text-xs">
                            LP
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-[#071A2A]">{page.name || page.productName}</div>
                          <div className="text-[11px] text-[#6B6255] line-clamp-1 max-w-xs">
                            {page.hero?.description || page.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="py-4 px-4 font-mono text-xs text-[#071A2A]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-700">/lp/{page.slug}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyLink(page.slug)}
                          title="Copy Public Link"
                          className="p-1 text-slate-400 hover:text-[#D89A20] transition-colors"
                        >
                          <Link2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Checkout Links Status (Requirement 23 & 24) */}
                    <td className="py-4 px-4 font-bold text-[#071A2A]">
                      {(() => {
                        const totalCTAs = 1 + (page.products || []).length;
                        const heroValid = page.hero?.buttonUrl?.startsWith('http') ? 1 : 0;
                        const prodsValid = (page.products || []).filter((p) => p.buttonUrl?.startsWith('http')).length;
                        const validCount = heroValid + prodsValid;
                        const isComplete = validCount === totalCTAs;

                        return (
                          <div className="flex items-center gap-1.5">
                            <span className={`text-xs font-black ${isComplete ? 'text-emerald-700' : 'text-amber-700'}`}>
                              {validCount} / {totalCTAs} links
                            </span>
                            {!isComplete && (
                              <span title="Checkout link missing or invalid" className="text-amber-600">
                                <AlertTriangle className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                        );
                      })()}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">{getStatusBadge(page.status)}</td>

                    {/* Updated */}
                    <td className="py-4 px-4 text-xs text-[#6B6255]">
                      {typeof page.updatedAt === 'string' ? page.updatedAt.slice(0, 10) : 'Recently'}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1 sm:gap-1.5">
                        
                        {/* Copy Link */}
                        <button
                          type="button"
                          onClick={() => handleCopyLink(page.slug)}
                          title="Copy Link"
                          className="p-2 rounded-lg text-slate-600 hover:bg-[#FFF8E8] transition-colors"
                        >
                          <Link2 className="w-4 h-4 text-amber-600" />
                        </button>

                        {/* Open Link (Public) */}
                        {isPub && (
                          <a
                            href={`/lp/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open Public Link"
                            className="p-2 rounded-lg text-slate-600 hover:bg-[#FFF8E8] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-slate-600" />
                          </a>
                        )}

                        {/* Protected Admin Preview */}
                        <Link
                          href={`/admin/landing-pages/${page.id}/preview`}
                          target="_blank"
                          title="Protected Admin Preview"
                          className="p-2 rounded-lg text-slate-600 hover:bg-[#FFF8E8] transition-colors"
                        >
                          <Eye className="w-4 h-4 text-indigo-600" />
                        </Link>

                        {/* Edit */}
                        <Link
                          href={`/admin/landing-pages/${page.id}/edit`}
                          title="Direct On-Page Editor"
                          className="p-2 rounded-lg text-slate-600 hover:bg-[#FFF8E8] transition-colors"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </Link>

                        {/* Duplicate */}
                        <button
                          onClick={() => handleDuplicate(page.id)}
                          disabled={isItemLoading}
                          title="Duplicate Landing Page"
                          className="p-2 rounded-lg text-slate-600 hover:bg-[#FFF8E8] transition-colors disabled:opacity-50"
                        >
                          <Copy className="w-4 h-4 text-amber-600" />
                        </button>

                        {/* Publish / Unpublish */}
                        <button
                          onClick={() => {
                            if (isPub) {
                              setUnpublishModal({ isOpen: true, id: page.id, name: page.name || page.productName || 'Landing Page' });
                            } else {
                              handleToggleStatus(page.id, 'draft');
                            }
                          }}
                          disabled={isItemLoading}
                          title={isPub ? 'Unpublish' : 'Publish'}
                          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
                        >
                          {isPub ? (
                            <EyeOff className="w-4 h-4 text-slate-600" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          )}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, id: page.id, name: page.name || page.productName || 'Landing Page' })}
                          disabled={isItemLoading}
                          title="Delete Landing Page"
                          className="p-2 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Unpublish Confirmation Modal (Requirement 11) */}
      {unpublishModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-6 space-y-4 shadow-2xl">
            <h4 className="text-lg font-bold text-[#071A2A]">Unpublish this landing page?</h4>
            <p className="text-xs text-[#6B6255] leading-relaxed">
              Unpublishing <strong>"{unpublishModal.name}"</strong> will remove it from public view. Public visitors will see a 404 page.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setUnpublishModal(null)}
                className="px-4 py-2 text-xs font-bold text-[#6B6255] hover:bg-[#FFF8E8] rounded-xl"
              >
                Cancel
              </button>
              <Button
                variant="gold"
                size="sm"
                onClick={() => handleToggleStatus(unpublishModal.id, 'published')}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 text-xs"
              >
                Unpublish Page
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#071A2A]">Delete landing page?</h4>
            </div>

            <p className="text-xs text-[#6B6255] leading-relaxed">
              Are you sure you want to delete <strong className="text-[#071A2A]">"{deleteModal.name}"</strong>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2 text-xs font-bold text-[#6B6255] hover:bg-[#FFF8E8] rounded-xl"
              >
                Cancel
              </button>
              <Button
                variant="gold"
                size="sm"
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 text-xs"
              >
                Delete Page
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
