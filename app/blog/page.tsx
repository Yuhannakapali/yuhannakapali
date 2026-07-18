import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { readingTime, formatDate } from "@/lib/reading-time";
import { OG_IMAGE } from "@/lib/seo";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on backend engineering, systems, and the things I build.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Blog | Yuhanna Kapali",
    description:
      "Notes on backend engineering, systems, and the things I build.",
    url: "/blog/",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-surface-2 text-surface-text flex flex-col">
      <Navbar />
      <main className="grow w-full max-w-[680px] mx-auto px-5 pt-28 pb-24">
        <h1 className="text-3xl font-bold tracking-tight mb-12">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-surface-muted">No posts yet. Check back soon.</p>
        ) : (
          <div className="flex flex-col">
            {posts.map((post) => (
              <article key={post.slug} className="py-8 first:pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-start justify-between gap-6"
                >
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[20px] font-bold leading-snug tracking-tight">
                      {post.title}
                    </h2>
                    {post.description ? (
                      <p className="mt-2 text-[16px] leading-relaxed text-surface-muted line-clamp-2">
                        {post.description}
                      </p>
                    ) : null}
                    <div className="mt-3 text-[13px] text-surface-muted">
                      {formatDate(post.date)}
                      {post.date ? " · " : ""}
                      {readingTime(post.content)}
                    </div>
                  </div>

                  {post.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover}
                      alt=""
                      width={100}
                      height={100}
                      loading="lazy"
                      decoding="async"
                      className="h-[100px] w-[100px] shrink-0 rounded-md object-cover"
                    />
                  ) : null}
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
