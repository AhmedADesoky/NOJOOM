'use client';

import { useState } from 'react';
import { AdminShell } from '../components/AdminShell';
import { PRODUCTS, formatEGP } from '../data/mock';

const CATEGORIES = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

export default function ProductsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = PRODUCTS.filter(p => {
    const matchCat = filter === 'All' || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const outOfStock = PRODUCTS.filter(p => p.stock === 0).length;
  const lowStock   = PRODUCTS.filter(p => p.stock > 0 && p.stock <= 5).length;

  return (
    <AdminShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-Admin_Text">Products</h1>
          <p className="font-body text-sm text-Admin_Muted mt-1">
            {PRODUCTS.length} products · {outOfStock} out of stock · {lowStock} low stock
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-Admin_Accent text-Admin_Base font-body text-sm hover:opacity-90 transition-opacity">
          <span>+</span>
          Add Product
        </button>
      </div>

      {/* Alert if out of stock */}
      {outOfStock > 0 && (
        <div className="mb-6 bg-Admin_Rose/10 border border-Admin_Rose/30 rounded-xl px-5 py-3 flex items-center gap-3">
          <span className="text-Admin_Rose">⚠</span>
          <p className="font-body text-sm text-Admin_Rose">
            {outOfStock} product{outOfStock !== 1 ? 's are' : ' is'} out of stock — restock soon to avoid lost sales
          </p>
        </div>
      )}

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 flex items-center gap-3 bg-Admin_Cards border border-Admin_Border rounded-xl px-4 py-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-Admin_Muted flex-shrink-0">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            className="flex-1 bg-transparent font-body text-sm text-Admin_Text placeholder:text-Admin_Muted/50 outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-xl font-body text-sm transition-colors ${
                filter === c
                  ? 'bg-Admin_Accent text-Admin_Base'
                  : 'bg-Admin_Cards border border-Admin_Border text-Admin_Muted hover:text-Admin_Text'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <p className="font-display text-xl text-Admin_Text">No products found</p>
          <button onClick={() => { setFilter('All'); setSearch(''); }} className="font-body text-sm text-Admin_Accent">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="bg-Admin_Cards rounded-2xl border border-Admin_Border overflow-hidden group hover:border-Admin_Accent/40 transition-colors">
              <div className="relative aspect-[3/4] bg-Admin_Elevated overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {p.stock === 0 && (
                  <div className="absolute inset-0 bg-Admin_Base/60 flex items-center justify-center">
                    <span className="font-body text-xs text-Admin_Rose bg-Admin_Base/80 px-3 py-1 rounded-full">Out of Stock</span>
                  </div>
                )}
                {p.stock > 0 && p.stock <= 5 && (
                  <div className="absolute top-2 left-2">
                    <span className="font-body text-[10px] text-Admin_Amber bg-Admin_Base/80 px-2.5 py-1 rounded-full">Low Stock</span>
                  </div>
                )}
              </div>
              <div className="p-3.5">
                <p className="font-body text-xs text-Admin_Muted mb-1">{p.category}</p>
                <p className="font-body text-sm text-Admin_Text leading-tight mb-2 line-clamp-2">{p.name}</p>
                <div className="flex items-center justify-between">
                  <p className="font-display text-base text-Admin_Text">{formatEGP(p.price)}</p>
                  <p className="font-body text-xs text-Admin_Muted">{p.sales} sold</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className={`flex items-center gap-1.5 font-body text-xs ${
                    p.stock === 0 ? 'text-Admin_Rose' : p.stock <= 5 ? 'text-Admin_Amber' : 'text-Admin_Green'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {p.stock === 0 ? 'Out of stock' : `${p.stock} in stock`}
                  </div>
                  <button className="font-body text-xs text-Admin_Muted hover:text-Admin_Text transition-colors">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
