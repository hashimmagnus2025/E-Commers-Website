import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/components/ShopProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTransition } from "@/components/PageTransition";
import { Navbar } from "@/components/Navbar";
import { MiniCart } from "@/components/MiniCart";
import { SearchOverlay } from "@/components/SearchOverlay";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/utils";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const title = "Veloce — Contemporary Essentials Designed for Movement";
const description =
  "Veloce is a contemporary Indian fashion label. Quietly considered tailoring, knitwear and accessories, designed for a life in motion.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s — Veloce" },
  description,
  openGraph: {
    type: "website",
    siteName: "Veloce",
    title,
    description,
    locale: "en_IN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=75",
        width: 1200,
        height: 1600,
        alt: "Veloce Spring / Summer 2026 campaign",
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#f5f1e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        <noscript>
          <style>{`[data-split],[data-fade]{opacity:1!important}[data-reveal-img]{clip-path:none!important}#preloader{display:none!important}`}</style>
        </noscript>
        <ShopProvider>
          <SmoothScroll />
          <a href="#main" className="skip-link eyebrow">
            Skip to content
          </a>
          <Preloader />
          <CustomCursor />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <MiniCart />
          <SearchOverlay />
          <PageTransition />
        </ShopProvider>
      </body>
    </html>
  );
}
