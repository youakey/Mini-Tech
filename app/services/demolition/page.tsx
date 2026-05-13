import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, HardHat, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { LeadForm } from '@/components/forms/LeadForm';
import { breadcrumbSchema, serviceSchema } from '@/lib/schemas';
import { SITE, PRICES, CONTACTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Снос и демонтаж зданий в Бресте | ${SITE.name}`,
  description:
    'Снос и демонтаж зданий в Бресте и Брестской области: сараи, гаражи, заборы, бытовки. Мини-экскаватор + вывоз мусора. Цена от 150 BYN. Работаем без выходных.',
  alternates: {
    canonical: `${SITE.url}/services/demolition/`,
  },
  openGraph: {
    title: `Снос и демонтаж зданий в Бресте | ${SITE.name}`,
    description:
      'Снос зданий и демонтаж конструкций в Бресте. Мини-экскаватор + вывоз мусора. От 150 BYN.',
    url: `${SITE.url}/services/demolition/`,
    images: [{ url: '/images/demolition-og.webp', width: 1200, height: 630 }],
  },
};

const breadcrumbs = [
  { name: 'Главная', href: '/' },
  { name: 'Услуги', href: '/#services' },
  { name: 'Снос и демонтаж', href: '/services/demolition/' },
];

const OBJECTS = [
  { name: 'Сараи и хозпостройки', desc: 'деревянные и кирпичные, любые размеры' },
  { name: 'Гаражи', desc: 'ракушки, кирпичные, шлакоблочные' },
  { name: 'Старые заборы и ограждения', desc: 'бетонные, шлакоблочные, кирпичные' },
  { name: 'Бытовки и вагончики', desc: 'металлические строительные вагончики' },
  { name: 'Фундаменты', desc: 'ленточные и плитные фундаменты, отмостки' },
  { name: 'Внутренний демонтаж', desc: 'стяжки, перегородки, лестницы' },
];

const PROCESS = [
  { title: 'Осмотр объекта', desc: 'Оцениваем объём работ, наличие коммуникаций, согласовываем стоимость.' },
  { title: 'Подготовка', desc: 'При необходимости отключаем коммуникации, ограждаем рабочую зону.' },
  { title: 'Снос', desc: 'Демонтируем строение мини-экскаватором или вручную — в зависимости от типа.' },
  { title: 'Вывоз мусора', desc: 'Грузим обломки мини-погрузчиком, вывозим на полигон.' },
];

export default function DemolitionPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={serviceSchema(
          'Снос и демонтаж зданий в Бресте',
          'Снос и демонтаж строений: сараи, гаражи, заборы, фундаменты. Мини-экскаватор + вывоз мусора в Бресте и Брестской области.',
          '/services/demolition/'
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
        <section className="section bg-bg" aria-labelledby="demolition-heading">
          <div className="container-site">
            <div className="max-w-4xl mx-auto text-center">
              <div className="accent-line mx-auto mb-6" />
              <h1 id="demolition-heading" className="font-heading font-extrabold text-4xl lg:text-5xl text-text leading-tight mb-6">
                Снос и демонтаж зданий
                <span className="block text-accent">в Бресте и Брестской области</span>
              </h1>
              <p className="text-text-muted text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                Сносим сараи, гаражи, заборы, фундаменты и другие строения мини-экскаватором.
                Убираем и вывозим мусор. Работаем аккуратно, не повреждая соседние постройки
                и зелёные насаждения.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <HardHat className="text-accent" size={22} />
                  </div>
                  <div className="text-left">
                    <div className="font-mono font-bold text-accent text-xl">{PRICES.demolition}</div>
                    <div className="text-text-muted text-sm">стоимость сноса</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <ShieldCheck className="text-accent" size={22} />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-text text-lg">Аккуратно</div>
                    <div className="text-text-muted text-sm">без ущерба для соседей</div>
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

        {/* Что сносим */}
        <section className="section bg-surface" aria-labelledby="objects-heading">
          <div className="container-site max-w-4xl">
            <div className="text-center mb-10">
              <h2 id="objects-heading" className="font-heading font-bold text-2xl text-text mb-3">
                Что сносим и демонтируем
              </h2>
              <p className="text-text-muted">Работаем с любыми строениями и конструкциями</p>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {OBJECTS.map((obj) => (
                <li key={obj.name} className="bg-bg border border-border rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-text">{obj.name}</div>
                      <div className="text-text-muted text-sm mt-1">{obj.desc}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Процесс */}
        <section className="section bg-bg" aria-labelledby="process-heading">
          <div className="container-site max-w-4xl">
            <div className="text-center mb-10">
              <div className="accent-line mx-auto mb-4" />
              <h2 id="process-heading" className="section-title">Как проходит снос</h2>
            </div>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS.map((step, index) => (
                <li key={step.title} className="relative">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center font-mono font-bold text-accent mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-heading font-bold text-text mb-2">{step.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SEO-текст */}
        <section className="section bg-surface" aria-labelledby="demolition-seo-heading">
          <div className="container-site max-w-3xl">
            <div className="space-y-8 text-text-muted leading-relaxed">
              <div>
                <h2 id="demolition-seo-heading" className="font-heading font-bold text-2xl text-text mb-4">
                  Снос старых строений в Бресте — быстро и безопасно
                </h2>
                <p className="mb-4">
                  Снос сарая, гаража или старого забора в Бресте — задача, с которой сталкиваются
                  многие владельцы частных домов и дач. Самостоятельный демонтаж занимает недели и
                  требует аренды инструмента. Мы справляемся за один день с помощью
                  <strong className="text-text"> мини-экскаватора Volvo EC25</strong>.
                </p>
                <p>
                  Экскаватор аккуратно разбирает строение, не затрагивая соседние постройки, забор
                  и зелёные насаждения. Обломки грузим мини-погрузчиком CAT 226B и вывозим
                  на полигон в рамках одного визита. Вы получаете чистую площадку, готовую под
                  новое строительство.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-text mb-4">
                  Цены на снос зданий в Бресте
                </h3>
                <p className="mb-4">
                  Стоимость сноса зависит от размеров и типа строения, материалов стен и фундамента,
                  удалённости объекта от Бреста. Базовая цена — <strong className="text-text">{PRICES.demolition}</strong>.
                  Для точного расчёта позвоните или пришлите фото строения — оценим удалённо.
                </p>
                <p>
                  В стоимость включены: работа экскаватора и оператора, погрузка обломков
                  мини-погрузчиком, вывоз на полигон ТКО, уборка площадки. Скрытых доплат нет.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-text mb-4">
                  Демонтаж зданий в Брестской области
                </h3>
                <p>
                  Выезжаем в города и деревни Брестской области: Берёза, Барановичи, Пинск,
                  Кобрин, Пружаны, Жабинка и другие. Стоимость выезда за пределы Бреста
                  рассчитывается отдельно и согласовывается заранее. Работаем с понедельника
                  по субботу, в воскресенье — по договорённости.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section className="section bg-bg" aria-labelledby="demolition-form-heading">
          <div className="container-site max-w-xl">
            <div className="text-center mb-10">
              <div className="accent-line mx-auto mb-4" />
              <h2 id="demolition-form-heading" className="section-title">Заказать снос</h2>
              <p className="section-subtitle">Опишите задачу — рассчитаем стоимость за 15 минут</p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
    </>
  );
}
