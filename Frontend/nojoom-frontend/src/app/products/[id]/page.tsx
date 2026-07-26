import { PRODUCTS } from '@/data/products';
import { ProductDetailClient } from './ProductDetailClient';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.Id }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return <ProductDetailClient id={params.id} />;
}
