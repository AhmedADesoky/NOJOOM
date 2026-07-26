'use client';

import { useEffect, useState } from 'react';
import { use_Cart_Context } from '@/contexts/Cart_Context';
import { show_toast } from '@/components/Toast';
import { Format_Price } from '@/data/products';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

interface Quick_Add_Sheet_Props {
  Is_Open: boolean;
  On_Close: () => void;
  Product: {
    Id: string;
    Name: string;
    Price: number;
    Discount_Price?: number;
    Image_Url: string;
    Color: string;
    Stock: number;
  } | null;
}

export function Quick_Add_Sheet({ Is_Open, On_Close, Product }: Quick_Add_Sheet_Props) {
  const [Selected_Size, set_Selected_Size] = useState('M');
  const [Quantity, set_Quantity]           = useState(1);
  const { Add_To_Cart } = use_Cart_Context();

  /* Reset when a new product opens */
  useEffect(() => {
    if (Is_Open) {
      set_Selected_Size('M');
      set_Quantity(1);
    }
  }, [Is_Open, Product?.Id]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = Is_Open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [Is_Open]);

  /* Close on Escape */
  useEffect(() => {
    const Handler = (e: KeyboardEvent) => { if (e.key === 'Escape') On_Close(); };
    document.addEventListener('keydown', Handler);
    return () => document.removeEventListener('keydown', Handler);
  }, [On_Close]);

  if (!Product) return null;

  const Display_Price = Product.Discount_Price || Product.Price;

  const Handle_Add = () => {
    Add_To_Cart({
      Product_Id:   Product.Id,
      Product_Name: Product.Name,
      Price:        Display_Price,
      Image_Url:    Product.Image_Url,
      Color:        Product.Color,
      Size:         Selected_Size,
      Quantity,
    });
    show_toast(`${Product.Name} added to your bag`);
    On_Close();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]
          transition-opacity duration-300
          ${Is_Open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={On_Close}
      />

      {/* Bottom sheet — slides up on mobile, centered on desktop */}
      <div
        className={`
          fixed z-[100] bg-Primary_White rounded-t-2xl md:rounded-2xl
          transition-all duration-350 ease-out
          /* Mobile: full-width bottom sheet */
          bottom-0 left-0 right-0
          /* Desktop: centred popup */
          md:bottom-auto md:top-1/2 md:left-1/2
          md:-translate-x-1/2 md:-translate-y-1/2
          md:w-full md:max-w-md
          ${Is_Open
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full md:translate-y-[-45%] opacity-0 pointer-events-none'}
        `}
      >
        {/* Grab handle (mobile) */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-Border_Light" />
        </div>

        <div className="px-6 pt-4 pb-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex-1 min-w-0">
              <h3 className="font-Display text-xl text-Ink leading-tight truncate">
                {Product.Name}
              </h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-Display text-lg text-Ink">
                  {Format_Price(Display_Price)}
                </span>
                {Product.Discount_Price && (
                  <span className="font-Body text-sm text-Muted line-through">
                    {Format_Price(Product.Price)}
                  </span>
                )}
              </div>
            </div>
            <button onClick={On_Close}
              className="p-2 rounded-full hover:bg-Surface transition-colors ml-2 flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Size selector */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-Body text-xs tracking-[0.1em] uppercase text-Ink">
                Size — <span className="normal-case font-normal text-Muted">
                  {Selected_Size}
                </span>
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {SIZES.map((Size) => (
                <button key={Size}
                  onClick={() => set_Selected_Size(Size)}
                  className={`min-w-[48px] h-11 px-3 rounded-xl font-Body text-sm
                    border transition-all duration-150
                    ${Selected_Size === Size
                      ? 'bg-Ink text-white border-Ink'
                      : 'bg-Primary_White text-Ink border-Border_Light hover:border-Ink'}`}>
                  {Size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="font-Body text-xs tracking-[0.1em] uppercase text-Ink mb-3">
              Quantity
            </p>
            <div className="flex items-center border border-Border_Light
              rounded-full overflow-hidden w-fit">
              <button
                onClick={() => set_Quantity((q) => Math.max(1, q - 1))}
                disabled={Quantity <= 1}
                className="w-11 h-11 flex items-center justify-center text-Ink
                  hover:bg-Surface transition-colors disabled:opacity-40 text-lg">
                −
              </button>
              <span className="w-10 text-center font-Body text-sm text-Ink">
                {Quantity}
              </span>
              <button
                onClick={() => set_Quantity((q) => Math.min(Product.Stock, q + 1))}
                disabled={Quantity >= Product.Stock}
                className="w-11 h-11 flex items-center justify-center text-Ink
                  hover:bg-Surface transition-colors disabled:opacity-40 text-lg">
                +
              </button>
            </div>
          </div>

          {/* Add to bag */}
          <button onClick={Handle_Add}
            className="w-full py-4 bg-Ink text-white rounded-full font-Body
              text-xs tracking-[0.2em] uppercase hover:opacity-80
              active:scale-[0.98] transition-all">
            Add to Bag — {Format_Price(Display_Price * Quantity)}
          </button>
        </div>
      </div>
    </>
  );
}