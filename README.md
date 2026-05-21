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

## Как добавить новую технику или услугу

Добавление занимает ~5 минут и не требует трогать страницы, навигацию или компоненты.

### Добавить новую единицу техники

1. **Откройте `data/equipment.ts`**
2. **Скопируйте существующий объект** (например, блок `volvo-ec25`) и добавьте его в конец массива `EQUIPMENT_DATA`
3. **Заполните поля:**
   ```ts
   {
     slug: 'новый-экскаватор',       // URL будет /equipment/новый-экскаватор/
     name: 'Название техники',
     type: 'excavator',              // или 'loader' | 'other'
     category: 'Мини-экскаватор',
     shortDescription: '...',        // для карточки на главной
     specs: [...],                   // таблица ТТХ
     cardSpecs: [...],               // 3 параметра для карточки
     capabilities: [...],            // что умеет делать
     priceDisplay: 'от XX BYN/час',
     priceNote: 'минимальный заказ X часов',
     minBooking: 'X часов',
     images: [{ src: '/images/equipment/slug/thumb.webp', alt: '...' }],
     modelGlb: '/models/slug.glb',   // опционально
     featured: true,                 // показывать на главной
     order: 3,                       // порядок сортировки
     seo: { title, metaDescription, ogDescription, ... }
   }
   ```
4. **Положите фото** в `public/images/equipment/[slug]/`:
   - `thumb.webp` — для карточки на главной (400×300)
   - `main.webp` — для hero страницы (1600×1000)
   - `og.webp` — для Open Graph превью (1200×630)
5. **Соберите и запушьте:**
   ```bash
   npm run build && git add . && git commit -m "feat: add new equipment" && git push
   ```

Готово — страница `/equipment/slug/`, карточка на главной и пункт в меню появятся автоматически.

---

### Добавить новую услугу

1. **Откройте `data/services.ts`**
2. **Скопируйте существующий объект** и добавьте в конец массива `SERVICES_DATA`
3. **Заполните поля** (аналогично технике: `slug`, `serviceType`, `name`, `hero`, `detailSections`, `seoText`, `seo`)
4. **Зарегистрируйте `serviceType`** в схеме Zod: `lib/validation.ts` → добавьте новое значение в `ServiceType`
5. **Добавьте логику в Worker** (`workers/telegram-bot/index.ts`) для обработки нового типа формы
6. **Соберите и запушьте** — страница, карточка на главной и пункт в меню появятся автоматически

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

### Шаг 2 — Получите chat_id (один или несколько)

Worker поддерживает рассылку в несколько чатов через `TELEGRAM_CHAT_IDS` (IDs через запятую).

1. Напишите `/start` вашему новому боту
2. Откройте в браузере: `https://api.telegram.org/bot<TOKEN>/getUpdates`
3. Найдите поле `"chat": {"id": ...}` — это ваш chat_id
4. Если хотите отправлять уведомления и владельцу, и клиенту:
   - Клиент находит свой ID через `@userinfobot` в Telegram
   - Клиент пишет `/start` вашему боту
   - Итоговая строка: `ВАШ_ID,ID_КЛИЕНТА`

### Шаг 3 — Задеплойте Cloudflare Worker

```bash
cd workers/telegram-bot

# Установите зависимости Worker
npm install

# Создайте KV namespace
npx wrangler kv:namespace create RATE_LIMIT
# Скопируйте id и preview_id в wrangler.toml

# Задайте секреты (вводятся интерактивно, не сохраняются в файлах)
npx wrangler secret put TELEGRAM_BOT_TOKEN --config wrangler.toml
npx wrangler secret put TELEGRAM_CHAT_IDS --config wrangler.toml
# Введите: ВАШ_CHAT_ID,CHAT_ID_КЛИЕНТА  (или только один ID)
npx wrangler secret put TURNSTILE_SECRET --config wrangler.toml  # если используете Turnstile

# Задеплойте
npx wrangler deploy --config wrangler.toml
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
