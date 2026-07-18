import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Article } from "../../components/Article";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found | Yuhanna Kapali" };
  }

  return {
    title: `${post.title} | Yuhanna Kapali`,
    description: post.description || undefined,
    openGraph: {
      title: post.title,
      description: post.description || undefined,
      type: "article",
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white text-[#242424]">
        <h1 className="mb-4 text-4xl font-bold">Post Not Found</h1>
        <Link href="/blog" className="underline">
          Back to the blog
        </Link>
      </div>
    );
  }

  return (
    <Article
      title={post.title}
      date={post.date}
      content={post.content}
      cover={post.cover}
      backHref="/blog"
      backLabel="Back to all posts"
    />
  );
}
