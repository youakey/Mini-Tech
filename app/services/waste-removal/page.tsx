import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Truck, Clock, Phone, CheckCircle2 } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { LeadForm } from '@/components/forms/LeadForm';
import { breadcrumbSchema, serviceSchema } from '@/lib/schemas';
import { SITE, PRICES, CONTACTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Вывоз строительного мусора в Бресте | ${SITE.name}`,
  description:
    'Профессиональный вывоз строительного мусора в Бресте и Брестской области. Мини-погрузчик CAT 226B + грузовой транспорт. Цена от 80 BYN. Выезд в день обращения.',
  alternates: {
    canonical: `${SITE.url}/services/waste-removal/`,
  },
  openGraph: {
    title: `Вывоз строительного мусора в Бресте | ${SITE.name}`,
    description:
      'Вывоз строительного мусора в Бресте от 80 BYN. Погрузка мини-погрузчиком CAT 226B. Работаем по всей Брестской области.',
    url: `${SITE.url}/services/waste-removal/`,
    images: [{ url: '/images/waste-removal-og.webp', width: 1200, height: 630 }],
  },
};

const breadcrumbs = [
  { name: 'Главная', href: '/' },
  { name: 'Услуги', href: '/#services' },
  { name: 'Вывоз мусора', href: '/services/waste-removal/' },
];

const INCLUDED = [
  'Погрузка мусора мини-погрузчиком CAT 226B',
  'Транспортировка на полигон ТКО',
  'Работа опытного оператора',
  'Уборка территории после погрузки',
  'Оформление акта выполненных работ',
];

const WASTE_TYPES = [
  { type: 'Строительный мусор', desc: 'бой кирпича, бетона, плитки, штукатурки' },
  { type: 'Грунт и земля', desc: 'вывоз после земляных работ' },
  { type: 'Металлолом', desc: 'арматура, профиль, старая кровля' },
  { type: 'Мебель и техника', desc: 'демонтированное оборудование и мебель' },
  { type: 'Деревянные конструкции', desc: 'доски, балки, опалубка' },
  { type: 'Смешанный мусор', desc: 'после ремонта или сноса зданий' },
];

export default function WasteRemovalPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={serviceSchema(
          'Вывоз строительного мусора в Бресте',
          'Профессиональный вывоз строительного мусора мини-погрузчиком CAT 226B в Бресте и Брестской области. Погрузка, транспортировка, утилизация.',
          '/services/waste-removal/'
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
        <section className="section bg-bg" aria-labelledby="waste-heading">
          <div className="container-site">
            <div className="max-w-4xl mx-auto text-center">
              <div className="accent-line mx-auto mb-6" />
              <h1 id="waste-heading" className="font-heading font-extrabold text-4xl lg:text-5xl text-text leading-tight mb-6">
                Вывоз строительного мусора
                <span className="block text-accent">в Бресте и Брестской области</span>
              </h1>
              <p className="text-text-muted text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                Быстрая погрузка мини-погрузчиком CAT 226B и вывоз любых объёмов строительного
                мусора. Работаем на частных и коммерческих объектах. Выезд в день обращения.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Truck className="text-accent" size={22} />
                  </div>
                  <div className="text-left">
                    <div className="font-mono font-bold text-accent text-xl">{PRICES.wasteRemoval}</div>
                    <div className="text-text-muted text-sm">стоимость вывоза</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Clock className="text-accent" size={22} />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-text text-lg">В день обращения</div>
                    <div className="text-text-muted text-sm">выезд на объект</div>
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

        {/* Что включено */}
        <section className="section bg-surface" aria-labelledby="included-heading">
          <div className="container-site max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 id="included-heading" className="font-heading font-bold text-2xl text-text mb-6">
                  Что входит в стоимость
                </h2>
                <ul className="space-y-3">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-heading font-bold text-2xl text-text mb-6">
                  Какой мусор вывозим
                </h2>
                <ul className="space-y-3">
                  {WASTE_TYPES.map((item) => (
                    <li key={item.type} className="bg-bg border border-border rounded-xl px-4 py-3">
                      <div className="font-medium text-text">{item.type}</div>
                      <div className="text-text-muted text-sm">{item.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SEO-текст */}
        <section className="section bg-bg" aria-labelledby="seo-heading">
          <div className="container-site max-w-3xl">
            <div className="space-y-8 text-text-muted leading-relaxed">
              <div>
                <h2 id="seo-heading" className="font-heading font-bold text-2xl text-text mb-4">
                  Вывоз строительного мусора в Бресте — как мы работаем
                </h2>
                <p className="mb-4">
                  Вывоз строительного мусора в Бресте — услуга, которая востребована на любом
                  ремонтном или строительном объекте. Будь то снос старого забора на даче, ремонт
                  квартиры с заменой стяжки или демонтаж коммерческого здания — мы быстро и
                  аккуратно уберём за вами.
                </p>
                <p>
                  Мы используем <strong className="text-text">мини-погрузчик CAT 226B</strong> для
                  быстрой погрузки. Это значительно ускоряет процесс по сравнению с ручной
                  погрузкой и позволяет работать там, где крупногабаритная техника не пройдёт:
                  внутри двора, у въезда в подвал, на узкой улице.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-text mb-4">
                  Цены на вывоз мусора в Бресте
                </h3>
                <p className="mb-4">
                  Стоимость вывоза строительного мусора в Бресте зависит от объёма, типа отходов
                  и удалённости объекта. Базовая цена — <strong className="text-text">{PRICES.wasteRemoval}</strong>.
                  Окончательная стоимость рассчитывается после осмотра объекта или по описанию
                  объёма работ.
                </p>
                <p>
                  Мы работаем прозрачно: цена согласовывается до начала работ и не меняется в
                  процессе. По факту выполнения выдаём акт и товарный чек. Для юридических лиц
                  и ИП возможна оплата по счёту.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-text mb-4">
                  Вывоз мусора по Брестской области
                </h3>
                <p className="mb-4">
                  Выезжаем не только по Бресту, но и в районы области: Берёза, Барановичи, Пинск,
                  Кобрин, Пружаны, Жабинка, Малорита, Дрогичин. Стоимость доставки техники
                  за пределы Бреста рассчитывается отдельно.
                </p>
                <p>
                  Позвоните или оставьте заявку — менеджер свяжется с вами в течение 15 минут,
                  уточнит детали и назовёт точную стоимость. В большинстве случаев выезжаем в
                  день обращения или на следующий день.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-text mb-4">
                  Как заказать вывоз строительного мусора в Бресте
                </h3>
                <ol className="space-y-3 list-none">
                  {[
                    'Оставьте заявку на сайте или позвоните по телефону.',
                    'Менеджер свяжется с вами за 15 минут — уточним адрес, объём, тип мусора.',
                    'Согласуем стоимость и удобное время выезда.',
                    'Приедем, погрузим, вывезем — всё аккуратно и в срок.',
                    'Оплата по факту. Документы по запросу.',
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-mono text-sm font-bold shrink-0">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section className="section bg-surface" aria-labelledby="waste-form-heading">
          <div className="container-site max-w-xl">
            <div className="text-center mb-10">
              <div className="accent-line mx-auto mb-4" />
              <h2 id="waste-form-heading" className="section-title">Заказать вывоз мусора</h2>
              <p className="section-subtitle">Перезвоним за 15 минут, уточним детали и стоимость</p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
    </>
  );
}
