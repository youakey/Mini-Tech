'use client';

import { motion } from 'framer-motion';
import { EquipmentCard } from '@/components/equipment/EquipmentCard';
import { EQUIPMENT_DATA } from '@/data/equipment';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

// Секция «Наша техника» на главной — автоматически берёт featured:true из data/equipment.ts
export function EquipmentSection() {
  const featured = [...EQUIPMENT_DATA]
    .filter((e) => e.featured)
    .sort((a, b) => a.order - b.order);

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
          {featured.map((equipment) => (
            <motion.div key={equipment.slug} variants={fadeUp}>
              <EquipmentCard
                id={equipment.slug}
                name={equipment.name}
                description={equipment.shortDescription}
                imageSrc={equipment.images[0]?.src ?? '/images/equipment-placeholder.webp'}
                imageAlt={equipment.images[0]?.alt ?? equipment.name}
                cardSpecs={equipment.cardSpecs}
                href={`/equipment/${equipment.slug}/`}
                price={equipment.priceDisplay}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
