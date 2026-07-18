import Link from "next/link";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/app/lib/constants";
import { ContourLines } from "./ContourLines";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-haze">
      {/* The contour motif, very faintly, static. */}
      <ContourLines
        interactive={false}
        draw={false}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <Link
            href="/"
            className="font-display text-[22px] font-semibold tracking-tight text-snow"
          >
            {SITE.name}
          </Link>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition-colors hover:text-marigold"
              >
                {link.name}
              </Link>
            ))}
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-marigold"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 text-[13px] text-haze/70 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {SITE.name}. Kathmandu, Nepal.
          </p>
          {/* Quiet link to the personal editor. */}
          <Link href="/write" className="hover:text-marigold">
            Write
          </Link>
        </div>
      </div>
    </footer>
  );
}
