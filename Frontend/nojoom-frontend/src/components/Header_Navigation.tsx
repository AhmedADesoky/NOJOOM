'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use_Cart_Context } from '@/contexts/Cart_Context';
import { use_Auth_Context } from '@/contexts/Auth_Context';

const PROFILE_IMAGE_KEY = 'nojoom_profile_image';

export const Header_Navigation = ({ On_Cart_Click }: { On_Cart_Click?: () => void }) => {
  const [Menu_Open, set_Menu_Open]           = useState(false);
  const [Nav_Profile_Image, set_Nav_Profile] = useState<string | null>(null);
  // ── Hydration fix: don't render user-specific UI until client has mounted ──
  const [Is_Mounted, set_Is_Mounted]         = useState(false);

  const { Cart_Count } = use_Cart_Context();
  const { User, Logout } = use_Auth_Context();
  const Menu_Ref = useRef<HTMLDivElement>(null);
  const Router = useRouter();

  // Mark as mounted so client-only state (User, localStorage) is safe to use
  useEffect(() => { set_Is_Mounted(true); }, []);

  // Profile photo sync
  useEffect(() => {
    const Load = () => set_Nav_Profile(localStorage.getItem(PROFILE_IMAGE_KEY));
    Load();
    window.addEventListener('profile_image_changed', Load);
    return () => window.removeEventListener('profile_image_changed', Load);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const Handler = (e: MouseEvent) => {
      if (Menu_Ref.current && !Menu_Ref.current.contains(e.target as Node))
        set_Menu_Open(false);
    };
    if (Menu_Open) document.addEventListener('mousedown', Handler);
    return () => document.removeEventListener('mousedown', Handler);
  }, [Menu_Open]);

  // Close on Escape
  useEffect(() => {
    const Handler = (e: KeyboardEvent) => { if (e.key === 'Escape') set_Menu_Open(false); };
    document.addEventListener('keydown', Handler);
    return () => document.removeEventListener('keydown', Handler);
  }, []);

  // Use null user until mounted — prevents server/client mismatch
  const Active_User = Is_Mounted ? User : null;
  const Initials    = Active_User?.Name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase() || '';

  const Handle_Logout = () => {
    Logout();
    set_Nav_Profile(null);
    localStorage.removeItem(PROFILE_IMAGE_KEY);
    set_Menu_Open(false);
  };

  const Close = () => set_Menu_Open(false);

  const Nav_Links = [
    { label: 'All Pieces', href: '/'         },
    { label: 'My Account', href: '/profile'  },
    { label: 'About Us',   href: '/#about'   },
    { label: 'Contact',    href: '/#contact' },
  ];

  return (
    <div ref={Menu_Ref} className="sticky top-0 z-50">
      <header className="bg-Primary_White/95 backdrop-blur-md border-b border-Border_Light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative flex items-center justify-between h-[68px]">

            {/* Hamburger */}
            <button onClick={() => set_Menu_Open((p) => !p)}
              aria-label="Toggle menu"
              className="p-2 -ml-2 rounded-full hover:bg-Surface transition-colors">
              {Menu_Open ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>

            {/* Logo */}
            <Link href="/" onClick={Close}
              className="absolute left-1/2 -translate-x-1/2 text-center leading-none">
              <div className="font-Display text-2xl text-Ink">نجوم</div>
              <div className="font-Body text-[9px] tracking-[0.4em] text-Muted mt-0.5">
                NOJOOM
              </div>
            </Link>

            {/* Right icons */}
            <div className="flex items-center gap-1">

              {/* Search → /search page */}
              <Link href="/search" onClick={Close}
                className="p-2 rounded-full hover:bg-Surface transition-colors"
                aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" className="text-Ink">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </Link>

              {/* Profile — same href always, content differs after mount */}
              <Link href="/profile" onClick={Close}
                className="p-2 rounded-full hover:bg-Surface transition-colors"
                aria-label="My Profile">
                {/* Before mount: always show generic icon (matches server) */}
                {!Is_Mounted ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                ) : Nav_Profile_Image ? (
                  <img src={Nav_Profile_Image} alt="Profile"
                    className="w-[26px] h-[26px] rounded-full object-cover
                      ring-2 ring-offset-1 ring-Brand_Pink" />
                ) : Active_User ? (
                  <div className="w-[26px] h-[26px] rounded-full bg-Ink text-white
                    flex items-center justify-center font-Body text-[10px] font-semibold">
                    {Initials}
                  </div>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                )}
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist" onClick={Close}
                className="p-2 rounded-full hover:bg-Surface transition-colors"
                aria-label="Saved items">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" className="text-Ink">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </Link>

              {/* Cart */}
              <Link href="/cart" onClick={Close}
                className="relative p-2 rounded-full hover:bg-Surface transition-colors"
                aria-label="Cart">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" className="text-Ink">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {/* Cart badge — only after mount */}
                {Is_Mounted && Cart_Count > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full
                    bg-Brand_Pink text-white text-[9px] font-Body font-semibold
                    flex items-center justify-center">
                    {Cart_Count}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Dropdown menu */}
      <div className={`
        absolute left-0 right-0 bg-Primary_White border-b border-Border_Light shadow-md
        transition-all duration-200 ease-out overflow-hidden
        ${Menu_Open
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">

          {/* User strip — only after mount */}
          {Is_Mounted && Active_User && (
            <div className="flex items-center gap-3 px-3 py-4 mb-1
              border-b border-Border_Light">
              <div className="w-9 h-9 rounded-full flex-shrink-0 overflow-hidden">
                {Nav_Profile_Image ? (
                  <img src={Nav_Profile_Image} alt={Active_User.Name}
                    className="w-full h-full object-cover"/>
                ) : (
                  <div className="w-full h-full bg-Ink text-white
                    flex items-center justify-center font-Body text-xs font-semibold">
                    {Initials}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-Body text-sm font-semibold text-Ink truncate">
                  {Active_User.Name}
                </p>
                <p className="font-Body text-xs text-Muted truncate">
                  {Active_User.Email}
                </p>
              </div>
            </div>
          )}

          <nav>
            {Nav_Links.map(({ label, href }) => (
              <Link key={label} href={href} onClick={Close}
                className="flex items-center px-3 py-3.5 rounded-xl font-Body
                  text-sm text-Ink hover:bg-Surface transition-colors">
                {label}
              </Link>
            ))}

            <div className="border-t border-Border_Light mt-1 pt-1 pb-2">
              {/* Only show after mount so both sides agree */}
              {!Is_Mounted ? null : Active_User ? (
                <button onClick={Handle_Logout}
                  className="flex items-center gap-3 w-full text-left px-3 py-3.5
                    rounded-xl font-Body text-sm text-Brand_Pink
                    hover:bg-Blush_Light transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Log Out
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2 px-3 py-3">
                  <Link href="/login" onClick={Close}
                    className="flex-1 text-center py-2.5 bg-Ink text-white rounded-full
                      font-Body text-xs tracking-[0.15em] uppercase hover:opacity-80
                      transition-opacity">
                    Sign In
                  </Link>
                  <Link href="/signup" onClick={Close}
                    className="flex-1 text-center py-2.5 border border-Border_Light
                      text-Ink rounded-full font-Body text-xs tracking-[0.15em]
                      uppercase hover:border-Ink transition-colors">
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {Menu_Open && (
        <div className="fixed inset-0 bg-black/20 -z-10"
          onClick={Close} aria-hidden="true" />
      )}
    </div>
  );
};