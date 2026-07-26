'use client';

import Link from 'next/link';
import { Header_Navigation } from '@/components/Header_Navigation';
import { Footer_Section } from '@/components/Footer_Section';
import { use_Cart_Context } from '@/contexts/Cart_Context';
import { Format_Price } from '@/data/products';

/* ── Illustrated empty bag SVG ──────────────────────────────────── */
function Empty_Bag_Illustration() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      {/* Bag body */}
      <rect x="18" y="42" width="84" height="66" rx="10"
        fill="#F2EBEE" stroke="#E5DBDF" strokeWidth="2"/>
      {/* Bag handle */}
      <path d="M42 42V32C42 21 78 21 78 32V42"
        stroke="#E5DBDF" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Stars / sparkle inside */}
      <path d="M52 72l2-5 2 5 5 2-5 2-2 5-2-5-5-2z"
        fill="#E392B0" opacity="0.7"/>
      <path d="M68 64l1.2-3 1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2z"
        fill="#E392B0" opacity="0.4"/>
      {/* Shine */}
      <circle cx="35" cy="55" r="3" fill="#E392B0" opacity="0.25"/>
    </svg>
  );
}

export default function Cart_Page() {
  const { Cart_Items, Cart_Total, Remove_From_Cart, Update_Quantity, Clear_Cart } =
    use_Cart_Context();

  /* ── Empty state ──────────────────────────────────────────────── */
  if (Cart_Items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header_Navigation />
        <main className="flex-1 flex flex-col items-center justify-center
          px-6 py-20 text-center">
          <Empty_Bag_Illustration />
          <h1 className="font-Display text-3xl text-Ink mt-6 mb-2">
            Your bag is empty
          </h1>
          <p className="font-Body text-sm text-Muted mb-8 max-w-xs">
            Discover the Rose Collection and add pieces you love.
          </p>
          <Link href="/"
            className="inline-block px-8 py-4 bg-Ink text-white rounded-full
              font-Body text-xs tracking-[0.15em] uppercase hover:opacity-80
              transition-opacity">
            Continue Shopping
          </Link>
        </main>
        <Footer_Section />
      </div>
    );
  }

  const Item_Count = Cart_Items.reduce((s, i) => s + i.Quantity, 0);

  /* ── Cart with items ─────────────────────────────────────────── */
  return (
    <div className="min-h-screen flex flex-col">
      <Header_Navigation />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        <div className="flex items-baseline justify-between mb-6 sm:mb-10">
          <h1 className="font-Display text-2xl sm:text-3xl text-Ink">Your Bag</h1>
          <span className="font-Body text-sm text-Muted">
            {Item_Count} item{Item_Count !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-10">

          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-Border_Light">
              {Cart_Items.map((Item) => (
                <div key={Item.Product_Id} className="flex gap-4 sm:gap-5 py-5">
                  <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-xl bg-Surface
                    flex-shrink-0 overflow-hidden">
                    {Item.Image_Url ? (
                      <img src={Item.Image_Url} alt={Item.Product_Name}
                        className="w-full h-full object-cover"/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="1" className="text-Border_Light">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h3 className="font-Body text-sm font-medium text-Ink truncate">
                          {Item.Product_Name}
                        </h3>
                        <p className="font-Body text-xs text-Muted mt-0.5 capitalize">
                          {Item.Color} · Size {Item.Size}
                        </p>
                      </div>
                      <p className="font-Display text-base sm:text-lg text-Ink flex-shrink-0">
                        {Format_Price(Item.Price * Item.Quantity)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-Border_Light
                        rounded-full overflow-hidden">
                        <button
                          onClick={() => {
                            if (Item.Quantity > 1)
                              Update_Quantity(Item.Product_Id, Item.Quantity - 1);
                            else Remove_From_Cart(Item.Product_Id);
                          }}
                          className="w-9 h-9 flex items-center justify-center text-Ink
                            hover:bg-Surface transition-colors text-lg">−
                        </button>
                        <span className="w-8 text-center font-Body text-sm text-Ink">
                          {Item.Quantity}
                        </span>
                        <button
                          onClick={() =>
                            Update_Quantity(Item.Product_Id, Item.Quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-Ink
                            hover:bg-Surface transition-colors text-lg">+
                        </button>
                      </div>

                      <button onClick={() => Remove_From_Cart(Item.Product_Id)}
                        className="font-Body text-xs text-Muted hover:text-Brand_Pink
                          transition-colors tracking-[0.05em] uppercase">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button onClick={Clear_Cart}
                className="font-Body text-xs text-Muted hover:text-Brand_Pink
                  transition-colors tracking-[0.05em] uppercase
                  underline underline-offset-2">
                Clear bag
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-Surface rounded-2xl p-5 sm:p-6 lg:sticky lg:top-24">
              <h2 className="font-Display text-xl text-Ink mb-5">Order Summary</h2>
              <div className="space-y-3 font-Body text-sm mb-5">
                <div className="flex justify-between text-Muted">
                  <span>Subtotal</span>
                  <span>{Format_Price(Cart_Total)}</span>
                </div>
                <div className="flex justify-between text-Muted">
                  <span>Shipping</span>
                  <span>Calculated at delivery</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline pb-5 border-b
                border-Border_Light mb-5">
                <span className="font-Body text-sm text-Ink">Total</span>
                <span className="font-Display text-2xl text-Ink">
                  {Format_Price(Cart_Total)}
                </span>
              </div>
              <Link href="/checkout" className="block">
                <button className="w-full py-4 sm:py-5 bg-Ink text-white rounded-full
                  font-Body text-xs tracking-[0.2em] uppercase hover:opacity-80
                  active:scale-[0.98] transition-all">
                  Proceed to Checkout
                </button>
              </Link>
              <p className="font-Body text-xs text-Muted text-center mt-4">
                Pay by cash or InstaPay on delivery
              </p>
              <Link href="/" className="block text-center mt-4">
                <span className="font-Body text-xs text-Muted hover:text-Ink
                  transition-colors underline underline-offset-2">
                  Continue Shopping
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer_Section />
    </div>
  );
}