'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Header_Navigation } from '@/components/Header_Navigation';
import { Footer_Section } from '@/components/Footer_Section';
import { Button_Primary } from '@/components/Button_Primary';
import { use_Auth_Context, Order } from '@/contexts/Auth_Context';
import { Format_Price } from '@/data/products';

const PROFILE_IMAGE_KEY = 'nojoom_profile_image';

export default function Profile_Page() {
  const { User, Is_Loading, Get_Orders } = use_Auth_Context();
  const [Orders, set_Orders]               = useState<Order[]>([]);
  const [Profile_Image, set_Profile_Image] = useState<string | null>(null);
  const [Is_Hovering, set_Is_Hovering]     = useState(false);
  const File_Input_Ref = useRef<HTMLInputElement>(null);

  // ── NO Router, NO redirect, NO useRouter ──────────────────────────
  // Profile page stays on /profile regardless of login state

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const Saved = localStorage.getItem(PROFILE_IMAGE_KEY);
      if (Saved) set_Profile_Image(Saved);
    }
  }, []);

  useEffect(() => {
    if (User) set_Orders(Get_Orders());
  }, [User, Get_Orders]);

  const Handle_Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const File = e.target.files?.[0];
    if (!File) return;
    const Reader = new FileReader();
    Reader.onloadend = () => {
      const Data = Reader.result as string;
      set_Profile_Image(Data);
      localStorage.setItem(PROFILE_IMAGE_KEY, Data);
      window.dispatchEvent(new Event('profile_image_changed'));
    };
    Reader.readAsDataURL(File);
  };

  const Handle_Remove = (e: React.MouseEvent) => {
    e.stopPropagation();
    set_Profile_Image(null);
    localStorage.removeItem(PROFILE_IMAGE_KEY);
    if (File_Input_Ref.current) File_Input_Ref.current.value = '';
    window.dispatchEvent(new Event('profile_image_changed'));
  };

  const Format_Date = (Iso: string) =>
    new Date(Iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    });

  if (Is_Loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-Body text-Muted">Loading…</p>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // NOT LOGGED IN — empty profile, plain text only, zero buttons
  // ══════════════════════════════════════════════════════════════════
  if (!User) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header_Navigation />
        <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">

          {/* Empty avatar */}
          <div className="flex items-center gap-5 mb-10">
            <div className="w-16 h-16 rounded-full bg-Surface flex items-center
              justify-center flex-shrink-0">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.2" className="text-Muted">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <p className="font-Display text-2xl text-Muted">Your Profile</p>
          </div>

          {/* Empty details */}
          <section className="bg-Surface rounded-2xl p-6 mb-8">
            <h2 className="font-Body text-xs font-semibold tracking-[0.15em]
              uppercase text-Ink mb-5">Your Details</h2>
            <dl className="font-Body text-sm space-y-4">
              {['Name', 'Email', 'Phone', 'Member since'].map((label) => (
                <div key={label} className="flex justify-between items-center">
                  <dt className="text-Muted">{label}</dt>
                  <dd className="text-Muted/30 select-none">———</dd>
                </div>
              ))}
            </dl>
            <p className="font-Body text-xs text-Muted text-center mt-6 pt-5
              border-t border-Border_Light">
              Login to see your profile data
            </p>
          </section>

          {/* Empty orders */}
          <section>
            <h2 className="font-Body text-xs font-semibold tracking-[0.15em]
              uppercase text-Ink mb-4">Your Orders</h2>
            <div className="bg-Surface rounded-2xl p-8 text-center">
              <p className="font-Body text-sm text-Muted">
                Login to see your order history
              </p>
            </div>
          </section>

        </main>
        <Footer_Section />
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // LOGGED IN
  // ══════════════════════════════════════════════════════════════════
  const Initials = User.Name
    .split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col">
      <Header_Navigation />
      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">

        {/* Avatar */}
        <div className="flex items-center gap-5 mb-10">
          <div
            className="relative w-16 h-16 rounded-full cursor-pointer flex-shrink-0"
            onMouseEnter={() => set_Is_Hovering(true)}
            onMouseLeave={() => set_Is_Hovering(false)}
            onClick={() => File_Input_Ref.current?.click()}
          >
            {Profile_Image ? (
              <img src={Profile_Image} alt={User.Name}
                className="w-full h-full rounded-full object-cover" />
            ) : (
              <div className="w-full h-full rounded-full bg-Ink text-white
                flex items-center justify-center font-Display text-xl">
                {Initials}
              </div>
            )}
            <div className={`absolute inset-0 rounded-full bg-black/55
              flex flex-col items-center justify-center gap-1 transition-opacity
              ${Is_Hovering ? 'opacity-100' : 'opacity-0'}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="1.5">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              {Profile_Image && (
                <button onClick={Handle_Remove}
                  className="w-5 h-5 flex items-center justify-center
                    rounded-full bg-white/20 hover:bg-white/40">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="white" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
            <input ref={File_Input_Ref} type="file" accept="image/*"
              className="hidden" onChange={Handle_Upload} />
          </div>

          <div>
            <h1 className="font-Display text-3xl text-Ink">{User.Name}</h1>
            <p className="font-Body text-sm text-Muted mt-0.5">{User.Email}</p>
            <p className="font-Body text-xs text-Muted mt-1.5 opacity-50">
              Hover photo to change it
            </p>
          </div>
        </div>

        {/* Details */}
        <section className="bg-Surface rounded-2xl p-6 mb-8">
          <h2 className="font-Body text-xs font-semibold tracking-[0.15em]
            uppercase text-Ink mb-5">Your Details</h2>
          <dl className="font-Body text-sm space-y-4">
            {[
              { label: 'Name',         value: User.Name },
              { label: 'Email',        value: User.Email },
              { label: 'Phone',        value: User.Phone || '—' },
              { label: 'Member since', value: Format_Date(User.Created_At) },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <dt className="text-Muted">{label}</dt>
                <dd className="text-Ink text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Orders */}
        <section>
          <h2 className="font-Body text-xs font-semibold tracking-[0.15em]
            uppercase text-Ink mb-4">Your Orders</h2>
          {Orders.length === 0 ? (
            <div className="bg-Surface rounded-2xl p-8 text-center">
              <p className="font-Body text-Muted mb-4">
                You haven&apos;t placed any orders yet.
              </p>
              <Link href="/">
                <Button_Primary Label="Start Shopping" Variant="dark" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {Orders.map((Order) => (
                <div key={Order.Id} className="bg-Surface rounded-2xl p-6">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                    <div>
                      <p className="font-Display text-lg text-Ink">{Order.Id}</p>
                      <p className="font-Body text-xs text-Muted">
                        {Format_Date(Order.Created_At)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-Display text-lg text-Ink">
                        {Format_Price(Order.Total)}
                      </p>
                      <span className="inline-block mt-1 px-3 py-1 bg-Blush_Light
                        text-Ink text-[10px] font-Body font-semibold
                        tracking-[0.1em] uppercase rounded-full capitalize">
                        {Order.Status}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2 border-t border-Border_Light pt-4">
                    {Order.Items.map((Item, Index) => (
                      <li key={Index} className="flex justify-between font-Body text-sm">
                        <span className="text-Ink">
                          {Item.Product_Name}{' '}
                          <span className="text-Muted">
                            ×{Item.Quantity} ({Item.Color}/{Item.Size})
                          </span>
                        </span>
                        <span className="text-Ink">
                          {Format_Price(Item.Price * Item.Quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-Body text-xs text-Muted mt-3">
                    Payment:{' '}
                    {Order.Payment_Method === 'cash' ? 'Cash on Delivery' : 'InstaPay'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer_Section />
    </div>
  );
}