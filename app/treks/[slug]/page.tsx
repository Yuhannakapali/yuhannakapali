import Link from "next/link";
import type { Metadata } from "next";
import { getAllTreks, getTrekBySlug } from "@/lib/content";
import { Article } from "../../components/Article";

type TrekPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllTreks().map((trek) => ({ slug: trek.slug }));
}

export async function generateMetadata({
  params,
}: TrekPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trek = getTrekBySlug(slug);

  if (!trek) {
    return { title: "Trek Not Found | Yuhanna Kapali" };
  }

  return {
    title: `${trek.title} | Yuhanna Kapali`,
    description: trek.description || undefined,
    openGraph: {
      title: trek.title,
      description: trek.description || undefined,
      type: "article",
      images: trek.cover ? [{ url: trek.cover }] : undefined,
    },
  };
}

export default async function TrekPage({ params }: TrekPageProps) {
  const { slug } = await params;
  const trek = getTrekBySlug(slug);

  if (!trek) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white text-[#242424]">
        <h1 className="mb-4 text-4xl font-bold">Trek Not Found</h1>
        <Link href="/treks" className="underline">
          Back to treks
        </Link>
      </div>
    );
  }

  const stats: { label: string; value: string }[] = [
    { label: "Region", value: trek.region },
    { label: "Days", value: trek.days ? String(trek.days) : "" },
    { label: "Difficulty", value: trek.difficulty },
    { label: "Best season", value: trek.best_season },
    {
      label: "Max altitude",
      value: trek.max_altitude
        ? `${trek.max_altitude.toLocaleString("en-US")} m`
        : "",
    },
  ].filter((s) => s.value);

  return (
    <Article
      title={trek.title}
      date={trek.date}
      content={trek.content}
      cover={trek.cover}
      backHref="/treks"
      backLabel="Back to all guides"
      meta={
        <dl className="flex flex-wrap items-stretch gap-x-5 gap-y-3 border-y border-[#e6e6e6] py-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={i > 0 ? "border-l border-[#e6e6e6] pl-5" : ""}
            >
              <dt className="text-[11px] uppercase tracking-[0.08em] text-[#8b8b8b]">
                {s.label}
              </dt>
              <dd className="mt-0.5 text-[15px] text-[#242424]">{s.value}</dd>
            </div>
          ))}
        </dl>
      }
    />
  );
}
