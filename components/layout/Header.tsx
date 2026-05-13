'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Phone } from 'lucide-react';
import { Nav } from './Nav';
import { MobileMenu } from './MobileMenu';
import { Button } from '@/components/ui/Button';
import { CONTACTS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

// Sticky header с backdrop-blur при скролле, мобильным гамбургером и CTA
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-bg/90 backdrop-blur-md border-b border-border shadow-lg'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Логотип */}
            <Link
              href="/"
              className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
              aria-label="МиниТех Брест — на главную"
            >
              {/* TODO: REPLACE — замените на реальный SVG-логотип */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-bg font-heading font-bold text-sm">МТ</span>
                </div>
                <span className="font-heading font-bold text-text text-lg hidden sm:block">
                  МиниТех <span className="text-accent">Брест</span>
                </span>
              </div>
            </Link>

            {/* Десктопная навигация */}
            <Nav />

            {/* Правый блок: телефон + CTA + гамбургер */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Телефон на десктопе */}
              <a
                href={CONTACTS.phoneHref}
                className="hidden xl:flex items-center gap-2 text-text-muted hover:text-accent
                           transition-colors text-sm font-medium"
                onClick={() => trackEvent('phone_click')}
                itemProp="telephone"
              >
                <Phone size={15} />
                {CONTACTS.phone}
              </a>

              {/* CTA-кнопка */}
              <Button
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
                onClick={() => {
                  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Заказать
              </Button>

              {/* Гамбургер (мобильный) */}
              <button
                className="lg:hidden icon-btn"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Открыть меню"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Плавающая кнопка звонка на мобильных */}
      <a
        href={CONTACTS.phoneHref}
        className="fixed bottom-6 right-6 z-30 lg:hidden w-14 h-14 rounded-full
                   bg-accent text-bg flex items-center justify-center shadow-lg
                   hover:bg-accent-hover active:scale-95 transition-all duration-200
                   focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        aria-label={`Позвонить: ${CONTACTS.phone}`}
        onClick={() => trackEvent('phone_click')}
      >
        <Phone size={24} />
      </a>
    </>
  );
}
