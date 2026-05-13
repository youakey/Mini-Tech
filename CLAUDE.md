# CLAUDE.md

Этот файл содержит постоянные инструкции для Claude Code при работе с этим проектом. Читай его перед любым действием.

## 📋 О проекте

**Название:** Сайт аренды строительной мини-техники в Бресте (РБ)
**Тип:** Production-ready коммерческий сайт-визитка с лидогенерацией
**Деплой:** GitHub Pages + Cloudflare (CDN, SSL, Worker для Telegram-бота)
**Основная цель:** ТОП Google по геозапросам "аренда мини-экскаватора Брест", конверсия в заявки через Telegram-бот

## 🛠 Технологический стек (строго соблюдать)

- **Framework:** Next.js 14+ (App Router) с `output: 'export'` для статического экспорта
- **Язык:** TypeScript strict mode (никогда не использовать `any`)
- **Стили:** Tailwind CSS 3.4+
- **Анимации:** Framer Motion + GSAP ScrollTrigger
- **3D:** React Three Fiber + Drei + GLTF/DRACO
- **Формы:** React Hook Form + Zod
- **Иконки:** Lucide React
- **Бэкенд:** Cloudflare Worker (Telegram Bot API)
- **Антиспам:** Cloudflare Turnstile
- **Аналитика:** Plausible или Cloudflare Web Analytics

## 🚫 Запрещено использовать

- jQuery, Bootstrap, любые legacy-библиотеки
- Инлайн-стили (`style={{}}`) — только Tailwind или CSS Modules
- `any` в TypeScript (используй `unknown` + type guards)
- `console.log` в production-коде
- Хардкод секретов (Telegram token, API keys) в коде
- Сторонние шрифты через `<link>` — только через `next/font`
- `localStorage` без явного согласия пользователя
- Cookie без необходимости (используй cookie-less аналитику)

## ✅ Обязательные правила кода

### TypeScript
- `strict: true`, `noImplicitAny: true`, `strictNullChecks: true`
- Все props компонентов типизированы через interface
- Все API-ответы валидируются через Zod
- Возвращаемые типы функций указаны явно

### Компоненты
- Только функциональные компоненты
- Атомарный подход: один компонент — один файл
- Имена файлов: `PascalCase.tsx` для компонентов, `kebab-case.ts` для утилит
- Каждый компонент имеет JSDoc-комментарий на русском с описанием назначения

### Стили
- Mobile-first: сначала базовые стили, потом `sm:`, `md:`, `lg:`, `xl:`
- Использовать дизайн-токены из `tailwind.config.ts`, не хардкод цветов
- Один H1 на страницу

### Производительность
- Изображения только через `next/image` с указанным `width`/`height`
- Тяжёлые компоненты — через `dynamic()` с `{ ssr: false }` где уместно
- Lazy-load всего, что ниже fold
- LCP-изображение помечать `priority`

### Доступность (a11y)
- Все интерактивные элементы имеют `aria-label` или видимый текст
- `focus-visible:ring-2` на всех фокусируемых элементах
- Модалки имеют focus-trap и закрываются по Escape
- Уважать `prefers-reduced-motion`

### SEO
- Каждая страница экспортирует `generateMetadata` с уникальными title/description
- JSON-LD добавляется через компонент `<JsonLd>` в `components/seo/`
- Геоключи (Брест, Брестская область) присутствуют в H1, H2, alt, title ключевых страниц

## 🔐 Безопасность

- Все секреты — только в Cloudflare Worker через `wrangler secret put`
- Валидация инпутов на клиенте (Zod) И на сервере (Worker)
- CSP-заголовок настроен в `public/_headers`
- Rate limiting в Worker (3 заявки/час с IP)
- Honey-pot + Turnstile на всех формах
- HTTPS принудительно (Cloudflare)

## 📁 Структура проекта

```
/
├── app/                    # Next.js App Router страницы
├── components/             # React-компоненты (layout, hero, equipment, forms, ui, seo)
├── lib/                    # Утилиты (validation, telegram, constants, analytics)
├── content/blog/           # MDX-статьи блога
├── public/                 # Статика (видео, 3D-модели, изображения, фавиконы)
├── workers/telegram-bot/   # Cloudflare Worker
└── .github/workflows/      # GitHub Actions для деплоя
```

## 🎨 Дизайн-токены

