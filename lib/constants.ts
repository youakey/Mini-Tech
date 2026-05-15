// Все контактные данные и настройки сайта — меняйте здесь
// Ищите "TODO: REPLACE" для быстрой замены заполнителей

export const SITE = {
  url: 'https://mini-tech.by',
  name: 'МиниТех Брест',
  description:
    'Аренда строительной мини-техники с оператором в Бресте и Брестской области. Мини-экскаватор Volvo EC25 и мини-погрузчик CAT 226B.',
  locale: 'ru_BY',
  lang: 'ru',
} as const;

export const CONTACTS = {
  // TODO: REPLACE — замените на реальный номер телефона
  phone: '+375 25 900-77-77',
  phoneHref: 'tel:+375259007777',
  // TODO: REPLACE — замените на реальный Telegram username
  telegram: '@Nazik1312',
  telegramHref: 'https://t.me/Nazik1312',
  // TODO: REPLACE — замените на реальный WhatsApp номер (международный формат без +)
  whatsapp: '375259007777',
  whatsappHref: 'https://wa.me/375259007777',
  // TODO: REPLACE — замените на реальный Viber номер
  viberHref: 'viber://chat?number=375259007777',
  // TODO: REPLACE — замените на реальный email
  email: 'minitechbrest@gmail.com',
  // TODO: REPLACE — замените на реальный адрес
  address: 'г. Брест, ул. _________',
  // TODO: REPLACE — замените на реальные координаты
  lat: 52.0976,
  lng: 23.6856,
  // Зона обслуживания
  serviceArea: 'Брест и Брестская область',
  areaServed: ['Брест', 'Брестская область', 'Беларусь'],
} as const;

export const WORKING_HOURS = {
  weekdays: 'Пн–Пт: 8:00–19:00',
  saturday: 'Сб: 9:00–17:00',
  sunday: 'Вс: по договорённости',
  // Для JSON-LD schema.org
  schemaHours: [
    'Mo-Fr 08:00-19:00',
    'Sa 09:00-17:00',
  ],
} as const;

// TODO: REPLACE — замените на реальные цены после согласования
export const PRICES = {
  excavator: {
    hourly: 'от 50 BYN/час',
    shift: 'от 350 BYN/смена',
    minimum: '4 часа',
  },
  loader: {
    hourly: 'от 45 BYN/час',
    shift: 'от 300 BYN/смена',
    minimum: '4 часа',
  },
  wasteRemoval: 'от 80 BYN',
  demolition: 'от 150 BYN',
  delivery: 'от 40 BYN (зависит от расстояния)',
} as const;

export const EQUIPMENT = {
  volvoEc25: {
    id: 'volvo-ec25',
    name: 'Мини-экскаватор Volvo EC25',
    slug: '/equipment/volvo-ec25',
    specs: {
      weight: '2 580 кг',
      power: '18,5 кВт (25 л.с.)',
      digDepth: '2 840 мм',
      bucketCapacity: '0,06–0,09 м³',
      dimensions: '3 860 × 1 530 × 2 450 мм',
    },
    description:
      'Компактный экскаватор с нулевым радиусом поворота — идеален для работы в стеснённых условиях: у заборов, построек, деревьев.',
  },
  cat226b: {
    id: 'cat-226b',
    name: 'Мини-погрузчик CAT 226B',
    slug: '/equipment/cat-226b',
    specs: {
      weight: '2 560 кг',
      power: '42 кВт (57 л.с.)',
      liftCapacity: '567 кг',
      tipLoad: '1 134 кг',
      dimensions: '3 730 × 1 520 × 1 990 мм',
    },
    description:
      'Универсальный мини-погрузчик с быстросменным навесным оборудованием: ковш, вилы, гидромолот, планировочный отвал.',
  },
} as const;

export const SEO = {
  keywords: [
    'аренда мини-экскаватора Брест',
    'аренда мини-погрузчика Брест',
    'вывоз строительного мусора Брест',
    'демонтаж зданий Брестская область',
    'аренда строительной техники Брест',
    'мини-экскаватор с оператором Брест',
    'услуги экскаватора Брест',
    'рытьё котлована Брест',
    'траншея под фундамент Брест',
    'снос сараев гаражей Брест',
  ],
  titleTemplate: '%s | МиниТех Брест',
  defaultTitle: 'Аренда мини-экскаватора и погрузчика в Бресте | МиниТех',
  defaultDescription:
    'Аренда мини-экскаватора Volvo EC25 и мини-погрузчика CAT 226B с опытным оператором в Бресте и Брестской области. Рытьё котлованов, вывоз мусора, демонтаж. Звоните!',
} as const;

// TODO: REPLACE — замените после настройки Cloudflare Worker
export const API = {
  workerUrl: process.env.NEXT_PUBLIC_WORKER_URL || 'https://miniteh-brest-telegram.ryzoviosif.workers.dev',
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
} as const;

// TODO: REPLACE — замените на реальный tracking ID после подключения аналитики
export const ANALYTICS = {
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '',
} as const;

// Навигационные ссылки
export const NAV_LINKS = [
  { label: 'Главная', href: '/' },
  {
    label: 'Техника',
    href: '#',
    children: [
      { label: 'Мини-экскаватор Volvo EC25', href: '/equipment/volvo-ec25/' },
      { label: 'Мини-погрузчик CAT 226B', href: '/equipment/cat-226b/' },
    ],
  },
  {
    label: 'Услуги',
    href: '#',
    children: [
      { label: 'Вывоз мусора', href: '/services/waste-removal/' },
      { label: 'Снос и демонтаж', href: '/services/demolition/' },
      { label: 'Доставка техники', href: '/services/delivery/' },
    ],
  },
  { label: 'Блог', href: '/blog/' },
  { label: 'Контакты', href: '/contacts/' },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
