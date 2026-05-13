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
  title: `Аренда мини-экскаватора Volvo EC25 в Бресте | ${SITE.name}`,
  description:
    'Аренда мини-экскаватора Volvo EC25 с оператором в Бресте и Брестской области. Рытьё котлованов, траншей, планировка участка. Цена от 50 BYN/час. Выезд в день обращения.',
  alternates: {
    canonical: `${SITE.url}/equipment/volvo-ec25/`,
  },
  openGraph: {
    title: `Аренда мини-экскаватора Volvo EC25 в Бресте | ${SITE.name}`,
    description:
      'Аренда мини-экскаватора Volvo EC25 с оператором в Бресте. Цена от 50 BYN/час, минимальная смена 4 часа.',
    url: `${SITE.url}/equipment/volvo-ec25/`,
    images: [{ url: '/images/volvo-ec25-og.webp', width: 1200, height: 630 }],
  },
};

const SPECS = [
  { label: 'Эксплуатационная масса', value: EQUIPMENT.volvoEc25.specs.weight },
  { label: 'Мощность двигателя', value: EQUIPMENT.volvoEc25.specs.power },
  { label: 'Максимальная глубина копания', value: EQUIPMENT.volvoEc25.specs.digDepth },
  { label: 'Вместимость ковша', value: EQUIPMENT.volvoEc25.specs.bucketCapacity },
  { label: 'Габаритные размеры (Д×Ш×В)', value: EQUIPMENT.volvoEc25.specs.dimensions },
  { label: 'Аренда от', value: PRICES.excavator.hourly },
  { label: 'Минимальная смена', value: PRICES.excavator.minimum },
];

const CAPABILITIES = [
  'Рытьё котлованов под фундамент, бассейн, септик',
  'Копка траншей под водопровод, канализацию, электрику',
  'Планировка и выравнивание территории',
  'Выкорчёвка пней',
  'Погрузка грунта и сыпучих материалов',
  'Работы в стеснённых условиях: у заборов, стен, деревьев',
];

const breadcrumbs = [
  { name: 'Главная', href: '/' },
  { name: 'Техника', href: '/#equipment' },
  { name: 'Мини-экскаватор Volvo EC25', href: '/equipment/volvo-ec25/' },
];

export default function VolvoEc25Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={serviceSchema(
          'Аренда мини-экскаватора Volvo EC25 в Бресте',
          'Аренда компактного экскаватора Volvo EC25 с опытным оператором. Рытьё котлованов, траншей, планировка участка в Бресте и Брестской области.',
          '/equipment/volvo-ec25/'
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
        <section className="section bg-bg" aria-labelledby="ec25-heading">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="accent-line mb-6" />
                <h1 id="ec25-heading" className="font-heading font-extrabold text-4xl lg:text-5xl text-text leading-tight mb-4">
                  Мини-экскаватор<br />
                  <span className="text-accent">Volvo EC25</span>
                </h1>
                <p className="text-text-muted text-lg leading-relaxed mb-6">
                  {EQUIPMENT.volvoEc25.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-surface border border-border rounded-xl px-5 py-3">
                    <div className="text-text-muted text-xs mb-1">Аренда от</div>
                    <div className="font-mono font-bold text-accent text-xl">{PRICES.excavator.hourly}</div>
                  </div>
                  <div className="bg-surface border border-border rounded-xl px-5 py-3">
                    <div className="text-text-muted text-xs mb-1">Мин. смена</div>
                    <div className="font-mono font-bold text-text text-xl">{PRICES.excavator.minimum}</div>
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
        <section className="section bg-surface" aria-labelledby="specs-heading">
          <div className="container-site max-w-3xl">
            <div className="text-center mb-10">
              <div className="accent-line mx-auto mb-4" />
              <h2 id="specs-heading" className="section-title">Технические характеристики</h2>
            </div>
            <SpecsTable
              specs={SPECS}
              caption="Технические характеристики мини-экскаватора Volvo EC25"
            />
          </div>
        </section>

        {/* Capabilities */}
        <section className="section bg-bg" aria-labelledby="capabilities-heading">
          <div className="container-site">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="accent-line mx-auto mb-4" />
                <h2 id="capabilities-heading" className="section-title">Что умеет экскаватор</h2>
                <p className="section-subtitle">Аренда мини-экскаватора Volvo EC25 в Бресте и Брестской области</p>
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
                  Аренда мини-экскаватора Volvo EC25 в Бресте — почему выбирают нас
                </h3>
                <p>
                  Мини-экскаватор Volvo EC25 — это компактная, мощная машина с нулевым радиусом
                  поворота, которая незаменима при работе в ограниченном пространстве. В отличие
                  от полноразмерных экскаваторов, EC25 свободно работает у забора, под кронами
                  деревьев, вдоль стен построек, не повреждая окружающую территорию.
                </p>
                <p>
                  Мы предоставляем технику <strong className="text-text">с опытным оператором</strong>.
                  Наши специалисты знают особенности грунтов Брестской области и выполняют работы
                  аккуратно и в срок. Перед началом работ обязательно уточняем расположение
                  подземных коммуникаций — это входит в стандарт нашей работы.
                </p>
                <p>
                  Работаем <strong className="text-text">по всей Брестской области</strong>:
                  Берёза, Барановичи, Пинск, Кобрин, Пружаны и другие населённые пункты.
                  Доставка техники на объект рассчитывается индивидуально. В большинстве случаев
                  можем организовать выезд в день обращения.
                </p>
                <h3 className="font-heading text-text text-xl font-bold">
                  Как работает аренда мини-экскаватора
                </h3>
                <p>
                  Оставьте заявку на сайте или позвоните — менеджер свяжется с вами в течение
                  15 минут. Уточним объём работ, адрес объекта, удобное время. Рассчитаем
                  стоимость и согласуем дату выезда. Оплата производится по факту выполненных
                  работ наличными или безналичным переводом.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section className="section bg-surface" aria-labelledby="form-heading">
          <div className="container-site max-w-xl">
            <div className="text-center mb-10">
              <div className="accent-line mx-auto mb-4" />
              <h2 id="form-heading" className="section-title">Оставить заявку</h2>
              <p className="section-subtitle">Перезвоним за 15 минут, уточним детали</p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
    </>
  );
}
