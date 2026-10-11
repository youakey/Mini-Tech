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
    <div className="relative z-10 container-site flex flex-col items-center lg:items-start justify-center h-full text-center lg:text-left pt-16 pb-28 sm:py-24">
      <motion.div
        initial={false}
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="w-full max-w-2xl lg:w-[58%]"
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
          className="font-heading font-bold text-text mb-4 leading-tight text-[clamp(1.9rem,4.4vw,4.3rem)]"

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
          className="text-zinc-200 text-base sm:text-lg leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0"
        >
          Volvo EC 25, Messersi M-18BE и XCMG XE-35U с опытным оператором.
          Котлованы, траншеи, вывоз мусора, демонтаж. Выезд от 4 часов.
        </motion.p>

        {/* CTA-кнопки */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
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
          style={{ willChange: 'transform' }}
        >
          <span className="text-xs uppercase tracking-widest">Прокрутите</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </div>
  );
}
