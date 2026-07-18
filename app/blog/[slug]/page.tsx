import Link from "next/link";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { readingTime, formatDate } from "@/lib/reading-time";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { ReadingProgress } from "./ReadingProgress";

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

// Custom renderers give each element the exact Medium-style typography
// instead of relying on the default typography plugin output.
const components: Components = {
  p({ node, children }) {
    const only =
      node && node.children.length === 1 ? node.children[0] : undefined;

    // A lone image should render full width with no paragraph wrapper.
    if (only && only.type === "element" && only.tagName === "img") {
      return <>{children}</>;
    }

    // Italic text on its own line right after an image becomes a caption.
    if (only && only.type === "element" && only.tagName === "em") {
      return (
        <span className="mt-2 mb-8 block text-center text-[13px] text-[#6b6b6b]">
          {children}
        </span>
      );
    }

    return (
      <p className="font-article mt-[2em] text-[18px] leading-[1.58] tracking-[-0.003em] text-[#242424] first:mt-0 md:text-[20px]">
        {children}
      </p>
    );
  },
  h2({ children }) {
    return (
      <h2 className="mt-12 mb-1 text-[24px] font-bold tracking-tight text-[#242424]">
        {children}
      </h2>
    );
  },
  h3({ children }) {
    return (
      <h3 className="mt-8 mb-1 text-[20px] font-bold tracking-tight text-[#242424]">
        {children}
      </h3>
    );
  },
  a({ href, children }) {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        className="text-inherit underline underline-offset-2"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  blockquote({ children }) {
    return (
      <blockquote className="font-article my-8 border-l-[3px] border-black pl-5 text-[24px] italic leading-snug text-[#6b6b6b]">
        {children}
      </blockquote>
    );
  },
  ul({ children }) {
    return (
      <ul className="font-article mt-[2em] list-disc pl-6 text-[18px] leading-[1.58] text-[#242424] md:text-[20px]">
        {children}
      </ul>
    );
  },
  ol({ children }) {
    return (
      <ol className="font-article mt-[2em] list-decimal pl-6 text-[18px] leading-[1.58] text-[#242424] md:text-[20px]">
        {children}
      </ol>
    );
  },
  li({ children }) {
    return <li className="mt-2">{children}</li>;
  },
  img({ src, alt }) {
    if (typeof src !== "string") return null;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt ?? ""} className="mx-auto my-8 w-full rounded" />
    );
  },
  pre({ children }) {
    return (
      <pre className="my-8 overflow-x-auto rounded-lg bg-[#f2f2f2] p-4 text-[14px] leading-relaxed">
        {children}
      </pre>
    );
  },
  code({ className, children }) {
    const text = String(children);
    const isBlock = /language-/.test(className ?? "") || text.includes("\n");
    if (isBlock) {
      return (
        <code className={`${className ?? ""} font-mono text-[14px]`}>
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-[#f2f2f2] px-[0.3em] py-[0.1em] font-mono text-[0.85em]">
        {children}
      </code>
    );
  },
};

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
    <div className="flex min-h-screen flex-col bg-white text-[#242424]">
      <ReadingProgress />
      <Navbar />
      <main className="mx-auto w-full max-w-[680px] grow px-5 pt-24 pb-24">
        <article>
          <h1 className="text-[32px] font-bold leading-[1.15] tracking-tight text-[#242424] md:text-[42px]">
            {post.title}
          </h1>

          <div className="mt-6 mb-10 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/avatar.jpg"
              alt="Yuhanna Kapali"
              className="h-11 w-11 rounded-full object-cover"
            />
            <div className="leading-tight">
              <div className="text-[14px] text-[#242424]">Yuhanna Kapali</div>
              <div className="text-[14px] text-[#6b6b6b]">
                {formatDate(post.date)}
                {post.date ? " · " : ""}
                {readingTime(post.content)}
              </div>
            </div>
          </div>

          {post.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover}
              alt=""
              className="mb-10 w-full rounded object-cover"
            />
          ) : null}

          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {post.content}
          </ReactMarkdown>
        </article>

        <div className="mt-16 border-t border-[#e6e6e6] pt-6">
          <Link href="/blog" className="text-[14px] text-[#6b6b6b] underline">
            Back to all posts
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
