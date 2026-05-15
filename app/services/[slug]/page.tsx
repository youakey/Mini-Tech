import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight,
  Phone,
  Truck,
  Clock,
  HardHat,
  MapPin,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { LeadForm } from '@/components/forms/LeadForm';
import { breadcrumbSchema, serviceSchema } from '@/lib/schemas';
import { SITE, CONTACTS } from '@/lib/constants';
import { SERVICES_DATA } from '@/data/services';
import type { BadgeIconKey, DetailBlock, DetailSection } from '@/data/services';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.seo.title,
    description: service.seo.metaDescription,
    alternates: { canonical: `${SITE.url}/services/${slug}/` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.ogDescription,
      url: `${SITE.url}/services/${slug}/`,
      images: [{ url: `/images/services/${slug}/og.webp`, width: 1200, height: 630 }],
    },
  };
}

/** Иконка badge-блока в hero */
function BadgeIcon({ iconKey, size = 22 }: { iconKey: BadgeIconKey; size?: number }) {
  const cls = 'text-accent';
  switch (iconKey) {
    case 'truck':    return <Truck className={cls} size={size} />;
    case 'clock':    return <Clock className={cls} size={size} />;
    case 'hardhat':  return <HardHat className={cls} size={size} />;
    case 'mappin':   return <MapPin className={cls} size={size} />;
    case 'shield':   return <ShieldCheck className={cls} size={size} />;
  }
}

