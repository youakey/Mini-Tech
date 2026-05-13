# МиниТех Брест — Сайт аренды строительной техники

Сайт-визитка для компании, занимающейся арендой мини-экскаватора Volvo EC25 и мини-погрузчика CAT 226B с оператором в Бресте и Брестской области, Беларусь.

## Стек технологий

| Слой | Технология |
|---|---|
| Фреймворк | Next.js 14 (App Router, static export) |
| Язык | TypeScript strict |
| Стили | Tailwind CSS 3.4 |
| Анимации | Framer Motion + GSAP ScrollTrigger |
| Формы | React Hook Form + Zod |
| Маска телефона | react-imask |
| Иконки | Lucide React |
| Карусель | Embla Carousel |
| Бэкенд формы | Cloudflare Worker |
| Антиспам | Cloudflare Turnstile |
| Деплой | GitHub Pages + Cloudflare CDN |

---

## Быстрый старт

### 1. Клонируйте репозиторий
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 2. Установите зависимости
```bash
npm install
```

### 3. Запустите локальный сервер разработки
```bash
npm run dev
# Откройте http://localhost:3000
```

---

## Команды

| Команда | Описание |
|---|---|
| `npm run dev` | Локальная разработка (hot reload) |
| `npm run build` | Production-сборка (генерирует `/out`) |
| `npm run lint` | Проверка ESLint |
| `npm run type-check` | Проверка TypeScript |
| `npm run postbuild` | Генерация sitemap.xml |
| `npx serve out` | Локальный просмотр статики |

---

## Где менять контент

Все ключевые данные собраны в `lib/constants.ts`. Найдите строки с `// TODO: REPLACE`:

| Что менять | Где |
|---|---|
| Телефон, Telegram, WhatsApp, email, адрес | `lib/constants.ts` → `CONTACTS` |
| Координаты на карте | `lib/constants.ts` → `CONTACTS.lat / .lng` |
| Цены на услуги | `lib/constants.ts` → `PRICES` |
| Название компании, домен | `lib/constants.ts` → `SITE` |
| Статистика (заказы, опыт) | `components/sections/WhyUsSection.tsx` → `STATS` |
| Отзывы | `components/sections/ReviewsSection.tsx` → `REVIEWS` |
| FAQ | `components/sections/FAQSection.tsx` → `FAQ_ITEMS` |

---

## Замена медиафайлов

### Hero-видео
Поместите файлы в `public/videos/`:
- `hero-bg.webm` — формат VP9, 1080p, ≤ 8 МБ, 15–25 сек
- `hero-bg.mp4` — формат H.264, тот же контент (fallback)
- Постер: `public/images/hero-poster.webp` (первый кадр видео)

### Фото техники
- `public/images/volvo-ec25-thumb.webp` — карточка экскаватора (640×360)
- `public/images/cat-226b-thumb.webp` — карточка погрузчика (640×360)
- `public/images/og-image.webp` — OG-изображение для соцсетей (1200×630)

### Фавиконы
Сгенерируйте на https://realfavicongenerator.net и поместите в `public/`:
- `favicon.ico`, `favicon.svg`
- `apple-touch-icon.png` (180×180)
- `android-chrome-192x192.png`, `android-chrome-512x512.png`

---

## Настройка Telegram-бота (пошагово)

### Шаг 1 — Создайте бота
1. Откройте Telegram, найдите `@BotFather`
2. Отправьте `/newbot`, следуйте инструкциям
3. Получите токен вида `123456789:ABCdef...` — сохраните

### Шаг 2 — Получите chat_id
1. Напишите любое сообщение вашему новому боту
2. Откройте в браузере: `https://api.telegram.org/bot<TOKEN>/getUpdates`
3. Найдите поле `"chat": {"id": ...}` — это ваш chat_id

### Шаг 3 — Задеплойте Cloudflare Worker

```bash
cd workers/telegram-bot

# Установите зависимости Worker
npm install

# Создайте KV namespace
npx wrangler kv:namespace create RATE_LIMIT
# Скопируйте id и preview_id в wrangler.toml

# Задайте секреты (вводятся интерактивно, не сохраняются в файлах)
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler secret put TURNSTILE_SECRET  # если используете Turnstile

# Задеплойте
npx wrangler deploy
```

### Шаг 4 — Настройте NEXT_PUBLIC_WORKER_URL
После деплоя Worker получите его URL вида `https://miniteh-brest-telegram.YOUR_SUBDOMAIN.workers.dev`.

Добавьте в GitHub Secrets (Settings → Secrets → Actions):
- `NEXT_PUBLIC_WORKER_URL` = URL вашего Worker

---

## Деплой на GitHub Pages + Cloudflare

### Шаг 1 — Настройте GitHub Pages
1. Репозиторий → Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `gh-pages` / root

### Шаг 2 — Первый деплой
```bash
git add .
git commit -m "Initial site setup"
git push origin main
```
GitHub Action автоматически соберёт и задеплоит сайт.

### Шаг 3 — Настройте Cloudflare
1. Добавьте сайт в Cloudflare, укажите NS-серверы у регистратора
2. DNS → Добавьте CNAME запись:
   - Имя: `@` (или `www`)
   - Содержимое: `YOUR_USERNAME.github.io`
   - Proxy: включён (оранжевое облако)
3. SSL/TLS → Full (strict)
4. В файле `.github/workflows/deploy.yml` замените `cname: example.by` на ваш домен

### GitHub Secrets (Settings → Secrets and variables → Actions)
| Secret | Значение |
|---|---|
| `NEXT_PUBLIC_WORKER_URL` | URL вашего Cloudflare Worker |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Site key из Cloudflare Turnstile |
| `SITE_URL` | https://ваш-домен.by |

---

## SEO и аналитика

### Google Search Console
1. Зарегистрируйте сайт на https://search.google.com/search-console
2. Скачайте файл верификации `google*.html`
3. Поместите в `public/`
4. Отправьте sitemap: `https://ваш-домен.by/sitemap.xml`

### Plausible Analytics (без cookie)
1. Зарегистрируйтесь на https://plausible.io
2. Добавьте домен
3. В `lib/constants.ts` замените `ANALYTICS.plausibleDomain` на ваш домен

---

## Плейсхолдеры для замены (TODO: REPLACE)

Для быстрого поиска выполните:
```bash
grep -r "TODO: REPLACE" --include="*.ts" --include="*.tsx" --include="*.toml" --include="*.yml" .
```

Основные файлы с плейсхолдерами:
- `lib/constants.ts` — телефон, Telegram, email, адрес, координаты, цены
- `next-sitemap.config.js` — домен сайта
- `public/robots.txt` — домен сайта
- `public/_headers` — URL Cloudflare Worker
- `.github/workflows/deploy.yml` — домен для CNAME
- `workers/telegram-bot/wrangler.toml` — KV namespace ID, routes
