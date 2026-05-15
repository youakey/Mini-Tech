'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroVideoProps {
  posterSrc: string;
  webmSrc: string;
  mp4Src: string;
}

// Hero-видео с плавным появлением. Учитывает prefers-reduced-motion и медленное соединение.
// При отсутствии видеофайлов показывает CSS-градиент вместо 404.
export function HeroVideo({ posterSrc, webmSrc, mp4Src }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [posterError, setPosterError] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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

  // Предзагружаем poster чтобы знать, доступен ли файл
  useEffect(() => {
    const img = new Image();
    img.onload = () => setPosterLoaded(true);
    img.onerror = () => setPosterError(true);
    img.src = posterSrc;
  }, [posterSrc]);

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
          poster={posterError ? undefined : posterSrc}
          aria-hidden="true"
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}

      {/* Постер-картинка когда видео не воспроизводится */}
      {!shouldPlayVideo && !posterError && posterLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${posterSrc})` }}
          aria-hidden="true"
        />
      )}

      {/* CSS-градиент — fallback когда нет ни видео, ни постера */}
      {(!shouldPlayVideo && (posterError || !posterLoaded)) && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0A0A0A 0%, #141414 40%, #1a1200 70%, #0A0A0A 100%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Декоративный паттерн поверх градиента для текстуры */}
      {posterError && (
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #F59E0B 0, #F59E0B 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />
      )}

      {/* Тёмный оверлей поверх видео */}
      <div className="absolute inset-0 video-overlay" aria-hidden="true" />
    </div>
  );
}
