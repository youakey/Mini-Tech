'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Weight, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';

interface EquipmentSpec {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface EquipmentCardProps {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  specs: EquipmentSpec[];
  href: string;
  price: string;
}

// Карточка техники с hover-эффектом поднятия и свечения акцентного цвета
export function EquipmentCard({
  id,
  name,
  description,
  imageSrc,
  imageAlt,
  specs,
  href,
  price,
}: EquipmentCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group card card-hover flex flex-col"
    >
      {/* Фото техники */}
      <div className="relative overflow-hidden rounded-xl mb-6 bg-surface-2 aspect-[16/9]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
        <div className="absolute bottom-4 left-4 bg-bg/80 backdrop-blur-sm border border-border rounded-lg px-3 py-1.5">
          <span className="text-accent font-mono font-medium text-sm">{price}</span>
        </div>
      </div>

      {/* Название */}
      <h3 className="font-heading font-bold text-text text-xl mb-2 group-hover:text-accent transition-colors">
        {name}
      </h3>

      {/* Описание */}
      <p className="text-text-muted text-sm leading-relaxed mb-5 flex-1">{description}</p>

      {/* Ключевые ТТХ */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {specs.map((spec, i) => (
          <div key={i} className="bg-surface-2 rounded-xl p-3 text-center">
            <div className="text-accent flex justify-center mb-1" aria-hidden="true">
              {spec.icon}
            </div>
            <p className="text-text font-mono font-medium text-xs leading-tight">{spec.value}</p>
            <p className="text-text-muted text-xs mt-0.5">{spec.label}</p>
          </div>
        ))}
      </div>

      {/*
        asChild — Slot сливает стили Button с <Link>.
        Иконка ArrowRight идёт внутрь Link, т.к. в asChild-режиме rightIcon не рендерится.
      */}
      <Button
        variant="outline"
        size="md"
        className="w-full group-hover:border-accent group-hover:text-accent"
        asChild
        onClick={() => trackEvent('equipment_view', { equipment: id })}
      >
        <Link href={href} className="flex items-center justify-center gap-2">
          Подробнее и заказать
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </Button>
    </motion.div>
  );
}

// Данные для карточек техники (используются на главной)
export const EXCAVATOR_SPECS: EquipmentSpec[] = [
  { icon: <Weight size={16} />, label: 'Масса', value: '2 580 кг' },
  { icon: <Zap size={16} />, label: 'Мощность', value: '25 л.с.' },
  { icon: <Ruler size={16} />, label: 'Глубина', value: '2 840 мм' },
];

export const LOADER_SPECS: EquipmentSpec[] = [
  { icon: <Weight size={16} />, label: 'Г/п ковша', value: '567 кг' },
  { icon: <Zap size={16} />, label: 'Мощность', value: '57 л.с.' },
  { icon: <Ruler size={16} />, label: 'Опрок.', value: '1 134 кг' },
];
