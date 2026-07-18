import Link from "next/link";
import type { Metadata } from "next";
import { getAllTreks } from "@/lib/content";
import { OG_IMAGE } from "@/lib/seo";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Treks",
  description: "Field guides to trails in the Nepal Himalaya.",
  alternates: { canonical: "/treks/" },
  openGraph: {
    title: "Treks | Yuhanna Kapali",
    description: "Field guides to trails in the Nepal Himalaya.",
    url: "/treks/",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function TreksIndexPage() {
  const treks = getAllTreks();

  return (
    <div className="flex min-h-screen flex-col bg-surface-2 text-surface-text">
      <Navbar />
      <main className="mx-auto w-full max-w-[680px] grow px-5 pt-28 pb-24">
        <h1 className="font-display mb-3 text-[34px] font-semibold tracking-tight">
          Treks
        </h1>
        <p className="mb-10 text-[16px] text-surface-muted">
          Field guides to trails in the Nepal Himalaya.
        </p>

        {treks.length === 0 ? (
          <p className="text-surface-muted">No guides yet. Check back soon.</p>
        ) : (
          <div className="flex flex-col">
            {treks.map((trek) => {
              const stats = [
                trek.region,
                trek.days ? `${trek.days} days` : "",
                trek.difficulty,
                trek.max_altitude
                  ? `${trek.max_altitude.toLocaleString("en-US")} m`
                  : "",
              ].filter(Boolean);

              return (
                <article key={trek.slug} className="py-8 first:pt-0">
                  <Link
                    href={`/treks/${trek.slug}`}
                    className="group flex items-start justify-between gap-6"
                  >
                    <div className="min-w-0 flex-1">
                      <h2 className="text-[20px] font-bold leading-snug tracking-tight group-hover:text-marigold">
                        {trek.title}
                      </h2>
                      <p className="mt-2 text-[15px] text-surface-muted">
                        {stats.join("  ·  ")}
                      </p>
                    </div>

                    {trek.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={trek.cover}
                        alt=""
                        loading="lazy"
                        className="h-[100px] w-[100px] shrink-0 rounded-md object-cover"
                      />
                    ) : null}
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
