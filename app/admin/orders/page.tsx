'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';
import {
  getOrders,
  updateOrderStatus,
  createTestOrder,
  deleteOrder,
  exportOrdersToCSV,
  calculateTotalRevenue,
  OrderItem,
  OrderStatus,
} from '@/lib/orders';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ShoppingBag,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Info,
  DollarSign,
} from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const [statusModal, setStatusModal] = useState<{ id: string; targetStatus: OrderStatus } | null>(null);
  const [testOrderModal, setTestOrderModal] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setPagesOrders(data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const setPagesOrders = (data: OrderItem[]) => {
    setOrders(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleConfirmStatusChange = async () => {
    if (!statusModal) return;
    setActionLoading(statusModal.id);
    try {
      await updateOrderStatus(statusModal.id, statusModal.targetStatus);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === statusModal.id
            ? { ...o, status: statusModal.targetStatus, updatedAt: new Date().toISOString() }
            : o
        )
      );
      showToast(`Order status updated to ${statusModal.targetStatus}.`);
    } catch (err) {
      console.error('Failed to update order status:', err);
      showToast('Failed to update order status.');
    } finally {
      setActionLoading(null);
      setStatusModal(null);
    }
  };

  const handleCreateTestOrder = async () => {
    setActionLoading('test');
    try {
      await createTestOrder({
        customerName: 'Test Admin User',
        customerEmail: 'test.admin@plnbizz.com',
        customerPhone: '9876543210',
        productName: 'Digital Product Bundle (Test)',
        amount: 109,
        status: 'pending',
      });
      showToast('Admin Test Order created.');
      await loadData();
    } catch (err) {
      console.error('Failed to create test order:', err);
      showToast('Failed to create test order.');
    } finally {
      setActionLoading(null);
      setTestOrderModal(false);
    }
  };

  const filteredOrders = orders
    .filter((o) => {
      const matchesSearch =
        search === '' ||
        o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
        o.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
        o.customerPhone.includes(search) ||
        o.productName.toLowerCase().includes(search.toLowerCase());

      let matchesStatus = true;
      if (statusFilter !== 'all') {
        matchesStatus = o.status.toLowerCase() === statusFilter.toLowerCase();
      }

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'highest-amount') {
        return b.amount - a.amount;
      }
      if (sortBy === 'lowest-amount') {
        return a.amount - b.amount;
      }
      // Default: newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Paid</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="navy">Failed</Badge>;
      case 'cancelled':
        return <Badge variant="navy">Cancelled</Badge>;
      case 'refunded':
        return <Badge variant="gold">Refunded</Badge>;
      default:
        return <Badge variant="navy">{status}</Badge>;
    }
  };

  return (
    <AdminLayoutWrapper
      title="Orders Management"
      description="Manage customer checkout orders, manual status updates, and revenue calculations"
    >
      <div className="space-y-6 font-admin lang-en text-[#071A2A]">
        
        {/* Toast Notification */}
        {toast && (
          <div className="bg-[#071A2A] text-[#D89A20] px-6 py-3 text-xs sm:text-sm font-bold flex items-center justify-between border-b border-[#E8C77A]/30 shadow-md">
            <span>{toast}</span>
            <span className="text-xs bg-[#D89A20] text-[#071A2A] px-2 py-0.5 rounded font-black">Orders</span>
          </div>
        )}

        {/* Safety Notice */}
        <div className="bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-[#D89A20] flex-shrink-0" />
            <p className="text-xs text-[#6B6255] font-medium leading-relaxed">
              <strong>Admin Note:</strong> Payment status is manually managed until payment gateway integration is enabled. Test orders are excluded from production revenue calculations.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setTestOrderModal(true)}
            className="text-xs border-[#E8C77A] font-bold flex-shrink-0"
          >
            <Plus className="w-4 h-4 mr-1 text-[#D89A20]" />
            <span>+ Create Test Order</span>
          </Button>
        </div>

        {/* Header Controls */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          
          {/* Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders by ID, name, email, phone..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#FFF8E8] border border-[#E8C77A] focus:outline-none focus:ring-2 focus:ring-[#D89A20]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs font-bold rounded-xl border border-[#E8C77A] bg-[#FFF8E8] focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-xs font-bold rounded-xl border border-[#E8C77A] bg-[#FFF8E8] focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest-amount">Highest Amount</option>
                <option value="lowest-amount">Lowest Amount</option>
              </select>
            </div>

            {/* Export CSV */}
            <button
              onClick={() => exportOrdersToCSV(filteredOrders)}
              disabled={filteredOrders.length === 0}
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
              <p className="text-sm font-bold text-[#6B6255]">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            /* Empty State (Requirement 36) */
            <div className="p-12 text-center flex flex-col items-center justify-center space-y-3 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-[#FFF8E8] text-[#D89A20] border-2 border-[#E8C77A] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#071A2A]">No orders yet</h4>
              <p className="text-xs text-[#6B6255] leading-relaxed">
                Orders will appear here once your checkout integration is connected.
              </p>
              <Button
                variant="gold"
                size="sm"
                onClick={() => setTestOrderModal(true)}
                className="bg-[#D89A20] font-bold"
              >
                + Create Test Order
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FFF8E8] border-b border-[#E8C77A] text-[11px] font-extrabold uppercase text-[#6B6255] tracking-wider">
                    <th className="py-4 px-6">Order ID</th>
                    <th className="py-4 px-4">Customer</th>
                    <th className="py-4 px-4">Product</th>
                    <th className="py-4 px-4">Amount</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8C77A]/60 text-xs sm:text-sm">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FFF9EC] transition-colors">
                      
                      {/* Order ID & Test Badge */}
                      <td className="py-4 px-6 font-mono font-bold text-[#071A2A]">
                        <div className="flex items-center gap-1.5">
                          <span>{order.orderNumber}</span>
                          {order.isTest && (
                            <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded font-black">
                              TEST
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-[#071A2A]">{order.customerName}</div>
                        <div className="text-[11px] text-[#6B6255]">{order.customerEmail}</div>
                      </td>

                      {/* Product */}
                      <td className="py-4 px-4 font-semibold text-[#071A2A] truncate max-w-xs">
                        {order.productName}
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-4 font-black text-[#071A2A]">
                        ₹{order.amount}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">{getStatusBadge(order.status)}</td>

                      {/* Date */}
                      <td className="py-4 px-4 text-xs text-[#6B6255]">
                        {order.createdAt.slice(0, 10)}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            title="View Order Details"
                            className="p-2 rounded-lg text-slate-600 hover:bg-[#FFF8E8] transition-colors"
                          >
                            <Eye className="w-4 h-4 text-indigo-600" />
                          </Link>

                          {/* Quick Status Change */}
                          <select
                            value={order.status}
                            onChange={(e) =>
                              setStatusModal({
                                id: order.id,
                                targetStatus: e.target.value as OrderStatus,
                              })
                            }
                            className="px-2 py-1 text-xs font-bold rounded-lg border border-[#E8C77A] bg-white"
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="failed">Failed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="refunded">Refunded</option>
                          </select>
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

      {/* Status Change Confirmation Modal (Requirement 10) */}
      {statusModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-6 space-y-4 shadow-2xl font-admin">
            <h4 className="text-base font-bold text-[#071A2A]">Change order status?</h4>
            <p className="text-xs text-[#6B6255] leading-relaxed">
              Are you sure you want to change order status to <strong className="uppercase text-[#071A2A]">"{statusModal.targetStatus}"</strong>?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStatusModal(null)}
                className="px-4 py-2 text-xs font-bold text-[#6B6255] hover:bg-[#FFF8E8] rounded-xl"
              >
                Cancel
              </button>
              <Button
                type="button"
                variant="gold"
                size="sm"
                onClick={handleConfirmStatusChange}
                className="bg-[#D89A20] font-bold text-xs"
              >
                Confirm Status
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Test Order Modal (Requirement 33) */}
      {testOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FFF9EC] border-2 border-[#E8C77A] rounded-3xl p-6 space-y-4 shadow-2xl font-admin">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-[#071A2A]">Create Admin Test Order</h4>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-black">
                TEST DATA
              </span>
            </div>

            <p className="text-xs text-[#6B6255]">
              This will generate a test order for development testing. Test orders are excluded from production revenue metrics.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setTestOrderModal(false)}
                className="px-4 py-2 text-xs font-bold text-[#6B6255] hover:bg-[#FFF8E8] rounded-xl"
              >
                Cancel
              </button>
              <Button
                type="button"
                variant="gold"
                size="sm"
                disabled={actionLoading === 'test'}
                onClick={handleCreateTestOrder}
                className="bg-[#D89A20] font-bold text-xs"
              >
                {actionLoading === 'test' ? 'Creating...' : 'Create Test Order'}
              </Button>
            </div>
          </div>
        </div>
      )}

    </AdminLayoutWrapper>
  );
}
