'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FormSuccessProps {
  onReset: () => void;
}

// Состояние успешной отправки формы с анимацией
export function FormSuccess({ onReset }: FormSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center text-center py-8 space-y-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
      >
        <CheckCircle className="text-success" size={64} strokeWidth={1.5} />
      </motion.div>

      <div className="space-y-2">
        <h3 className="text-xl font-heading font-bold text-text">
          Заявка принята!
        </h3>
        <p className="text-text-muted leading-relaxed max-w-xs">
          Мы перезвоним вам в течение 15 минут. Рабочее время: пн–пт 8:00–19:00, сб 9:00–17:00.
        </p>
      </div>

      <Button variant="ghost" size="sm" onClick={onReset}>
        Отправить ещё одну заявку
      </Button>
    </motion.div>
  );
}
