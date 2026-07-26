'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon_Wishlist } from './Icon_Wishlist';
import { Format_Price } from '@/data/products';
import { use_Wishlist_Context } from '@/contexts/Wishlist_Context';

interface Product_Card_Props {
  Product_Id: string;
  Product_Name: string;
  Price: number;
  Discount_Price?: number;
  Image_Url: string;
  Stock: number;
  Is_New?: boolean;
  Is_Sale?: boolean;
}

export const Product_Card = ({
  Product_Id,
  Product_Name,
  Price,
  Discount_Price,
  Image_Url,
  Stock,
  Is_New = false,
  Is_Sale = false,
}: Product_Card_Props) => {
  const { Is_In_Wishlist, Add_To_Wishlist, Remove_From_Wishlist } = use_Wishlist_Context();

  const Handle_Wishlist_Toggle = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (Is_In_Wishlist(Product_Id)) {
      Remove_From_Wishlist(Product_Id);
    } else {
      Add_To_Wishlist({
        Product_Id,
        Product_Name,
        Price: Discount_Price || Price,
        Image_Url,
      });
    }
  };

  const Stock_Label =
    Stock === 0
      ? 'Out of stock'
      : Stock <= 5
        ? `${Stock} left`
        : `${Stock} in stock`;

  return (
    <Link href={`/products/${Product_Id}`} className="group block">
      <div className="relative bg-Lavender rounded-2xl overflow-hidden p-4">
        {(Is_New || Is_Sale) && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-Blush_Light text-Ink text-[10px] font-Body font-semibold tracking-[0.1em] uppercase px-3 py-1 rounded-full">
              {Is_New ? 'New' : 'Sale'}
            </span>
          </div>
        )}

        <div className="absolute top-4 right-4 z-10">
          <Icon_Wishlist
            Is_Filled={Is_In_Wishlist(Product_Id)}
            On_Click={Handle_Wishlist_Toggle}
            Variant="card"
          />
        </div>

        <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
          <Image
            src={Image_Url}
            alt={Product_Name}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />

          <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="block w-full text-center bg-Ink text-Primary_White font-Body text-xs tracking-[0.12em] uppercase py-3 rounded-full">
              View Details
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 px-1">
        <h3 className="font-Display text-lg text-Ink">{Product_Name}</h3>
        <div className="flex items-center gap-2 mt-1">
          {Discount_Price ? (
            <>
              <span className="font-Display text-base text-Muted line-through">
                {Format_Price(Price)}
              </span>
              <span className="font-Display text-base text-Ink">
                {Format_Price(Discount_Price)}
              </span>
            </>
          ) : (
            <span className="font-Display text-base text-Ink">
              {Format_Price(Price)}
            </span>
          )}
        </div>
        <p
          className={`font-Body text-xs mt-1 ${
            Stock === 0 ? 'text-Rose_Dark' : 'text-Muted_Light'
          }`}
        >
          {Stock_Label}
        </p>
      </div>
    </Link>
  );
};
