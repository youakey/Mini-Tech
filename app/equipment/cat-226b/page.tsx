import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Equipment3DViewer } from '@/components/equipment/Equipment3DViewer';
import { SpecsTable } from '@/components/equipment/SpecsTable';
import { LeadForm } from '@/components/forms/LeadForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, serviceSchema } from '@/lib/schemas';
import { SITE, EQUIPMENT, PRICES, CONTACTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Аренда мини-погрузчика CAT 226B в Бресте | ${SITE.name}`,
  description:
    'Аренда мини-погрузчика CAT 226B с оператором в Бресте и Брестской области. Погрузка грунта и мусора, планировка площадок, навесное оборудование. Цена от 45 BYN/час.',
  alternates: {
    canonical: `${SITE.url}/equipment/cat-226b/`,
  },
  openGraph: {
    title: `Аренда мини-погрузчика CAT 226B в Бресте | ${SITE.name}`,
    description:
      'Аренда мини-погрузчика CAT 226B с оператором в Бресте. Цена от 45 BYN/час, минимальная смена 4 часа.',
    url: `${SITE.url}/equipment/cat-226b/`,
    images: [{ url: '/images/cat-226b-og.webp', width: 1200, height: 630 }],
  },
};

const SPECS = [
  { label: 'Эксплуатационная масса', value: EQUIPMENT.cat226b.specs.weight },
  { label: 'Мощность двигателя', value: EQUIPMENT.cat226b.specs.power },
  { label: 'Грузоподъёмность', value: EQUIPMENT.cat226b.specs.liftCapacity },
  { label: 'Опрокидывающая нагрузка', value: EQUIPMENT.cat226b.specs.tipLoad },
  { label: 'Габаритные размеры (Д×Ш×В)', value: EQUIPMENT.cat226b.specs.dimensions },
  { label: 'Аренда от', value: PRICES.loader.hourly },
  { label: 'Минимальная смена', value: PRICES.loader.minimum },
];

const CAPABILITIES = [
  'Погрузка и перемещение сыпучих материалов: грунт, песок, щебень',
  'Уборка и вывоз строительного мусора',
  'Расчистка территории и планировка площадок',
  'Работа с вилами: перемещение паллет, брёвен',
  'Снос лёгких строений и вывоз обломков',
  'Уборка и перемещение снега в зимний период',
];

const breadcrumbs = [
  { name: 'Главная', href: '/' },
  { name: 'Техника', href: '/#equipment' },
  { name: 'Мини-погрузчик CAT 226B', href: '/equipment/cat-226b/' },
];

export default function Cat226bPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={serviceSchema(
          'Аренда мини-погрузчика CAT 226B в Бресте',
          'Аренда компактного погрузчика CAT 226B с опытным оператором. Погрузка, планировка, навесное оборудование в Бресте и Брестской области.',
          '/equipment/cat-226b/'
        )}
      />

      <main id="main-content">
        {/* Breadcrumbs */}
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
        <section className="section bg-bg" aria-labelledby="cat226b-heading">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="accent-line mb-6" />
                <h1 id="cat226b-heading" className="font-heading font-extrabold text-4xl lg:text-5xl text-text leading-tight mb-4">
                  Мини-погрузчик<br />
                  <span className="text-accent">CAT 226B</span>
                </h1>
                <p className="text-text-muted text-lg leading-relaxed mb-6">
                  {EQUIPMENT.cat226b.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-surface border border-border rounded-xl px-5 py-3">
                    <div className="text-text-muted text-xs mb-1">Аренда от</div>
                    <div className="font-mono font-bold text-accent text-xl">{PRICES.loader.hourly}</div>
                  </div>
                  <div className="bg-surface border border-border rounded-xl px-5 py-3">
                    <div className="text-text-muted text-xs mb-1">Мин. смена</div>
                    <div className="font-mono font-bold text-text text-xl">{PRICES.loader.minimum}</div>
                  </div>
                </div>
                <a
                  href={CONTACTS.phoneHref}
                  className="inline-flex items-center gap-2 bg-accent text-bg font-bold rounded-xl px-6 py-3 hover:bg-accent-hover transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Позвонить и забронировать
                </a>
              </div>

              {/* 3D Viewer */}
              <Equipment3DViewer
                modelPath={undefined}
                className="lg:aspect-square"
              />
            </div>
          </div>
        </section>

        {/* Specs */}
        <section className="section bg-surface" aria-labelledby="cat-specs-heading">
          <div className="container-site max-w-3xl">
            <div className="text-center mb-10">
              <div className="accent-line mx-auto mb-4" />
              <h2 id="cat-specs-heading" className="section-title">Технические характеристики</h2>
            </div>
            <SpecsTable
              specs={SPECS}
              caption="Технические характеристики мини-погрузчика CAT 226B"
            />
          </div>
        </section>

        {/* Capabilities */}
        <section className="section bg-bg" aria-labelledby="cat-capabilities-heading">
          <div className="container-site">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="accent-line mx-auto mb-4" />
                <h2 id="cat-capabilities-heading" className="section-title">Что умеет погрузчик</h2>
                <p className="section-subtitle">Аренда мини-погрузчика CAT 226B в Бресте и Брестской области</p>
              </div>

              <ul className="grid sm:grid-cols-2 gap-4 mb-12">
                {CAPABILITIES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                    </span>
                    <span className="text-text-muted">{item}</span>
                  </li>
                ))}
              </ul>

              {/* SEO-текст */}
              <div className="prose prose-invert max-w-none text-text-muted leading-relaxed space-y-4">
                <h3 className="font-heading text-text text-xl font-bold">
                  Аренда мини-погрузчика CAT 226B в Бресте — универсальное решение
                </h3>
                <p>
                  Мини-погрузчик CAT 226B — это компактная, высокопроизводительная машина с
                  быстросменным навесным оборудованием. Благодаря скид-стир управлению, погрузчик
                  разворачивается на месте и легко работает в ограниченных пространствах: внутри
                  строений, в узких проездах, на небольших строительных площадках.
                </p>
                <p>
                  Базовая комплектация — ковш объёмом 0,3 м³. По запросу доступно дополнительное
                  навесное оборудование: <strong className="text-text">вилочный захват</strong> для
                  перемещения паллет и брёвен, <strong className="text-text">планировочный отвал</strong>{' '}
                  для выравнивания территории, <strong className="text-text">гидромолот</strong> для
                  дробления бетона и скальных пород.
                </p>
                <p>
                  Работаем <strong className="text-text">по всей Брестской области</strong>.
                  Опытный оператор обеспечивает точность работы и сохранность вашей территории.
                  Все работы выполняются строго в согласованные сроки. Оплата — по факту выполненных
                  работ наличными или безналичным переводом.
                </p>
                <h3 className="font-heading text-text text-xl font-bold">
                  Когда нужен мини-погрузчик, а не экскаватор
                </h3>
                <p>
                  Если вам нужно переместить большие объёмы сыпучих материалов, очистить площадку
                  от мусора или выровнять поверхность — погрузчик справится быстрее и дешевле.
                  При необходимости рытья котлованов или траншей лучше использовать
                  мини-экскаватор Volvo EC25. Для сложных проектов мы можем одновременно
                  предоставить обе машины.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section className="section bg-surface" aria-labelledby="cat-form-heading">
          <div className="container-site max-w-xl">
            <div className="text-center mb-10">
              <div className="accent-line mx-auto mb-4" />
              <h2 id="cat-form-heading" className="section-title">Оставить заявку</h2>
              <p className="section-subtitle">Перезвоним за 15 минут, уточним детали</p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
    </>
  );
}
