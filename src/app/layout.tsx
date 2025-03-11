

"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sonner";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect, useState } from "react";
import Providers from "./providers";

// Configure fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    checkAuth();
  }, [checkAuth]);

  if (!isMounted) {
    return null; 
  }

  return <>{children}</>;
};

const ClientOnlyToaster = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <Toaster />;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/some-library/1.0.0/library.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/another-library/2.0.0/library.min.js"
          strategy="afterInteractive"
        />
                <script src="https://accounts.google.com/gsi/client" async defer></script>

      </head>
      <body>
          <AuthInitializer>
            <Providers>
            {children}
            </Providers>
            <ClientOnlyToaster />
          </AuthInitializer>
      </body>
    </html>
  );
}