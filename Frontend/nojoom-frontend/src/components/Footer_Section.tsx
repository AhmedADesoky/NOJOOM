'use client';

import Link from 'next/link';

const HELP_LINKS = [
  { Label: 'Shipping & Returns', Href: '#' },
  { Label: 'FAQs', Href: '#' },
  { Label: 'Track Order', Href: '#' },
  { Label: 'Contact Us', Href: '#' },
];

const QUICK_LINKS = [
  { Label: 'New Arrivals', Href: '#products' },
  { Label: 'Best Sellers', Href: '#products' },
  { Label: 'The Edit', Href: '#products' },
  { Label: 'Size Guide', Href: '#' },
  { Label: 'Gift Cards', Href: '#' },
];

export const Footer_Section = () => {
  return (
    <footer id="footer" className="bg-Footer_Bg">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          <div className="hidden lg:block">
            <h3 className="font-Body text-xs font-semibold tracking-[0.15em] uppercase text-Ink mb-5">
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

          <div>
            <h3 className="font-Body text-xs font-semibold tracking-[0.15em] uppercase text-Ink mb-5">
              Help &amp; Contact
            </h3>
            <ul className="space-y-3">
              {HELP_LINKS.map(({ Label, Href }) => (
                <li key={Label}>
                  <Link
                    href={Href}
                    className={`font-Body text-sm transition-colors ${
                      Label === 'FAQs' ? 'text-Brand_Pink' : 'text-Muted hover:text-Ink'
                    }`}
                  >
                    {Label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-Body text-xs font-semibold tracking-[0.15em] uppercase text-Ink mb-5">
              Newsletter
            </h3>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-5 py-3 rounded-full bg-Primary_White border border-Border_Light text-Ink placeholder:text-Muted_Light font-Body text-sm outline-none focus:border-Ink transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-Ink text-Primary_White rounded-full font-Body text-xs font-semibold tracking-[0.12em] uppercase hover:bg-Charcoal transition-colors whitespace-nowrap"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-Border_Light mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex flex-col items-center sm:items-start">
            <div className="font-Display text-xl font-semibold text-Ink leading-none">نجوم</div>
            <div className="font-Body text-[9px] tracking-[0.35em] text-Ink mt-1">N O J O O M</div>
          </Link>
          <p className="font-Body text-xs text-Muted_Light">
            &copy; 2026 Nojoom. Crafted in Cairo, Egypt.
          </p>
        </div>
      </div>
    </footer>
  );
};
