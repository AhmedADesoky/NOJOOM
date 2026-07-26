'use client';

import { useEffect } from 'react';

interface Size_Guide_Modal_Props {
  Is_Open: boolean;
  On_Close: () => void;
}

const SIZES = [
  { size: 'XS', bust: '80–83', waist: '62–65', hips: '88–91', uk: '6',  us: '2'  },
  { size: 'S',  bust: '84–87', waist: '66–69', hips: '92–95', uk: '8',  us: '4'  },
  { size: 'M',  bust: '88–91', waist: '70–73', hips: '96–99', uk: '10', us: '6'  },
  { size: 'L',  bust: '92–96', waist: '74–78', hips: '100–104', uk: '12', us: '8' },
  { size: 'XL', bust: '97–101', waist: '79–83', hips: '105–109', uk: '14', us: '10' },
];

export function Size_Guide_Modal({ Is_Open, On_Close }: Size_Guide_Modal_Props) {
  /* Close on Escape */
  useEffect(() => {
    const Handle = (e: KeyboardEvent) => { if (e.key === 'Escape') On_Close(); };
    if (Is_Open) {
      document.addEventListener('keydown', Handle);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', Handle);
      document.body.style.overflow = '';
    };
  }, [Is_Open, On_Close]);

  if (!Is_Open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
        onClick={On_Close}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        z-[110] w-full max-w-lg mx-4 bg-Primary_White rounded-2xl shadow-xl
        overflow-hidden animate-Scale_Up">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5
          border-b border-Border_Light">
          <h2 className="font-Display text-2xl text-Ink">Size Guide</h2>
          <button onClick={On_Close}
            className="p-2 rounded-full hover:bg-Surface transition-colors"
            aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-auto max-h-[70vh]">
          <p className="font-Body text-xs text-Muted mb-5">
            All measurements are in centimetres (cm). For the best fit,
            measure over your undergarments.
          </p>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full font-Body text-sm">
              <thead>
                <tr className="border-b border-Border_Light">
                  {['Size', 'Bust', 'Waist', 'Hips', 'UK', 'US'].map((h) => (
                    <th key={h}
                      className="text-left py-2.5 pr-4 text-xs tracking-[0.1em]
                        uppercase text-Muted font-semibold last:pr-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZES.map((row, i) => (
                  <tr key={row.size}
                    className={`border-b border-Border_Light last:border-0
                      ${i % 2 === 0 ? '' : 'bg-Surface/50'}`}>
                    <td className="py-3 pr-4 font-semibold text-Ink">{row.size}</td>
                    <td className="py-3 pr-4 text-Muted">{row.bust}</td>
                    <td className="py-3 pr-4 text-Muted">{row.waist}</td>
                    <td className="py-3 pr-4 text-Muted">{row.hips}</td>
                    <td className="py-3 pr-4 text-Muted">{row.uk}</td>
                    <td className="py-3 text-Muted">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tip */}
          <div className="mt-6 bg-Blush_Light rounded-xl p-4">
            <p className="font-Body text-xs text-Ink font-semibold mb-1">
              How to measure
            </p>
            <ul className="font-Body text-xs text-Muted space-y-1">
              <li><span className="text-Ink">Bust —</span> fullest part of your chest</li>
              <li><span className="text-Ink">Waist —</span> narrowest part of your torso</li>
              <li><span className="text-Ink">Hips —</span> fullest part of your hips</li>
            </ul>
          </div>

          <p className="font-Body text-xs text-Muted mt-4 text-center">
            Between sizes? We recommend sizing up for a relaxed fit.
          </p>
        </div>
      </div>
    </>
  );
}