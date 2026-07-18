import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getAllReviews, getAllTreks, getLatestAcrossAll } from "@/lib/content";
import { formatDate } from "@/lib/reading-time";
import { SOCIAL_LINKS } from "./lib/constants";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { AboutImage } from "./components/AboutImage";
import { StarRating } from "./components/StarRating";

const FEED_LABELS: Record<string, string> = {
  blog: "Blog",
  film: "Film",
  trek: "Trek",
};

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block -translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
    >
      &rarr;
    </span>
  );
}

export default function LandingPage() {
  const posts = getAllPosts().slice(0, 2);
  const reviews = getAllReviews().slice(0, 2);
  const treks = getAllTreks().slice(0, 2);
  const latest = getLatestAcrossAll(5);

  return (
    <div className="min-h-screen bg-snow text-graphite">
      <Navbar />
      <main>
        <HeroSection />

        {/* Three trailheads */}
        <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="grid grid-cols-1 divide-y divide-black/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {/* Writing */}
            <Link
              href="/blog"
              className="group block py-8 md:px-8 md:py-0 md:first:pl-0"
            >
              <h2 className="font-display inline-flex items-center gap-2 text-[26px] font-semibold tracking-tight transition-colors group-hover:text-marigold">
                Writing <Arrow />
              </h2>
              <p className="mt-2 text-[15px] text-[#6b6b6b]">
                Notes on building software, the craft, and the tools I make.
              </p>
              <ul className="mt-5 space-y-3">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <span className="block text-[15px] font-medium leading-snug">
                      {p.title}
                    </span>
                    <span className="text-[13px] text-[#8b8b8b]">
                      {formatDate(p.date)}
                    </span>
                  </li>
                ))}
                {posts.length === 0 ? (
                  <li className="text-[14px] text-[#8b8b8b]">Coming soon.</li>
                ) : null}
              </ul>
            </Link>

            {/* Film */}
            <Link href="/reviews" className="group block py-8 md:px-8 md:py-0">
              <h2 className="font-display inline-flex items-center gap-2 text-[26px] font-semibold tracking-tight transition-colors group-hover:text-marigold">
                Film <Arrow />
              </h2>
              <p className="mt-2 text-[15px] text-[#6b6b6b]">
                Short reviews of the films I keep thinking about.
              </p>
              <ul className="mt-5 space-y-3">
                {reviews.map((r) => (
                  <li key={r.slug}>
                    <span className="block text-[15px] font-medium leading-snug">
                      {r.title}
                    </span>
                    <span className="mt-0.5 block">
                      <StarRating rating={r.rating} size={13} />
                    </span>
                  </li>
                ))}
                {reviews.length === 0 ? (
                  <li className="text-[14px] text-[#8b8b8b]">Coming soon.</li>
                ) : null}
              </ul>
            </Link>

            {/* Treks */}
            <Link
              href="/treks"
              className="group block py-8 md:px-8 md:py-0 md:last:pr-0"
            >
              <h2 className="font-display inline-flex items-center gap-2 text-[26px] font-semibold tracking-tight transition-colors group-hover:text-marigold">
                Treks <Arrow />
              </h2>
              <p className="mt-2 text-[15px] text-[#6b6b6b]">
                Field guides to trails in the Nepal Himalaya.
              </p>
              <ul className="mt-5 space-y-3">
                {treks.map((t) => (
                  <li key={t.slug}>
                    <span className="block text-[15px] font-medium leading-snug">
                      {t.title}
                    </span>
                    <span className="text-[13px] text-[#8b8b8b]">
                      {[t.region, t.days ? `${t.days} days` : ""]
                        .filter(Boolean)
                        .join("  ·  ")}
                    </span>
                  </li>
                ))}
                {treks.length === 0 ? (
                  <li className="text-[14px] text-[#8b8b8b]">Coming soon.</li>
                ) : null}
              </ul>
            </Link>
          </div>
        </section>

        {/* Latest, mixed feed */}
        <section className="border-t border-black/10">
          <div className="mx-auto max-w-[680px] px-5 py-16 md:py-20">
            <h2 className="font-display mb-8 text-[24px] font-semibold tracking-tight">
              Latest
            </h2>
            <div className="flex flex-col">
              {latest.map((item) => (
                <Link
                  key={`${item.type}-${item.slug}`}
                  href={item.href}
                  className="group border-b border-black/5 py-5 first:pt-0 last:border-0"
                >
                  <span className="text-[11px] uppercase tracking-[0.14em] text-marigold">
                    {FEED_LABELS[item.type]}
                  </span>
                  <h3 className="mt-1 text-[18px] font-bold leading-snug tracking-tight group-hover:text-marigold">
                    {item.title}
                  </h3>
                  <span className="mt-1 block text-[13px] text-[#8b8b8b]">
                    {formatDate(item.date)}
                  </span>
                </Link>
              ))}
              {latest.length === 0 ? (
                <p className="text-[#8b8b8b]">Nothing published yet.</p>
              ) : null}
            </div>
          </div>
        </section>

        {/* About strip */}
        <section id="about" className="scroll-mt-20 border-t border-black/10">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
            <div>
              <h2 className="font-display text-[28px] font-semibold tracking-tight md:text-[32px]">
                About
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-graphite">
                I am a software engineer based in the Kathmandu Valley. I am the
                founder of Orinova and currently working through an MBA. When I
                am not building things, I am usually watching a film or walking
                a trail above the city. This site is where I keep my writing, my
                film notes, and my trek guides.
              </p>
              <div className="mt-6 flex gap-6 text-[15px]">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-graphite underline underline-offset-4 transition-colors hover:text-marigold"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Replace public/images/mountains/about.jpg with your own trek photo (ideal 1600x900). */}
            <AboutImage
              src="/images/mountains/about.jpg"
              alt="Mountain landscape above the Kathmandu Valley"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
