import Link from "next/link";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { readingTime, formatDate } from "@/lib/reading-time";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Monogram } from "./Monogram";
import { ReadingProgress } from "./ReadingProgress";

// Custom renderers give each element the exact Medium-style typography
// instead of relying on the default typography plugin output. Shared by the
// blog, review, and trek article pages so their layout is identical.
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
        <span className="mt-2 mb-8 block text-center text-[13px] text-surface-muted">
          {children}
        </span>
      );
    }

    return (
      <p className="font-article mt-[2em] text-[18px] leading-[1.58] tracking-[-0.003em] text-surface-text first:mt-0 md:text-[20px]">
        {children}
      </p>
    );
  },
  h2({ children }) {
    return (
      <h2 className="mt-12 mb-1 text-[24px] font-bold tracking-tight text-surface-text">
        {children}
      </h2>
    );
  },
  h3({ children }) {
    return (
      <h3 className="mt-8 mb-1 text-[20px] font-bold tracking-tight text-surface-text">
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
      <blockquote className="font-article my-8 border-l-[3px] border-line-strong pl-5 text-[24px] italic leading-snug text-surface-muted">
        {children}
      </blockquote>
    );
  },
  ul({ children }) {
    return (
      <ul className="font-article mt-[2em] list-disc pl-6 text-[18px] leading-[1.58] text-surface-text md:text-[20px]">
        {children}
      </ul>
    );
  },
  ol({ children }) {
    return (
      <ol className="font-article mt-[2em] list-decimal pl-6 text-[18px] leading-[1.58] text-surface-text md:text-[20px]">
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
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
        className="mx-auto my-8 h-auto w-full rounded"
      />
    );
  },
  pre({ children }) {
    return (
      <pre className="my-8 overflow-x-auto rounded-lg bg-code p-4 text-[14px] leading-relaxed">
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
      <code className="rounded bg-code px-[0.3em] py-[0.1em] font-mono text-[0.85em]">
        {children}
      </code>
    );
  },
};

export function Article({
  title,
  date,
  content,
  cover,
  coverWidth,
  coverHeight,
  meta,
  backHref,
  backLabel,
}: {
  title: string;
  date: string;
  content: string;
  cover?: string;
  coverWidth?: number | null;
  coverHeight?: number | null;
  /** Optional block rendered directly under the byline (film/rating, stats). */
  meta?: ReactNode;
  backHref: string;
  backLabel: string;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-2 text-surface-text">
      <ReadingProgress />
      <Navbar />
      <main className="mx-auto w-full max-w-[680px] grow px-5 pt-24 pb-24">
        <article>
          <h1 className="text-[32px] font-bold leading-[1.15] tracking-tight text-surface-text md:text-[42px]">
            {title}
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <Monogram size={44} />
            <div className="leading-tight">
              <div className="text-[14px] text-surface-text">Yuhanna Kapali</div>
              <div className="text-[14px] text-surface-muted">
                {formatDate(date)}
                {date ? " · " : ""}
                {readingTime(content)}
              </div>
            </div>
          </div>

          {meta ? <div className="mt-5">{meta}</div> : null}

          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt=""
              {...(coverWidth && coverHeight
                ? { width: coverWidth, height: coverHeight }
                : {})}
              // Cover is the likely LCP element, so load it eagerly.
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="mt-10 h-auto w-full rounded object-cover"
            />
          ) : null}

          <div className="mt-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {content}
            </ReactMarkdown>
          </div>
        </article>

        <div className="mt-16 border-t border-line pt-6">
          <Link href={backHref} className="text-[14px] text-surface-muted underline">
            {backLabel}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
