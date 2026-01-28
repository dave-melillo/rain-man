import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rain Man - Casino Strategy",
  description: "Learn to play smarter with math, not luck.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-casino-dark antialiased">
        {children}
      </body>
    </html>
  );
}
