import Link from "next/link";
import type { Metadata } from "next";
import { getAllReviews, getReviewBySlug } from "@/lib/content";
import { Article } from "../../components/Article";
import { StarRating } from "../../components/StarRating";

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
    return { title: "Review Not Found | Yuhanna Kapali" };
  }

  return {
    title: `${review.title} | Yuhanna Kapali`,
    description: review.description || undefined,
    openGraph: {
      title: review.title,
      description: review.description || undefined,
      type: "article",
      images: review.cover ? [{ url: review.cover }] : undefined,
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

  return (
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
  );
}
