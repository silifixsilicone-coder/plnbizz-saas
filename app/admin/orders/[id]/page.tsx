import React from 'react';
import Link from 'next/link';
import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';
import { getOrderById } from '@/lib/orders';
import { Badge } from '@/components/ui/Badge';
import { ShoppingBag, ArrowLeft, Mail, Phone, Calendar, Shield, CreditCard } from 'lucide-react';

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    return (
      <AdminLayoutWrapper title="Order Not Found" description="The requested order document does not exist">
        <div className="p-12 text-center space-y-4 max-w-md mx-auto font-admin">
          <h3 className="text-xl font-bold text-[#071A2A]">Order Not Found</h3>
          <p className="text-xs text-[#6B6255]">The order ID "{id}" could not be found in Firestore.</p>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D89A20] text-[#071A2A] text-xs font-extrabold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Orders</span>
          </Link>
        </div>
      </AdminLayoutWrapper>
    );
  }

  return (
    <AdminLayoutWrapper
      title={`Order Details: ${order.orderNumber}`}
      description="View customer details, snapshot product info, and payment status"
    >
      <div className="max-w-4xl space-y-6 font-admin lang-en text-[#071A2A]">
        
        {/* Back Link */}
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B6255] hover:text-[#071A2A]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orders List</span>
        </Link>

        {/* Main Details Card */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] p-6 space-y-6 shadow-xs">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8C77A]/60 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#071A2A] text-[#D89A20] border border-[#D89A20] flex items-center justify-center font-black text-lg">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#071A2A]">{order.orderNumber}</h3>
                <p className="text-xs text-[#6B6255]">
                  Created on {order.createdAt.slice(0, 10)} via {order.source}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#071A2A]">₹{order.amount}</span>
              <Badge variant="gold">{order.status}</Badge>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Customer Info */}
            <div className="p-4 rounded-xl bg-[#FFF8E8] border border-[#E8C77A] space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#6B6255]">
                Customer Information
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[#6B6255]">Name: </span>
                  <strong className="text-[#071A2A]">{order.customerName}</strong>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#D89A20]" />
                  <span>{order.customerEmail}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#D89A20]" />
                  <span>{order.customerPhone}</span>
                </div>
              </div>
            </div>

            {/* Product & Landing Page Snapshot Info */}
            <div className="p-4 rounded-xl bg-[#FFF8E8] border border-[#E8C77A] space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#6B6255]">
                Product Snapshot
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[#6B6255]">Product: </span>
                  <strong className="text-[#071A2A]">{order.productName}</strong>
                </div>
                <div>
                  <span className="text-[#6B6255]">Landing Page Route: </span>
                  <code className="font-mono text-[#D89A20] font-bold">/lp/{order.landingPageSlug}</code>
                </div>
                <div>
                  <span className="text-[#6B6255]">Payment Method: </span>
                  <span>{order.paymentMethod || 'Manual Admin'}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </AdminLayoutWrapper>
  );
}
