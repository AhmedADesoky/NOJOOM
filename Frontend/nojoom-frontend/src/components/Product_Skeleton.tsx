'use client';

/* ─────────────────────────────────────────────────────────────────
   Single skeleton card — matches Product_Card dimensions exactly
───────────────────────────────────────────────────────────────── */
export function Product_Skeleton() {
  return (
    <div className="animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-[3/4] rounded-2xl bg-Surface" />
      {/* Name */}
      <div className="mt-3 h-3 rounded-full bg-Surface w-3/4" />
      {/* Price */}
      <div className="mt-2 h-4 rounded-full bg-Surface w-2/5" />
      {/* Swatch dots */}
      <div className="mt-2 flex gap-1.5">
        <div className="w-3.5 h-3.5 rounded-full bg-Surface" />
        <div className="w-3.5 h-3.5 rounded-full bg-Surface" />
        <div className="w-3.5 h-3.5 rounded-full bg-Surface" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Grid of skeleton cards — drop-in replacement for the product grid
───────────────────────────────────────────────────────────────── */
export function Product_Grid_Skeleton({ Count = 8 }: { Count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
      {[...Array(Count)].map((_, i) => (
        <Product_Skeleton key={i} />
      ))}
    </div>
  );
}