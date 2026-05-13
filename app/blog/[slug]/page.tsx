import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import { SITE, CONTACTS } from '@/lib/constants';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | МиниТех Брест`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      locale: 'ru_BY',
      siteName: SITE.name,
    },
    alternates: { canonical: `${SITE.url}/blog/${slug}/` },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-BY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Страница отдельной статьи блога */
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    url: `${SITE.url}/blog/${slug}/`,
    keywords: post.keywords.join(', '),
    inLanguage: 'ru',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Блог', item: `${SITE.url}/blog/` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE.url}/blog/${slug}/` },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Хлебные крошки */}
      <nav aria-label="Breadcrumb" className="container-site pt-8 pb-2">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              Главная
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog/" className="hover:text-accent transition-colors">
              Блог
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li
            className="text-text truncate max-w-[200px] sm:max-w-none"
            aria-current="page"
          >
            {post.title}
          </li>
        </ol>
      </nav>

      <article className="container-site py-10 max-w-3xl" aria-labelledby="article-heading">
        {/* Заголовок статьи */}
        <header className="mb-10">
          <h1
            id="article-heading"
            className="font-heading font-extrabold text-text text-3xl sm:text-4xl leading-tight mb-6"
          >
            {post.title}
          </h1>

          <div className="flex items-center gap-5 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} aria-hidden="true" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {post.readTime} мин чтения
            </span>
          </div>

          <div className="mt-6 border-t border-border" />
        </header>

        {/*
          Контент статьи рендерится через unified pipeline (Markdown → HTML).
          Файлы MDX — собственный контент репозитория, dangerouslySetInnerHTML безопасен.
        */}
        <div
          className="prose prose-invert prose-amber max-w-none
                     prose-headings:font-heading prose-headings:font-bold
                     prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                     prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                     prose-p:text-text-muted prose-p:leading-relaxed
                     prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-text
                     prose-li:text-text-muted prose-li:leading-relaxed
                     prose-ul:my-4 prose-ol:my-4
                     prose-blockquote:border-l-accent prose-blockquote:text-text-muted
                     prose-table:text-sm prose-th:text-text prose-td:text-text-muted
                     prose-hr:border-border"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />

        {/* CTA в конце статьи */}
        <aside
          className="mt-14 bg-surface border border-accent/20 rounded-2xl p-6 sm:p-8
                     shadow-[0_0_32px_rgba(245,158,11,0.08)]"
          aria-label="Заказать технику"
        >
          <h2 className="font-heading font-bold text-text text-xl mb-2">
            Нужна помощь со спецтехникой?
          </h2>
          <p className="text-text-muted text-sm mb-5">
            Работаем по всему Бресту и Брестской области. Перезвоним за 15 минут.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link href="/contacts/">Оставить заявку</Link>
            </Button>
            <Button variant="ghost" asChild>
              <a href={CONTACTS.phoneHref} aria-label={`Позвонить: ${CONTACTS.phone}`}>
                {CONTACTS.phone}
              </a>
            </Button>
          </div>
        </aside>

        {/* Навигация назад */}
        <div className="mt-8">
          <Button variant="ghost" asChild>
            <Link href="/blog/" className="flex items-center gap-2">
              <ArrowLeft size={16} aria-hidden="true" />
              Все статьи
            </Link>
          </Button>
        </div>
      </article>
    </>
  );
}
