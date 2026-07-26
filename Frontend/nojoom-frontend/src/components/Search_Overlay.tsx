'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, Format_Price } from '@/data/products';

interface Search_Overlay_Props {
  Is_Open: boolean;
  On_Close: () => void;
}

export function Search_Overlay({ Is_Open, On_Close }: Search_Overlay_Props) {
  const [Query, set_Query] = useState('');
  const Input_Ref = useRef<HTMLInputElement>(null);

  /* Auto-focus and keyboard close */
  useEffect(() => {
    if (Is_Open) {
      setTimeout(() => Input_Ref.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      set_Query('');
      document.body.style.overflow = '';
    }
  }, [Is_Open]);

  useEffect(() => {
    const Handle = (e: KeyboardEvent) => { if (e.key === 'Escape') On_Close(); };
    document.addEventListener('keydown', Handle);
    return () => document.removeEventListener('keydown', Handle);
  }, [On_Close]);

  /* Filter products */
  const Results = Query.trim().length > 0
    ? PRODUCTS.filter((p) =>
        p.Name.toLowerCase().includes(Query.toLowerCase()) ||
        p.Color?.toLowerCase().includes(Query.toLowerCase()) ||
        p.Categories?.some((c: string) => c.toLowerCase().includes(Query.toLowerCase()))
      )
    : [];

  if (!Is_Open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
        onClick={On_Close} />

      {/* Search panel — slides down from top */}
      <div className="fixed top-0 left-0 right-0 z-[110] bg-Primary_White
        shadow-lg animate-Fade_In">

        {/* Search input row */}
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center gap-4">
          {/* Search icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" className="text-Muted flex-shrink-0">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>

          <input
            ref={Input_Ref}
            type="text"
            value={Query}
            onChange={(e) => set_Query(e.target.value)}
            placeholder="Search for dresses, colours…"
            className="flex-1 font-Display text-xl text-Ink bg-transparent
              outline-none placeholder:text-Muted/50"
          />

          {/* Clear */}
          {Query && (
            <button onClick={() => set_Query('')}
              className="p-1.5 rounded-full hover:bg-Surface transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}

          {/* Close */}
          <button onClick={On_Close}
            className="font-Body text-xs text-Muted tracking-[0.1em]
              uppercase hover:text-Ink transition-colors ml-2">
            Cancel
          </button>
        </div>

        {/* Results */}
        {Query.trim().length > 0 && (
          <div className="border-t border-Border_Light max-h-[60vh] overflow-y-auto">
            <div className="max-w-3xl mx-auto px-6 py-4">
              {Results.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="font-Body text-sm text-Muted mb-1">
                    No results for &ldquo;{Query}&rdquo;
                  </p>
                  <p className="font-Body text-xs text-Muted/60">
                    Try a different name or colour
                  </p>
                </div>
              ) : (
                <>
                  <p className="font-Body text-xs text-Muted mb-4 tracking-[0.05em]">
                    {Results.length} result{Results.length !== 1 ? 's' : ''}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Results.map((Product) => (
                      <Link
                        key={Product.Id}
                        href={`/products/${Product.Id}`}
                        onClick={On_Close}
                        className="group flex flex-col gap-2"
                      >
                        {/* Image */}
                        <div className="aspect-[3/4] bg-Surface rounded-xl overflow-hidden">
                          {Product.Image_Url ? (
                            <img src={Product.Image_Url} alt={Product.Name}
                              className="w-full h-full object-cover
                                group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="1"
                                className="text-Border_Light">
                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <polyline points="21 15 16 10 5 21"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        {/* Info */}
                        <div>
                          <p className="font-Body text-sm text-Ink leading-tight
                            group-hover:text-Brand_Pink transition-colors">
                            {Product.Name}
                          </p>
                          <p className="font-Display text-base text-Ink mt-0.5">
                            {Format_Price(Product.Discount_Price || Product.Price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Empty state — show popular when no query */}
        {Query.trim().length === 0 && (
          <div className="border-t border-Border_Light">
            <div className="max-w-3xl mx-auto px-6 py-5">
              <p className="font-Body text-xs text-Muted mb-3 tracking-[0.1em] uppercase">
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {['Maxi dress', 'Midi dress', 'Rose', 'Sale', 'New arrivals'].map((term) => (
                  <button key={term}
                    onClick={() => set_Query(term)}
                    className="px-4 py-2 rounded-full border border-Border_Light
                      font-Body text-xs text-Muted hover:border-Ink hover:text-Ink
                      transition-colors">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}