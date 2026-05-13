import Link from 'next/link';
import { Home, Wrench, HardHat, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/equipment/volvo-ec25/', label: 'Мини-экскаватор Volvo EC25', icon: Wrench },
  { href: '/equipment/cat-226b/', label: 'Мини-погрузчик CAT 226B', icon: Wrench },
  { href: '/services/waste-removal/', label: 'Вывоз мусора', icon: HardHat },
  { href: '/contacts/', label: 'Контакты', icon: MapPin },
];

/** Кастомная страница 404 в стиле сайта */
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center section">
      <div className="container-site text-center max-w-2xl">
        {/* Большой номер */}
        <div
          className="font-heading font-extrabold text-accent/20 select-none leading-none mb-6"
          style={{ fontSize: 'clamp(8rem, 20vw, 16rem)' }}
          aria-hidden="true"
        >
          404
        </div>

        {/* Заголовок */}
        <h1 className="font-heading font-bold text-text text-3xl sm:text-4xl mb-4">
          Страница не найдена
        </h1>
        <p className="text-text-muted text-lg mb-10 leading-relaxed">
          Такой страницы не существует или она была перемещена. Воспользуйтесь
          навигацией, чтобы найти нужную информацию.
        </p>

        {/* Кнопка на главную */}
        <Button asChild size="lg" className="mb-10">
          <Link href="/">На главную</Link>
        </Button>

        {/* Полезные ссылки */}
        <div className="border-t border-border pt-8">
          <p className="text-text-muted text-sm mb-4">Или перейдите на одну из страниц:</p>
          <ul className="flex flex-wrap justify-center gap-3" role="list">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface
                             border border-border text-text-muted text-sm
                             hover:border-accent/40 hover:text-accent transition-colors duration-200"
                >
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
