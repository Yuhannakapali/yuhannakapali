import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllPosts } from "./posts";
import { getImageSize } from "./image-size";

// Shared helpers for the two extra content types (reviews and treks) plus a
// unified "latest across everything" feed. All filesystem + gray-matter, so it
// runs at build time and works with output: "export".

function toISO(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return value == null ? "" : String(value);
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    if (!Number.isNaN(n)) return n;
  }
  return null;
}

function toStr(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function contentDir(name: string): string {
  return path.join(process.cwd(), "content", name);
}

function readMarkdownDir<T>(
  folder: string,
  map: (slug: string, data: Record<string, unknown>, content: string) => T,
): T[] {
  const dir = contentDir(folder);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return map(slug, data as Record<string, unknown>, content);
    });
}

// Newest first.
function byDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : -1));
}

type CoverSize = { coverWidth: number | null; coverHeight: number | null };

function coverSize(cover: string): CoverSize {
  const size = cover ? getImageSize(cover) : null;
  return { coverWidth: size?.width ?? null, coverHeight: size?.height ?? null };
}

export type Review = {
  slug: string;
  title: string;
  film: string;
  year: number | null;
  rating: number;
  date: string;
  description: string;
  cover: string;
  content: string;
} & CoverSize;

export type Trek = {
  slug: string;
  title: string;
  region: string;
  days: number | null;
  difficulty: string;
  best_season: string;
  max_altitude: number | null;
  date: string;
  description: string;
  cover: string;
  content: string;
} & CoverSize;

export function getAllReviews(): Review[] {
  const reviews = readMarkdownDir<Review>("reviews", (slug, data, content) => {
    const cover = toStr(data.cover);
    return {
      slug,
      title: toStr(data.title) || slug,
      film: toStr(data.film),
      year: toNumber(data.year),
      rating: toNumber(data.rating) ?? 0,
      date: toISO(data.date),
      description: toStr(data.description),
      cover,
      ...coverSize(cover),
      content,
    };
  });
  return byDateDesc(reviews);
}

export function getReviewBySlug(slug: string): Review | null {
  return getAllReviews().find((r) => r.slug === slug) ?? null;
}

export function getAllTreks(): Trek[] {
  const treks = readMarkdownDir<Trek>("treks", (slug, data, content) => {
    const cover = toStr(data.cover);
    return {
      slug,
      title: toStr(data.title) || slug,
      region: toStr(data.region),
      days: toNumber(data.days),
      difficulty: toStr(data.difficulty),
      best_season: toStr(data.best_season),
      max_altitude: toNumber(data.max_altitude),
      date: toISO(data.date),
      description: toStr(data.description),
      cover,
      ...coverSize(cover),
      content,
    };
  });
  return byDateDesc(treks);
}

export function getTrekBySlug(slug: string): Trek | null {
  return getAllTreks().find((t) => t.slug === slug) ?? null;
}

export type FeedType = "blog" | "film" | "trek";

export type FeedItem = {
  type: FeedType;
  slug: string;
  title: string;
  date: string;
  href: string;
};

// A single mixed feed of the most recent items across all three content types.
export function getLatestAcrossAll(n: number): FeedItem[] {
  const posts: FeedItem[] = getAllPosts().map((p) => ({
    type: "blog",
    slug: p.slug,
    title: p.title,
    date: p.date,
    href: `/blog/${p.slug}`,
  }));
  const reviews: FeedItem[] = getAllReviews().map((r) => ({
    type: "film",
    slug: r.slug,
    title: r.title,
    date: r.date,
    href: `/reviews/${r.slug}`,
  }));
  const treks: FeedItem[] = getAllTreks().map((t) => ({
    type: "trek",
    slug: t.slug,
    title: t.title,
    date: t.date,
    href: `/treks/${t.slug}`,
  }));

  return byDateDesc([...posts, ...reviews, ...treks]).slice(0, n);
}
