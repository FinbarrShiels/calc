import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { NextUIProvider } from '@/components/NextUIProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CalcHub - 100+ Online Calculators",
  description: "Free online calculators for math, finance, health, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background`}>
      <body>
        <NextUIProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-background dark:bg-gray-900 py-6 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                © {new Date().getFullYear()} CalcHub. All rights reserved.
              </p>
            </div>
          </footer>
        </NextUIProvider>
      </body>
    </html>
  );
}
