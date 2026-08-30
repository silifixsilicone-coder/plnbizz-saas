'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';
import { LandingPagesTable } from '@/components/admin/LandingPagesTable';
import { getLandingPages } from '@/lib/firestore';
import { getOrders, calculateTotalRevenue, OrderItem } from '@/lib/orders';
import { getLeads, LeadItem } from '@/lib/leads';
import { LandingPage } from '@/types/landing-page';
import {
  FileText,
  CheckCircle2,
  Clock,
  EyeOff,
  ShoppingBag,
  Plus,
  FileImage,
  Settings,
  BarChart3,
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  Users,
  DollarSign,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Search, Filter & Sort State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recently-updated');

  const loadData = async () => {
    setLoading(true);
    try {
      const [lpData, orderData, leadData] = await Promise.all([
        getLandingPages(),
        getOrders(),
        getLeads(),
      ]);
      setPages(lpData);
      setOrders(orderData);
      setLeads(leadData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute Real Firestore Metric Counts
  const totalPages = pages.length;
  const publishedCount = pages.filter((p) => p.status === 'published' || p.status === 'PUBLISHED').length;
  const draftCount = pages.filter((p) => p.status === 'draft' || p.status === 'DRAFT').length;

  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const paidOrdersCount = orders.filter((o) => o.status === 'paid' || o.status === ('PAID' as any)).length;
  const totalLeadsCount = leads.length;
  const realRevenue = calculateTotalRevenue(orders);

  // Search, Filter, Sort Logic
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

  const statsCards = [
    {
      title: 'Total Pages',
      value: totalPages,
      sub: `${publishedCount} Published, ${draftCount} Drafts`,
      icon: FileText,
      color: 'bg-[#071A2A] text-[#D89A20]',
      border: 'border-[#E8C77A]',
    },
    {
      title: 'Total Orders',
      value: totalOrdersCount,
      sub: `${paidOrdersCount} Paid, ${pendingOrdersCount} Pending`,
      icon: ShoppingBag,
      color: 'bg-indigo-600 text-white',
      border: 'border-indigo-200',
    },
    {
      title: 'Real Revenue',
      value: `₹${realRevenue}`,
      sub: 'Paid non-test orders sum',
      icon: DollarSign,
      color: 'bg-emerald-600 text-white',
      border: 'border-emerald-200',
    },
    {
      title: 'Total Leads',
      value: totalLeadsCount,
      sub: 'Captured lead submissions',
      icon: Users,
      color: 'bg-amber-500 text-white',
      border: 'border-amber-200',
    },
  ];

  return (
    <AdminLayoutWrapper
      title="Dashboard Overview"
      description="System metrics, real-time Firestore counts, orders, leads, and quick management"
    >
      <div className="space-y-8 font-admin lang-en text-[#071A2A]">
        
        {/* Top Actions Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E8C77A] shadow-xs">
          <div>
            <h2 className="text-xl font-bold text-[#071A2A]">Master CMS Dashboard</h2>
            <p className="text-xs text-[#6B6255]">
              Single-domain landing page engine, orders, and lead management
            </p>
          </div>

          <Link
            href="/admin/landing-pages/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D89A20] hover:bg-[#E7B33E] text-[#071A2A] font-extrabold text-xs sm:text-sm shadow-md transition-all"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>+ Create Landing Page</span>
          </Link>
        </div>

        {/* Statistic Cards (Real Firestore Counts) */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-white border border-[#E8C77A] animate-pulse p-5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`p-4 sm:p-5 rounded-2xl bg-white border ${card.border} shadow-xs space-y-2 hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#6B6255] uppercase tracking-wider">
                      {card.title}
                    </span>
                    <div className={`w-9 h-9 rounded-xl ${card.color} flex items-center justify-center shadow-xs`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-[#071A2A]">{card.value}</div>
                    <div className="text-[10px] text-[#6B6255] font-medium mt-0.5">{card.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Actions Bar (Requirements 13 & 46) */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D89A20]" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#6B6255]">Quick Actions</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              href="/admin/landing-pages/new"
              className="p-3.5 rounded-xl bg-[#FFF8E8] border border-[#E8C77A] hover:bg-[#D89A20] hover:text-[#071A2A] transition-all flex items-center gap-2.5 text-xs font-bold text-[#071A2A] group"
            >
              <Plus className="w-4 h-4 text-[#D89A20] group-hover:text-[#071A2A]" />
              <span>Create New Page</span>
            </Link>

            <Link
              href="/admin/orders"
              className="p-3.5 rounded-xl bg-[#FFF8E8] border border-[#E8C77A] hover:bg-[#D89A20] hover:text-[#071A2A] transition-all flex items-center gap-2.5 text-xs font-bold text-[#071A2A] group"
            >
              <ShoppingBag className="w-4 h-4 text-[#D89A20] group-hover:text-[#071A2A]" />
              <span>View Orders</span>
            </Link>

            <Link
              href="/admin/leads"
              className="p-3.5 rounded-xl bg-[#FFF8E8] border border-[#E8C77A] hover:bg-[#D89A20] hover:text-[#071A2A] transition-all flex items-center gap-2.5 text-xs font-bold text-[#071A2A] group"
            >
              <Users className="w-4 h-4 text-[#D89A20] group-hover:text-[#071A2A]" />
              <span>View Leads</span>
            </Link>

            <Link
              href="/admin/media"
              className="p-3.5 rounded-xl bg-[#FFF8E8] border border-[#E8C77A] hover:bg-[#D89A20] hover:text-[#071A2A] transition-all flex items-center gap-2.5 text-xs font-bold text-[#071A2A] group"
            >
              <FileImage className="w-4 h-4 text-[#D89A20] group-hover:text-[#071A2A]" />
              <span>Media Library</span>
            </Link>
          </div>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search landing pages by name or slug..."
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
          </div>

        </div>

        {/* Landing Pages Table View */}
        <LandingPagesTable initialPages={filteredPages} />

      </div>
    </AdminLayoutWrapper>
  );
}
