'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/** Кнопка "Наверх" — появляется после прокрутки на 600px */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Прокрутить наверх"
          className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-40
                     w-11 h-11 rounded-xl bg-surface border border-border
                     flex items-center justify-center
                     text-text-muted hover:text-accent hover:border-accent/40
                     transition-colors focus-visible:ring-2 focus-visible:ring-accent
                     focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
