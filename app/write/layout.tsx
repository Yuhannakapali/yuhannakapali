import type { Metadata } from "next";

// The editor is personal, keep it out of search indexes.
export const metadata: Metadata = {
  title: "Write",
  robots: { index: false, follow: false },
  alternates: { canonical: "/write/" },
};

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
