import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import { JsonLd } from "./components/JsonLd";
import {
  AUTHOR_NAME,
  OG_IMAGE,
  PERSON_SCHEMA,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const DESCRIPTION =
  "Software engineer in Kathmandu. I write about building things, the films I watch, and the trails above the valley.";

// Display face: tight leading, optical sizing. Only the weights we use.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// UI and body face.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yuhanna Kapali | Software engineer, Kathmandu",
    template: "%s | Yuhanna Kapali",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  keywords: [
    "Yuhanna Kapali",
    "software engineer",
    "backend developer",
    "Kathmandu",
    "Nepal",
    "film reviews",
    "trekking Nepal",
    "Himalaya trek guides",
    "engineering blog",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
    title: "Yuhanna Kapali | Software engineer, Kathmandu",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuhanna Kapali | Software engineer, Kathmandu",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans antialiased bg-surface text-surface-text`}
      >
        <JsonLd
          data={{
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            inLanguage: "en",
            author: PERSON_SCHEMA,
          }}
        />
        <JsonLd data={PERSON_SCHEMA} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
