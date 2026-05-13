'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

// Десктопная навигация с выпадающими подменю
export function Nav() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <nav aria-label="Основная навигация">
      <ul className="hidden lg:flex items-center gap-1">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          const hasChildren = 'children' in link && link.children;

          if (!hasChildren) {
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-accent bg-accent/10'
                      : 'text-text-muted hover:text-text hover:bg-surface-2',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              </li>
            );
          }

          return (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => openMenu(link.label)}
              onMouseLeave={closeMenu}
            >
              <button
                aria-haspopup="true"
                aria-expanded={openDropdown === link.label}
                className={[
                  'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                  openDropdown === link.label
                    ? 'text-accent bg-accent/10'
                    : 'text-text-muted hover:text-text hover:bg-surface-2',
                ].join(' ')}
              >
                {link.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    openDropdown === link.label ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === link.label && (
                <ul
                  className="absolute top-full left-0 mt-1 min-w-[220px] bg-surface border border-border
                             rounded-xl shadow-2xl overflow-hidden z-50 py-1"
                  onMouseEnter={() => openMenu(link.label)}
                  onMouseLeave={closeMenu}
                >
                  {link.children?.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-text-muted hover:text-text
                                   hover:bg-surface-2 transition-colors duration-150"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
