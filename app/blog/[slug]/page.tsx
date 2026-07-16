import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllPostSlugs, getPostBySlug } from '@/lib/wordpress';

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const article = await getPostBySlug(params.slug);
  if (!article) return { title: 'Article not found — TuLi Procedure' };

  const url = `https://www.tumescentlipolysis.com/blog/${article.slug}`;
  const image = article.featuredImage?.url;

  return {
    title: `${article.title} — TuLi Procedure`,
    description: article.excerpt || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      url,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.modifiedDate,
      authors: article.authorName ? [article.authorName] : undefined,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: article.title,
      description: article.excerpt || undefined,
      images: image ? [image] : undefined,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ArticlePage({ params }: { params: Params }) {
  const article = await getPostBySlug(params.slug);
  if (!article) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || undefined,
    datePublished: article.date,
    dateModified: article.modifiedDate,
    author: article.authorName
      ? { '@type': 'Person', name: article.authorName }
      : { '@type': 'Organization', name: 'TuLi Procedure' },
    publisher: {
      '@type': 'Organization',
      name: 'TuLi Procedure',
      url: 'https://www.tumescentlipolysis.com',
    },
    image: article.featuredImage?.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.tumescentlipolysis.com/blog/${article.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-tcl-bg">
      <Navbar />

      <article className="pt-32 lg:pt-40 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-tcl-gold hover:text-tcl-gold-dark transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to blog
          </Link>

          {/* Category */}
          {article.category && (
            <p className="text-tcl-gold text-xs tracking-[0.25em] uppercase mb-4">
              {article.category}
            </p>
          )}

          {/* Title */}
          <h1 className="font-serif text-4xl lg:text-5xl text-tcl-dark font-semibold leading-tight mb-6">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-tcl-gray border-b border-tcl-border pb-8 mb-10">
            <span>{formatDate(article.date)}</span>
            <span>{article.readingTimeMinutes} min read</span>
            {article.authorName && <span>By {article.authorName}</span>}
          </div>

          {/* Featured image */}
          {article.featuredImage && (
            <div className="relative aspect-[16/9] mb-10 rounded-lg overflow-hidden">
              <Image
                src={article.featuredImage.url}
                alt={article.featuredImage.alt || article.title}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-img:rounded-lg prose-a:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          {/* CTA */}
          <div className="mt-16 p-8 bg-tcl-alt rounded-lg text-center">
            <h3 className="font-serif text-2xl text-tcl-dark mb-3">
              Ready to take the next step?
            </h3>
            <p className="text-tcl-gray text-sm mb-6 max-w-md mx-auto">
              Request a consultation with Dr. Moskovitz to discuss whether the
              TuLi procedure is right for you.
            </p>
            <Link
              href="/#consult"
              className="inline-flex items-center gap-2 px-8 py-4 bg-tcl-gold text-white text-sm font-medium tracking-widest uppercase rounded-sm hover:bg-tcl-gold-dark transition-colors"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      </article>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
