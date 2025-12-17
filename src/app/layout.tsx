import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TasteProvider } from "@/context/TasteContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Reactor",
  description: "Discover movies you’ll love. Hidden gems, trending picks, and personal recommendations.",
  openGraph: {
    title: "Movie Reactor",
    description: "Discover movies you’ll love. Hidden gems, trending picks, and personal recommendations.",
    url: "https://movie-reactor.vercel.app",
    siteName: "Movie Reactor",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Movie Reactor preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Movie Reactor",
    description: "Discover movies you’ll love. Hidden gems, trending picks, and personal recommendations.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TasteProvider>
          {children}
        </TasteProvider>
      </body>
    </html>
  );
}
