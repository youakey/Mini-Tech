'use client';

import { motion } from 'framer-motion';
import { ClipboardList, MessageSquare, Truck, HardHat, ArrowRight, ArrowDown } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: <ClipboardList size={26} aria-hidden="true" />,
    title: 'Заявка',
    description: 'Оставьте заявку на сайте или позвоните. Уточним объём работ и дату выезда.',
  },
  {
    number: '02',
    icon: <MessageSquare size={26} aria-hidden="true" />,
    title: 'Согласование',
    description: 'Перезвоним за 15 минут, уточним детали, назовём точную стоимость.',
  },
  {
    number: '03',
    icon: <Truck size={26} aria-hidden="true" />,
    title: 'Доставка техники',
    description: 'Пригоняем технику на ваш объект в согласованное время. Работаем по всему Бресту и БО.',
  },
  {
    number: '04',
    icon: <HardHat size={26} aria-hidden="true" />,
    title: 'Работа на объекте',
    description: 'Оператор выполняет задачу профессионально. Оплата после приёмки работ.',
  },
];

const itemVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const titleVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Секция "Как мы работаем" — 4 карточки + стрелки-разделители, без анимированной линии
export function HowWeWorkSection() {
  // Формируем плоский список: [card0, arrow0, card1, arrow1, card2, arrow2, card3]
  // Это нужно для корректного staggerChildren — все motion-дети должны быть прямыми
  const items = STEPS.flatMap((step, index) => {
    const card = (
      <motion.div
        key={step.number}
        variants={itemVariant}
        whileHover={{
          y: -6,
          boxShadow: '0 0 28px 2px rgba(245,158,11,0.16)',
          transition: { duration: 0.22 },
        }}
        className="flex-1 bg-bg border border-border rounded-2xl p-6 flex flex-col gap-4
                   cursor-default hover:border-accent/40 transition-colors duration-200"
      >
        {/* Большой номер шага — акцентный цвет, приглушённый */}
        <span
          className="font-mono font-extrabold text-5xl text-accent/25 leading-none select-none"
          aria-hidden="true"
        >
          {step.number}
        </span>

        {/* Иконка */}
        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20
                        flex items-center justify-center text-accent -mt-1">
          {step.icon}
        </div>

        {/* Текст */}
        <div>
          <h3 className="font-heading font-bold text-text text-lg mb-1.5">{step.title}</h3>
          <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
        </div>
      </motion.div>
    );

    if (index === STEPS.length - 1) return [card];

    const arrow = (
      <motion.div
        key={`arrow-${index}`}
        variants={itemVariant}
        className="flex items-center justify-center lg:px-2 py-1 lg:py-0 shrink-0"
        aria-hidden="true"
      >
        <ArrowRight size={20} className="hidden lg:block text-accent opacity-25" />
        <ArrowDown  size={20} className="lg:hidden text-accent opacity-25" />
      </motion.div>
    );

    return [card, arrow];
  });

  return (
    <section className="section bg-surface overflow-hidden" aria-labelledby="how-heading">
      <div className="container-site">
        {/* Заголовок */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-14"
        >
          <motion.div variants={titleVariant} className="accent-line mx-auto" />
          <motion.h2 variants={titleVariant} id="how-heading" className="section-title">
            Как мы работаем
          </motion.h2>
          <motion.p variants={titleVariant} className="section-subtitle max-w-xl mx-auto">
            От звонка до результата — чётко и в срок
          </motion.p>
        </motion.div>

        {/* Карточки + стрелки */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col lg:flex-row lg:items-stretch gap-3 lg:gap-0"
        >
          {items}
        </motion.div>
      </div>
    </section>
  );
}
