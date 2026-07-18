import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { readingTime, formatDate } from "@/lib/reading-time";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Blog | Yuhanna Kapali",
  description: "Notes on backend engineering, systems, and the things I build.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white text-[#242424] flex flex-col">
      <Navbar />
      <main className="grow w-full max-w-[680px] mx-auto px-5 pt-28 pb-24">
        <h1 className="text-3xl font-bold tracking-tight mb-12">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-[#6b6b6b]">No posts yet. Check back soon.</p>
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
                      <p className="mt-2 text-[16px] leading-relaxed text-[#6b6b6b] line-clamp-2">
                        {post.description}
                      </p>
                    ) : null}
                    <div className="mt-3 text-[13px] text-[#6b6b6b]">
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
