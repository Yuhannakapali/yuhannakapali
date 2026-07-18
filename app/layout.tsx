import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

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
  metadataBase: new URL("https://yuhannakapali.com.np"),
  title: "Yuhanna Kapali | Software engineer, Kathmandu",
  description:
    "Software engineer in Kathmandu. I write about building things, the films I watch, and the trails above the valley.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans antialiased bg-snow text-graphite`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
