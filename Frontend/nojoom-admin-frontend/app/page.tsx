'use client';

import { useState } from 'react';
import { STATS, ORDERS, PRODUCTS, MONTHLY_REVENUE, formatEGP } from './data/mock';

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
  const [tab, setTab] = useState<'orders' | 'products'>('orders');

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-56 bg-Admin_Cards border-b lg:border-b-0 lg:border-r border-Admin_Border flex lg:flex-col">
        <div className="px-6 py-5 border-b border-Admin_Border hidden lg:block">
          <p className="font-display text-2xl text-Admin_Accent tracking-wide">NOJOOM</p>
          <p className="font-body text-[10px] text-Admin_Muted tracking-widest uppercase mt-0.5">Admin Panel</p>
        </div>
        <div className="px-3 py-4 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible flex-1">
          {[
            { icon: '▤', label: 'Dashboard',  active: true  },
            { icon: '⊞', label: 'Products',   active: false },
            { icon: '◫', label: 'Orders',     active: false },
            { icon: '♡', label: 'Wishlist',   active: false },
            { icon: '◎', label: 'Customers',  active: false },
            { icon: '⚙', label: 'Settings',   active: false },
          ].map(item => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-colors whitespace-nowrap ${
                item.active
                  ? 'bg-Admin_Accent/10 text-Admin_Accent'
                  : 'text-Admin_Muted hover:text-Admin_Text hover:bg-Admin_Elevated'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div className="hidden lg:block mt-auto px-3 py-4 border-t border-Admin_Border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-Admin_Accent/20 flex items-center justify-center font-body text-sm text-Admin_Accent">N</div>
            <div>
              <p className="font-body text-xs text-Admin_Text">Nojoom Admin</p>
              <p className="font-body text-[10px] text-Admin_Muted">admin@nojoom.eg</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8 overflow-auto">
        <div className="max-w-6xl mx-auto">

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

          {/* Chart + top products */}
          <div className="grid lg:grid-cols-[1fr_300px] gap-4 mb-8">
            {/* Revenue chart */}
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

            {/* Category breakdown */}
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

          {/* Tabs: orders / products */}
          <div className="bg-Admin_Cards rounded-2xl border border-Admin_Border overflow-hidden">
            <div className="flex border-b border-Admin_Border">
              {(['orders', 'products'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-3 font-body text-sm capitalize tracking-wide transition-colors ${
                    tab === t
                      ? 'text-Admin_Accent border-b-2 border-Admin_Accent -mb-px'
                      : 'text-Admin_Muted hover:text-Admin_Text'
                  }`}
                >
                  {t === 'orders' ? `Recent Orders (${ORDERS.length})` : `Products (${PRODUCTS.length})`}
                </button>
              ))}
            </div>

            {/* Orders table */}
            {tab === 'orders' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-Admin_Border">
                      {['Order', 'Customer', 'Date', 'Items', 'Total', 'Status'].map(h => (
                        <th key={h} className="text-left px-5 py-3 font-body text-[10px] tracking-widest uppercase text-Admin_Muted">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERS.map((o, i) => (
                      <tr key={o.id} className={`border-b border-Admin_Border/50 hover:bg-Admin_Elevated/40 transition-colors ${i === ORDERS.length - 1 ? 'border-b-0' : ''}`}>
                        <td className="px-5 py-3.5 font-body text-sm text-Admin_Muted">{o.id}</td>
                        <td className="px-5 py-3.5 font-body text-sm text-Admin_Text">{o.customer}</td>
                        <td className="px-5 py-3.5 font-body text-xs text-Admin_Muted whitespace-nowrap">{o.date}</td>
                        <td className="px-5 py-3.5 font-body text-sm text-Admin_Text text-center">{o.items}</td>
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
            )}

            {/* Products table */}
            {tab === 'products' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-Admin_Border">
                      {['Product', 'Category', 'Price', 'Stock', 'Sales'].map(h => (
                        <th key={h} className="text-left px-5 py-3 font-body text-[10px] tracking-widest uppercase text-Admin_Muted">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PRODUCTS.map((p, i) => (
                      <tr key={p.id} className={`border-b border-Admin_Border/50 hover:bg-Admin_Elevated/40 transition-colors ${i === PRODUCTS.length - 1 ? 'border-b-0' : ''}`}>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.image} alt={p.name} className="w-9 h-12 object-cover rounded-lg flex-shrink-0" />
                            <span className="font-body text-sm text-Admin_Text">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 font-body text-xs text-Admin_Muted">{p.category}</td>
                        <td className="px-5 py-3.5 font-body text-sm text-Admin_Text whitespace-nowrap">{formatEGP(p.price)}</td>
                        <td className="px-5 py-3.5">
                          <span className={`font-body text-sm ${p.stock === 0 ? 'text-Admin_Rose' : p.stock <= 5 ? 'text-Admin_Amber' : 'text-Admin_Text'}`}>
                            {p.stock === 0 ? 'Out of stock' : p.stock}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-body text-sm text-Admin_Text">{p.sales}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
