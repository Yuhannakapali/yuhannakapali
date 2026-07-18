import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllReviews, getAllTreks } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const dateOf = (d: string) => (d ? new Date(d) : now);

  const sections: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/reviews"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/treks"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const posts = getAllPosts().map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: dateOf(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const reviews = getAllReviews().map((r) => ({
    url: absoluteUrl(`/reviews/${r.slug}`),
    lastModified: dateOf(r.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const treks = getAllTreks().map((t) => ({
    url: absoluteUrl(`/treks/${t.slug}`),
    lastModified: dateOf(t.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...sections, ...posts, ...reviews, ...treks];
}
