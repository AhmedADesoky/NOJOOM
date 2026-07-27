'use client';

import { useEffect, useState } from 'react';
import { AdminShell } from '../components/AdminShell';
import { formatEGP } from '../data/mock';

// Exact shape from nojoom-frontend's Auth_Context.tsx
interface OrderItem {
  Product_Id: string;
  Product_Name: string;
  Quantity: number;
  Price: number;
  Color: string;
  Size: string;
}

interface StoreOrder {
  Id: string;
  Customer_Id: string;
  Total: number;
  Status: string;
  Payment_Method: string;
  Created_At: string;
  Items: OrderItem[];
  Delivery: {
    Full_Name: string;
    Phone: string;
    Address: string;
    City: string;
  };
}

const STATUS_COLORS: Record<string, string> = {
  Confirmed:  'bg-Admin_Green/15 text-Admin_Green',
  Processing: 'bg-Admin_Blue/15 text-Admin_Blue',
  Shipped:    'bg-Admin_Accent/15 text-Admin_Accent',
  Delivered:  'bg-Admin_Green/15 text-Admin_Green',
  Cancelled:  'bg-Admin_Rose/15 text-Admin_Rose',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    try {
      // nojoom_orders is Record<Customer_Id, Order[]>
      const raw = localStorage.getItem('nojoom_orders');
      if (raw) {
        const byUser: Record<string, StoreOrder[]> = JSON.parse(raw);
        const all = Object.values(byUser).flat();
        all.sort((a, b) => new Date(b.Created_At).getTime() - new Date(a.Created_At).getTime());
        setOrders(all);
      }
    } catch {
      // localStorage unavailable or corrupted
    }
    setLoaded(true);
  }, []);

  const statuses = ['All', ...Array.from(new Set(orders.map(o => o.Status)))];
  const filtered = filter === 'All' ? orders : orders.filter(o => o.Status === filter);
  const totalRevenue = orders.reduce((sum, o) => sum + o.Total, 0);

  return (
    <AdminShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-Admin_Text">Orders</h1>
          <p className="font-body text-sm text-Admin_Muted mt-1">
            {loaded ? (
              orders.length === 0
                ? 'No orders yet — place an order in the store to see it here'
                : `${orders.length} order${orders.length !== 1 ? 's' : ''} · EGP ${totalRevenue.toLocaleString('en-EG')} total`
            ) : 'Loading…'}
          </p>
        </div>
        <a
          href="/NOJOOM/"
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-Admin_Border font-body text-sm text-Admin_Muted hover:text-Admin_Text hover:border-Admin_Accent/40 transition-colors"
        >
          <span>↗</span>
          Visit Store
        </a>
      </div>

      {/* Stats */}
      {orders.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders',   value: orders.length.toString() },
            { label: 'Total Revenue',  value: `EGP ${totalRevenue.toLocaleString('en-EG')}` },
            { label: 'Confirmed',      value: orders.filter(o => o.Status === 'Confirmed').length.toString() },
            { label: 'Avg. Order',     value: `EGP ${Math.round(totalRevenue / orders.length).toLocaleString('en-EG')}` },
          ].map(s => (
            <div key={s.label} className="bg-Admin_Cards rounded-2xl p-5 border border-Admin_Border">
              <p className="font-body text-[10px] tracking-widest uppercase text-Admin_Muted mb-2">{s.label}</p>
              <p className="font-display text-2xl text-Admin_Text">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filter pills */}
      {orders.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full font-body text-xs transition-colors ${
                filter === s
                  ? 'bg-Admin_Accent text-Admin_Base'
                  : 'bg-Admin_Cards border border-Admin_Border text-Admin_Muted hover:text-Admin_Text'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Empty / loading state */}
      {!loaded ? (
        <div className="flex items-center justify-center py-24">
          <span className="font-body text-sm text-Admin_Muted">Loading…</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-Admin_Cards rounded-2xl border border-Admin_Border p-16 flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-Admin_Elevated flex items-center justify-center text-2xl">◫</div>
          <p className="font-display text-xl text-Admin_Text">No orders yet</p>
          <p className="font-body text-sm text-Admin_Muted max-w-xs">
            Orders placed in the Nojoom store will appear here automatically — both apps share the same browser storage.
          </p>
          <a
            href="/NOJOOM/"
            className="mt-2 inline-block px-6 py-2.5 rounded-full bg-Admin_Accent text-Admin_Base font-body text-sm hover:opacity-90 transition-opacity"
          >
            Go to Store →
          </a>
        </div>
      ) : (
        <div className="bg-Admin_Cards rounded-2xl border border-Admin_Border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-Admin_Border">
                  {['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-5 py-3 font-body text-[10px] tracking-widest uppercase text-Admin_Muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => (
                  <>
                    <tr
                      key={o.Id}
                      className={`border-b border-Admin_Border/50 hover:bg-Admin_Elevated/40 transition-colors cursor-pointer ${
                        i === filtered.length - 1 && expanded !== o.Id ? 'border-b-0' : ''
                      }`}
                      onClick={() => setExpanded(expanded === o.Id ? null : o.Id)}
                    >
                      <td className="px-5 py-3.5 font-body text-sm text-Admin_Muted font-mono">{o.Id}</td>
                      <td className="px-5 py-3.5">
                        <p className="font-body text-sm text-Admin_Text">{o.Delivery?.Full_Name || 'Guest'}</p>
                        <p className="font-body text-[10px] text-Admin_Muted">{o.Delivery?.City}</p>
                      </td>
                      <td className="px-5 py-3.5 font-body text-xs text-Admin_Muted whitespace-nowrap">
                        {new Date(o.Created_At).toLocaleDateString('en-EG', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-3.5 font-body text-sm text-Admin_Text text-center">{o.Items.length}</td>
                      <td className="px-5 py-3.5 font-body text-sm text-Admin_Text whitespace-nowrap">{formatEGP(o.Total)}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-block px-3 py-1 rounded-full font-body text-xs ${STATUS_COLORS[o.Status] || 'bg-Admin_Muted/15 text-Admin_Muted'}`}>
                          {o.Status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-Admin_Muted text-sm">
                        {expanded === o.Id ? '▲' : '▼'}
                      </td>
                    </tr>

                    {/* Expanded row */}
                    {expanded === o.Id && (
                      <tr key={`${o.Id}-detail`} className="border-b border-Admin_Border/50 bg-Admin_Elevated/20">
                        <td colSpan={7} className="px-5 py-4">
                          {o.Delivery && (
                            <p className="font-body text-xs text-Admin_Muted mb-3">
                              📍 {o.Delivery.Address}, {o.Delivery.City} · 📞 {o.Delivery.Phone}
                            </p>
                          )}
                          <div className="flex flex-col gap-2">
                            {o.Items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 bg-Admin_Cards rounded-xl p-3">
                                <div className="flex-1 min-w-0">
                                  <p className="font-body text-sm text-Admin_Text">{item.Product_Name}</p>
                                  <p className="font-body text-xs text-Admin_Muted">
                                    {item.Color && `${item.Color} · `}Size {item.Size} · Qty {item.Quantity}
                                  </p>
                                </div>
                                <p className="font-body text-sm text-Admin_Text whitespace-nowrap">{formatEGP(item.Price * item.Quantity)}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <p className="font-body text-xs text-Admin_Muted">Payment: {o.Payment_Method}</p>
                            <p className="font-body text-sm text-Admin_Text font-semibold">Total: {formatEGP(o.Total)}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
