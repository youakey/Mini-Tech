'use client';

import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { LeadForm } from '@/components/forms/LeadForm';
import { CONTACTS, WORKING_HOURS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

// CTA-секция с формой заявки и контактным блоком
export function CTAFormSection() {
  return (
    <section
      id="lead-form"
      className="section bg-surface-2"
      aria-labelledby="cta-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Левая колонка: текст + контакты */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={fadeUp} className="accent-line" />
            <motion.h2
              variants={fadeUp}
              id="cta-heading"
              className="section-title mb-4"
            >
              Оставьте заявку —<br />
              <span className="text-accent">перезвоним за 15 минут</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle mb-8">
              Опишите задачу — рассчитаем стоимость бесплатно. Работаем по Бресту и Брестской области.
            </motion.p>

            {/* Телефон */}
            <motion.a
              variants={fadeUp}
              href={CONTACTS.phoneHref}
              className="flex items-center gap-4 group mb-6"
              onClick={() => trackEvent('phone_click')}
              itemProp="telephone"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center
                              text-accent group-hover:bg-accent group-hover:text-bg transition-all duration-300">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-0.5">Позвонить</p>
                <p className="text-text font-heading font-bold text-2xl group-hover:text-accent transition-colors">
                  {CONTACTS.phone}
                </p>
              </div>
            </motion.a>

            {/* Мессенджеры */}
            <motion.div variants={fadeUp} className="flex gap-3 mb-8">
              <a
                href={CONTACTS.telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0088cc]/10 border border-[#0088cc]/20
                           text-[#0088cc] hover:bg-[#0088cc] hover:text-white transition-all duration-200 text-sm font-medium"
                aria-label="Написать в Telegram"
                onClick={() => trackEvent('telegram_click')}
              >
                <MessageCircle size={16} />
                Telegram
              </a>
              <a
                href={CONTACTS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25d366]/10 border border-[#25d366]/20
                           text-[#25d366] hover:bg-[#25d366] hover:text-white transition-all duration-200 text-sm font-medium"
                aria-label="Написать в WhatsApp"
                onClick={() => trackEvent('whatsapp_click')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </motion.div>

            {/* График работы */}
            <motion.div
              variants={fadeUp}
              className="bg-surface border border-border rounded-2xl p-5 space-y-2"
            >
              <p className="text-text font-semibold text-sm mb-3">График работы</p>
              {[WORKING_HOURS.weekdays, WORKING_HOURS.saturday, WORKING_HOURS.sunday].map((h) => (
                <p key={h} className="text-text-muted text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                  {h}
                </p>
              ))}
            </motion.div>
          </motion.div>

          {/* Правая колонка: форма */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-surface border border-border rounded-2xl p-6 sm:p-8"
          >
            <h3 className="font-heading font-bold text-text text-xl mb-6">
              Оставить заявку
            </h3>
            <LeadForm source="cta-section" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
