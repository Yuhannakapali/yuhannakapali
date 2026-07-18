import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getImageSize } from "./image-size";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  cover: string;
  coverWidth: number | null;
  coverHeight: number | null;
};

export type Post = PostMeta & {
  content: string;
};

const postsDirectory = path.join(process.cwd(), "content/posts");

function readSlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const cover = typeof data.cover === "string" ? data.cover : "";
  const size = cover ? getImageSize(cover) : null;

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    // Frontmatter dates may be parsed into Date objects by gray-matter.
    date:
      data.date instanceof Date
        ? data.date.toISOString()
        : String(data.date ?? ""),
    description: typeof data.description === "string" ? data.description : "",
    cover,
    coverWidth: size?.width ?? null,
    coverHeight: size?.height ?? null,
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const posts = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => readSlug(file.replace(/\.md$/, "")))
    .filter((post): post is Post => post !== null);

  // Newest first.
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  return readSlug(slug);
}
