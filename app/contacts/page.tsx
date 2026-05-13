import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MessageCircle, Mail, MapPin, Clock, ChevronRight } from 'lucide-react';
import { LeafletMap } from '@/components/map/LeafletMap';
import { LeadForm } from '@/components/forms/LeadForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, localBusinessSchema } from '@/lib/schemas';
import { SITE, CONTACTS, WORKING_HOURS } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Контакты | ${SITE.name}`,
  description:
    `Контакты ${SITE.name} — телефон, Telegram, WhatsApp. Адрес: ${CONTACTS.address}. Работаем по Бресту и Брестской области. Звоните!`,
  alternates: {
    canonical: `${SITE.url}/contacts/`,
  },
  openGraph: {
    title: `Контакты | ${SITE.name}`,
    description: `Свяжитесь с ${SITE.name}. Телефон, мессенджеры, форма заявки.`,
    url: `${SITE.url}/contacts/`,
  },
};

const breadcrumbs = [
  { name: 'Главная', href: '/' },
  { name: 'Контакты', href: '/contacts/' },
];

const SERVICE_CITIES = [
  'Брест', 'Берёза', 'Барановичи', 'Пинск', 'Кобрин',
  'Пружаны', 'Жабинка', 'Малорита', 'Дрогичин', 'Ивацевичи',
];

export default function ContactsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={localBusinessSchema()} />

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

        {/* Hero + Contacts */}
        <section className="section bg-bg" aria-labelledby="contacts-heading">
          <div className="container-site">
            <div className="max-w-2xl mx-auto lg:max-w-none">
              <div className="text-center mb-12">
                <div className="accent-line mx-auto mb-6" />
                <h1 id="contacts-heading" className="font-heading font-extrabold text-4xl lg:text-5xl text-text mb-4">
                  Контакты
                </h1>
                <p className="text-text-muted text-lg max-w-xl mx-auto">
                  Свяжитесь с нами любым удобным способом — ответим в течение 15 минут
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Contact cards */}
                <div className="space-y-4">
                  {/* Phone */}
                  <a
                    href={CONTACTS.phoneHref}
                    className="flex items-center gap-4 bg-surface border border-border rounded-2xl p-5 hover:border-accent/40 transition-colors group"
                    aria-label={`Позвонить: ${CONTACTS.phone}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Phone className="text-accent" size={22} />
                    </div>
                    <div>
                      <div className="text-text-muted text-sm mb-0.5">Телефон</div>
                      <div className="font-mono font-bold text-text text-lg group-hover:text-accent transition-colors">
                        {CONTACTS.phone}
                      </div>
                    </div>
                  </a>

                  {/* Telegram */}
                  <a
                    href={CONTACTS.telegramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-surface border border-border rounded-2xl p-5 hover:border-accent/40 transition-colors group"
                    aria-label={`Написать в Telegram: ${CONTACTS.telegram}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <MessageCircle className="text-accent" size={22} />
                    </div>
                    <div>
                      <div className="text-text-muted text-sm mb-0.5">Telegram</div>
                      <div className="font-bold text-text text-lg group-hover:text-accent transition-colors">
                        {CONTACTS.telegram}
                      </div>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={CONTACTS.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-surface border border-border rounded-2xl p-5 hover:border-accent/40 transition-colors group"
                    aria-label={`Написать в WhatsApp`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <MessageCircle className="text-accent" size={22} />
                    </div>
                    <div>
                      <div className="text-text-muted text-sm mb-0.5">WhatsApp</div>
                      <div className="font-bold text-text text-lg group-hover:text-accent transition-colors">
                        +{CONTACTS.whatsapp}
                      </div>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${CONTACTS.email}`}
                    className="flex items-center gap-4 bg-surface border border-border rounded-2xl p-5 hover:border-accent/40 transition-colors group"
                    aria-label={`Написать на email: ${CONTACTS.email}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Mail className="text-accent" size={22} />
                    </div>
                    <div>
                      <div className="text-text-muted text-sm mb-0.5">Email</div>
                      <div className="font-bold text-text text-lg group-hover:text-accent transition-colors">
                        {CONTACTS.email}
                      </div>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 bg-surface border border-border rounded-2xl p-5">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="text-accent" size={22} />
                    </div>
                    <div>
                      <div className="text-text-muted text-sm mb-0.5">Адрес</div>
                      <div className="font-bold text-text">{CONTACTS.address}</div>
                      <div className="text-text-muted text-sm mt-1">
                        Работаем по всей Брестской области
                      </div>
                    </div>
                  </div>

                  {/* Working hours */}
                  <div className="flex items-start gap-4 bg-surface border border-border rounded-2xl p-5">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="text-accent" size={22} />
                    </div>
                    <div>
                      <div className="text-text-muted text-sm mb-2">Часы работы</div>
                      <ul className="space-y-1 text-sm">
                        <li className="text-text">{WORKING_HOURS.weekdays}</li>
                        <li className="text-text">{WORKING_HOURS.saturday}</li>
                        <li className="text-text-muted">{WORKING_HOURS.sunday}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div>
                  <LeafletMap className="h-[480px]" />
                  <p className="text-text-muted text-sm mt-3 text-center">
                    Зона обслуживания: ~50 км от Бреста
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service area */}
        <section className="section bg-surface" aria-labelledby="area-heading">
          <div className="container-site max-w-4xl">
            <div className="text-center mb-8">
              <h2 id="area-heading" className="font-heading font-bold text-2xl text-text mb-3">
                Города и районы Брестской области
              </h2>
              <p className="text-text-muted">
                Выезжаем на объекты по всей Брестской области. Стоимость выезда за пределы Бреста
                рассчитывается отдельно.
              </p>
            </div>
            <ul className="flex flex-wrap justify-center gap-3" aria-label="Зона обслуживания">
              {SERVICE_CITIES.map((city) => (
                <li
                  key={city}
                  className="bg-bg border border-border rounded-xl px-4 py-2 text-text-muted text-sm"
                >
                  {city}
                </li>
              ))}
              <li className="bg-bg border border-border rounded-xl px-4 py-2 text-text-muted text-sm">
                и другие...
              </li>
            </ul>
          </div>
        </section>

        {/* Lead Form */}
        <section className="section bg-bg" aria-labelledby="contacts-form-heading">
          <div className="container-site max-w-xl">
            <div className="text-center mb-10">
              <div className="accent-line mx-auto mb-4" />
              <h2 id="contacts-form-heading" className="section-title">Оставить заявку</h2>
              <p className="section-subtitle">Перезвоним за 15 минут в рабочее время</p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
    </>
  );
}
