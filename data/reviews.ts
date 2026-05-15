import { SITE } from '@/lib/constants';

export interface Review {
  id: string;
  author: string;
  date: string;       // ISO 8601
  rating: number;     // 1–5
  text: string;
  service?: string;   // Какой услугой воспользовались
}

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Андрей К.',
    date: '2024-08-15',
    rating: 5,
    text: 'Заказывали мини-экскаватор Volvo EC25 для рытья траншеи под фундамент. Оператор работал аккуратно и быстро — всё сделали за один день. Цена соответствует качеству. Однозначно буду обращаться снова.',
    service: 'Аренда мини-экскаватора',
  },
  {
    id: 'r2',
    author: 'Светлана М.',
    date: '2024-09-02',
    rating: 5,
    text: 'Нужно было убрать строительный мусор после ремонта. Погрузчик CAT 226B справился за несколько часов. Приехали вовремя, всё чисто сделали. Рекомендую!',
    service: 'Вывоз строительного мусора',
  },
  {
    id: 'r3',
    author: 'Игорь Т.',
    date: '2024-10-20',
    rating: 5,
    text: 'Сносили старый сарай на даче. Обратились в МиниТех — не пожалели. Быстро, аккуратно, без повреждений соседних построек. Оператор профессионал своего дела.',
    service: 'Демонтаж построек',
  },
  {
    id: 'r4',
    author: 'Дмитрий Л.',
    date: '2024-11-05',
    rating: 5,
    text: 'Планировка участка под строительство дома. Очень доволен — разровняли территорию идеально. Цена оказалась ниже, чем у других предложений по Брестской области.',
    service: 'Планировка участка',
  },
  {
    id: 'r5',
    author: 'Наталья В.',
    date: '2025-01-14',
    rating: 5,
    text: 'Быстрый ответ на заявку, приехали на следующий день. Работа выполнена качественно. Единственное — хотелось бы больше фото техники на сайте, но по результату претензий нет.',
    service: 'Аренда мини-экскаватора',
  },
  {
    id: 'r6',
    author: 'Роман С.',
    date: '2025-03-08',
    rating: 5,
    text: 'Отличная компания! Заказывали демонтаж старого гаража. Работу выполнили за 4 часа, вывезли всё самостоятельно. Буду рекомендовать знакомым.',
    service: 'Демонтаж построек',
  },
];

/** Схема AggregateRating для JSON-LD (используйте в LocalBusiness schema) */
export function aggregateRatingSchema() {
  const total = REVIEWS.reduce((sum, r) => sum + r.rating, 0);
  const avg = (total / REVIEWS.length).toFixed(1);
  return {
    '@type': 'AggregateRating',
    ratingValue: avg,
    reviewCount: REVIEWS.length,
    bestRating: '5',
    worstRating: '1',
  };
}

/** Полные Review-объекты для JSON-LD */
export function reviewsSchema() {
  return REVIEWS.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.author },
    datePublished: r.date,
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'МиниТех Брест',
      url: SITE.url,
    },
  }));
}
