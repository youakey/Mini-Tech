'use client';

import { useRef, useState } from 'react';
import { useInView, useMotionValueEvent, type MotionValue } from 'framer-motion';

/** Повторяется только у наполненного ковша в видимой части страницы. */
export function BucketSpill({ progress, x, y, scale = 1 }: {
  progress: MotionValue<number>; x: number; y: number; scale?: number;
}) {
  const ref = useRef<SVGGElement>(null);
  const visible = useInView(ref);
  const [filled, setFilled] = useState(() => progress.get() >= 0.72);
  useMotionValueEvent(progress, 'change', value => setFilled(value >= 0.72));
  const active = filled && visible;
  return <g ref={ref} transform={`translate(${x} ${y}) scale(${scale})`} opacity={active ? 1 : 0} aria-hidden="true">
    {[0, 1, 2, 3, 4, 5].map(i => <g key={i} transform={`translate(${(i % 3) * 8} ${i % 2 * 3})`}>
      <g className="hero-soil-grain" style={{ animationDelay: `${-i * 0.37}s`, animationDuration: `${1.8 + i % 3 * 0.25}s`, animationPlayState: active ? 'running' : 'paused' }}>
        <path d="M-3-2L2-3L4 0L1 3L-3 2Z" fill={i % 2 ? '#60442d' : '#92714d'} />
      </g>
    </g>)}
  </g>;
}
