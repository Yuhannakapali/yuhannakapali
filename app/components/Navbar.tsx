"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/app/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent over the ink hero only at the top of the landing page.
  const overHero = isHome && !scrolled;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        overHero
          ? "bg-transparent"
          : "border-b border-black/10 bg-snow/90 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          href="/"
          className={`font-display text-[20px] font-semibold tracking-tight ${
            overHero ? "text-snow" : "text-ink"
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
              className={`text-[15px] transition-colors hover:text-marigold ${
                overHero ? "text-haze" : "text-graphite"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className={`md:hidden ${overHero ? "text-snow" : "text-ink"}`}
        >
          <Menu size={24} />
        </button>
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
