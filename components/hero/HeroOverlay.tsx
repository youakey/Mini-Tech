'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CONTACTS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

// Контентный слой hero-секции: заголовок, подзаголовок, CTA, скролл-индикатор
export function HeroOverlay() {
  const handleScrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="max-w-4xl"
      >
        {/* Бейдж */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40
                     rounded-full px-4 py-1.5 mb-6"
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" aria-hidden="true" />
          <span className="text-accent text-sm font-medium">Работаем в Бресте и Брестской области</span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="font-heading font-bold text-text mb-4 leading-tight"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
        >
          Аренда строительной<br />
          <span className="text-gradient">техники в Бресте</span>
        </motion.h1>

        {/* Подзаголовок */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="text-text-muted text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto"
        >
          Мини-экскаватор Volvo EC25 и мини-погрузчик CAT 226B с опытным оператором.
          Котлованы, траншеи, вывоз мусора, демонтаж. Выезд от 4 часов.
        </motion.p>

        {/* CTA-кнопки */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={handleScrollToForm}
            className="w-full sm:w-auto min-w-[200px]"
          >
            Заказать технику
          </Button>
          <a
            href={CONTACTS.phoneHref}
            className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl
                       border border-white/20 text-text text-lg font-medium
                       hover:border-accent hover:text-accent transition-all duration-200
                       w-full sm:w-auto min-w-[200px]"
            onClick={() => trackEvent('phone_click')}
          >
            <Phone size={20} />
            Позвонить
          </a>
        </motion.div>
      </motion.div>

      {/* Анимированный индикатор скролла */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-text-muted/60"
        >
          <span className="text-xs uppercase tracking-widest">Прокрутите</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </div>
  );
}
