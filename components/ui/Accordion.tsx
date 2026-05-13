'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

interface AccordionItemProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

// Единичный элемент аккордеона
function AccordionItemComponent({ item, isOpen, onToggle, index }: AccordionItemProps) {
  const panelId = `accordion-panel-${item.id}`;
  const triggerId = `accordion-trigger-${item.id}`;

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left
                   bg-surface hover:bg-surface-2 transition-colors duration-200
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
      >
        <span className="font-medium text-text text-base leading-snug">
          <span className="text-accent font-mono text-sm mr-3 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          {item.question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-text-muted transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-accent' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 pt-2 text-text-muted leading-relaxed border-t border-border">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Аккордеон с поддержкой одиночного/множественного раскрытия
export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          isOpen={openIds.has(item.id)}
          onToggle={() => toggle(item.id)}
          index={index}
        />
      ))}
    </div>
  );
}
