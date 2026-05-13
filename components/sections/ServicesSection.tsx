'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Hammer, Truck, ArrowRight } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { ServiceForm } from '@/components/forms/ServiceForm';
import { trackEvent } from '@/lib/analytics';
import type { ServiceType } from '@/lib/validation';
import { PRICES } from '@/lib/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

interface Service {
  id: ServiceType;
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  bullets: string[];
  modalTitle: string;
}

const SERVICES: Service[] = [
  {
    id: 'waste',
    icon: <Trash2 size={28} />,
    title: 'Вывоз мусора',
    description: 'Строительный, бытовой, растительный мусор. Работаем с погрузчиком и кузовными автомобилями.',
    price: PRICES.wasteRemoval,
    bullets: ['Погрузка и вывоз', 'Любой тип мусора', 'Брест и область'],
    modalTitle: 'Заявка на вывоз мусора',
  },
  {
    id: 'demolition',
    icon: <Hammer size={28} />,
    title: 'Снос и демонтаж',
    description: 'Снос сараев, гаражей, старых домов. Демонтаж перегородок, фундаментов. Быстро и безопасно.',
    price: PRICES.demolition,
    bullets: ['Сараи, гаражи, дома', 'Перегородки, стены', 'Вывоз мусора включён'],
    modalTitle: 'Заявка на демонтаж',
  },
  {
    id: 'delivery',
    icon: <Truck size={28} />,
    title: 'Доставка техники',
    description: 'Доставляем экскаватор или погрузчик на ваш объект по Бресту и Брестской области.',
    price: PRICES.delivery,
    bullets: ['Весь Брест и BО', 'Транспортёр низкорамный', 'Оперативный выезд'],
    modalTitle: 'Заявка на доставку техники',
  },
];

// Секция услуг — клик открывает модальное окно с соответствующей формой
export function ServicesSection() {
  const [activeService, setActiveService] = useState<Service | null>(null);

  const openModal = (service: Service) => {
    setActiveService(service);
    trackEvent('service_modal_open', { service: service.id });
  };

  return (
    <section className="section bg-surface" aria-labelledby="services-heading">
      <div className="container-site">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp} className="accent-line mx-auto" />
          <motion.h2 variants={fadeUp} id="services-heading" className="section-title">
            Наши услуги
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle max-w-2xl mx-auto">
            Выберите услугу — мы пришлём расчёт и перезвоним в течение 15 минут.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {SERVICES.map((service) => (
            <motion.button
              key={service.id}
              variants={fadeUp}
              onClick={() => openModal(service)}
              className="group card card-hover text-left w-full cursor-pointer"
              aria-label={`Оставить заявку: ${service.title}`}
            >
              {/* Иконка */}
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center
                              text-accent mb-5 group-hover:bg-accent group-hover:text-bg transition-all duration-300">
                {service.icon}
              </div>

              {/* Название */}
              <h3 className="font-heading font-bold text-text text-xl mb-2 group-hover:text-accent transition-colors">
                {service.title}
              </h3>

              {/* Описание */}
              <p className="text-text-muted text-sm leading-relaxed mb-4">{service.description}</p>

              {/* Буллиты */}
              <ul className="space-y-1.5 mb-5">
                {service.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Цена + стрелка */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                <span className="text-accent font-mono font-semibold text-sm">{service.price}</span>
                <ArrowRight
                  size={18}
                  className="text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
                />
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Модальное окно с формой */}
      <Modal
        isOpen={!!activeService}
        onClose={() => setActiveService(null)}
        title={activeService?.modalTitle ?? ''}
        maxWidth="md"
      >
        {activeService && (
          <ServiceForm
            serviceType={activeService.id}
            onSuccess={() => setActiveService(null)}
          />
        )}
      </Modal>
    </section>
  );
}
