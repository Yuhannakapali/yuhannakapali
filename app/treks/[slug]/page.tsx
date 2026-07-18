import Link from "next/link";
import type { Metadata } from "next";
import { getAllTreks, getTrekBySlug } from "@/lib/content";
import { Article } from "../../components/Article";
import { JsonLd } from "../../components/JsonLd";
import {
  AUTHOR_NAME,
  PERSON_SCHEMA,
  SITE_NAME,
  absoluteUrl,
  assetUrl,
  ogImages,
} from "@/lib/seo";

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
    return { title: "Trek Not Found" };
  }

  return {
    title: trek.title,
    description: trek.description || undefined,
    alternates: { canonical: `/treks/${slug}/` },
    openGraph: {
      title: trek.title,
      description: trek.description || undefined,
      type: "article",
      url: absoluteUrl(`/treks/${slug}`),
      siteName: SITE_NAME,
      publishedTime: trek.date || undefined,
      authors: [AUTHOR_NAME],
      images: ogImages(trek.cover),
    },
  };
}

export default async function TrekPage({ params }: TrekPageProps) {
  const { slug } = await params;
  const trek = getTrekBySlug(slug);

  if (!trek) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface-2 text-surface-text">
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

  const url = absoluteUrl(`/treks/${slug}`);
  const keywords = [trek.region, trek.difficulty, "trek", "Nepal", "Himalaya"]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <JsonLd
        data={{
          "@type": "Article",
          headline: trek.title,
          description: trek.description || undefined,
          datePublished: trek.date || undefined,
          dateModified: trek.date || undefined,
          image: trek.cover ? assetUrl(trek.cover) : undefined,
          author: PERSON_SCHEMA,
          publisher: PERSON_SCHEMA,
          mainEntityOfPage: url,
          url,
          keywords,
        }}
      />
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Treks", item: absoluteUrl("/treks") },
            { "@type": "ListItem", position: 3, name: trek.title, item: url },
          ],
        }}
      />
      <Article
        title={trek.title}
        date={trek.date}
        content={trek.content}
        cover={trek.cover}
        coverWidth={trek.coverWidth}
        coverHeight={trek.coverHeight}
        backHref="/treks"
        backLabel="Back to all guides"
        meta={
        <dl className="flex flex-wrap items-stretch gap-x-5 gap-y-3 border-y border-line py-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={i > 0 ? "border-l border-line pl-5" : ""}
            >
              <dt className="text-[11px] uppercase tracking-[0.08em] text-surface-faint">
                {s.label}
              </dt>
              <dd className="mt-0.5 text-[15px] text-surface-text">{s.value}</dd>
            </div>
          ))}
        </dl>
      }
      />
    </>
  );
}
