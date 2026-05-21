import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Truck } from 'lucide-react';
import { Equipment3DViewer } from '@/components/equipment/Equipment3DViewer';
import { SpecsTable } from '@/components/equipment/SpecsTable';
import { LeadForm } from '@/components/forms/LeadForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, serviceSchema } from '@/lib/schemas';
import { SITE, CONTACTS } from '@/lib/constants';
import { EQUIPMENT_DATA } from '@/data/equipment';

interface Props {
  params: Promise<{ slug: string }>;
}

/** Перечисляем все slugs для статической генерации */
export function generateStaticParams() {
  return EQUIPMENT_DATA.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const equipment = EQUIPMENT_DATA.find((e) => e.slug === slug);
  if (!equipment) return {};

  return {
    title: equipment.seo.title,
    description: equipment.seo.metaDescription,
    alternates: { canonical: `${SITE.url}/equipment/${slug}/` },
    openGraph: {
      title: equipment.seo.title,
      description: equipment.seo.ogDescription,
      url: `${SITE.url}/equipment/${slug}/`,
      images: [{ url: `/images/equipment/${slug}/og.webp`, width: 1200, height: 630 }],
    },
  };
}

export default async function EquipmentPage({ params }: Props) {
  const { slug } = await params;
  const equipment = EQUIPMENT_DATA.find((e) => e.slug === slug);
  if (!equipment) notFound();

  const breadcrumbs = [
    { name: 'Главная', href: '/' },
    { name: 'Техника', href: '/#equipment' },
    { name: equipment.name, href: `/equipment/${slug}/` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={serviceSchema(
          equipment.seo.title,
          equipment.seo.metaDescription,
          `/equipment/${slug}/`
        )}
      />

      <main id="main-content">
        {/* Хлебные крошки */}
        <nav aria-label="Хлебные крошки" className="bg-surface border-b border-border">
          <div className="container-site py-3">
            <ol className="flex items-center gap-1 text-sm text-text-muted flex-wrap">
              {breadcrumbs.map((item, index) => (
                <li key={item.href} className="flex items-center gap-1">
                  {index > 0 && <ChevronRight size={14} className="text-border" aria-hidden="true" />}
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
        <section className="section bg-bg" aria-labelledby="equipment-heading">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="accent-line mb-6" />
                <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">
                  {equipment.category}
                </p>
                <h1
                  id="equipment-heading"
                  className="font-heading font-extrabold text-4xl lg:text-5xl text-text leading-tight mb-4"
                >
                  {equipment.name}
                </h1>
                <p className="text-text-muted text-lg leading-relaxed mb-6">
                  {equipment.shortDescription}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-surface border border-border rounded-xl px-5 py-3">
                    <div className="text-text-muted text-xs mb-1">Аренда от</div>
                    <div className="font-mono font-bold text-accent text-xl">
                      {equipment.priceDisplay}
                    </div>
                  </div>
                  <div className="bg-surface border border-border rounded-xl px-5 py-3">
                    <div className="text-text-muted text-xs mb-1">Мин. смена</div>
                    <div className="font-mono font-bold text-text text-xl">
                      {equipment.minBooking}
                    </div>
                  </div>
                  <div className="bg-surface border border-border rounded-xl px-5 py-3">
                    <div className="text-text-muted text-xs mb-1">Доставка</div>
                    <div className="font-mono font-bold text-text text-sm">как час работы</div>
                  </div>
                </div>

                <a
                  href={CONTACTS.phoneHref}
                  className="inline-flex items-center gap-2 bg-accent text-bg font-bold rounded-xl px-6 py-3
                             hover:bg-accent-hover transition-colors focus-visible:ring-2
                             focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Позвонить и забронировать
                </a>
              </div>

              <Equipment3DViewer
                modelPath={equipment.modelGlb}
                className="lg:aspect-square"
              />
            </div>
          </div>
        </section>

        {/* Технические характеристики */}
        <section className="section bg-surface" aria-labelledby="specs-heading">
          <div className="container-site max-w-3xl">
            <div className="text-center mb-10">
              <div className="accent-line mx-auto mb-4" />
              <h2 id="specs-heading" className="section-title">Технические характеристики</h2>
            </div>
            <SpecsTable
              specs={equipment.specs}
              caption={`Технические характеристики ${equipment.name}`}
            />
          </div>
        </section>

        {/* Дополнительное оборудование */}
        {equipment.attachments && equipment.attachments.length > 0 && (
          <section className="section bg-bg" aria-labelledby="attachments-heading">
            <div className="container-site max-w-3xl">
              <div className="text-center mb-8">
                <div className="accent-line mx-auto mb-4" />
                <h2 id="attachments-heading" className="section-title">Дополнительное оборудование</h2>
              </div>
              <ul className="space-y-4">
                {equipment.attachments.map((att) => (
                  <li key={att.name} className="bg-surface border border-border rounded-2xl p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-heading font-bold text-text text-xl">{att.name}</h3>
                          <span className="text-xs font-medium bg-accent/10 text-accent border border-accent/20 rounded-full px-2 py-0.5">По желанию</span>
                        </div>
                        <p className="text-text-muted text-sm leading-relaxed">{att.description}</p>
                      </div>
                      <div className="bg-bg border border-border rounded-xl px-4 py-2 shrink-0">
                        <div className="text-text-muted text-xs mb-0.5">Опция</div>
                        <div className="font-mono font-bold text-accent">+{att.priceFrom} {att.priceNote}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Возможности */}
        <section className="section bg-bg" aria-labelledby="capabilities-heading">
          <div className="container-site">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="accent-line mx-auto mb-4" />
                <h2 id="capabilities-heading" className="section-title">
                  {equipment.seo.capabilitiesTitle}
                </h2>
                <p className="section-subtitle">{equipment.seo.capabilitiesSubtitle}</p>
              </div>

              <ul className="grid sm:grid-cols-2 gap-4 mb-12">
                {equipment.capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-accent/10 border border-accent/30
                                     flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                    </span>
                    <span className="text-text-muted">{item}</span>
                  </li>
                ))}
              </ul>

              {/* SEO-текст */}
              <div className="prose prose-invert max-w-none text-text-muted leading-relaxed space-y-4">
                {equipment.seo.seoSections.map((section) => (
                  <div key={section.h3}>
                    <h3 className="font-heading text-text text-xl font-bold mb-3">{section.h3}</h3>
                    {section.paragraphs.map((p, i) => (
                      <p key={i} className="mb-3 last:mb-0">{p}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Форма заявки */}
        <section className="section bg-surface" aria-labelledby="form-heading">
          <div className="container-site max-w-xl">
            <div className="text-center mb-10">
              <div className="accent-line mx-auto mb-4" />
              <h2 id="form-heading" className="section-title">Оставить заявку</h2>
              <p className="section-subtitle">Перезвоним за 15 минут, уточним детали</p>
            </div>
            <LeadForm
              source={slug}
              showHammerOption={equipment.attachments?.some((a) => a.name === 'Гидромолот')}
            />
          </div>
        </section>

        {/* Доставка техники */}
        <section className="section bg-bg" aria-label="Доставка техники на объект">
          <div className="container-site max-w-xl">
            <div className="bg-surface border border-border rounded-2xl p-6 flex gap-4 items-start">
              <Truck size={22} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-text mb-1">Доставка техники на объект</p>
                <p className="text-text-muted text-sm leading-relaxed">
                  Доставка тарифицируется как обычный час работы техники.
                  Перезвоните или оставьте заявку — рассчитаем точную стоимость с учётом локации.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
