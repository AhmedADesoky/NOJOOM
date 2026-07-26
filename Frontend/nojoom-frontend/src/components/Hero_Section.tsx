'use client';

interface Hero_Section_Props {
  On_Shop_Now_Click?: () => void;
}

export const Hero_Section = ({ On_Shop_Now_Click }: Hero_Section_Props) => {
  return (
    <section className="relative bg-Primary_White overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[70%] h-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 20%, #F7D9E3 0%, #FCE4EC 30%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-28">
        <div className="max-w-xl">
          <p className="font-Body text-xs tracking-[0.25em] uppercase text-Brand_Pink mb-4">
            
          </p>

          <h1 className="font-Display text-4xl lg:text-6xl text-Ink mb-6 leading-tight">
            The <span className="italic text-Brand_Pink">Rose</span> Collection
          </h1>

          <p className="font-Body text-Muted text-base lg:text-lg leading-relaxed mb-8 max-w-md">
            Everyday couture in premium Egyptian cotton — pieces cut to move, flatter and last.
            Timeless silhouettes, made for every day.
          </p>

          <button
            onClick={On_Shop_Now_Click}
            className="inline-flex items-center gap-3 bg-Ink text-Primary_White font-Body text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-full hover:bg-Charcoal transition-colors duration-300"
          >
            Shop the Collection
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
