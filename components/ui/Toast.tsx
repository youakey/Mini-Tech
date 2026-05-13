'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ToastVariant = 'success' | 'error';

interface ToastProps {
  isVisible: boolean;
  variant: ToastVariant;
  message: string;
  onClose: () => void;
  duration?: number;
}

// Toast-уведомление с авто-скрытием после timeout
export function Toast({ isVisible, variant, message, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-4 right-4 z-[60] flex items-start gap-3 max-w-sm w-full
                     bg-surface border border-border rounded-xl p-4 shadow-2xl"
          role="alert"
          aria-live="assertive"
        >
          {variant === 'success' ? (
            <CheckCircle className="shrink-0 text-success mt-0.5" size={20} />
          ) : (
            <XCircle className="shrink-0 text-error mt-0.5" size={20} />
          )}
          <p className="flex-1 text-text text-sm leading-relaxed">{message}</p>
          <button
            onClick={onClose}
            className="shrink-0 text-text-muted hover:text-text transition-colors"
            aria-label="Закрыть уведомление"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
