'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header_Navigation } from '@/components/Header_Navigation';
import { Footer_Section } from '@/components/Footer_Section';
import { Quick_Add_Sheet } from '@/components/Quick_Add_Sheet';
import { use_Wishlist_Context } from '@/contexts/Wishlist_Context';
import { show_toast } from '@/components/Toast';
import { Get_Product_By_Id, Format_Price } from '@/data/products';

function Empty_Heart_Illustration() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <path d="M60 98C60 98 16 72 16 42C16 27 27 18 38 18C47 18 54 24 60 32C66 24 73 18 82 18C93 18 104 27 104 42C104 72 60 98 60 98Z"
        fill="#F7D9E3" stroke="#E392B0" strokeWidth="2"/>
      <path d="M60 45l2.5-6 2.5 6 6.5 2.5-6.5 2.5-2.5 6-2.5-6-6.5-2.5z"
        fill="#E392B0" opacity="0.8"/>
      <circle cx="38" cy="60" r="3" fill="#E392B0" opacity="0.35"/>
      <circle cx="82" cy="60" r="3" fill="#E392B0" opacity="0.35"/>
      <circle cx="50" cy="80" r="2" fill="#E392B0" opacity="0.25"/>
      <circle cx="70" cy="80" r="2" fill="#E392B0" opacity="0.25"/>
    </svg>
  );
}

export default function Wishlist_Page() {
  const { Wishlist_Items, Remove_From_Wishlist } = use_Wishlist_Context();

  /* Quick Add Sheet state */
  const [Sheet_Product, set_Sheet_Product] = useState<any>(null);

  const Handle_Remove = (Product_Id: string, Product_Name: string) => {
    Remove_From_Wishlist(Product_Id);
    show_toast(`${Product_Name} removed from saved items`);
  };

  const Open_Quick_Add = (Item: any) => {
    const Full_Product = Get_Product_By_Id(Item.Product_Id);
    set_Sheet_Product({
      Id:            Item.Product_Id,
      Name:          Item.Product_Name,
      Price:         Item.Price,
      Discount_Price: Full_Product?.Discount_Price,
      Image_Url:     Item.Image_Url,
      Color:         Full_Product?.Color || 'Rose',
      Stock:         Full_Product?.Stock ?? 99,
    });
  };

  /* ── Empty ─────────────────────────────────────────────────── */
  if (Wishlist_Items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header_Navigation />
        <main className="flex-1 flex flex-col items-center justify-center
          px-6 py-20 text-center">
          <Empty_Heart_Illustration />
          <h1 className="font-Display text-3xl text-Ink mt-6 mb-2">
            Nothing saved yet
          </h1>
          <p className="font-Body text-sm text-Muted mb-8 max-w-xs">
            Tap the heart on any product to save it here for later.
          </p>
          <Link href="/"
            className="inline-block px-8 py-4 bg-Ink text-white rounded-full
              font-Body text-xs tracking-[0.15em] uppercase hover:opacity-80
              transition-opacity">
            Browse Collection
          </Link>
        </main>
        <Footer_Section />
      </div>
    );
  }

  /* ── Grid ──────────────────────────────────────────────────── */
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header_Navigation />
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">

          <div className="flex items-baseline justify-between mb-6 sm:mb-10">
            <h1 className="font-Display text-2xl sm:text-3xl text-Ink">Saved Items</h1>
            <span className="font-Body text-sm text-Muted">
              {Wishlist_Items.length} item{Wishlist_Items.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {Wishlist_Items.map((Item) => {
              const Full = Get_Product_By_Id(Item.Product_Id);
              const Is_Out = (Full?.Stock ?? 1) === 0;

              return (
                <div key={Item.Product_Id}
                  className="group bg-Primary_White border border-Border_Light
                    rounded-2xl overflow-hidden hover:shadow-sm transition-shadow">

                  {/* Image */}
                  <Link href={`/products/${Item.Product_Id}`}
                    className="block relative aspect-[3/4] bg-Surface overflow-hidden">
                    {Item.Image_Url ? (
                      <img src={Item.Image_Url} alt={Item.Product_Name}
                        className="w-full h-full object-cover group-hover:scale-105
                          transition-transform duration-300"/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="1" className="text-Border_Light">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    )}

                    {/* Remove from wishlist */}
                    <button
                      onClick={(e) => { e.preventDefault(); Handle_Remove(Item.Product_Id, Item.Product_Name); }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full
                        bg-Primary_White/85 backdrop-blur-sm flex items-center justify-center
                        hover:bg-Blush_Light transition-colors z-10">
                      <svg width="14" height="14" viewBox="0 0 24 24"
                        fill="#E392B0" stroke="#E392B0" strokeWidth="1.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                  </Link>

                  {/* Info */}
                  <div className="p-3 sm:p-4">
                    <Link href={`/products/${Item.Product_Id}`}>
                      <h3 className="font-Body text-sm text-Ink leading-tight mb-1
                        line-clamp-2 hover:text-Brand_Pink transition-colors">
                        {Item.Product_Name}
                      </h3>
                    </Link>
                    <p className="font-Display text-base text-Ink mb-3">
                      {Format_Price(Item.Price)}
                    </p>

                    {/* Add to Bag → opens Quick Add Sheet with size/qty selection */}
                    {!Is_Out ? (
                      <button
                        onClick={() => Open_Quick_Add(Item)}
                        className="w-full py-2.5 rounded-full bg-Ink text-white
                          font-Body text-xs tracking-[0.1em] uppercase
                          hover:opacity-80 transition-opacity">
                        Add to Bag
                      </button>
                    ) : (
                      <button disabled
                        className="w-full py-2.5 rounded-full border border-Border_Light
                          text-Muted font-Body text-xs tracking-[0.1em] uppercase
                          opacity-50 cursor-not-allowed">
                        Sold Out
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/cart"
              className="inline-block px-8 py-4 border border-Border_Light text-Ink
                rounded-full font-Body text-xs tracking-[0.15em] uppercase
                hover:border-Ink transition-colors">
              View My Cart
            </Link>
          </div>
        </main>
        <Footer_Section />
      </div>

      {/* Quick Add Sheet — opens when user clicks "Add to Bag" on a saved item */}
      <Quick_Add_Sheet
        Is_Open={!!Sheet_Product}
        On_Close={() => set_Sheet_Product(null)}
        Product={Sheet_Product}
      />
    </>
  );
}