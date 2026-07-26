'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header_Navigation } from '@/components/Header_Navigation';
import { use_Auth_Context } from '@/contexts/Auth_Context';

/* ── Fixed dot positions (no Math.cos/sin = no floating-point mismatch) ── */
const RING_DOTS = [
  { top: '0%',   left: '50%',  opacity: 0.4 },
  { top: '25%',  left: '96%',  opacity: 0.8 },
  { top: '75%',  left: '96%',  opacity: 0.4 },
  { top: '100%', left: '50%',  opacity: 0.4 },
  { top: '75%',  left: '4%',   opacity: 0.8 },
  { top: '25%',  left: '4%',   opacity: 0.4 },
];

function Stars_Decoration() {
  return (
    <div className="relative w-24 h-24 mx-auto">
      <div className="absolute inset-0 rounded-full bg-Blush_Light animate-pulse opacity-60" />
      <div className="absolute inset-2 rounded-full bg-Blush_Light
        flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="#C76A91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      {/* Hardcoded ring dots — no computed floats */}
      {RING_DOTS.map((dot, i) => (
        <div key={i}
          className="absolute w-2 h-2 rounded-full bg-Brand_Pink"
          style={{
            top: dot.top,
            left: dot.left,
            transform: 'translate(-50%, -50%)',
            opacity: dot.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ── Date formatted client-side only to avoid locale mismatch ─────── */
function Client_Date({ iso }: { iso: string }) {
  const [Label, set_Label] = useState('');
  useEffect(() => {
    set_Label(
      new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    );
  }, [iso]);
  return <>{Label}</>;
}

/* ── Delivery range (client-only) ────────────────────────────────── */
function Delivery_Range() {
  const [Range, set_Range] = useState('');
  useEffect(() => {
    const From = new Date();
    From.setDate(From.getDate() + 2);
    const To = new Date();
    To.setDate(To.getDate() + 4);
    const Fmt = (d: Date) =>
      d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    set_Range(`${Fmt(From)} – ${Fmt(To)}`);
  }, []);
  return <>{Range || '2 – 4 business days'}</>;
}

function Confirmation_Content() {
  const Search_Params = useSearchParams();
  const Order_Id      = Search_Params.get('order') || '';
  const { Get_Orders } = use_Auth_Context();

  const [Order, set_Order] = useState<any>(null);

  /* Load order client-side only — avoids server/client state mismatch */
  useEffect(() => {
    if (!Order_Id) return;
    const Orders = Get_Orders();
    const Found  = Orders.find((o: any) => o.Id === Order_Id);
    if (Found) set_Order(Found);
  }, [Order_Id, Get_Orders]);

  return (
    <main className="flex-1 max-w-lg mx-auto px-6 py-12 w-full">

      {/* Success icon */}
      <div className="text-center mb-10">
        <Stars_Decoration />
        <h1 className="font-Display text-4xl text-Ink mt-6 mb-2">Order Placed!</h1>
        <p className="font-Body text-sm text-Muted">
          Thank you for shopping with Nojoom. Your pieces are being prepared.
        </p>
      </div>

      {/* Order reference */}
      {Order_Id && (
        <div className="bg-Surface rounded-2xl p-5 mb-5 text-center">
          <p className="font-Body text-xs text-Muted tracking-[0.1em] uppercase mb-1">
            Order Reference
          </p>
          <p className="font-Display text-2xl text-Ink">{Order_Id}</p>
          {Order && (
            <p className="font-Body text-xs text-Muted mt-1">
              Placed on <Client_Date iso={Order.Created_At} />
            </p>
          )}
        </div>
      )}

      {/* Order items */}
      {Order && Order.Items?.length > 0 && (
        <div className="bg-Surface rounded-2xl p-5 mb-5">
          <h3 className="font-Body text-xs tracking-[0.12em] uppercase text-Ink mb-4">
            Your Items
          </h3>
          <div className="space-y-3">
            {Order.Items.map((Item: any, i: number) => (
              <div key={i} className="flex justify-between font-Body text-sm">
                <span className="text-Ink">
                  {Item.Product_Name}{' '}
                  <span className="text-Muted">×{Item.Quantity}</span>
                </span>
                <span className="text-Ink">
                  LE {(Item.Price * Item.Quantity).toLocaleString()}
                </span>
              </div>
            ))}
            <div className="border-t border-Border_Light pt-3 flex justify-between">
              <span className="font-Body text-sm font-semibold text-Ink">Total</span>
              <span className="font-Display text-xl text-Ink">
                LE {Order.Total?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Delivery */}
      <div className="bg-Surface rounded-2xl p-5 mb-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-Primary_White flex items-center
            justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" className="text-Brand_Pink">
              <rect x="1" y="3" width="15" height="13" rx="1"/>
              <path d="M16 8h4l3 5v4h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
          <div>
            <p className="font-Body text-sm font-semibold text-Ink mb-0.5">
              Estimated Delivery
            </p>
            <p className="font-Body text-sm text-Muted">
              <Delivery_Range />
            </p>
            <p className="font-Body text-xs text-Muted mt-2">
              Our team will contact you to confirm delivery details.
            </p>
          </div>
        </div>
      </div>

      {/* Payment reminder */}
      {Order && (
        <div className="bg-Blush_Light border border-Brand_Pink/20 rounded-2xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5"
              className="text-Brand_Pink flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div>
              <p className="font-Body text-sm font-semibold text-Ink mb-0.5">
                Payment on delivery
              </p>
              <p className="font-Body text-xs text-Muted">
                {Order.Payment_Method === 'cash'
                  ? 'Please have the exact cash amount ready for the courier.'
                  : 'Please have your InstaPay transfer ready for the courier.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="flex-1">
          <button className="w-full py-4 bg-Ink text-white rounded-full font-Body
            text-xs tracking-[0.15em] uppercase hover:opacity-80 transition-opacity">
            Continue Shopping
          </button>
        </Link>
        <Link href="/profile" className="flex-1">
          <button className="w-full py-4 border border-Border_Light text-Ink
            rounded-full font-Body text-xs tracking-[0.15em] uppercase
            hover:border-Ink transition-colors">
            View My Orders
          </button>
        </Link>
      </div>
    </main>
  );
}

export default function Confirmation_Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header_Navigation />
      <Suspense fallback={
        <main className="flex-1 flex items-center justify-center">
          <p className="font-Body text-Muted">Loading…</p>
        </main>
      }>
        <Confirmation_Content />
      </Suspense>
    </div>
  );
}