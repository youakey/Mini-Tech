'use client';

/**
 * CSS/Framer Motion вьюер-заглушка — показывается вместо Three.js R3F
 * до добавления реальных GLTF-моделей техники.
 * Не зависит от браузерных WebGL API → работает в static export без ошибок.
 */

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface Equipment3DViewerInnerProps {
  modelPath?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Equipment3DViewerInner({ modelPath }: Equipment3DViewerInnerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Отслеживаем позицию мыши для имитации 3D-поворота
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [12, -12]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-16, 16]), { stiffness: 200, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '900px' }}
      aria-label="Интерактивный просмотр техники"
    >
      {/* Радиальное свечение фона */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(245,158,11,0.12) 0%, transparent 75%)',
        }}
      />

      {/* Точечная сетка */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(245,158,11,0.5) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* 3D-карточка с mouse-tilt */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative flex flex-col items-center gap-5 select-none"
      >
        {/* Парящий блок техники */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          {/* Внешнее кольцо (медленное вращение) */}
          <motion.div
            className="absolute -inset-8 rounded-full border border-dashed border-accent/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />

          {/* Среднее кольцо (обратное вращение) */}
          <motion.div
            className="absolute -inset-4 rounded-full border border-accent/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />

          {/* Основной блок — имитация кузова техники */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Тень под блоком */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3 w-20 h-3 rounded-full bg-black/30 blur-md" />

            {/* Корпус */}
            <div
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-surface-2 to-surface
                         border border-accent/30 flex items-center justify-center
                         shadow-[0_0_32px_rgba(245,158,11,0.18)]"
            >
              {/* SVG-иконка: стилизованный экскаватор/ковш */}
              <svg
                viewBox="0 0 48 48"
                className="w-14 h-14 text-accent/60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {/* Гусеница */}
                <rect x="4" y="34" width="22" height="8" rx="4" />
                <line x1="8" y1="34" x2="8" y2="42" />
                <line x1="13" y1="34" x2="13" y2="42" />
                <line x1="18" y1="34" x2="18" y2="42" />
                <line x1="22" y1="34" x2="22" y2="42" />
                {/* Кабина */}
                <rect x="6" y="22" width="14" height="12" rx="2" />
                {/* Стрела */}
                <line x1="18" y1="26" x2="34" y2="14" />
                {/* Рукоять */}
                <line x1="34" y1="14" x2="40" y2="22" />
                {/* Ковш */}
                <path d="M37 20 L44 26 L38 32 Q34 32 34 28 Z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Подпись */}
        <div className="text-center mt-2">
          <p className="text-text-muted text-xs leading-relaxed">
            3D-модель добавим после съёмки техники
          </p>
        </div>
      </motion.div>

      {/* Бейдж */}
      <div
        className="absolute top-3 right-3 bg-surface border border-border rounded-lg px-2.5 py-1
                   flex items-center gap-1.5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
        <span className="text-text-muted text-xs font-mono">3D скоро</span>
      </div>

      {/* Подсказка hover (только на десктопе) */}
      <p className="absolute bottom-3 left-0 right-0 text-center text-text-muted/40 text-xs hidden lg:block pointer-events-none">
        Наведите мышь для поворота
      </p>
    </div>
  );
}
