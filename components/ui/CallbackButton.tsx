'use client';

import { useState } from 'react';
import { Phone } from 'lucide-react';
import { CallbackModal } from './CallbackModal';

/** Плавающая кнопка "Заказать звонок" в левом нижнем углу (mobile) */
export function CallbackButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Заказать обратный звонок"
        className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-40
                   flex items-center gap-2 bg-accent text-bg font-bold
                   rounded-xl px-4 py-3 shadow-lg
                   hover:bg-accent-hover transition-colors
                   focus-visible:ring-2 focus-visible:ring-accent
                   focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <Phone size={18} aria-hidden="true" />
        <span className="hidden sm:inline text-sm">Заказать звонок</span>
      </button>

      <CallbackModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
