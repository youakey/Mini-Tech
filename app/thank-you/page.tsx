import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Phone } from 'lucide-react';
import { CONTACTS, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Заявка отправлена — МиниТех Брест',
  description: 'Спасибо за заявку! Мы свяжемся с вами в ближайшее время.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/thank-you/` },
};

const QUICK_LINKS = [
  { label: 'Мини-экскаватор Volvo EC25', href: '/equipment/volvo-ec25/' },
  { label: 'Мини-погрузчик CAT 226B', href: '/equipment/cat-226b/' },
  { label: 'Вывоз строительного мусора', href: '/services/waste-removal/' },
  { label: 'Демонтаж построек', href: '/services/demolition/' },
  { label: 'Доставка материалов', href: '/services/delivery/' },
];

/** Страница подтверждения после отправки формы */
export default function ThankYouPage() {
  return (
    <main id="main-content" className="section bg-bg min-h-[80vh] flex items-center">
      <div className="container-site max-w-2xl text-center">
        {/* Иконка успеха */}
        <div className="w-20 h-20 rounded-2xl bg-success/10 border border-success/20
                        flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={40} className="text-success" />
        </div>

        {/* Заголовок */}
        <div className="accent-line mx-auto mb-6" />
        <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-text mb-4">
          Заявка отправлена!
        </h1>
        <p className="text-text-muted text-lg leading-relaxed mb-8 max-w-lg mx-auto">
          Спасибо! Мы получили вашу заявку и свяжемся с вами в течение{' '}
          <span className="text-accent font-semibold">15 минут</span> в рабочее время.
        </p>

        {/* Контакты для срочной связи */}
        <div className="bg-surface border border-border rounded-2xl p-6 mb-10 inline-flex flex-col sm:flex-row items-center gap-4">
          <p className="text-text-muted text-sm">Для срочной связи:</p>
          <a
            href={CONTACTS.phoneHref}
            className="flex items-center gap-2 font-mono font-bold text-accent text-lg
                       hover:text-accent-hover transition-colors"
          >
            <Phone size={18} aria-hidden="true" />
            {CONTACTS.phone}
          </a>
        </div>

        {/* Навигация */}
        <div className="space-y-3 text-left max-w-md mx-auto mb-10">
          <p className="text-text-muted text-sm font-medium text-center mb-4">
            Пока ждёте — посмотрите наши услуги:
          </p>
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between p-3 rounded-xl border border-border
                         hover:border-accent/30 hover:bg-surface-2 transition-colors group"
            >
              <span className="text-text-muted group-hover:text-text transition-colors text-sm">
                {link.label}
              </span>
              <ArrowRight size={16} className="text-border group-hover:text-accent transition-colors" />
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover
                     transition-colors font-medium"
        >
          ← На главную
        </Link>
      </div>
    </main>
  );
}
