'use client';

import Link from 'next/link';

const PAYMENT_METHODS = ['InstaPay', 'Cash on Delivery'];

const QUICK_LINKS = [
  { Label: 'New Arrivals', Href: '#products' },
  { Label: 'Best Sellers', Href: '#products' },
  { Label: 'The Edit', Href: '#products' },
  { Label: 'Size Guide', Href: '#' },
  { Label: 'Gift Cards', Href: '#' },
];

export const About_Section = () => {
  return (
    <section id="about" className="bg-Surface px-6 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-Display text-3xl text-Ink mb-4">About Us</h2>
        <p className="font-Body text-Muted text-base leading-relaxed max-w-2xl mb-8">
          At Nojoom, we craft everyday essentials that blend comfort with a couture edge.
          Made from premium Egyptian fabrics, our pieces sculpt, flatter and move with you —
          timeless designs made for everybody, every day.
        </p>

        <div className="flex flex-wrap gap-2 mb-12">
          {PAYMENT_METHODS.map((Method) => (
            <span
              key={Method}
              className="px-4 py-2 bg-Primary_White border border-Border_Light rounded-lg font-Body text-xs text-Muted"
            >
              {Method}
            </span>
          ))}
        </div>

        <div className="lg:hidden">
          <h3 className="font-Body text-xs font-semibold tracking-[0.15em] uppercase text-Ink mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {QUICK_LINKS.map(({ Label, Href }) => (
              <li key={Label}>
                <Link href={Href} className="font-Body text-sm text-Muted hover:text-Ink transition-colors">
                  {Label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
