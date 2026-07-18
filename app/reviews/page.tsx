import Link from "next/link";
import type { Metadata } from "next";
import { getAllReviews } from "@/lib/content";
import { formatDate } from "@/lib/reading-time";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { StarRating } from "../components/StarRating";

export const metadata: Metadata = {
  title: "Film | Yuhanna Kapali",
  description: "Films I have watched and what stayed with me.",
};

export default function ReviewsIndexPage() {
  const reviews = getAllReviews();

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#242424]">
      <Navbar />
      <main className="mx-auto w-full max-w-[680px] grow px-5 pt-28 pb-24">
        <h1 className="font-display mb-3 text-[34px] font-semibold tracking-tight">
          Film
        </h1>
        <p className="mb-10 text-[16px] text-[#6b6b6b]">
          Films I have watched and what stayed with me.
        </p>

        {reviews.length === 0 ? (
          <p className="text-[#6b6b6b]">No reviews yet. Check back soon.</p>
        ) : (
          <div className="flex flex-col">
            {reviews.map((review) => (
              <article key={review.slug} className="py-8 first:pt-0">
                <Link href={`/reviews/${review.slug}`} className="group block">
                  <h2 className="text-[20px] font-bold leading-snug tracking-tight group-hover:text-marigold">
                    {review.title}
                  </h2>
                  <p className="mt-1 text-[16px] text-[#6b6b6b]">
                    {review.film}
                    {review.year ? ` (${review.year})` : ""}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <StarRating rating={review.rating} />
                    <span className="text-[13px] text-[#6b6b6b]">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
