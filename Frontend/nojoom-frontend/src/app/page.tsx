'use client';

import { useState, useRef } from 'react';
import { Header_Navigation } from '@/components/Header_Navigation';
import { Hero_Section } from '@/components/Hero_Section';
import { Category_Filter } from '@/components/Category_Filter';
import { Product_Grid } from '@/components/Product_Grid';
import { Cart_Drawer } from '@/components/Cart_Drawer';
import { About_Section } from '@/components/About_Section';
import { Footer_Section } from '@/components/Footer_Section';
import { CATEGORIES, CATEGORY_TITLES, PRODUCTS } from '@/data/products';

export default function Homepage() {
  const [Is_Cart_Open, set_Is_Cart_Open] = useState(false);
  const [Selected_Category, set_Selected_Category] = useState('All');
  const Products_Ref = useRef<HTMLElement>(null);

  const Filtered_Products = PRODUCTS.filter((Product) => {
    if (Selected_Category === 'All') return true;
    return Product.Categories.includes(Selected_Category);
  });

  const Scroll_To_Products = () => {
    Products_Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header_Navigation On_Cart_Click={() => set_Is_Cart_Open(true)} />

      <main className="flex-1">
        <Hero_Section On_Shop_Now_Click={Scroll_To_Products} />

        <section id="products" ref={Products_Ref} className="max-w-7xl mx-auto px-6 py-10 lg:py-14">
          <div className="mb-8">
            <Category_Filter
              Categories={CATEGORIES}
              Active_Category={Selected_Category}
              On_Category_Change={set_Selected_Category}
            />
          </div>

          <Product_Grid
            Products={Filtered_Products}
            Title={CATEGORY_TITLES[Selected_Category] || 'All Pieces'}
          />
        </section>

        <About_Section />
      </main>

      <Cart_Drawer Is_Open={Is_Cart_Open} On_Close={() => set_Is_Cart_Open(false)} />
      <Footer_Section />
    </div>
  );
}
