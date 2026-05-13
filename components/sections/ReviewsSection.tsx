'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

// TODO: REPLACE — замените на реальные отзывы
const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Александр К.',
    location: 'Брест, Берёзовка',
    rating: 5,
    service: 'Рытьё котлована под фундамент',
    date: 'Октябрь 2025',
    text: 'Заказывал мини-экскаватор для рытья котлована под дом. Ребята приехали вовремя, работали аккуратно, не задели ни забор, ни соседские посадки. Котлован готов за 4 часа. Рекомендую!',
  },
  {
    id: '2',
    name: 'Виктор М.',
    location: 'Брестский район',
    rating: 5,
    service: 'Снос старого сарая',
    date: 'Сентябрь 2025',
    text: 'Нужно было снести старый кирпичный сарай 6×8 м. Справились за один день, мусор тоже вывезли. Цена оказалась ниже, чем у конкурентов. Второй раз уже обращаюсь.',
  },
  {
    id: '3',
    name: 'Ирина Л.',
    location: 'Брест, Граево',
    rating: 5,
    service: 'Вывоз строительного мусора',
    date: 'Август 2025',
    text: 'После ремонта накопилась куча строительного мусора. Погрузили и вывезли за 2 часа. Двор оставили чистым. Приятно работать с профессионалами.',
  },
  {
    id: '4',
    name: 'Дмитрий П.',
    location: 'Берёза, Брестская область',
    rating: 5,
    service: 'Планировка территории',
    date: 'Июль 2025',
    text: 'Заказывал планировку участка 20 соток и траншею под дренаж. Оператор дельный, технику знает хорошо. Всё выполнено точно по плану. Буду обращаться ещё.',
  },
  {
    id: '5',
    name: 'Николай С.',
    location: 'Брест, Задворцы',
    rating: 5,
    service: 'Копка колодца',
    date: 'Июнь 2025',
    text: 'Нужна была копка под колодезные кольца. Взяли экскаватор на 3 часа. Глубина 5 м за пол-дня. Работали без лишних слов, результатом доволен.',
  },
];

// Секция отзывов с каруселью Embla
export function ReviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="section bg-bg overflow-hidden" aria-labelledby="reviews-heading">
      <div className="container-site">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4"
        >
          <div>
            <motion.div variants={fadeUp} className="accent-line" />
            <motion.h2 variants={fadeUp} id="reviews-heading" className="section-title mb-2">
              Отзывы клиентов
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              Работаем в Бресте и Брестской области
            </motion.p>
          </div>

          {/* Кнопки навигации */}
          <motion.div variants={fadeUp} className="flex gap-2 shrink-0">
            <button
              onClick={scrollPrev}
              className="icon-btn"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="icon-btn"
              aria-label="Следующий отзыв"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </motion.div>

        {/* Карусель */}
        <div ref={emblaRef} className="overflow-hidden -mx-4 px-4">
          <div className="flex gap-6 touch-pan-y">
            {REVIEWS.map((review) => (
              <article
                key={review.id}
                className="card flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
                itemScope
                itemType="https://schema.org/Review"
              >
                {/* Звёзды */}
                <div className="flex gap-0.5 mb-3" aria-label={`Оценка: ${review.rating} из 5`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-accent fill-accent" />
                  ))}
                </div>

                {/* Текст отзыва */}
                <blockquote
                  className="text-text text-sm leading-relaxed mb-4"
                  itemProp="reviewBody"
                >
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {/* Тег услуги */}
                <span className="inline-block text-xs text-accent bg-accent/10 border border-accent/20
                                 rounded-full px-3 py-1 mb-4">
                  {review.service}
                </span>

                {/* Автор */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="font-semibold text-text text-sm" itemProp="author">{review.name}</p>
                    <p className="text-text-muted text-xs">{review.location}</p>
                  </div>
                  <time className="text-text-muted text-xs" itemProp="datePublished">
                    {review.date}
                  </time>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
