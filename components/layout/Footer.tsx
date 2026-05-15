import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { CONTACTS, WORKING_HOURS, SITE, NAV_LINKS } from '@/lib/constants';
import { EQUIPMENT_DATA } from '@/data/equipment';
import { SERVICES_DATA } from '@/data/services';

const currentYear = new Date().getFullYear();

// Подвал сайта с контактами, навигацией и мессенджерами
export function Footer() {
  return (
    <footer className="bg-surface border-t border-border" role="contentinfo">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Колонка 1: Логотип и описание */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-bg font-heading font-bold text-sm">МТ</span>
              </div>
              <span className="font-heading font-bold text-text text-lg">
                МиниТех <span className="text-accent">Брест</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              Аренда строительной мини-техники с оператором в Бресте и Брестской области.
            </p>
            {/* Мессенджеры */}
            <div className="flex gap-2 mt-4">
              <a
                href={CONTACTS.telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="Telegram"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={CONTACTS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h3 className="font-heading font-semibold text-text text-sm uppercase tracking-wider mb-4">
              Разделы
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.filter((l) => l.href !== '#').map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-muted text-sm hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy/" className="text-text-muted text-sm hover:text-accent transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Услуги */}
          <div>
            <h3 className="font-heading font-semibold text-text text-sm uppercase tracking-wider mb-4">
              Услуги
            </h3>
            <ul className="space-y-2.5">
              {[
                ...[...EQUIPMENT_DATA].sort((a, b) => a.order - b.order).map((e) => ({
                  label: e.name,
                  href: `/equipment/${e.slug}/`,
                })),
                ...[...SERVICES_DATA].sort((a, b) => a.order - b.order).map((s) => ({
                  label: s.name,
                  href: `/services/${s.slug}/`,
                })),
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-text-muted text-sm hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 4: Контакты */}
          <div>
            <h3 className="font-heading font-semibold text-text text-sm uppercase tracking-wider mb-4">
              Контакты
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={CONTACTS.phoneHref}
                  className="flex items-start gap-2.5 text-text-muted hover:text-accent transition-colors group"
                  itemProp="telephone"
                >
                  <Phone size={16} className="shrink-0 mt-0.5 text-accent" />
                  <span className="text-sm font-medium">{CONTACTS.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACTS.email}`}
                  className="flex items-start gap-2.5 text-text-muted hover:text-accent transition-colors"
                >
                  <Mail size={16} className="shrink-0 mt-0.5 text-accent" />
                  <span className="text-sm">{CONTACTS.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-text-muted">
                <MapPin size={16} className="shrink-0 mt-0.5 text-accent" />
                <span className="text-sm">{CONTACTS.address}</span>
              </li>
              <li className="flex items-start gap-2.5 text-text-muted">
                <Clock size={16} className="shrink-0 mt-0.5 text-accent" />
                <div className="text-sm space-y-0.5">
                  <p>{WORKING_HOURS.weekdays}</p>
                  <p>{WORKING_HOURS.saturday}</p>
                  <p>{WORKING_HOURS.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя полоса */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {currentYear} {SITE.name}. Все права защищены.
          </p>
          <p className="text-text-muted text-xs">
            Брест и Брестская область, Республика Беларусь
          </p>
        </div>
      </div>
    </footer>
  );
}
