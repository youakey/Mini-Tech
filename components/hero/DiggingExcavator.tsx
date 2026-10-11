'use client';

import { useEffect, useId, useRef } from 'react';
import { motion, useMotionValueEvent, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { BucketSpill } from './BucketSpill';

interface DiggingExcavatorProps {
  progress: MotionValue<number>;
  reducedMotion: boolean;
}

/** Фотослои: приближение машины, заглубление, закрытие и подъём ковша. */
export function DiggingExcavator({ progress, reducedMotion }: DiggingExcavatorProps) {
  const id = useId().replace(/:/g, '');
  const smoothProgress = useSpring(progress, { stiffness: 85, damping: 26, mass: 0.7 });
  const phases = [0, 0.35, 0.5, 0.7, 0.95, 1];
  const approach = useTransform(smoothProgress, [0, 0.35, 1], [0, 1, 1]);
  const boom = useTransform(smoothProgress, phases, [0, 0, -9, -12, 8, 8]);
  const stick = useTransform(smoothProgress, phases, [0, 0, 3, 14, 5, 5]);
  const bucket = useTransform(smoothProgress, phases, [0, 0, 10, -24, -24, -24]);
  const arrivalLayer = useRef<SVGGElement>(null);
  const boomLayer = useRef<SVGGElement>(null);
  const stickLayer = useRef<SVGGElement>(null);
  const bucketLayer = useRef<SVGGElement>(null);
  const poseArrival = (value: number) => {
    const amount = reducedMotion ? 1 : value;
    // Въезд справа по грунту без масштабирования и вертикального смещения.
    arrivalLayer.current?.setAttribute('transform', `translate(${(1 - amount) * 460} 0)`);
  };
  useMotionValueEvent(approach, 'change', poseArrival);
  useMotionValueEvent(boom, 'change', (v) => boomLayer.current?.setAttribute('transform', `rotate(${reducedMotion ? 0 : v} 1190 568)`));
  useMotionValueEvent(stick, 'change', (v) => stickLayer.current?.setAttribute('transform', `rotate(${reducedMotion ? 0 : v} 907 248)`));
  useMotionValueEvent(bucket, 'change', (v) => bucketLayer.current?.setAttribute('transform', `rotate(${reducedMotion ? 0 : v} 816 554)`));
  useEffect(() => {
    const amount = reducedMotion ? 1 : approach.get();
    arrivalLayer.current?.setAttribute('transform', `translate(${(1 - amount) * 460} 0)`);
    for (const [layer, value, x, y] of [
      [boomLayer, boom, 1190, 568], [stickLayer, stick, 907, 248], [bucketLayer, bucket, 816, 554],
    ] as const) layer.current?.setAttribute('transform', `rotate(${reducedMotion ? 0 : value.get()} ${x} ${y})`);
  }, [reducedMotion, approach, boom, stick, bucket]);
  const loadOpacity = useTransform(smoothProgress, [0, 0.54, 0.7, 1], [0, 0, 1, 1]);
  const dustOpacity = useTransform(smoothProgress, [0, 0.47, 0.6, 0.77, 1], [0, 0, 0.25, 0, 0]);
  const photo = <image href="/images/hero/excavator-cutout.webp" width="1672" height="941" />;

  return <div className="hidden lg:block absolute inset-0 pointer-events-none" aria-hidden="true">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1672 941" preserveAspectRatio="xMaxYMid slice">
      <defs>
        <filter id={`${id}-dust`}><feGaussianBlur stdDeviation="10" /></filter>
        <clipPath id={`${id}-blade`}><path d="M970 643L1356 675L1356 791L970 750Z" /></clipPath>
        <clipPath id={`${id}-body`}><path d="M1245 145H1672V800H955V602H1155V550L1245 485Z" /></clipPath>
        <clipPath id={`${id}-boom`}><path d="M1190 610L1138 562L1050 362L895 285L897 230L887 160L1130 214L1175 320L1255 535L1260 590Z" /></clipPath>
        <clipPath id={`${id}-stick`}><path d="M860 151L911 151L940 285L910 350L844 550L781 550L765 490L813 430L823 270Z" /></clipPath>
        <clipPath id={`${id}-bucket`}><path d="M714 578L786 544L841 544L883 577L910 765L797 780L674 675L674 592Z" /></clipPath>
        <clipPath id={`${id}-wrist`}><circle cx="816" cy="554" r="13" /></clipPath>
        <clipPath id={`${id}-elbow`}><circle cx="907" cy="248" r="17" /></clipPath>
        <clipPath id={`${id}-soil`}><path d="M708 577Q775 548 862 579L851 614L722 609Z" /></clipPath>
        <clipPath id={`${id}-foreground`}><path d="M590 772Q710 748 820 763T948 777V941H590Z" /></clipPath>
      </defs>
      <g ref={arrivalLayer}>
        <ellipse cx="1340" cy="755" rx="275" ry="22" fill="#17110b" opacity=".3" />
        <g clipPath={`url(#${id}-body)`}>{photo}</g>
        <g clipPath={`url(#${id}-blade)`}>{photo}</g>
        <g ref={boomLayer} transform="rotate(0 1190 568)">
          <g clipPath={`url(#${id}-boom)`}>{photo}</g>
          <g ref={stickLayer} transform="rotate(0 907 248)">
            <g clipPath={`url(#${id}-stick)`}>{photo}</g>
            <g ref={bucketLayer} transform="rotate(0 816 554)">
              <g clipPath={`url(#${id}-bucket)`}>{photo}</g>
              {!reducedMotion && <motion.g style={{ opacity: loadOpacity }} clipPath={`url(#${id}-soil)`}>
                <image href="/images/hero/bucket-earth.webp" x="706" y="548" width="165" height="60" />
              </motion.g>}
              {!reducedMotion && <BucketSpill progress={smoothProgress} x={853} y={604} />}
            </g>
            <g clipPath={`url(#${id}-wrist)`}>{photo}</g>
          </g>
          <g clipPath={`url(#${id}-elbow)`}>{photo}</g>
        </g>
      </g>
      <g clipPath={`url(#${id}-foreground)`}><image href="/images/hero/desktop.webp" width="1672" height="941" /></g>
      {!reducedMotion && <motion.g filter={`url(#${id}-dust)`} style={{ opacity: dustOpacity }} fill="#b09066">
        <ellipse cx="764" cy="755" rx="75" ry="18" />
        <ellipse cx="718" cy="741" rx="45" ry="12" />
      </motion.g>}
    </svg>
  </div>;
}
