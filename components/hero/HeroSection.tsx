'use client';

import Image from 'next/image';
import { useRef, useSyncExternalStore } from 'react';
import { useReducedMotion, useScroll } from 'framer-motion';
import { HeroOverlay } from './HeroOverlay';
import { DiggingExcavator } from './DiggingExcavator';
import { MobileExcavator } from './MobileExcavator';

const desktopQuery = '(min-width: 1024px)';
function subscribeViewport(callback: () => void) {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
const desktopSnapshot = () => window.matchMedia(desktopQuery).matches;
const serverSnapshot = () => null;

/** Два отдельных фото, фотографическая машина и прокрутка вместо тяжёлого 3D. */
export function HeroSection() {
  const desktop = useSyncExternalStore(subscribeViewport, desktopSnapshot, serverSnapshot);
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });

  return <section ref={section} className="hero-scroll-scene relative -mt-16 sm:-mt-20" aria-label="Главный баннер">
    <div className="hero-sticky-frame sticky top-0 h-[100svh] min-h-[640px] overflow-hidden bg-bg">
      <div className="hero-photo-frame absolute inset-0">
        <picture>
          <source media="(prefers-reduced-motion: reduce) and (max-width: 1023px)" srcSet="/images/hero/mobile-v2.webp" />
          <source media="(max-width: 1023px)" srcSet="/images/hero/mobile-background.webp" />
          <Image src="/images/hero/desktop.webp" alt="" fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover object-right" />
        </picture>
        {desktop === true && <DiggingExcavator progress={scrollYProgress} reducedMotion={reducedMotion} />}
        {desktop === false && !reducedMotion && <MobileExcavator progress={scrollYProgress} />}
      </div>
      <div className="hero-photo-shade absolute inset-0" />
      <HeroOverlay />
    </div>
  </section>;
}
