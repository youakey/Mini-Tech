'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PhotoGalleryProps {
  images: { src: string; alt: string }[];
  priority?: boolean;
}

/** Фото полностью видно, в том числе при портретной ориентации оригинала. */
export function PhotoGallery({ images, priority = false }: PhotoGalleryProps) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];
  if (!current) return null;

  return (
    <div className="min-w-0">
      <div className="relative aspect-[4/3] sm:aspect-[5/4] rounded-2xl overflow-hidden bg-surface-2 border border-border">
        <Image src={current.src} alt={current.alt} fill priority={priority}
          sizes="(max-width: 1023px) 100vw, 50vw" className="object-contain" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 mt-3" role="group" aria-label="Выбрать фотографию">
          {images.map((photo, index) => (
            <button key={photo.src} type="button" onClick={() => setSelected(index)}
              aria-label={`Фото ${index + 1}: ${photo.alt}`} aria-pressed={selected === index}
              className={`relative w-24 h-20 rounded-xl overflow-hidden border-2 ${selected === index ? 'border-accent' : 'border-border hover:border-text-muted'}`}>
              <Image src={photo.src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <p className="text-text-muted text-xs mt-3 leading-relaxed">{current.alt}</p>
    </div>
  );
}
