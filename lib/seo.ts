// Central SEO constants and helpers.
export const SITE_URL = "https://yuhannakapali.com.np";
export const SITE_NAME = "Yuhanna Kapali";
export const AUTHOR_NAME = "Yuhanna Kapali";
export const AUTHOR_SAME_AS = [
  "https://github.com/Yuhannakapali",
  "https://www.linkedin.com/in/yuhanna-kapali-36334911a/",
];

// Build an absolute URL for a page from a site-relative path (with a trailing
// slash to match the site's trailingSlash: true routing).
export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withSlash = clean.endsWith("/") ? clean : `${clean}/`;
  return `${SITE_URL}${withSlash === "//" ? "/" : withSlash}`;
}

// Build an absolute URL for an asset (image, file) - no trailing slash.
export function assetUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Yuhanna Kapali, software engineer in Kathmandu",
};

// Open Graph images for a page: the cover if present, otherwise the site card.
export function ogImages(cover?: string) {
  return cover ? [{ url: cover }] : [OG_IMAGE];
}

export const PERSON_SCHEMA = {
  "@type": "Person",
  name: AUTHOR_NAME,
  url: SITE_URL,
  jobTitle: "Software Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  sameAs: AUTHOR_SAME_AS,
};
