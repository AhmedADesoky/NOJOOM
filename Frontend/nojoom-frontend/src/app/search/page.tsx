'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header_Navigation } from '@/components/Header_Navigation';
import { Footer_Section } from '@/components/Footer_Section';
import { use_Cart_Context } from '@/contexts/Cart_Context';
import { use_Wishlist_Context } from '@/contexts/Wishlist_Context';
import { show_toast } from '@/components/Toast';
import { PRODUCTS, Format_Price } from '@/data/products';

export default function Search_Page() {
  const Search_Params = useSearchParams();
  const Router = useRouter();
  const Input_Ref = useRef<HTMLInputElement>(null);

  const Initial_Query = Search_Params.get('q') || '';
  const [Query, set_Query] = useState(Initial_Query);

  const { Add_To_Cart } = use_Cart_Context();
  const { Is_In_Wishlist, Add_To_Wishlist, Remove_From_Wishlist } = use_Wishlist_Context();

  // Auto-focus on mount
  useEffect(() => {
    Input_Ref.current?.focus();
  }, []);

  // Update URL when query changes (debounced)
  useEffect(() => {
    const Timer = setTimeout(() => {
      const Trimmed = Query.trim();
      if (Trimmed) {
        Router.replace(`/search?q=${encodeURIComponent(Trimmed)}`, { scroll: false });
      } else {
        Router.replace('/search', { scroll: false });
      }
    }, 300);
    return () => clearTimeout(Timer);
  }, [Query, Router]);

  // Filter products
  const Results = Query.trim().length > 0
    ? PRODUCTS.filter((p) =>
        p.Name.toLowerCase().includes(Query.toLowerCase()) ||
        p.Color?.toLowerCase().includes(Query.toLowerCase()) ||
        p.Categories?.some((c: string) =>
          c.toLowerCase().includes(Query.toLowerCase())
        )
      )
    : [];

  const POPULAR = ['Maxi dress', 'Midi dress', 'Rose', 'Ivory', 'Sale', 'New arrivals'];

  const Handle_Add_Cart = (Product: any) => {
    Add_To_Cart({
      Product_Id:   Product.Id,
      Product_Name: Product.Name,
      Price:        Product.Discount_Price || Product.Price,
      Image_Url:    Product.Image_Url || '',
      Color:        Product.Color,
      Size:         'M',
      Quantity:     1,
    });
    show_toast(`${Product.Name} added to your bag`);
  };

  const Handle_Wishlist = (Product: any) => {
    if (Is_In_Wishlist(Product.Id)) {
      Remove_From_Wishlist(Product.Id);
      show_toast('Removed from saved items');
    } else {
      Add_To_Wishlist({
        Product_Id:   Product.Id,
        Product_Name: Product.Name,
        Price:        Product.Discount_Price || Product.Price,
        Image_Url:    Product.Image_Url || '',
      });
      show_toast('Saved to your wishlist');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header_Navigation />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 w-full py-8">

        {/* ── Search input ──────────────────────────────────────── */}
        <div className="flex items-center gap-4 pb-6 border-b border-Border_Light mb-8">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" className="text-Muted flex-shrink-0">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>

          <input
            ref={Input_Ref}
            type="text"
            value={Query}
            onChange={(e) => set_Query(e.target.value)}
            placeholder="Search dresses, colours, categories…"
            className="flex-1 font-Display text-2xl sm:text-3xl text-Ink
              bg-transparent outline-none placeholder:text-Muted/40"
          />

          {Query && (
            <button onClick={() => set_Query('')}
              className="p-2 rounded-full hover:bg-Surface transition-colors flex-shrink-0"
              aria-label="Clear search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" className="text-Muted">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        {/* ── No query — show popular searches ─────────────────── */}
        {Query.trim().length === 0 && (
          <div>
            <p className="font-Body text-xs text-Muted tracking-[0.12em]
              uppercase mb-4">Popular searches</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR.map((term) => (
                <button key={term}
                  onClick={() => set_Query(term)}
                  className="px-5 py-2.5 rounded-full border border-Border_Light
                    font-Body text-sm text-Muted hover:border-Ink hover:text-Ink
                    transition-colors">
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Results header ────────────────────────────────────── */}
        {Query.trim().length > 0 && (
          <div className="flex items-baseline justify-between mb-6">
            <h1 className="font-Display text-2xl text-Ink">
              {Results.length === 0
                ? `No results for "${Query}"`
                : `Results for "${Query}"`}
            </h1>
            {Results.length > 0 && (
              <span className="font-Body text-sm text-Muted">
                {Results.length} piece{Results.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}

        {/* ── No results ──────────────────────────────────────── */}
        {Query.trim().length > 0 && Results.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-Body text-sm text-Muted mb-2">
              Try a different name, colour, or category.
            </p>
            <p className="font-Body text-xs text-Muted mb-8 opacity-60">
              e.g. "Rose dress", "Ivory maxi", "Sale"
            </p>
            <Link href="/"
              className="inline-block px-7 py-3 bg-Ink text-white rounded-full
                font-Body text-xs tracking-[0.15em] uppercase hover:opacity-80
                transition-opacity">
              Browse all pieces
            </Link>
          </div>
        )}

        {/* ── Product grid ──────────────────────────────────────── */}
        {Results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {Results.map((Product) => {
              const Display_Price = Product.Discount_Price || Product.Price;
              const Is_Saved      = Is_In_Wishlist(Product.Id);

              return (
                <div key={Product.Id}
                  className="group bg-Primary_White border border-Border_Light
                    rounded-2xl overflow-hidden hover:shadow-sm transition-shadow">

                  {/* Image → product detail */}
                  <Link href={`/products/${Product.Id}`}
                    className="block relative aspect-[3/4] bg-Surface overflow-hidden">
                    {Product.Image_Url ? (
                      <img src={Product.Image_Url} alt={Product.Name}
                        className="w-full h-full object-cover group-hover:scale-105
                          transition-transform duration-300" />
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

                    {/* Wishlist button */}
                    <button
                      onClick={(e) => { e.preventDefault(); Handle_Wishlist(Product); }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full
                        bg-Primary_White/85 backdrop-blur-sm flex items-center
                        justify-center hover:bg-Blush_Light transition-colors z-10">
                      <svg width="14" height="14" viewBox="0 0 24 24"
                        fill={Is_Saved ? '#E392B0' : 'none'}
                        stroke={Is_Saved ? '#E392B0' : 'currentColor'}
                        strokeWidth="1.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>

                    {/* Sale / New badge */}
                    {Product.Discount_Price && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1
                        rounded-full bg-Blush_Light text-Rose_Dark font-Body
                        text-[10px] font-semibold">Sale</span>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="p-3 sm:p-4">
                    <Link href={`/products/${Product.Id}`}>
                      <h3 className="font-Body text-sm text-Ink leading-tight mb-1
                        line-clamp-2 hover:text-Brand_Pink transition-colors">
                        {Product.Name}
                      </h3>
                    </Link>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-Display text-base text-Ink">
                        {Format_Price(Display_Price)}
                      </span>
                      {Product.Discount_Price && (
                        <span className="font-Body text-xs text-Muted line-through">
                          {Format_Price(Product.Price)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => Handle_Add_Cart(Product)}
                      disabled={Product.Stock === 0}
                      className="w-full py-2.5 rounded-full font-Body text-xs
                        tracking-[0.1em] uppercase transition-all
                        bg-Ink text-white hover:opacity-80
                        disabled:opacity-40 disabled:cursor-not-allowed">
                      {Product.Stock === 0 ? 'Out of stock' : 'Add to Bag'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer_Section />
    </div>
  );
}