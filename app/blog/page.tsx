import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/mdx';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Блог об аренде спецтехники в Бресте | МиниТех Брест',
  description:
    'Полезные статьи об аренде мини-экскаватора и мини-погрузчика в Бресте: цены, советы, сравнение техники, земляные работы и демонтаж в Брестской области.',
  openGraph: {
    title: 'Блог | МиниТех Брест',
    description: 'Статьи об аренде спецтехники, земляных работах и демонтаже в Бресте.',
    type: 'website',
    locale: 'ru_BY',
    siteName: SITE.name,
  },
  alternates: { canonical: `${SITE.url}/blog/` },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-BY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Страница-список блога */
export default function BlogPage() {
  const posts = getAllPosts();

  const blogListingSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Блог МиниТех Брест',
    description: 'Статьи об аренде спецтехники и земляных работах в Бресте',
    url: `${SITE.url}/blog/`,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
  };

  return (
    <>
      <JsonLd data={blogListingSchema} />

      {/* Хлебные крошки */}
      <nav aria-label="Breadcrumb" className="container-site pt-8 pb-2">
        <ol className="flex items-center gap-2 text-sm text-text-muted">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              Главная
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text" aria-current="page">
            Блог
          </li>
        </ol>
      </nav>

      {/* Заголовок секции */}
      <section className="section bg-bg pb-8" aria-labelledby="blog-heading">
        <div className="container-site text-center mb-12">
          <div className="accent-line mx-auto" />
          <h1 id="blog-heading" className="section-title mt-4">
            Блог
          </h1>
          <p className="section-subtitle max-w-xl mx-auto">
            Полезные статьи о спецтехнике, земляных работах и строительстве в Бресте
          </p>
        </div>

        {/* Сетка статей */}
        <div className="container-site">
          {posts.length === 0 ? (
            <p className="text-center text-text-muted">Статьи скоро появятся.</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="group flex flex-col h-full bg-surface border border-border rounded-2xl p-6
                               hover:border-accent/40 hover:shadow-accent-glow transition-all duration-200"
                    aria-label={`Читать статью: ${post.title}`}
                  >
                    {/* Мета */}
                    <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} aria-hidden="true" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} aria-hidden="true" />
                        {post.readTime} мин
                      </span>
                    </div>

                    {/* Заголовок */}
                    <h2
                      className="font-heading font-bold text-text text-lg leading-snug mb-3
                                 group-hover:text-accent transition-colors"
                    >
                      {post.title}
                    </h2>

                    {/* Описание */}
                    <p className="text-text-muted text-sm leading-relaxed flex-1 mb-5">
                      {post.description}
                    </p>

                    {/* CTA */}
                    <span className="inline-flex items-center gap-1.5 text-accent text-sm font-medium
                                     group-hover:gap-2.5 transition-all duration-200">
                      Читать
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