/** Рендер одного блока контента */
function DetailBlockRenderer({ block }: { block: DetailBlock }) {
  switch (block.type) {
    case 'checklist':
    case 'included':
      return (
        <div>
          <h2 className="font-heading font-bold text-2xl text-text mb-6">{block.heading}</h2>
          <ul className="space-y-3">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                <span className="text-text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'grid-cards':
      return (
        <div>
          <h2 className="font-heading font-bold text-2xl text-text mb-6">{block.heading}</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {block.items.map((item) => (
              <li key={item.name} className="bg-bg border border-border rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-text">{item.name}</div>
                    <div className="text-text-muted text-sm mt-1">{item.desc}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'steps':
      return (
        <div>
          <div className="text-center mb-10">
            <div className="accent-line mx-auto mb-4" />
            <h2 className="section-title">{block.heading}</h2>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {block.items.map((step, index) => (
              <li key={step.title} className="relative">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20
                                flex items-center justify-center font-mono font-bold text-accent mb-4">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="font-heading font-bold text-text mb-2">{step.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      );

    case 'zone-table':
      return (
        <div>
          <h2 className="font-heading font-bold text-2xl text-text mb-6">{block.heading}</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-2">
                  <th className="px-5 py-3.5 text-left text-text-muted font-medium">
                    {block.headers[0]}
                  </th>
                  <th className="px-5 py-3.5 text-left text-text font-mono font-bold">
                    {block.headers[1]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, index) => (
                  <tr key={row[0]} className={index % 2 === 0 ? 'bg-bg' : 'bg-surface'}>
                    <td className="px-5 py-3.5 text-text-muted border-t border-border">{row[0]}</td>
                    <td className="px-5 py-3.5 text-accent font-mono font-medium border-t border-border">
                      {row[1]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && (
            <p className="text-text-muted text-sm mt-3">{block.note}</p>
          )}
        </div>
      );

    case 'equipment-links':
      return (
        <div>
          <h2 className="font-heading font-bold text-2xl text-text mb-6">{block.heading}</h2>
          <ul className="space-y-4">
            {block.items.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-4 bg-bg border border-border rounded-2xl p-4
                             hover:border-accent/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center
                                  shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Truck size={18} className="text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-text group-hover:text-accent transition-colors">
                      {item.name}
                    </div>
                    <div className="text-text-muted text-sm">Масса: {item.weight}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

/** Рендер секции (single или two-col) */
function DetailSectionRenderer({ section, bg }: { section: DetailSection; bg: string }) {
  if (section.layout === 'single') {
    const isCentered = section.block.type === 'steps' || section.block.type === 'grid-cards';
    return (
      <section className={`section ${bg}`} aria-labelledby={undefined}>
        <div className={`container-site ${isCentered ? 'max-w-4xl' : ''}`}>
          <DetailBlockRenderer block={section.block} />
        </div>
      </section>
    );
  }

  return (
    <section className={`section ${bg}`}>
      <div className="container-site max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <DetailBlockRenderer block={section.left} />
          <DetailBlockRenderer block={section.right} />
        </div>
      </div>
    </section>
  );
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) notFound();

  const { hero, seoText, detailSections } = service;

  const breadcrumbs = [
    { name: 'Главная', href: '/' },
    { name: 'Услуги', href: '/#services' },
    { name: service.name, href: `/services/${slug}/` },
  ];

  // Чередуем фоны секций для визуального разделения
  const sectionBgs = ['bg-surface', 'bg-bg', 'bg-surface', 'bg-bg'];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={serviceSchema(service.seo.title, service.seo.metaDescription, `/services/${slug}/`)}
      />

      <main id="main-content">
        {/* Хлебные крошки */}
        <nav aria-label="Хлебные крошки" className="bg-surface border-b border-border">
          <div className="container-site py-3">
            <ol className="flex items-center gap-1 text-sm text-text-muted flex-wrap">
              {breadcrumbs.map((item, index) => (
                <li key={item.href} className="flex items-center gap-1">
                  {index > 0 && (
                    <ChevronRight size={14} className="text-border" aria-hidden="true" />
                  )}
                  {index < breadcrumbs.length - 1 ? (
                    <Link href={item.href} className="hover:text-accent transition-colors">
                      {item.name}
                    </Link>
                  ) : (
                    <span className="text-text" aria-current="page">{item.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="section bg-bg" aria-labelledby="service-heading">
          <div className="container-site">
            <div className="max-w-4xl mx-auto text-center">
              <div className="accent-line mx-auto mb-6" />
              <h1
                id="service-heading"
                className="font-heading font-extrabold text-4xl lg:text-5xl text-text leading-tight mb-6"
              >
                {hero.h1Main}
                <span className="block text-accent">{hero.h1Accent}</span>
              </h1>
              <p className="text-text-muted text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                {hero.description}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
                {/* Badge 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <BadgeIcon iconKey={hero.badge1.iconKey} />
                  </div>
                  <div className="text-left">
                    <div className="font-mono font-bold text-accent text-xl">{hero.badge1.value}</div>
                    <div className="text-text-muted text-sm">{hero.badge1.label}</div>
                  </div>
                </div>

                {/* Badge 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <BadgeIcon iconKey={hero.badge2.iconKey} />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-text text-lg">{hero.badge2.value}</div>
                    <div className="text-text-muted text-sm">{hero.badge2.label}</div>
                  </div>
                </div>

                <a
                  href={CONTACTS.phoneHref}
                  className="flex items-center gap-2 bg-accent text-bg font-bold rounded-xl px-6 py-3
                             hover:bg-accent-hover transition-colors focus-visible:ring-2
                             focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <Phone size={18} />
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Блоки деталей */}
        {detailSections.map((section, i) => (
          <DetailSectionRenderer
            key={i}
            section={section}
            bg={sectionBgs[i % sectionBgs.length] ?? 'bg-bg'}
          />
        ))}

        {/* SEO-текст */}
        <section className="section bg-bg" aria-labelledby="seo-heading">
          <div className="container-site max-w-3xl">
            <div className="space-y-8 text-text-muted leading-relaxed">
              <h2 id="seo-heading" className="font-heading font-bold text-2xl text-text mb-4">
                {seoText.mainH2}
              </h2>
              {seoText.sections.map((sec, i) => (
                <div key={i}>
                  {sec.h3 && (
                    <h3 className="font-heading font-bold text-xl text-text mb-4">{sec.h3}</h3>
                  )}
                  {sec.paragraphs.map((p, j) => (
                    <p key={j} className="mb-4 last:mb-0">{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Форма заявки */}
        <section className="section bg-surface" aria-labelledby="service-form-heading">
          <div className="container-site max-w-xl">
            <div className="text-center mb-10">
              <div className="accent-line mx-auto mb-4" />
              <h2 id="service-form-heading" className="section-title">{service.formTitle}</h2>
              <p className="section-subtitle">{service.formSubtitle}</p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
    </>
  );
}
