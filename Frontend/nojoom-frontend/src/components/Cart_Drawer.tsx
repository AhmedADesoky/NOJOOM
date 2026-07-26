'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button_Primary } from './Button_Primary';
import { use_Cart_Context } from '@/contexts/Cart_Context';
import Link from 'next/link';

interface Cart_Drawer_Props {
  Is_Open: boolean;
  On_Close: () => void;
}

export const Cart_Drawer = ({ Is_Open, On_Close }: Cart_Drawer_Props) => {
  const { Cart_Items, Cart_Total, Remove_From_Cart, Update_Quantity } = use_Cart_Context();

  const Handle_Quantity_Change = (Product_Id: string, New_Quantity: number) => {
    if (New_Quantity > 0) {
      Update_Quantity(Product_Id, New_Quantity);
    }
  };

  return (
    <>
      {/* Overlay */}
      {Is_Open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 animate-Fade_In"
          onClick={On_Close}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full max-w-md bg-Primary_White shadow-2xl z-50
          transform transition-transform duration-300 ease-out overflow-y-auto
          ${Is_Open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="sticky top-0 bg-Primary_White border-b border-Border p-4 flex justify-between items-center">
          <h2 className="font-Display text-xl font-bold text-Ink">Your Bag</h2>
          <button
            onClick={On_Close}
            className="p-2 hover:bg-Surface rounded-lg transition"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        {Cart_Items.length > 0 ? (
          <>
            <div className="divide-y divide-Border p-4 space-y-4">
              {Cart_Items.map((Item) => (
                <div key={Item.Product_Id} className="flex gap-4 py-4">
                  {/* Image */}
                  <div className="relative w-20 h-24 bg-Surface rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={Item.Image_Url}
                      alt={Item.Product_Name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-Body font-semibold text-Ink line-clamp-2">
                      {Item.Product_Name}
                    </h3>
                    <p className="text-sm text-Muted mt-1">
                      {Item.Color} / {Item.Size}
                    </p>
                    <p className="font-Display text-Brand_Pink font-bold mt-2">
                      {Item.Price} LE
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() =>
                          Handle_Quantity_Change(Item.Product_Id, Item.Quantity - 1)
                        }
                        className="p-1 bg-Surface rounded hover:bg-Border transition"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{Item.Quantity}</span>
                      <button
                        onClick={() =>
                          Handle_Quantity_Change(Item.Product_Id, Item.Quantity + 1)
                        }
                        className="p-1 bg-Surface rounded hover:bg-Border transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => Remove_From_Cart(Item.Product_Id)}
                    className="text-Muted hover:text-Brand_Pink transition p-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-Border p-4 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-Body font-semibold text-Ink">Subtotal:</span>
                <span className="font-Display font-bold text-Brand_Pink">{Cart_Total} LE</span>
              </div>
              <p className="text-xs text-Muted">Shipping will be calculated at checkout</p>
              <Link href="/checkout">
                <Button_Primary
                  Label="Proceed to Checkout"
                  Full_Width
                />
              </Link>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <p className="font-Body text-Muted mb-4">Your bag is empty</p>
            <Button_Primary
              Label="Continue Shopping"
              On_Click={On_Close}
              Variant="outline"
              Full_Width
            />
          </div>
        )}
      </div>
    </>
  );
};
