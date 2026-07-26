'use client';

import { useState, useEffect } from 'react';
import { Header_Navigation } from '@/components/Header_Navigation';
import { Footer_Section } from '@/components/Footer_Section';
import { Button_Primary } from '@/components/Button_Primary';
import { use_Cart_Context } from '@/contexts/Cart_Context';
import { use_Auth_Context } from '@/contexts/Auth_Context';
import Link from 'next/link';

export default function Checkout_Page() {
  const [Full_Name, set_Full_Name] = useState('');
  const [Phone_Number, set_Phone_Number] = useState('');
  const [Address, set_Address] = useState('');
  const [City, set_City] = useState('');
  const [Payment_Method, set_Payment_Method] = useState('cash');
  const [Is_Loading, set_Is_Loading] = useState(false);

  const { Cart_Items, Cart_Total, Clear_Cart } = use_Cart_Context();
  const { User, Create_Order } = use_Auth_Context();

  useEffect(() => {
    if (User) {
      set_Full_Name(User.Name);
      set_Phone_Number(User.Phone);
    }
  }, [User]);

  const Handle_Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    set_Is_Loading(true);

    try {
      const Order = Create_Order({
        Total: Cart_Total,
        Payment_Method,
        Items: Cart_Items.map((Item) => ({
          Product_Id: Item.Product_Id,
          Product_Name: Item.Product_Name,
          Quantity: Item.Quantity,
          Price: Item.Price,
          Color: Item.Color,
          Size: Item.Size,
        })),
        Delivery: {
          Full_Name,
          Phone: Phone_Number,
          Address,
          City,
        },
      });

      Clear_Cart();
      window.location.href = `/confirmation?order=${Order.Id}`;
    } finally {
      set_Is_Loading(false);
    }
  };

  if (Cart_Items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header_Navigation />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="font-Display text-3xl text-Ink mb-4">Your cart is empty</h1>
            <Link href="/">
              <Button_Primary Label="Continue Shopping" Variant="dark" />
            </Link>
          </div>
        </main>
        <Footer_Section />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header_Navigation />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-Display text-3xl text-Ink mb-8">Checkout</h1>

        {!User && (
          <div className="bg-Surface rounded-2xl px-6 py-4 mb-8 font-Body text-sm text-Muted">
            <Link href="/login" className="text-Ink font-semibold hover:text-Brand_Pink">
              Sign in
            </Link>{' '}
            to save this order to your profile and track it later.
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={Handle_Submit} className="space-y-6">
            <div>
              <label className="block font-Body text-xs tracking-[0.1em] uppercase text-Ink mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={Full_Name}
                onChange={(e) => set_Full_Name(e.target.value)}
                required
                className="w-full px-5 py-3 rounded-full border border-Border_Light font-Body text-sm outline-none focus:border-Ink"
              />
            </div>

            <div>
              <label className="block font-Body text-xs tracking-[0.1em] uppercase text-Ink mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={Phone_Number}
                onChange={(e) => set_Phone_Number(e.target.value)}
                required
                className="w-full px-5 py-3 rounded-full border border-Border_Light font-Body text-sm outline-none focus:border-Ink"
              />
            </div>

            <div>
              <label className="block font-Body text-xs tracking-[0.1em] uppercase text-Ink mb-2">
                Address
              </label>
              <textarea
                value={Address}
                onChange={(e) => set_Address(e.target.value)}
                required
                rows={3}
                className="w-full px-5 py-3 rounded-2xl border border-Border_Light font-Body text-sm outline-none focus:border-Ink resize-none"
              />
            </div>

            <div>
              <label className="block font-Body text-xs tracking-[0.1em] uppercase text-Ink mb-2">
                City
              </label>
              <input
                type="text"
                value={City}
                onChange={(e) => set_City(e.target.value)}
                required
                className="w-full px-5 py-3 rounded-full border border-Border_Light font-Body text-sm outline-none focus:border-Ink"
              />
            </div>

            <div className="pt-4">
              <h3 className="font-Body text-xs tracking-[0.1em] uppercase text-Ink mb-4">
                Payment Method
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={Payment_Method === 'cash'}
                    onChange={(e) => set_Payment_Method(e.target.value)}
                  />
                  <span className="font-Body text-Ink">Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="instapay"
                    checked={Payment_Method === 'instapay'}
                    onChange={(e) => set_Payment_Method(e.target.value)}
                  />
                  <span className="font-Body text-Ink">InstaPay on Delivery</span>
                </label>
              </div>
            </div>

            <Button_Primary
              Label="Complete Order"
              Variant="dark"
              Full_Width
              Is_Loading={Is_Loading}
            />
          </form>

          <div>
            <div className="bg-Surface rounded-2xl p-6 sticky top-20">
              <h3 className="font-Display text-xl text-Ink mb-4">Order Summary</h3>

              <div className="divide-y divide-Border_Light">
                {Cart_Items.map((Item) => (
                  <div key={Item.Product_Id} className="py-3 flex justify-between">
                    <div className="font-Body text-Ink">
                      <p>{Item.Product_Name}</p>
                      <p className="text-sm text-Muted">
                        {Item.Quantity}x {Item.Color}/{Item.Size}
                      </p>
                    </div>
                    <span className="font-Display text-Ink">
                      {Item.Price * Item.Quantity} LE
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-Border_Light mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-Body font-semibold text-Ink">Total:</span>
                  <span className="font-Display text-2xl text-Ink">
                    {Cart_Total} LE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer_Section />
    </div>
  );
}
