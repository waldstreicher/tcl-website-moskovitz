import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPosts } from '@/lib/wordpress';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog — Tullia Procedure',
  description:
    'Articles, guides, and the latest research on tumescent cryolipolysis and non-surgical body contouring.',
  alternates: { canonical: 'https://www.tulliaprocedure.com/blog' },
  openGraph: {
    title: 'Blog — Tullia Procedure',
    description:
      'Articles, guides, and the latest research on tumescent cryolipolysis and non-surgical body contouring.',
    url: 'https://www.tulliaprocedure.com/blog',
    type: 'website',
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogIndexPage() {
  const posts = await getPosts({ perPage: 30 });

  return (
    <main className="min-h-screen bg-tcl-bg">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-tcl-alt">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-tcl-gold" />
            <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">
              Insights
            </span>
            <div className="h-px w-12 bg-tcl-gold" />
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl text-tcl-dark font-semibold mb-4">
            The Tullia Blog
          </h1>
          <p className="text-tcl-gray text-lg max-w-2xl mx-auto">
            Guides, research, and patient perspectives on tumescent cryolipolysis
            and non-surgical body contouring.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-tcl-gray text-lg">
                No articles published yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white border border-tcl-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[16/10] bg-tcl-alt overflow-hidden">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-3xl text-tcl-gold/40">
                          Tullia
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    {post.category && (
                      <p className="text-tcl-gold text-xs tracking-[0.2em] uppercase mb-3">
                        {post.category}
                      </p>
                    )}
                    <h2 className="font-serif text-2xl text-tcl-dark font-semibold mb-3 group-hover:text-tcl-gold transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-tcl-gray text-sm mb-5 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between text-xs text-tcl-gray">
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readingTimeMinutes} min read</span>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-tcl-gold">
                      Read more
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
