'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, UserCheck, BadgeCheck, CalendarCheck } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

interface Advantage {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const ADVANTAGES: Advantage[] = [
  {
    icon: <Truck size={32} />,
    title: 'Собственный парк техники',
    description: 'Мы владеем техникой — никаких субподрядчиков. Гарантируем наличие и своевременный выезд.',
  },
  {
    icon: <UserCheck size={32} />,
    title: 'Опытный оператор',
    description: 'Оператор с 10+ летним стажем. Работаем аккуратно, без повреждения коммуникаций и строений.',
  },
  {
    icon: <BadgeCheck size={32} />,
    title: 'Прозрачные цены',
    description: 'Фиксированная цена от 4 часов. Никаких скрытых доплат за пробег, топливо или износ.',
  },
  {
    icon: <CalendarCheck size={32} />,
    title: 'Работаем в выходные',
    description: 'Принимаем заявки в субботу и воскресенье. Выезжаем в день обращения при наличии свободного окна.',
  },
];

// TODO: REPLACE — замените на реальные цифры после накопления статистики
const STATS: Stat[] = [
  { value: 200, suffix: '+', label: 'выполненных заказов' },
  { value: 10, suffix: ' лет', label: 'опыта оператора' },
  { value: 2, suffix: '', label: 'единицы техники' },
  { value: 15, suffix: ' мин', label: 'время ответа' },
];

// Анимированный счётчик — считает от 0 до N при появлении в viewport
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const observedRef = useRef(false);

  useEffect(() => {
    // Пропускаем при prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observedRef.current) {
          observedRef.current = true;
          const duration = 1500;
          const steps = 50;
          const stepValue = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += stepValue;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {count}{suffix}
    </span>
  );
}

// Секция "Почему мы" с преимуществами и анимированными счётчиками
export function WhyUsSection() {
  return (
    <section className="section bg-bg" aria-labelledby="why-us-heading">
      <div className="container-site">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp} className="accent-line mx-auto" />
          <motion.h2 variants={fadeUp} id="why-us-heading" className="section-title">
            Почему выбирают нас
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle max-w-2xl mx-auto">
            Больше 200 успешных проектов по всей Брестской области
          </motion.p>
        </motion.div>

        {/* Счётчики */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="bg-surface border border-border rounded-2xl p-6 text-center"
            >
              <p className="text-3xl sm:text-4xl font-heading font-bold text-accent mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Преимущества */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {ADVANTAGES.map((adv) => (
            <motion.div
              key={adv.title}
              variants={fadeUp}
              className="group card card-hover"
            >
              <div className="text-accent mb-4 group-hover:scale-110 transition-transform duration-300 w-fit">
                {adv.icon}
              </div>
              <h3 className="font-heading font-semibold text-text text-lg mb-2">{adv.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{adv.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
