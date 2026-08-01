import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getAllCategories } from "@/data/categories";
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
  const [settings, categories] = await Promise.all([getSiteSettings(), getAllCategories()]);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader brandName={settings.brandName} categories={categories} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
