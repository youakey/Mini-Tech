'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const STORAGE_KEY = 'mt_cookie_accepted';

/** Уведомление об использовании данных. Показывается один раз до принятия. */
export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage недоступен (режим приватности) — не показываем
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Уведомление об использовании данных"
      className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border
                 px-4 py-4 sm:px-6"
    >
      <div className="container-site flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <p className="text-text-muted text-sm leading-relaxed flex-1">
          Мы используем аналитику без cookie для улучшения сайта.{' '}
          <Link href="/privacy/" className="text-accent underline underline-offset-2 hover:no-underline">
            Политика конфиденциальности
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={accept}
            className="bg-accent text-bg font-semibold text-sm rounded-lg px-4 py-2
                       hover:bg-accent-hover transition-colors
                       focus-visible:ring-2 focus-visible:ring-accent
                       focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Понятно
          </button>
          <button
            onClick={accept}
            aria-label="Закрыть уведомление"
            className="text-text-muted hover:text-text transition-colors
                       focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
