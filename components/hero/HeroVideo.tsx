'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroVideoProps {
  posterSrc: string;
  webmSrc: string;
  mp4Src: string;
}

// Hero-видео с плавным появлением. Учитывает prefers-reduced-motion и медленное соединение.
export function HeroVideo({ posterSrc, webmSrc, mp4Src }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  useEffect(() => {
    // Отключаем видео при настройке "Уменьшить движение"
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Отключаем видео на медленных соединениях
    const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
    const slowConnection =
      connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
    if (slowConnection) return;

    setShouldPlayVideo(true);
  }, []);

  useEffect(() => {
    if (!shouldPlayVideo || !videoRef.current) return;
    videoRef.current.play().catch(() => {
      // Браузер заблокировал автоплей — ничего не делаем, остаётся poster
    });
  }, [shouldPlayVideo]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Фоновое видео */}
      {shouldPlayVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          aria-hidden="true"
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}

      {/* Постер-картинка (всегда видна до загрузки видео) */}
      {!shouldPlayVideo && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${posterSrc})` }}
          aria-hidden="true"
        />
      )}

      {/* Тёмный оверлей поверх видео */}
      <div className="absolute inset-0 video-overlay" aria-hidden="true" />
    </div>
  );
}
