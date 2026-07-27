'use client';

import { AdminShell } from './components/AdminShell';
import { STATS, ORDERS, PRODUCTS, MONTHLY_REVENUE, formatEGP } from './data/mock';
import Link from 'next/link';

const STATUS_COLORS: Record<string, string> = {
  Delivered:  'bg-Admin_Green/15 text-Admin_Green',
  Processing: 'bg-Admin_Amber/15 text-Admin_Amber',
  Shipped:    'bg-Admin_Blue/15 text-Admin_Blue',
  Cancelled:  'bg-Admin_Rose/15 text-Admin_Rose',
};

function StatCard({ label, value, change, prefix = '' }: { label: string; value: number; change: number; prefix?: string }) {
  const positive = change >= 0;
  return (
    <div className="bg-Admin_Cards rounded-2xl p-5 flex flex-col gap-3 border border-Admin_Border">
      <p className="font-body text-xs tracking-widest uppercase text-Admin_Muted">{label}</p>
      <p className="font-display text-3xl text-Admin_Text">
        {prefix}{value.toLocaleString('en-EG')}
      </p>
      <p className={`font-body text-xs flex items-center gap-1 ${positive ? 'text-Admin_Green' : 'text-Admin_Rose'}`}>
        <span>{positive ? '↑' : '↓'}</span>
        {Math.abs(change)}% vs last month
      </p>
    </div>
  );
}

const MAX_BAR = Math.max(...MONTHLY_REVENUE.map(m => m.value));

export default function AdminDashboard() {
  return (
    <AdminShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-Admin_Text">Dashboard</h1>
          <p className="font-body text-sm text-Admin_Muted mt-1">July 2026 overview</p>
        </div>
        <div className="flex items-center gap-2 bg-Admin_Cards border border-Admin_Border rounded-xl px-4 py-2">
          <span className="text-Admin_Muted text-sm">◉</span>
          <span className="font-body text-xs text-Admin_Muted">Live data</span>
          <span className="w-1.5 h-1.5 rounded-full bg-Admin_Green animate-pulse" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Revenue"   value={STATS.revenue}   change={STATS.revenueChange}   prefix="EGP " />
        <StatCard label="Orders"    value={STATS.orders}    change={STATS.ordersChange}    />
        <StatCard label="Customers" value={STATS.customers} change={STATS.customersChange} />
        <StatCard label="Products"  value={STATS.products}  change={STATS.productsChange}  />
      </div>

      {/* Chart + category breakdown */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-4 mb-8">
        <div className="bg-Admin_Cards rounded-2xl p-5 border border-Admin_Border">
          <p className="font-body text-xs tracking-widest uppercase text-Admin_Muted mb-5">Monthly Revenue</p>
          <div className="flex items-end gap-3 h-40">
            {MONTHLY_REVENUE.map(m => {
              const pct = (m.value / MAX_BAR) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-Admin_Accent/20 relative" style={{ height: '100%' }}>
                    <div
                      className="absolute bottom-0 w-full rounded-t-lg bg-Admin_Accent transition-all"
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <p className="font-body text-[10px] text-Admin_Muted">{m.month}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-Admin_Cards rounded-2xl p-5 border border-Admin_Border">
          <p className="font-body text-xs tracking-widest uppercase text-Admin_Muted mb-5">By Category</p>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Dresses', pct: 46, color: 'bg-Admin_Accent' },
              { label: 'Sets',    pct: 22, color: 'bg-Admin_Blue'   },
              { label: 'Tops',    pct: 18, color: 'bg-Admin_Green'  },
              { label: 'Skirts',  pct: 9,  color: 'bg-Admin_Amber'  },
              { label: 'Other',   pct: 5,  color: 'bg-Admin_Muted'  },
            ].map(c => (
              <div key={c.label}>
                <div className="flex justify-between font-body text-xs mb-1">
                  <span className="text-Admin_Text">{c.label}</span>
                  <span className="text-Admin_Muted">{c.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-Admin_Elevated">
                  <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Link href="/orders" className="bg-Admin_Cards rounded-2xl p-5 border border-Admin_Border hover:border-Admin_Accent/40 transition-colors group">
          <div className="flex items-center justify-between mb-3">
            <p className="font-body text-xs tracking-widest uppercase text-Admin_Muted">Recent Orders</p>
            <span className="text-Admin_Accent text-sm group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
          <p className="font-display text-2xl text-Admin_Text mb-1">{ORDERS.length}</p>
          <p className="font-body text-xs text-Admin_Muted">Showing last {ORDERS.length} orders — view all</p>
        </Link>
        <Link href="/products" className="bg-Admin_Cards rounded-2xl p-5 border border-Admin_Border hover:border-Admin_Accent/40 transition-colors group">
          <div className="flex items-center justify-between mb-3">
            <p className="font-body text-xs tracking-widest uppercase text-Admin_Muted">Products</p>
            <span className="text-Admin_Accent text-sm group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
          <p className="font-display text-2xl text-Admin_Text mb-1">{STATS.products}</p>
          <p className="font-body text-xs text-Admin_Muted">{PRODUCTS.filter(p => p.stock === 0).length} out of stock — manage inventory</p>
        </Link>
      </div>

      {/* Recent orders preview */}
      <div className="bg-Admin_Cards rounded-2xl border border-Admin_Border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-Admin_Border">
          <p className="font-body text-xs tracking-widest uppercase text-Admin_Muted">Latest Orders</p>
          <Link href="/orders" className="font-body text-xs text-Admin_Accent hover:opacity-80 transition-opacity">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-Admin_Border">
                {['Order', 'Customer', 'Date', 'Total', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-body text-[10px] tracking-widest uppercase text-Admin_Muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.slice(0, 5).map((o, i) => (
                <tr key={o.id} className={`border-b border-Admin_Border/50 hover:bg-Admin_Elevated/40 transition-colors ${i === 4 ? 'border-b-0' : ''}`}>
                  <td className="px-5 py-3.5 font-body text-sm text-Admin_Muted">{o.id}</td>
                  <td className="px-5 py-3.5 font-body text-sm text-Admin_Text">{o.customer}</td>
                  <td className="px-5 py-3.5 font-body text-xs text-Admin_Muted whitespace-nowrap">{o.date}</td>
                  <td className="px-5 py-3.5 font-body text-sm text-Admin_Text whitespace-nowrap">{formatEGP(o.total)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-block px-3 py-1 rounded-full font-body text-xs ${STATUS_COLORS[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
