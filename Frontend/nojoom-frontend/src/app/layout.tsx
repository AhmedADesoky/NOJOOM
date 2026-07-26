import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import { Providers } from '@/contexts/Providers';
import { Toast } from '@/components/Toast';

const Cormorant_Display = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const Jost_Body = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'NOJOOM — Premium Egyptian Cotton Dresses',
  description: 'Shop luxury Egyptian cotton dresses and essentials.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // data-scroll-behavior fixes the Next.js scroll-behavior warning
      data-scroll-behavior="smooth"
      className={`${Cormorant_Display.variable} ${Jost_Body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-Primary_White text-Ink">
        <Providers>
          {children}
        </Providers>

        {/*
          Toast lives OUTSIDE Providers so it's always mounted on every page.
          It listens for the 'nojoom_toast' custom event fired by show_toast().
          Import show_toast from '@/components/Toast' and call it from anywhere.
        */}
        <Toast />
      </body>
    </html>
  );
}