import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, MapPin, Clock, Phone, CheckCircle2 } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { LeadForm } from '@/components/forms/LeadForm';
import { breadcrumbSchema, serviceSchema } from '@/lib/schemas';
import { SITE, PRICES, CONTACTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Доставка строительной техники в Бресте | ${SITE.name}`,
  description:
    'Доставка мини-экскаватора и мини-погрузчика на объект в Бресте и Брестской области. Собственный трал. Цена от 40 BYN. Выезд в день обращения.',
  alternates: {
    canonical: `${SITE.url}/services/delivery/`,
  },
  openGraph: {
    title: `Доставка строительной техники в Бресте | ${SITE.name}`,
    description:
      'Доставка мини-экскаватора Volvo EC25 и мини-погрузчика CAT 226B на объект в Бресте. Цена от 40 BYN.',
    url: `${SITE.url}/services/delivery/`,
    images: [{ url: '/images/delivery-og.webp', width: 1200, height: 630 }],
  },
};

const breadcrumbs = [
  { name: 'Главная', href: '/' },
  { name: 'Услуги', href: '/#services' },
  { name: 'Доставка техники', href: '/services/delivery/' },
];

const DELIVERY_ZONES = [
  { zone: 'Брест (в черте города)', price: 'от 40 BYN' },
  { zone: 'Брестский район', price: 'от 60 BYN' },
  { zone: 'До 50 км от Бреста', price: 'от 80 BYN' },
  { zone: 'Свыше 50 км', price: 'по договорённости' },
];

const EQUIPMENT_LIST = [
  { name: 'Мини-экскаватор Volvo EC25', weight: '2 580 кг', href: '/equipment/volvo-ec25/' },
  { name: 'Мини-погрузчик CAT 226B', weight: '2 560 кг', href: '/equipment/cat-226b/' },
];

const INCLUDED = [
  'Погрузка техники на трал на базе',
  'Доставка на объект',
  'Разгрузка и установка в рабочее положение',
  'Обратный рейс по завершении работ',
];

export default function DeliveryPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={serviceSchema(
          'Доставка строительной техники в Бресте',
          'Доставка мини-экскаватора Volvo EC25 и мини-погрузчика CAT 226B на объект в Бресте и Брестской области собственным тралом.',
          '/services/delivery/'
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
        <section className="section bg-bg" aria-labelledby="delivery-heading">
          <div className="container-site">
            <div className="max-w-4xl mx-auto text-center">
              <div className="accent-line mx-auto mb-6" />
              <h1 id="delivery-heading" className="font-heading font-extrabold text-4xl lg:text-5xl text-text leading-tight mb-6">
                Доставка строительной техники
                <span className="block text-accent">в Бресте и Брестской области</span>
              </h1>
              <p className="text-text-muted text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                Привезём мини-экскаватор или мини-погрузчик на ваш объект собственным тралом.
                Быстро и безопасно. Работаем по всей Брестской области.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <MapPin className="text-accent" size={22} />
                  </div>
                  <div className="text-left">
                    <div className="font-mono font-bold text-accent text-xl">{PRICES.delivery}</div>
                    <div className="text-text-muted text-sm">стоимость доставки</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Clock className="text-accent" size={22} />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-text text-lg">В день обращения</div>
                    <div className="text-text-muted text-sm">при наличии техники</div>
                  </div>
                </div>
                <a
                  href={CONTACTS.phoneHref}
                  className="flex items-center gap-2 bg-accent text-bg font-bold rounded-xl px-6 py-3 hover:bg-accent-hover transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <Phone size={18} />
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Техника и зоны */}
        <section className="section bg-surface" aria-labelledby="delivery-details-heading">
          <div className="container-site max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 id="delivery-details-heading" className="font-heading font-bold text-2xl text-text mb-6">
                  Доставляем технику
                </h2>
                <ul className="space-y-4">
                  {EQUIPMENT_LIST.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-4 bg-bg border border-border rounded-2xl p-4 hover:border-accent/40 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                          <span className="text-accent font-mono font-bold text-xs">3D</span>
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

                <div className="mt-8">
                  <h3 className="font-heading font-bold text-lg text-text mb-4">Что включено</h3>
                  <ul className="space-y-2">
                    {INCLUDED.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                        <span className="text-text-muted text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-heading font-bold text-2xl text-text mb-6">
                  Стоимость доставки
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-2">
                        <th className="px-5 py-3.5 text-left text-text-muted font-medium">Зона</th>
                        <th className="px-5 py-3.5 text-left text-text font-mono font-bold">Цена</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DELIVERY_ZONES.map((row, index) => (
                        <tr key={row.zone} className={index % 2 === 0 ? 'bg-bg' : 'bg-surface'}>
                          <td className="px-5 py-3.5 text-text-muted border-t border-border">{row.zone}</td>
                          <td className="px-5 py-3.5 text-accent font-mono font-medium border-t border-border">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-text-muted text-sm mt-3">
                  Цены указаны за рейс в одну сторону. При заказе техники на полный день
                  доставка рассчитывается туда и обратно.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO-текст */}
        <section className="section bg-bg" aria-labelledby="delivery-seo-heading">
          <div className="container-site max-w-3xl">
            <div className="space-y-6 text-text-muted leading-relaxed">
              <div>
                <h2 id="delivery-seo-heading" className="font-heading font-bold text-2xl text-text mb-4">
                  Доставка мини-техники по Брестской области
                </h2>
                <p className="mb-4">
                  Мы доставляем <strong className="text-text">мини-экскаватор Volvo EC25</strong> и{' '}
                  <strong className="text-text">мини-погрузчик CAT 226B</strong> на любой объект в
                  Бресте и Брестской области собственным специализированным тралом. Техника надёжно
                  фиксируется и доставляется в точку назначения в полной готовности к работе.
                </p>
                <p>
                  Доставка входит в стоимость аренды техники при заказе на полный день.
                  При почасовой аренде доставка оплачивается отдельно по тарифной сетке.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-text mb-3">
                  Как заказать доставку техники
                </h3>
                <p>
                  Позвоните или оставьте заявку на сайте. Уточним адрес объекта, тип техники,
                  дату и время. Менеджер рассчитает точную стоимость доставки и согласует
                  удобное время. Приедем в назначенное время, разгрузим и запустим технику.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section className="section bg-surface" aria-labelledby="delivery-form-heading">
          <div className="container-site max-w-xl">
            <div className="text-center mb-10">
              <div className="accent-line mx-auto mb-4" />
              <h2 id="delivery-form-heading" className="section-title">Заказать доставку</h2>
              <p className="section-subtitle">Укажите адрес объекта — рассчитаем стоимость</p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
    </>
  );
}
