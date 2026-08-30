'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';
import {
  getLeads,
  createLead,
  deleteLead,
  exportLeadsToCSV,
  LeadItem,
} from '@/lib/leads';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Users,
  Search,
  Download,
  Plus,
  Eye,
  Trash2,
  Loader2,
  Mail,
  Phone,
  AlertTriangle,
} from 'lucide-react';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ id: string; name: string } | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateTestLead = async () => {
    setActionLoading('test');
    try {
      await createLead({
        name: 'Test Lead User',
        email: `lead.${Date.now()}@example.com`,
        phone: '9876543210',
        landingPageSlug: 'ultimate-bundle',
        source: 'admin_test',
      });
      showToast('Admin Test Lead created.');
      await loadData();
    } catch (err) {
      console.error('Failed to create lead:', err);
      showToast('Failed to create lead.');
    } finally {
      setActionLoading(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteModal) return;
    setActionLoading(deleteModal.id);
    try {
      await deleteLead(deleteModal.id);
      setLeads((prev) => prev.filter((l) => l.id !== deleteModal.id));
      showToast('Lead deleted successfully.');
    } catch (err) {
      console.error('Delete failed:', err);
      showToast('Failed to delete lead.');
    } finally {
      setActionLoading(null);
      setDeleteModal(null);
    }
  };

  const filteredLeads = leads.filter((l) => {
    return (
      search === '' ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.landingPageSlug.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <AdminLayoutWrapper
      title="Lead Management"
      description="View, search, manage, and export captured lead form submissions"
    >
      <div className="space-y-6 font-admin lang-en text-[#071A2A]">
        
        {/* Toast Notification */}
        {toast && (
          <div className="bg-[#071A2A] text-[#D89A20] px-6 py-3 text-xs sm:text-sm font-bold flex items-center justify-between border-b border-[#E8C77A]/30 shadow-md">
            <span>{toast}</span>
            <span className="text-xs bg-[#D89A20] text-[#071A2A] px-2 py-0.5 rounded font-black">Leads</span>
          </div>
        )}

        {/* Header Controls */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          
          {/* Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads by name, email, phone, landing page..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#FFF8E8] border border-[#E8C77A] focus:outline-none focus:ring-2 focus:ring-[#D89A20]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCreateTestLead}
              className="text-xs border-[#E8C77A] font-bold"
            >
              <Plus className="w-4 h-4 mr-1 text-[#D89A20]" />
              <span>+ Create Test Lead</span>
            </Button>

            <button
              onClick={() => exportLeadsToCSV(filteredLeads)}
              disabled={filteredLeads.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#071A2A] text-white text-xs font-bold hover:bg-[#0A2236] transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-[#D89A20]" />
              <span>Export CSV</span>
            </button>
          </div>

        </div>

        {/* Table View */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#D89A20] animate-spin" />
              <p className="text-sm font-bold text-[#6B6255]">Loading leads...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            /* Empty State (Requirement 37) */
            <div className="p-12 text-center flex flex-col items-center justify-center space-y-3 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-[#FFF8E8] text-[#D89A20] border-2 border-[#E8C77A] flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#071A2A]">No leads yet</h4>
              <p className="text-xs text-[#6B6255] leading-relaxed">
                Lead submissions will appear here once users submit lead capture forms.
              </p>
              <Button
                variant="gold"
                size="sm"
                onClick={handleCreateTestLead}
                className="bg-[#D89A20] font-bold"
              >
                + Create Test Lead
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FFF8E8] border-b border-[#E8C77A] text-[11px] font-extrabold uppercase text-[#6B6255] tracking-wider">
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-4">Email</th>
                    <th className="py-4 px-4">Phone</th>
                    <th className="py-4 px-4">Landing Page</th>
                    <th className="py-4 px-4">Created</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8C77A]/60 text-xs sm:text-sm">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#FFF9EC] transition-colors">
                      
                      {/* Name */}
                      <td className="py-4 px-6 font-bold text-[#071A2A]">{lead.name}</td>

                      {/* Email */}
                      <td className="py-4 px-4 text-xs font-semibold text-slate-700">
                        {lead.email}
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-4 font-mono text-xs">{lead.phone || '—'}</td>

                      {/* Landing Page */}
                      <td className="py-4 px-4 font-mono text-xs text-[#D89A20] font-bold">
                        /lp/{lead.landingPageSlug}
                      </td>

                      {/* Created */}
                      <td className="py-4 px-4 text-xs text-[#6B6255]">
                        {lead.createdAt.slice(0, 10)}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/leads/${lead.id}`}
                            title="View Lead Details"
                            className="p-2 rounded-lg text-slate-600 hover:bg-[#FFF8E8] transition-colors"
                          >
                            <Eye className="w-4 h-4 text-indigo-600" />
                          </Link>

                          <button
                            onClick={() => setDeleteModal({ id: lead.id, name: lead.name })}
                            title="Delete Lead"
                            className="p-2 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-6 space-y-4 shadow-2xl font-admin">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#071A2A]">Delete lead?</h4>
            </div>

            <p className="text-xs text-[#6B6255] leading-relaxed">
              Are you sure you want to delete lead <strong className="text-[#071A2A]">"{deleteModal.name}"</strong>? This action cannot be undone.
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
                Delete Lead
              </Button>
            </div>
          </div>
        </div>
      )}

    </AdminLayoutWrapper>
  );
}
