import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Ecommerce app",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import MyClerkProvider from "@/components/ClerkProvider";
import { CartSyncProvider } from "@/components/CartSyncProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MyClerkProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">
            <Providers>
              <CartSyncProvider>
                {children}
              </CartSyncProvider>
            </Providers>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
      </MyClerkProvider>
    </html>
  );
}
