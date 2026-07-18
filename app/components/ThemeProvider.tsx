"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";

// The Trailhead design is a single light theme (snow content, ink hero).
// Force light so nothing flips with the OS preference; older pages that still
// use dark: variants simply render in their light form.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      forcedTheme="light"
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
}