```
--color-bg:          #0A0A0A
--color-surface:     #141414
--color-surface-2:   #1F1F1F
--color-text:        #F5F5F5
--color-text-muted:  #A1A1AA
--color-accent:      #F59E0B   /* CTA, ссылки */
--color-accent-hover:#FBBF24
--color-success:     #10B981
--color-error:       #EF4444
--color-border:      #27272A
```

**Шрифты:** Space Grotesk (заголовки), Inter (текст), JetBrains Mono (цифры/ТТХ) — все через `next/font/google` с подмножествами `latin` + `cyrillic`.

## 🛠 Команды

```bash
npm run dev          # Локальная разработка (localhost:3000)
npm run build        # Production-сборка → /out
npm run lint         # ESLint
npm run type-check   # TypeScript-проверка
npm run postbuild    # Генерация sitemap

# Worker
cd workers/telegram-bot && wrangler deploy
```

**Перед коммитом всегда:** `npm run lint && npm run type-check && npm run build`.

## 📞 Контакты-заполнители (заменить перед деплоем)

Все плейсхолдеры помечены `// TODO: REPLACE` или `{/* TODO: REPLACE */}` — ищи их через глобальный поиск VS Code.

Хранятся централизованно в `lib/constants.ts`:
- `PHONE` — телефон в формате `+375XXXXXXXXX`
- `PHONE_DISPLAY` — отображаемый формат `+375 (XX) XXX-XX-XX`
- `TELEGRAM_USERNAME`
- `WHATSAPP_NUMBER`
- `EMAIL`
- `ADDRESS`
- `WORKING_HOURS`
- `GEO_COORDINATES` (для JSON-LD LocalBusiness)

## 🌍 Геолокация и SEO-фокус

- **Регион:** Брест и Брестская область, Республика Беларусь
- **Язык:** русский (`lang="ru"`, hreflang `ru-BY`)
- **Целевые ключи:** "аренда мини-экскаватора Брест", "услуги мини-погрузчика Брест", "вывоз мусора Брест", "демонтаж зданий Брест", "Volvo EC25 Брест", "CAT 226B Брест"
- **Часовой пояс:** Europe/Minsk
- **Валюта:** BYN

## 🤖 Поведение Claude в этом проекте

1. **Перед изменением файла** — обязательно прочитай его целиком, чтобы не сломать существующую логику
2. **Не сокращай код** в ответах — выдавай файлы полностью, готовые к копированию
3. **Комментируй на русском** ключевые блоки, функции, неочевидные решения
4. **Если упираешься в лимит ответа** — ставь маркер `// === ПРОДОЛЖЕНИЕ В СЛЕДУЮЩЕМ СООБЩЕНИИ ===` и продолжай в следующем
5. **При сомнениях по архитектуре** — задай уточняющий вопрос, не делай предположений
6. **После создания/изменения файлов** — кратко резюмируй, что сделано и какие шаги остались
7. **Проверяй чек-лист приёмки** перед тем, как сказать "готово"

## ⚠️ Критичные напоминания

- Сайт деплоится как **статика** на GitHub Pages → нет server-side функций в Next.js, всё через Cloudflare Worker
- `next.config.js` обязательно содержит `output: 'export'` и `images.unoptimized: true`
- Для GitHub Pages в кастомном домене не нужен `basePath`; если домена нет — `basePath: '/repo-name'`
- Все ссылки на внутренние страницы — через `<Link>` из `next/link`
- Hero-видео должно иметь fallback на poster при медленном соединении и `prefers-reduced-motion`

---

## ✅ Состояние проекта (Phase 1 — завершено)

`npm run type-check` → 0 ошибок · `npm run lint` → 0 предупреждений · `npm run build` → статический экспорт ✓

### Созданные файлы

**Конфиги корня:**
- `package.json` — все зависимости (next 14, framer-motion, gsap, @react-three/fiber, react-hook-form, zod, react-imask, embla-carousel-react, next-themes, @hookform/resolvers)
- `tsconfig.json` — strict mode, paths alias `@/*`
- `next.config.js` — `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`
- `tailwind.config.ts` — кастомные цвета (bg/surface/accent/error/success/border), font-vars
- `.eslintrc.json`, `.prettierrc`, `.gitignore`, `next-sitemap.config.js`

