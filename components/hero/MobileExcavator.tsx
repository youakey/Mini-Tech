'use client';

import { useEffect, useId, useRef } from 'react';
import { motion, useMotionValueEvent, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { BucketSpill } from './BucketSpill';

/** Полная машина въезжает по грунту; масштаб и высота опоры постоянны. */
export function MobileExcavator({ progress }: { progress: MotionValue<number> }) {
  const layer = useRef<SVGGElement>(null);
  const boomLayer = useRef<SVGGElement>(null);
  const stickLayer = useRef<SVGGElement>(null);
  const bucketLayer = useRef<SVGGElement>(null);
  const id = useId().replace(/:/g, '');
  const smooth = useSpring(progress, { stiffness: 85, damping: 26, mass: 0.7 });
  const phases = [0, 0.35, 0.5, 0.7, 0.95, 1];
  const x = useTransform(smooth, [0, 0.35, 1], [185, 0, 0]);
  const boom = useTransform(smooth, phases, [0, 0, -7, -10, 8, 8]);
  const stick = useTransform(smooth, phases, [0, 0, 3, 12, 5, 5]);
  const bucket = useTransform(smooth, phases, [0, 0, 8, -24, -24, -24]);
  const soil = useTransform(smooth, [0, 0.54, 0.7, 1], [0, 0, 1, 1]);
  useMotionValueEvent(x, 'change', (value) => layer.current?.setAttribute('transform', `translate(${value} 0)`));
  useMotionValueEvent(boom, 'change', v => boomLayer.current?.setAttribute('transform', `rotate(${v} 510 1015)`));
  useMotionValueEvent(stick, 'change', v => stickLayer.current?.setAttribute('transform', `rotate(${v} 340 833)`));
  useMotionValueEvent(bucket, 'change', v => bucketLayer.current?.setAttribute('transform', `rotate(${v} 293 1035)`));
  useEffect(() => {
    layer.current?.setAttribute('transform', `translate(${x.get()} 0)`);
    for (const [ref, value, px, py] of [[boomLayer, boom, 510, 1015], [stickLayer, stick, 340, 833], [bucketLayer, bucket, 293, 1035]] as const)
      ref.current?.setAttribute('transform', `rotate(${value.get()} ${px} ${py})`);
  }, [x, boom, stick, bucket]);
  const photo = <image href="/images/hero/mobile-excavator.webp" width="750" height="1333" />;
  return <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 750 1333" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
    <defs>
      <clipPath id={`${id}-body`}><path d="M518 805H750V1170H355V1065H480V1035Z" /></clipPath>
      <clipPath id={`${id}-boom`}><path d="M481 1064L435 934L327 885L319 820L458 846L482 884L535 1019L527 1059Z" /></clipPath>
      <clipPath id={`${id}-stick`}><path d="M325 819H350L359 864L354 931L328 1022L321 1051L260 1042L280 970L307 863Z" /></clipPath>
      <clipPath id={`${id}-bucket`}><path d="M220 1045L270 1031L310 1033L330 1062L342 1151H269L220 1108Z" /></clipPath>
      <clipPath id={`${id}-soil`}><path d="M230 1048Q259 1027 303 1045L311 1060L234 1062Z" /></clipPath>
    </defs>
    <g ref={layer} transform="translate(185 0)">
      <ellipse cx="606" cy="1067" rx="132" ry="10" fill="#17110b" opacity=".3" />
      <g transform="translate(228 282) scale(.68)">
        <g clipPath={`url(#${id}-body)`}>{photo}</g>
        <g ref={boomLayer}>
          <g clipPath={`url(#${id}-boom)`}>{photo}</g>
          <g ref={stickLayer}>
            <g clipPath={`url(#${id}-stick)`}>{photo}</g>
            <g ref={bucketLayer}>
              <g clipPath={`url(#${id}-bucket)`}>{photo}</g>
              <motion.g style={{ opacity: soil }} clipPath={`url(#${id}-soil)`}>
                <image href="/images/hero/bucket-earth.webp" x="228" y="1027" width="88" height="35" />
              </motion.g>
              <BucketSpill progress={smooth} x={302} y={1058} scale={0.7} />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>;
}
