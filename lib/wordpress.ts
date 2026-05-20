// WordPress REST API client for the headless blog.
//
// Reads published posts from the WordPress.com site set by
// NEXT_PUBLIC_WP_API_URL. Defaults to the tulliaarticles.wordpress.com
// public endpoint so local dev / preview deploys work without env config.
//
// Cache strategy: 60-second ISR. New articles published from seo.ai →
// WordPress appear on the Next.js site within ~1 minute, no redeploy
// needed.

const DEFAULT_WP_API_URL =
  'https://public-api.wordpress.com/wp/v2/sites/tulliaarticles.wordpress.com';

const WP_API_URL = (
  process.env.NEXT_PUBLIC_WP_API_URL || DEFAULT_WP_API_URL
).replace(/\/$/, '');

const REVALIDATE_SECONDS = 60;

export type WPRendered = { rendered: string };

export type WPMedia = {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
};

export type WPTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy: 'category' | 'post_tag' | string;
};

export type WPAuthor = {
  id: number;
  name: string;
  slug: string;
  avatar_urls?: Record<string, string>;
};

export type WPPost = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: WPRendered;
  excerpt: WPRendered;
  content: WPRendered;
  featured_media: number;
  jetpack_featured_media_url?: string;
  link: string;
  _embedded?: {
    author?: WPAuthor[];
    'wp:featuredmedia'?: WPMedia[];
    'wp:term'?: WPTerm[][];
  };
};

export type ArticleSummary = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  modifiedDate: string;
  featuredImage: { url: string; alt: string } | null;
  category: string | null;
  authorName: string | null;
  readingTimeMinutes: number;
};

export type Article = ArticleSummary & {
  contentHtml: string;
};

function decodeHtmlEntities(input: string): string {
  if (!input) return '';
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#8217;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ');
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function estimateReadingTimeMinutes(html: string): number {
  const wordCount = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / 220));
}

function featuredImageFromPost(post: WPPost): ArticleSummary['featuredImage'] {
  const embedded = post._embedded?.['wp:featuredmedia']?.[0];
  if (embedded?.source_url) {
    return { url: embedded.source_url, alt: embedded.alt_text || '' };
  }
  if (post.jetpack_featured_media_url) {
    return { url: post.jetpack_featured_media_url, alt: '' };
  }
  return null;
}

function categoryFromPost(post: WPPost): string | null {
  const terms = post._embedded?.['wp:term']?.flat() ?? [];
  const category = terms.find((t) => t.taxonomy === 'category');
  return category ? decodeHtmlEntities(category.name) : null;
}

function authorFromPost(post: WPPost): string | null {
  const author = post._embedded?.author?.[0];
  return author ? decodeHtmlEntities(author.name) : null;
}

function toSummary(post: WPPost): ArticleSummary {
  return {
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(post.title.rendered),
    excerpt: decodeHtmlEntities(stripHtml(post.excerpt.rendered)),
    date: post.date,
    modifiedDate: post.modified,
    featuredImage: featuredImageFromPost(post),
    category: categoryFromPost(post),
    authorName: authorFromPost(post),
    readingTimeMinutes: estimateReadingTimeMinutes(post.content.rendered),
  };
}

function toArticle(post: WPPost): Article {
  return {
    ...toSummary(post),
    contentHtml: post.content.rendered,
  };
}

async function wpFetch<T>(path: string): Promise<T | null> {
  const url = `${WP_API_URL}${path}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      console.error(`WP fetch failed: ${res.status} ${url}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`WP fetch error: ${url}`, err);
    return null;
  }
}

export async function getPosts(options: { perPage?: number; page?: number } = {}): Promise<ArticleSummary[]> {
  const { perPage = 20, page = 1 } = options;
  const params = new URLSearchParams({
    per_page: String(perPage),
    page: String(page),
    _embed: 'true',
    status: 'publish',
    orderby: 'date',
    order: 'desc',
  });
  const posts = await wpFetch<WPPost[]>(`/posts?${params.toString()}`);
  if (!posts) return [];
  return posts.map(toSummary);
}

export async function getPostBySlug(slug: string): Promise<Article | null> {
  const params = new URLSearchParams({ slug, _embed: 'true' });
  const posts = await wpFetch<WPPost[]>(`/posts?${params.toString()}`);
  if (!posts || posts.length === 0) return null;
  return toArticle(posts[0]);
}

export async function getAllPostSlugs(): Promise<string[]> {
  // Pull up to 100 slugs for generateStaticParams. If you ever exceed
  // that, paginate here.
  const params = new URLSearchParams({
    per_page: '100',
    status: 'publish',
    _fields: 'slug',
  });
  const posts = await wpFetch<{ slug: string }[]>(`/posts?${params.toString()}`);
  if (!posts) return [];
  return posts.map((p) => p.slug);
}