**`lib/` (утилиты):**
- `lib/constants.ts` — все контакты, цены, SEO-ключи, навигация (все `// TODO: REPLACE`)
- `lib/validation.ts` — Zod-схемы: `LeadFormSchema`, `WasteRemovalFormSchema`, `DemolitionFormSchema`, `DeliveryFormSchema`
- `lib/telegram.ts` — fetch-хелпер к Cloudflare Worker
- `lib/analytics.ts` — обёртка над Plausible (no-op без скрипта)
- `lib/schemas.ts` — JSON-LD строители: `organizationSchema()`, `localBusinessSchema()`, `faqPageSchema()`, `breadcrumbSchema()`, `serviceSchema()`
- `lib/faq.ts` — данные FAQ (отдельно от клиентского компонента, чтобы избежать server/client boundary ошибки)

**`app/`:**
- `app/globals.css` — CSS custom properties, Tailwind layers, утилиты `.container-site`, `.section`, `.card`, `.skeleton`
- `app/layout.tsx` — шрифты (Inter, Space Grotesk, JetBrains Mono через `next/font`), skip-link, ThemeProvider, JSON-LD Organization, геомета
- `app/page.tsx` — главная, импортирует секции, JSON-LD LocalBusiness + FAQPage

**`components/ui/`:** Button (variant/size/loading), Modal (focus-trap, ESC, overlay), Toast (auto-dismiss), Skeleton, Accordion (aria-expanded, AnimatePresence)

**`components/seo/`:** JsonLd (dangerouslySetInnerHTML)

**`components/forms/`:** FormField (input+textarea унифицированы), FormSuccess (spring-анимация), LeadForm (маска +375, honey-pot, consent, состояния idle/loading/success/error), ServiceForm (3 отдельных sub-form с FieldValues generic для совместимости с react-hook-form strict typing)

**`components/layout/`:** Nav (hover-dropdowns с таймером), Header (sticky + backdrop-blur, floating phone FAB на mobile), MobileMenu (slide-in overlay, закрытие по route change), Footer (4 колонки)

**`components/hero/`:** HeroVideo (prefers-reduced-motion + effectiveType проверки), HeroOverlay (stagger Framer Motion, CTA)

**`components/equipment/`:** EquipmentCard (hover lift + glow, Image, specs grid)

**`components/sections/`:** EquipmentSection, ServicesSection (Modal + ServiceForm), WhyUsSection (AnimatedCounter через IntersectionObserver), HowWeWorkSection (4 карточки + ArrowRight/ArrowDown между ними, hover glow, flatMap для stagger — анимированная линия удалена), ReviewsSection (Embla Carousel), CTAFormSection, FAQSection

**`workers/telegram-bot/`:** `index.ts` — CORS preflight, Turnstile verify, KV rate limit (3 req/hour/IP), форматированное Telegram сообщение с inline-кнопками; `wrangler.toml`, `package.json`, `tsconfig.json`

**Deploy & public:** `.github/workflows/deploy.yml` (peaceiris/actions-gh-pages), `public/_headers` (CSP, HSTS, X-Frame-Options), `public/robots.txt`, `public/site.webmanifest`, `README.md`

### Ключевые решения Phase 1
- **FAQ_ITEMS** вынесены в `lib/faq.ts`, а не экспортируются из `'use client'` компонента — иначе Next.js App Router падает с "Attempted to call map() from the server but map is on the client"
- **ServiceForm** использует `useForm<FieldValues>` + кастомный generic для `Control` и `Register` в shared helpers, чтобы react-hook-form strict types не конфликтовали между тремя sub-form
- **keywords** в `app/layout.tsx` передаются как `[...SEO.keywords]` (spread), т.к. `as const` делает массив readonly, а Next.js Metadata ожидает `string[]`

---

## ✅ Состояние проекта (Phase 2 — завершено + post-phase2 фиксы)

`npm run type-check` → 0 ошибок · `npm run build` → 11 статических страниц ✓
Worker задеплоен: `miniteh-brest-telegram.ryzoviosif.workers.dev` ✓

### Добавленные файлы Phase 2

**`components/equipment/`:**
- `SpecsTable.tsx` — таблица ТТХ: чётные/нечётные строки, JetBrains Mono для значений
- `Equipment3DViewer.tsx` — публичный wrapper: IntersectionObserver + Skeleton fallback
- `Equipment3DViewerInner.tsx` — **CSS/Framer Motion заглушка** (НЕ R3F): mouse-tilt через `useMotionValue`+`useSpring`+`perspective`, плавающий SVG-ковш, вращающиеся кольца, радиальное свечение. R3F удалён из-за `ReactCurrentOwner` TypeError в Next.js static export. Когда будут реальные GLTF-модели — восстановить R3F-версию.

