import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  cover: string;
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

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    // Frontmatter dates may be parsed into Date objects by gray-matter.
    date:
      data.date instanceof Date
        ? data.date.toISOString()
        : String(data.date ?? ""),
    description: typeof data.description === "string" ? data.description : "",
    cover: typeof data.cover === "string" ? data.cover : "",
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
