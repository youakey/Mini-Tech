'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LeadForm } from '@/components/forms/LeadForm';

interface CallbackModalProps {
  open: boolean;
  onClose: () => void;
}

/** Модальное окно с формой обратного звонка */
export function CallbackModal({ open, onClose }: CallbackModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLDivElement>(null);

  // Focus trap и закрытие по Escape
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    // Блокируем скролл body
    document.body.style.overflow = 'hidden';

    // Фокус на кнопку закрытия при открытии
    setTimeout(() => closeRef.current?.focus(), 50);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Диалог */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="callback-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            ref={firstFocusableRef}
          >
            <div className="relative w-full max-w-md bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-2xl">
              {/* Заголовок */}
              <div className="mb-6">
                <div className="accent-line mb-3" />
                <h2
                  id="callback-modal-title"
                  className="font-heading font-bold text-2xl text-text"
                >
                  Заказать звонок
                </h2>
                <p className="text-text-muted text-sm mt-1">
                  Перезвоним в течение 15 минут
                </p>
              </div>

              {/* Форма */}
              <LeadForm source="callback" />

              {/* Кнопка закрытия */}
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Закрыть окно"
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center
                           text-text-muted hover:text-text hover:bg-surface-2
                           transition-colors focus-visible:ring-2 focus-visible:ring-accent
                           focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
