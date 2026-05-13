'use client';

/** Публичный компонент карты — lazy-загрузка через dynamic() без SSR */

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/Skeleton';

const LeafletMapInner = dynamic(
  () => import('./LeafletMapInner').then((mod) => ({ default: mod.LeafletMapInner })),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-full" />,
  }
);

interface LeafletMapProps {
  className?: string;
}

export function LeafletMap({ className = '' }: LeafletMapProps) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-border ${className}`}>
      <LeafletMapInner />
    </div>
  );
}
