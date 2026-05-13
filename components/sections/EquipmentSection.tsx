'use client';

import { motion } from 'framer-motion';
import { EquipmentCard, EXCAVATOR_SPECS, LOADER_SPECS } from '@/components/equipment/EquipmentCard';
import { PRICES } from '@/lib/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

// Секция "Наша техника" на главной
export function EquipmentSection() {
  return (
    <section className="section bg-bg" aria-labelledby="equipment-heading">
      <div className="container-site">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp} className="accent-line mx-auto" />
          <motion.h2 variants={fadeUp} id="equipment-heading" className="section-title">
            Наша техника
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle max-w-2xl mx-auto">
            Современные мини-машины с опытными операторами. Аренда по Бресту и Брестской области.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          <motion.div variants={fadeUp}>
            <EquipmentCard
              id="volvo-ec25"
              name="Мини-экскаватор Volvo EC25"
              description="Компактный экскаватор с нулевым радиусом поворота. Идеален для работы в стеснённых условиях: у заборов, деревьев, построек. Рытьё котлованов под фундамент и септики в Бресте."
              imageSrc="/images/volvo-ec25-thumb.webp"
              imageAlt="Мини-экскаватор Volvo EC25 в работе в Бресте — рытьё котлована"
              specs={EXCAVATOR_SPECS}
              href="/equipment/volvo-ec25/"
              price={PRICES.excavator.hourly}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <EquipmentCard
              id="cat-226b"
              name="Мини-погрузчик CAT 226B"
              description="Универсальный погрузчик с быстросменным навесным оборудованием: ковш, вилы, гидромолот, планировочный отвал. Незаменим на стройплощадках Бреста и Брестской области."
              imageSrc="/images/cat-226b-thumb.webp"
              imageAlt="Мини-погрузчик CAT 226B с ковшом — аренда в Бресте"
              specs={LOADER_SPECS}
              href="/equipment/cat-226b/"
              price={PRICES.loader.hourly}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
