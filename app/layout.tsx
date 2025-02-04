import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import RootProviders from "@/components/providers/RootProviders";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Pince",
  description: "La Pince",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="fr"
    className="dark"
    style={{
      colorScheme: "dark"
      }}
      >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-center" />
        <RootProviders>
          <Navbar />
                  <div className='w-full'>
                  {children}
                  </div>
                  <footer className='w-full bg-card p-4 flex flex-col items-center justify-center gap-4'>
                  <p className='text-center text-muted-foreground text-sm'>
                  La Pince © 2025 - Tous droits réservés
                  </p>
                  <div className='flex gap-4'>
                  <a href='#' className='text-muted-foreground hover:text-white'>
                  Mentions légales
                  </a>
                  <a href='#' className='text-muted-foreground hover:text-white'>
                  Politique de confidentialité
                  </a>
                  </div>
                  </footer>
        </RootProviders>
      </body>
    </html>
    </ClerkProvider>
  );
}
