import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const Cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const JostFont = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NOJOOM Admin",
  description: "NOJOOM store management dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${Cormorant.variable} ${JostFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-Admin_Base text-Admin_Text">
        {children}
      </body>
    </html>
  );
}
