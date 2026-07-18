import Link from "next/link";
import type { Metadata } from "next";
import { getAllReviews, getReviewBySlug } from "@/lib/content";
import { Article } from "../../components/Article";
import { StarRating } from "../../components/StarRating";
import { JsonLd } from "../../components/JsonLd";
import {
  AUTHOR_NAME,
  PERSON_SCHEMA,
  SITE_NAME,
  absoluteUrl,
  assetUrl,
  ogImages,
} from "@/lib/seo";

type ReviewPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllReviews().map((review) => ({ slug: review.slug }));
}

export async function generateMetadata({
  params,
}: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);

  if (!review) {
    return { title: "Review Not Found" };
  }

  return {
    title: review.title,
    description: review.description || undefined,
    alternates: { canonical: `/reviews/${slug}/` },
    openGraph: {
      title: review.title,
      description: review.description || undefined,
      type: "article",
      url: absoluteUrl(`/reviews/${slug}`),
      siteName: SITE_NAME,
      publishedTime: review.date || undefined,
      authors: [AUTHOR_NAME],
      images: ogImages(review.cover),
    },
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);

  if (!review) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface-2 text-surface-text">
        <h1 className="mb-4 text-4xl font-bold">Review Not Found</h1>
        <Link href="/reviews" className="underline">
          Back to reviews
        </Link>
      </div>
    );
  }

  const url = absoluteUrl(`/reviews/${slug}`);
  return (
    <>
      <JsonLd
        data={{
          "@type": "Review",
          name: review.title,
          reviewBody: review.description || undefined,
          datePublished: review.date || undefined,
          url,
          image: review.cover ? assetUrl(review.cover) : undefined,
          author: PERSON_SCHEMA,
          itemReviewed: {
            "@type": "Movie",
            name: review.film,
            ...(review.year ? { dateCreated: String(review.year) } : {}),
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating,
            bestRating: 5,
            worstRating: 1,
          },
        }}
      />
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Film", item: absoluteUrl("/reviews") },
            { "@type": "ListItem", position: 3, name: review.title, item: url },
          ],
        }}
      />
      <Article
        title={review.title}
        date={review.date}
        content={review.content}
        cover={review.cover}
        backHref="/reviews"
        backLabel="Back to all reviews"
        meta={
        <div className="flex flex-wrap items-center gap-3 text-[15px] text-surface-muted">
          <span className="text-surface-text">
            {review.film}
            {review.year ? ` (${review.year})` : ""}
          </span>
          <StarRating rating={review.rating} />
        </div>
      }
      />
    </>
  );
}
