import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
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
    return { title: "Post Not Found" };
  }

  const url = absoluteUrl(`/blog/${slug}`);
  return {
    title: post.title,
    description: post.description || undefined,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.description || undefined,
      type: "article",
      url,
      siteName: SITE_NAME,
      publishedTime: post.date || undefined,
      authors: [AUTHOR_NAME],
      images: ogImages(post.cover),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface-2 text-surface-text">
        <h1 className="mb-4 text-4xl font-bold">Post Not Found</h1>
        <Link href="/blog" className="underline">
          Back to the blog
        </Link>
      </div>
    );
  }

  const url = absoluteUrl(`/blog/${slug}`);
  return (
    <>
      <JsonLd
        data={{
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description || undefined,
          datePublished: post.date || undefined,
          dateModified: post.date || undefined,
          image: post.cover ? assetUrl(post.cover) : undefined,
          author: PERSON_SCHEMA,
          publisher: PERSON_SCHEMA,
          mainEntityOfPage: url,
          url,
        }}
      />
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        }}
      />
      <Article
        title={post.title}
        date={post.date}
        content={post.content}
        cover={post.cover}
        coverWidth={post.coverWidth}
        coverHeight={post.coverHeight}
        backHref="/blog"
        backLabel="Back to all posts"
      />
    </>
  );
}
