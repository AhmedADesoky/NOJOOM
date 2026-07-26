'use client';

import { useEffect, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────
   Global Toast component — mount once in layout.tsx
   Trigger from anywhere:
     import { show_toast } from '@/components/Toast';
     show_toast('Added to your bag');
───────────────────────────────────────────────────────────────── */

interface Toast_State {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

export function Toast() {
  const [State, set_State] = useState<Toast_State>({
    message: '',
    type: 'success',
    visible: false,
  });

  useEffect(() => {
    let Timer: NodeJS.Timeout;

    const Handle = (e: Event) => {
      const { message, type } = (e as CustomEvent<{ message: string; type: 'success' | 'error' }>).detail;
      clearTimeout(Timer);
      set_State({ message, type: type || 'success', visible: true });
      Timer = setTimeout(() => set_State((p) => ({ ...p, visible: false })), 2500);
    };

    window.addEventListener('nojoom_toast', Handle);
    return () => {
      window.removeEventListener('nojoom_toast', Handle);
      clearTimeout(Timer);
    };
  }, []);

  return (
    <div
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-[300]
        flex items-center gap-2.5 px-5 py-3 rounded-full shadow-lg
        font-Body text-sm tracking-wide whitespace-nowrap
        transition-all duration-300 ease-out
        ${State.type === 'error'
          ? 'bg-Rose_Dark text-white'
          : 'bg-Ink text-white'}
        ${State.visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-3 pointer-events-none'}
      `}
    >
      {State.type === 'error' ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      )}
      {State.message}
    </div>
  );
}

/* Helper — call from any component */
export function show_toast(message: string, type: 'success' | 'error' = 'success') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('nojoom_toast', { detail: { message, type } })
    );
  }
}