'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, CONTACTS } from '@/lib/constants';
import { EQUIPMENT_DATA } from '@/data/equipment';
import { SERVICES_DATA } from '@/data/services';
import { trackEvent } from '@/lib/analytics';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function getDropdownItems(type: 'equipment' | 'services') {
  if (type === 'equipment') {
    return [...EQUIPMENT_DATA]
      .sort((a, b) => a.order - b.order)
      .map((e) => ({ label: e.name, href: `/equipment/${e.slug}/` }));
  }
  return [...SERVICES_DATA]
    .sort((a, b) => a.order - b.order)
    .map((s) => ({ label: s.name, href: `/services/${s.slug}/` }));
}

// Полноэкранное мобильное меню с анимацией slide-in
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Закрывать при смене маршрута
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Блокировать скролл при открытом меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Фоновый оверлей */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Панель меню */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-surface border-l border-border
                       flex flex-col lg:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Мобильное меню"
          >
            {/* Шапка меню */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <span className="font-heading font-bold text-text text-lg">Меню</span>
              <button
                onClick={onClose}
                className="icon-btn"
                aria-label="Закрыть меню"
              >
                <X size={20} />
              </button>
            </div>

            {/* Навигационные ссылки */}
            <nav className="flex-1 p-5" aria-label="Мобильная навигация">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const hasDropdown = 'hasDropdown' in link ? link.hasDropdown : undefined;

                  return (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      {hasDropdown ? (
                        <div>
                          <span className="block px-3 py-2 text-xs font-semibold uppercase tracking-widest text-text-muted">
                            {link.label}
                          </span>
                          <ul className="ml-2 space-y-0.5 border-l border-border pl-4">
                            {getDropdownItems(hasDropdown).map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block py-2.5 text-text-muted hover:text-accent transition-colors duration-150 text-base"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className={[
                            'block px-3 py-3 rounded-xl text-lg font-medium transition-colors duration-150',
                            pathname === link.href
                              ? 'text-accent bg-accent/10'
                              : 'text-text hover:text-accent hover:bg-surface-2',
                          ].join(' ')}
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Контакты внизу меню */}
            <div className="p-5 border-t border-border space-y-3">
              <a
                href={CONTACTS.phoneHref}
                className="flex items-center gap-3 text-text font-semibold text-lg
                           hover:text-accent transition-colors"
                onClick={() => trackEvent('phone_click')}
              >
                <Phone size={20} className="text-accent" />
                {CONTACTS.phone}
              </a>
              <div className="flex gap-3">
                <a
                  href={CONTACTS.telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn hover:text-[#0088cc]"
                  aria-label="Написать в Telegram"
                  onClick={() => trackEvent('telegram_click')}
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
