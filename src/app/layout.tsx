import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import { CartProvider } from "@/components/CartProvider";
import { getAllCategories, getAllSubCategories } from "@/data/categories";
import { getAllTours } from "@/data/tours";
import { getLatestGuides } from "@/data/guides";
import { getSiteSettings, SITE_DOMAIN } from "@/data/site-settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const siteUrl = `https://${SITE_DOMAIN}`;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${settings.brandName} | ${settings.tagline}`,
      template: `%s | ${settings.brandName}`,
    },
    description: settings.description,
    openGraph: {
      type: "website",
      siteName: settings.brandName,
      title: settings.brandName,
      description: settings.description,
      url: siteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.brandName,
      description: settings.description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, categories, subCategories, tours, guides] = await Promise.all([
    getSiteSettings(),
    getAllCategories(),
    getAllSubCategories(),
    getAllTours(),
    getLatestGuides(4),
  ]);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <CurrencyProvider>
          <CartProvider>
            <SiteHeader
              brandName={settings.brandName}
              categories={categories}
              subCategories={subCategories}
              tours={tours}
              guides={guides}
            />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter settings={settings} />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
