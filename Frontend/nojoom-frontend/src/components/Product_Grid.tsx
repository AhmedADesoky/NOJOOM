'use client';

import { Product_Card } from './Product_Card';
import type { Product } from '@/data/products';

interface Product_Grid_Props {
  Products: Product[];
  Is_Loading?: boolean;
  Title?: string;
}

export const Product_Grid = ({ Products, Is_Loading, Title = 'All Pieces' }: Product_Grid_Props) => {
  if (Is_Loading) {
    return (
      <div>
        <div className="flex items-baseline justify-between mb-8">
          <div className="h-8 w-40 bg-Surface rounded animate-pulse" />
          <div className="h-4 w-20 bg-Surface rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-Lavender rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (Products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="font-Body text-Muted">No products found. Try another category.</p>
      </div>
    );
  }

  const Piece_Label = Products.length === 1 ? 'piece' : 'pieces';

  return (
    <div>
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-Display text-3xl lg:text-4xl text-Ink">{Title}</h2>
        <span className="font-Body text-sm text-Muted_Light">
          {Products.length} {Piece_Label}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
        {Products.map((Product) => (
          <Product_Card
            key={Product.Id}
            Product_Id={Product.Id}
            Product_Name={Product.Name}
            Price={Product.Price}
            Discount_Price={Product.Discount_Price}
            Image_Url={Product.Image_Url}
            Stock={Product.Stock}
            Is_New={Product.Is_New}
            Is_Sale={Product.Is_Sale}
          />
        ))}
      </div>
    </div>
  );
};
