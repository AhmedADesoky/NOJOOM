'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header_Navigation } from '@/components/Header_Navigation';
import { Cart_Drawer } from '@/components/Cart_Drawer';
import { Footer_Section } from '@/components/Footer_Section';
import { Button_Primary } from '@/components/Button_Primary';
import { Icon_Wishlist } from '@/components/Icon_Wishlist';
import { Get_Product_By_Id, Format_Price } from '@/data/products';
import { use_Cart_Context } from '@/contexts/Cart_Context';
import { use_Wishlist_Context } from '@/contexts/Wishlist_Context';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export function ProductDetailClient({ id }: { id: string }) {
  const Router = useRouter();
  const Product = Get_Product_By_Id(id);

  const [Selected_Size, set_Selected_Size] = useState('M');
  const [Quantity, set_Quantity] = useState(1);
  const [Is_Adding, set_Is_Adding] = useState(false);
  const [Is_Cart_Open, set_Is_Cart_Open] = useState(false);

  const { Add_To_Cart } = use_Cart_Context();
  const { Is_In_Wishlist, Add_To_Wishlist, Remove_From_Wishlist } = use_Wishlist_Context();

  if (!Product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header_Navigation />
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-Display text-3xl text-Ink mb-4">Product Not Found</h1>
            <Link href="/">
              <Button_Primary Label="Back to Shop" Variant="dark" />
            </Link>
          </div>
        </main>
        <Footer_Section />
      </div>
    );
  }

  const Display_Price = Product.Discount_Price || Product.Price;
  const Is_Out_Of_Stock = Product.Stock === 0;
  const Stock_Label =
    Product.Stock === 0
      ? 'Out of stock'
      : Product.Stock <= 5
        ? `Only ${Product.Stock} left in stock`
        : `${Product.Stock} in stock`;

  const Handle_Add_To_Cart = () => {
    if (Is_Out_Of_Stock) return;
    set_Is_Adding(true);
    Add_To_Cart({
      Product_Id: Product.Id,
      Product_Name: Product.Name,
      Price: Display_Price,
      Image_Url: Product.Image_Url,
      Color: Product.Color,
      Size: Selected_Size,
      Quantity,
    });
    set_Is_Adding(false);
    set_Is_Cart_Open(true);
  };

  const Handle_Wishlist_Toggle = () => {
    if (Is_In_Wishlist(Product.Id)) {
      Remove_From_Wishlist(Product.Id);
    } else {
      Add_To_Wishlist({
        Product_Id: Product.Id,
        Product_Name: Product.Name,
        Price: Display_Price,
        Image_Url: Product.Image_Url,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header_Navigation On_Cart_Click={() => set_Is_Cart_Open(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 lg:py-14 w-full">
        <button
          onClick={() => Router.back()}
          className="font-Body text-sm text-Muted hover:text-Ink mb-8 flex items-center gap-2 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          <div className="relative bg-Lavender rounded-2xl p-6 aspect-[3/4]">
            {(Product.Is_New || Product.Is_Sale) && (
              <span className="absolute top-6 left-6 z-10 bg-Blush_Light text-Ink text-[10px] font-Body font-semibold tracking-[0.1em] uppercase px-3 py-1 rounded-full">
                {Product.Is_New ? 'New' : 'Sale'}
              </span>
            )}
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src={Product.Image_Url}
                alt={Product.Name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-Display text-3xl lg:text-4xl text-Ink">{Product.Name}</h1>
              <Icon_Wishlist
                Is_Filled={Is_In_Wishlist(Product.Id)}
                On_Click={Handle_Wishlist_Toggle}
                Variant="card"
              />
            </div>

            <div className="flex items-center gap-3 mt-4">
              {Product.Discount_Price ? (
                <>
                  <span className="font-Display text-2xl text-Muted line-through">
                    {Format_Price(Product.Price)}
                  </span>
                  <span className="font-Display text-2xl text-Ink">
                    {Format_Price(Product.Discount_Price)}
                  </span>
                </>
              ) : (
                <span className="font-Display text-2xl text-Ink">
                  {Format_Price(Product.Price)}
                </span>
              )}
            </div>

            <p className={`font-Body text-sm mt-3 ${Is_Out_Of_Stock ? 'text-Rose_Dark' : 'text-Muted'}`}>
              {Stock_Label}
            </p>

            <p className="font-Body text-Muted leading-relaxed mt-6">{Product.Description}</p>

            <div className="mt-6">
              <p className="font-Body text-xs tracking-[0.1em] uppercase text-Ink mb-3">Color</p>
              <span className="inline-block px-4 py-2 border border-Border_Light rounded-full font-Body text-sm text-Ink">
                {Product.Color}
              </span>
            </div>

            <div className="mt-6">
              <p className="font-Body text-xs tracking-[0.1em] uppercase text-Ink mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((Size) => (
                  <button
                    key={Size}
                    onClick={() => set_Selected_Size(Size)}
                    className={`w-12 h-12 rounded-full font-Body text-sm transition-colors ${
                      Selected_Size === Size
                        ? 'bg-Ink text-Primary_White'
                        : 'border border-Border_Light text-Ink hover:border-Ink'
                    }`}
                  >
                    {Size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="font-Body text-xs tracking-[0.1em] uppercase text-Ink mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => set_Quantity(Math.max(1, Quantity - 1))}
                  disabled={Quantity <= 1}
                  className="w-10 h-10 rounded-full border border-Border_Light font-Body text-Ink hover:border-Ink disabled:opacity-40"
                >
                  −
                </button>
                <span className="font-Body text-Ink w-8 text-center">{Quantity}</span>
                <button
                  onClick={() => set_Quantity(Math.min(Product.Stock, Quantity + 1))}
                  disabled={Quantity >= Product.Stock}
                  className="w-10 h-10 rounded-full border border-Border_Light font-Body text-Ink hover:border-Ink disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button_Primary
                Label={Is_Out_Of_Stock ? 'Out of Stock' : 'Add to Bag'}
                Variant="dark"
                Full_Width
                On_Click={Handle_Add_To_Cart}
                Is_Loading={Is_Adding}
                Is_Disabled={Is_Out_Of_Stock}
              />
            </div>
          </div>
        </div>
      </main>

      <Cart_Drawer Is_Open={Is_Cart_Open} On_Close={() => set_Is_Cart_Open(false)} />
      <Footer_Section />
    </div>
  );
}
