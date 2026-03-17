import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Sans_JP } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { NavigationProvider } from "@/context/NavigationContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "E.A. Elite Trading Group",
    template: "%s | E.A. Elite Trading Group",
  },
  description:
    "A diversified international trading conglomerate headquartered in Bangkok, Thailand. Operating across agriculture, seafood, minerals, hospitality, and plantation sectors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${notoSansJP.variable} antialiased`}
      >
        <LanguageProvider>
          <NavigationProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </NavigationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