**`components/map/`:**
- `LeafletMap.tsx` — wrapper (dynamic ssr:false, Skeleton)
- `LeafletMapInner.tsx` — react-leaflet: OSM tiles, Marker+Popup, Circle 50 км, фикс иконки Webpack

**`app/equipment/`:** `volvo-ec25/page.tsx`, `cat-226b/page.tsx` — H1, 3D-вьюер, SpecsTable, capability list, SEO-текст, LeadForm, JSON-LD Service+Breadcrumb

**`app/services/`:** `waste-removal/`, `demolition/`, `delivery/` — 1500+ зн. SEO-текст, структурированный контент, LeadForm, JSON-LD Service+Breadcrumb

**`app/contacts/page.tsx`** — Leaflet карта, карточки контактов, города Брестской области, LeadForm, JSON-LD LocalBusiness+Breadcrumb

**`app/privacy/page.tsx`** — политика конфиденциальности: 10 разделов, оглавление с anchor-ссылками, закон РБ 99-З + GDPR, данные из `lib/constants.ts`, `robots: noindex`. Ссылки из LeadForm + ServiceForm + Footer ведут сюда.

### Post-Phase 2 фиксы (баги, исправленные после первичной сдачи)

**Breadcrumbs перекрывали header:**
- Причина: `<main>` не имел `padding-top`, весь контент начинался с `top: 0` — под прозрачным `fixed z-40` header.
- Фикс: `app/layout.tsx` → `<main className="pt-16 sm:pt-20">` (= высота header h-16/h-20).
- Фикс: `app/page.tsx` → hero-секция получила `-mt-16 sm:-mt-20`, чтобы видео оставалось full-screen под прозрачным header.

**`asChild` prop на DOM-элементе (Button.tsx):**
- Причина: `asChild` объявлен в интерфейсе, но не деструктурирован — попадал в `...props` на `<button>`.
- Фикс: установлен `@radix-ui/react-slot`, `Button` деструктурирует `asChild`, при `asChild=true` рендерит `<Slot>` (сливает className+onClick с дочерним элементом).
- `EquipmentCard`: `asChild` + `<Link>` внутри, иконка ArrowRight перенесена внутрь Link.

**HowWeWorkSection — линия перекрывала текст, потом полный редизайн:**
- Линия удалена. Новый дизайн: 4 карточки в flex-row/col + `<ArrowRight>`/`<ArrowDown>` между ними (opacity-25). Карточка: большая цифра 01-04 (accent/25), иконка, заголовок, описание. Hover: `y: -6` + amber boxShadow glow. Framer Motion `flatMap` → плоский массив motion-элементов для корректного staggerChildren.

**Worker — `{"ok":false,"error":"Ошибка отправки уведомления"}`:**
- Причина 1: `url: 'tel:+375...'` в `inline_keyboard` — Telegram Bot API принимает только `http://`, `https://`, `tg://`. `tel:` → 400, `res.ok === false`.
- Причина 2: `parse_mode: 'Markdown'` — ломался на спецсимволах в пользовательском вводе.
- Причина 3: `return res.ok` — заглушал реальную ошибку Telegram без чтения тела ответа.
- Фикс: `parse_mode: 'HTML'` + `escapeHtml()` для всех полей формы, кнопка `tel:` удалена (оставлена только `callback_data: 'lead_accepted'`), `sendTelegram` теперь читает `data.ok` + `data.description` и возвращает реальную ошибку клиенту. Добавлено подробное логирование (токен маскируется, длина логируется).
- Worker деплоится командой: `npx wrangler deploy --config wrangler.toml` из `workers/telegram-bot/` — обязателен флаг `--config`, иначе подхватывается `wrangler.jsonc` из корня проекта (OpenNext конфиг).

**ReactCurrentOwner TypeError (@react-three/fiber):**
- Причина: R3F v8 обращается к internal React API (`ReactCurrentOwner`), которое дедуплицируется неправильно в static export + Turbopack.
- Фикс 1: `transpilePackages: ['@react-three/fiber', '@react-three/drei', 'three']` в `next.config.js`.
- Фикс 2: `Equipment3DViewerInner.tsx` полностью переписан без R3F — CSS/Framer Motion заглушка (см. выше). R3F-зависимости в package.json оставлены для будущего восстановления.

