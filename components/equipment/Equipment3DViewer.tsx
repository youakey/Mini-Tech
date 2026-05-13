'use client';

/**
 * Публичный компонент 3D-вьюера.
 * Lazy-загрузка через dynamic() + IntersectionObserver.
 * Показывает Skeleton до входа в viewport и до загрузки R3F.
 */

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/Skeleton';

const Equipment3DViewerInner = dynamic(
  () =>
    import('./Equipment3DViewerInner').then((mod) => ({ default: mod.Equipment3DViewerInner })),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-full rounded-2xl" />,
  }
);

interface Equipment3DViewerProps {
  /** Путь к GLTF-файлу в /public, например '/models/volvo-ec25.glb'. Если не задан — показывает заглушку. */
  modelPath?: string;
  className?: string;
}

export function Equipment3DViewer({ modelPath, className = '' }: Equipment3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Загружаем R3F только когда компонент входит в viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-surface border border-border ${className}`}
    >
      {inView ? (
        <Equipment3DViewerInner modelPath={modelPath} />
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </div>
  );
}
