import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rain Man - Casino Strategy",
  description: "Learn to play smarter with math, not luck. Interactive strategy charts, card counting, and bankroll calculators.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Rain Man",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0f3d3e",
};

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-casino-dark/95 backdrop-blur-sm border-b border-casino-card">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold text-gold-gradient">
          Rain Man
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/blackjack"
            className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
          >
            Blackjack
          </Link>
          <Link
            href="/blackjack/strategy"
            className="bg-casino-gold hover:bg-casino-gold-dark text-black px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Strategy Chart
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-screen bg-casino-dark antialiased pb-16 md:pb-0">
        <Header />
        {children}
        <BottomNav />
        
        {/* Service Worker Registration */}
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker
                  .register('/sw.js')
                  .then((registration) => {
                    console.log('SW registered:', registration.scope);
                  })
                  .catch((error) => {
                    console.error('SW registration failed:', error);
                  });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