### Зависимости добавлены в Phase 2
- `leaflet ^1.9.4` + `react-leaflet ^4.2.1` + `@types/leaflet ^1.9.14`
- `@radix-ui/react-slot` — для `asChild` в Button

---

## ✅ Состояние проекта (Phase 3 — завершено)

`npm run type-check` → 0 ошибок · `npm run build` → 16 статических страниц ✓  
Sitemap включает все страницы включая 5 статей блога.

### Добавленные файлы Phase 3

**`content/blog/`** — 5 MDX-статей по 2000+ знаков каждая:
- `arenda-mini-ekskavatora-brest.mdx` — аренда Volvo EC25, цены, как заказать
- `stoimost-vyvoza-musora-brest.mdx` — вывоз строительного мусора, CAT 226B
- `demontazh-postroek-brest.mdx` — снос сараев, гаражей, домов, этапы работ
- `volvo-ec25-vs-cat-226b.mdx` — сравнение техники, markdown-таблица, сценарии
- `planirovka-uchastka-brest.mdx` — земляные работы, котлован, дренаж, пни

Каждая статья: frontmatter (title, date, description, keywords, readTime), H2/H3 структура, внутренние ссылки на страницы техники и услуг, CTA-блок в конце.

**`lib/mdx.ts`** — утилиты для серверных компонентов:
- `getAllPosts()` — синхронная, возвращает `BlogPostMeta[]` отсортированных по дате
- `getPostBySlug(slug)` — асинхронная, возвращает `BlogPost` с `htmlContent`
- MDX → HTML через `unified` + `remark-parse` + `remark-gfm` + `remark-rehype` + `rehype-stringify`

**`app/blog/page.tsx`** — сетка карточек (дата, время чтения, описание), JSON-LD CollectionPage, breadcrumbs, generateMetadata.

**`app/blog/[slug]/page.tsx`** — статья:
- `generateStaticParams()` — перечисляет все slug для static export
- `generateMetadata()` — per-article OG/meta (async params — Next.js 15+ pattern)
- Рендер через `dangerouslySetInnerHTML` с `prose prose-invert prose-amber` классами
- JSON-LD Article + BreadcrumbList
- CTA-блок с кнопками "Оставить заявку" и телефон

**`app/not-found.tsx`** — кастомная 404: большой "404" акцентным цветом, 5 навигационных ссылок, кнопка "На главную".

### Зависимости добавлены в Phase 3
- `unified@11.0.5` + `remark-parse@11.0.0` + `remark-rehype@11.1.2` + `rehype-stringify@10.0.1`
- `gray-matter@4.0.3` — парсинг frontmatter MDX-файлов
- `remark-gfm@4.0.1` — GFM tables, strikethrough в статьях
- `@tailwindcss/typography@0.5.19` — `prose prose-invert prose-amber` для оформления статей

### Ключевые решения Phase 3

**`next-mdx-remote` несовместима с Next.js 16** — та же проблема "React Element from older version", что была с R3F. Решение: `unified` pipeline (Markdown → HTML строка) + `dangerouslySetInnerHTML`. Безопасно: MDX-файлы — собственный контент репозитория, не пользовательский ввод. Теряется возможность использовать React-компоненты внутри MDX — для SEO-статей это несущественно.

**async params** в `app/blog/[slug]/page.tsx` — Next.js 15+ требует `params: Promise<{slug: string}>` + `await params`. Применён этот паттерн.

**deprecated `eslint` ключ** в `next.config.js` удалён (Next.js 16 не поддерживает его).

---

## 🔜 Оставшиеся задачи

- **Реальные контакты** — заменить TODO: REPLACE маркеры в `lib/constants.ts` (телефон, Telegram, WhatsApp, email, адрес, координаты, домен)
- **Реальный домен** — обновить `SITE.url` и `next-sitemap.config.js` `siteUrl`
- **GLTF-модели** — восстановить R3F в `Equipment3DViewerInner.tsx` когда будут файлы `/public/models/volvo-ec25.glb` и `/public/models/cat-226b.glb`
- **Hero-видео** — загрузить реальный `/public/video/hero.webm` + `hero.mp4` + `hero-poster.webp`
- **Фотографии техники** — изображения для EquipmentCard и equipment pages
- **OG-изображение** — `/public/og-image.jpg` (1200×630)

---

## 🏗 Принятые архитектурные решения

