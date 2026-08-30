'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';
import { LandingPagesTable } from '@/components/admin/LandingPagesTable';
import { getLandingPages } from '@/lib/firestore';
import { LandingPage } from '@/types/landing-page';
import { Plus, Search, Filter, ArrowUpDown } from 'lucide-react';

export default function AdminLandingPagesPage() {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recently-updated');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getLandingPages();
        setPages(data);
      } catch (err) {
        console.error('Failed to load pages:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredPages = pages
    .filter((p) => {
      const matchesSearch =
        search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase());

      const isPub = p.status === 'published' || p.status === 'PUBLISHED';
      const isDraft = p.status === 'draft' || p.status === 'DRAFT';
      const isUnpub = p.status === 'UNPUBLISHED';

      let matchesStatus = true;
      if (statusFilter === 'published') matchesStatus = isPub;
      if (statusFilter === 'draft') matchesStatus = isDraft;
      if (statusFilter === 'unpublished') matchesStatus = isUnpub;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'oldest-updated') {
        return new Date(a.updatedAt || 0).getTime() - new Date(b.updatedAt || 0).getTime();
      }
      return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
    });

  return (
    <AdminLayoutWrapper
      title="Landing Pages Management"
      description="Create, search, filter, publish, edit, preview, and delete single-domain landing pages"
    >
      <div className="space-y-6 font-admin lang-en text-[#071A2A]">
        
        {/* Controls Header */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search landing pages..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#FFF8E8] border border-[#E8C77A] focus:outline-none focus:ring-2 focus:ring-[#D89A20] font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs font-bold rounded-xl border border-[#E8C77A] bg-[#FFF8E8] focus:outline-none text-[#071A2A]"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="unpublished">Unpublished</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-xs font-bold rounded-xl border border-[#E8C77A] bg-[#FFF8E8] focus:outline-none text-[#071A2A]"
              >
                <option value="recently-updated">Recently Updated</option>
                <option value="oldest-updated">Oldest Updated</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
              </select>
            </div>

            <Link
              href="/admin/landing-pages/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D89A20] hover:bg-[#E7B33E] text-[#071A2A] text-xs font-extrabold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Landing Page</span>
            </Link>
          </div>
        </div>

        {/* Table View */}
        <LandingPagesTable initialPages={filteredPages} />

      </div>
    </AdminLayoutWrapper>
  );
}
