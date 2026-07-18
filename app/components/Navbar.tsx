"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NAV_LINKS, SITE } from "@/app/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // Standard next-themes guard: only trust the resolved theme after mount to
    // avoid a hydration mismatch on the toggle icon.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent over the ink hero only at the top of the landing page.
  const overHero = isHome && !scrolled;
  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  const linkColor = overHero ? "text-haze" : "text-surface-text";
  const iconColor = overHero ? "text-snow" : "text-surface-text";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          overHero
            ? "bg-transparent"
            : "border-b border-line bg-surface/90 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link
            href="/"
            className={`font-display text-[20px] font-semibold tracking-tight ${
              overHero ? "text-snow" : "text-surface-text"
            }`}
          >
            {SITE.name}
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[15px] transition-colors hover:text-marigold ${linkColor}`}
              >
                {link.name}
              </Link>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`transition-colors hover:text-marigold ${iconColor}`}
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={iconColor}
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={iconColor}
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay. Rendered as a top-level fixed layer (not
          nested in the header's stacking context) so it always paints above the
          page content. */}
      {open ? (
        <div className="fixed inset-0 z-[100] flex h-screen w-screen flex-col overflow-y-auto bg-ink px-5 py-5 md:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-[20px] font-semibold text-snow">
              {SITE.name}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-snow"
            >
              <X size={26} />
            </button>
          </div>
          <div className="mt-16 flex flex-col gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-[34px] font-semibold tracking-tight text-snow hover:text-marigold"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