### Карусель отзывов — Embla Carousel
Выбран вместо Swiper из-за меньшего bundle-size и отсутствия CSS-зависимостей. Используется hook `useEmblaCarousel` напрямую — никаких глобальных стилей, полный контроль над анимацией через Framer Motion. Lazy-загрузка через `<Suspense>` в `app/page.tsx`.

### Форма → Cloudflare Worker → Telegram
**Клиент:** React Hook Form + Zod валидация → `lib/telegram.ts` делает `fetch POST /api/lead` к Worker URL из `NEXT_PUBLIC_WORKER_URL`.

**Worker** (`workers/telegram-bot/index.ts`):
1. CORS preflight (OPTIONS)
2. Проверка секретов: логируем длину токена (не сам токен) и chat_id
3. Rate limit: KV store ключ `rl:{ip}` с TTL 3600s, max 3 запроса
4. Turnstile: `POST challenges.cloudflare.com/turnstile/v0/siteverify`
5. Валидация payload (name ≥ 2 символа, phone ≥ 10 символов)
6. `POST api.telegram.org/bot{TOKEN}/sendMessage` — `parse_mode: 'HTML'`, все поля формы проходят через `escapeHtml()` (`&→&amp;`, `<→&lt;`, `>→&gt;`). Inline keyboard: только `callback_data: 'lead_accepted'` — `tel:` URL не поддерживается Telegram Bot API.
7. Читаем тело ответа Telegram даже при `!res.ok` → возвращаем `data.description` клиенту вместо общей фразы.
8. Секреты: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `TURNSTILE_SECRET` — только через `wrangler secret put`.
9. **Деплой**: `cd workers/telegram-bot && npx wrangler deploy --config wrangler.toml` — флаг `--config` обязателен, иначе подхватывается `wrangler.jsonc` из корня (OpenNext).

**Антиспам:** honey-pot `website` + Turnstile + KV rate limit.

### JSON-LD schema.org — строители в `lib/schemas.ts`
Все схемы собираются функциями-строителями, а не inline-объектами, чтобы:
- Переиспользовать данные из `lib/constants.ts` (контакты, координаты, часы работы)
- Не дублировать одни и те же поля на разных страницах
- Легко тестировать в Google Rich Results Test

Страница рендерит `<JsonLd data={схема()} />` — компонент в `components/seo/JsonLd.tsx` прокидывает данные через `dangerouslySetInnerHTML`. На главной: `localBusinessSchema()` + `faqPageSchema(FAQ_ITEMS)` + `organizationSchema()` (в layout).

### Server / Client boundary
Правило: данные (массивы, константы) живут в `lib/` (сервер-совместимые файлы без `'use client'`). Компоненты с хуками, анимациями, браузерными API — `'use client'`. Серверные страницы (`app/page.tsx`) импортируют только из `lib/` и серверных компонентов — это исключает runtime-ошибки Next.js App Router.

### Button asChild — @radix-ui/react-slot
`Button` поддерживает `asChild?: boolean`. Когда `true` — рендерит `<Slot>` из `@radix-ui/react-slot` вместо `<button>`. Slot сливает className, onClick и другие props с единственным дочерним элементом (например, `<Link>`), не добавляя лишнего DOM-узла. Использование: `<Button asChild><Link href="...">текст</Link></Button>`. При `asChild=true` props `isLoading`, `leftIcon`, `rightIcon`, `disabled` деструктурируются отдельно и НЕ попадают в Slot (невалидны для `<a>`). Иконки при `asChild` нужно помещать внутрь дочернего элемента вручную.

### Equipment3DViewer — CSS/Framer Motion вместо R3F
`@react-three/fiber` v8 конфликтует с Next.js 14 static export (`output: 'export'`): падает с `TypeError: Cannot read properties of undefined (reading 'ReactCurrentOwner')`. Временное решение — `Equipment3DViewerInner.tsx` реализован на Framer Motion: mouse-tilt через `useMotionValue` + `useSpring` + CSS `perspective`, плавающий SVG, вращающиеся ring-элементы. `transpilePackages: ['@react-three/fiber', '@react-three/drei', 'three']` в `next.config.js` добавлен как дополнительная мера. Когда будут реальные GLTF-модели — восстановить R3F через `useGLTF(path, true)` (true = DRACO). `Equipment3DViewer.tsx` (публичный wrapper с `dynamic({ ssr: false })` + IntersectionObserver) менять не нужно.