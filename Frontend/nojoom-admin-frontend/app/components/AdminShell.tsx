'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// In static export with basePath, usePathname() returns the path WITHOUT basePath.
// So on /NOJOOM/admin/orders → pathname is /orders
const NAV = [
  { href: '/',         label: 'Dashboard', icon: '▤' },
  { href: '/orders',   label: 'Orders',    icon: '◫' },
  { href: '/products', label: 'Products',  icon: '⊞' },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-Admin_Cards border-b border-Admin_Border">
        <span className="font-display text-xl text-Admin_Accent">NOJOOM</span>
        <button onClick={() => setMobileOpen(o => !o)} className="text-Admin_Muted p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
            }
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${mobileOpen ? 'flex' : 'hidden'} lg:flex w-full lg:w-56 bg-Admin_Cards border-b lg:border-b-0 lg:border-r border-Admin_Border flex-col`}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-Admin_Border hidden lg:block">
          <p className="font-display text-2xl text-Admin_Accent tracking-wide">NOJOOM</p>
          <p className="font-body text-[10px] text-Admin_Muted tracking-widest uppercase mt-0.5">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="px-3 py-4 flex flex-col gap-1 flex-1">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-colors ${
                isActive(item.href)
                  ? 'bg-Admin_Accent/10 text-Admin_Accent'
                  : 'text-Admin_Muted hover:text-Admin_Text hover:bg-Admin_Elevated'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-Admin_Border space-y-1">
          {/* View Store — absolute path on same GitHub Pages domain */}
          <a
            href="/NOJOOM/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm text-Admin_Muted hover:text-Admin_Text hover:bg-Admin_Elevated transition-colors"
          >
            <span className="text-base">↗</span>
            View Store
          </a>
          <div className="flex items-center gap-3 px-3 py-2 mt-1">
            <div className="w-8 h-8 rounded-full bg-Admin_Accent/20 flex items-center justify-center font-body text-sm text-Admin_Accent flex-shrink-0">N</div>
            <div className="min-w-0">
              <p className="font-body text-xs text-Admin_Text truncate">Nojoom Admin</p>
              <p className="font-body text-[10px] text-Admin_Muted truncate">admin@nojoom.eg</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
