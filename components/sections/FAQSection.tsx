'use client';

import { motion } from 'framer-motion';
import { Accordion } from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import { FAQ_ITEMS } from '@/lib/faq';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

// Адаптируем данные для компонента Accordion
const ACCORDION_ITEMS: AccordionItem[] = FAQ_ITEMS.map((item, index) => ({
  id: `faq-${index}`,
  question: item.question,
  answer: item.answer,
}));

// Секция FAQ с аккордеоном и гео-ключами (оптимизирована для featured snippets)
export function FAQSection() {
  return (
    <section className="section bg-bg" aria-labelledby="faq-heading">
      <div className="container-site">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} className="accent-line mx-auto" />
            <motion.h2 variants={fadeUp} id="faq-heading" className="section-title">
              Частые вопросы
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              Об аренде строительной техники в Бресте и Брестской области
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <Accordion items={ACCORDION_ITEMS} allowMultiple={false} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
