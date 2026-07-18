"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { LazyMotion, domAnimation } from "framer-motion";
import React from "react";

// Class-based light/dark theme. next-themes adds `dark` on <html>, which the
// theme-aware surface tokens in globals.css respond to. Defaults to the
// visitor's system preference; the navbar toggle overrides and persists it.
//
// LazyMotion loads only the DOM animation feature set for the lightweight `m`
// components used across the site, trimming the framer-motion bundle.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </NextThemesProvider>
  );
}
