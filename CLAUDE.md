# CLAUDE.md

Этот файл содержит постоянные инструкции для Claude Code при работе с этим проектом.

## 📋 О проекте

**Сайт:** https://mini-tech.by  
**Репозиторий:** https://github.com/youakey/Mini-Tech (ветка `main`)  
**Тип:** Production-ready коммерческий сайт-визитка + лидогенерация  
**Деплой:** GitHub Pages (CI: `actions/upload-pages-artifact` + `actions/deploy-pages`)  
**Cloudflare Worker:** `miniteh-brest-telegram.ryzoviosif.workers.dev` (POST /api/lead)

## 🛠 Стек

Next.js 16 (App Router, `output: 'export'`) · TypeScript strict · Tailwind CSS 3.4  
Framer Motion + GSAP · React Hook Form + Zod · react-imask · Lucide React  
Embla Carousel · next-themes · Leaflet (карта контактов)  
Cloudflare Worker (Telegram Bot API + Turnstile + KV rate limit)  
Plausible / Cloudflare Web Analytics (cookie-less)

## 🚫 Запрещено

- `any` в TypeScript (используй `unknown` + type guards)
- Инлайн-стили — только Tailwind/CSS Modules (исключение: `opengraph-image.tsx` — Satori требует inline styles)
- `console.log` в production-коде (Worker — под eslintignore)
- Хардкод секретов; сторонние шрифты через `<link>`; jQuery/Bootstrap

## ✅ Правила кода

- TypeScript strict: все props типизированы, возвращаемые типы явные
- Только функциональные компоненты; один компонент — один файл
- Файлы: `PascalCase.tsx` для компонентов, `kebab-case.ts` для утилит
- Mobile-first Tailwind; один H1 на страницу
- Изображения через `next/image`; тяжёлые через `dynamic({ ssr: false })`
- `aria-label` на всех интерактивных элементах; `focus-visible:ring-2` на фокусируемых
- Каждая страница экспортирует `generateMetadata`; JSON-LD через `<JsonLd>`

## 📁 Структура

```
app/                    # Next.js App Router
  equipment/[slug]/     # Динамические страницы техники (+ opengraph-image.tsx)
  services/[slug]/      # Динамические страницы услуг (+ opengraph-image.tsx)
  blog/[slug]/          # Блог (MDX → HTML)
  sitemap.ts            # Динамический sitemap
  opengraph-image.tsx   # OG-картинка главной (Satori/ImageResponse)
components/             # layout/ hero/ equipment/ forms/ sections/ ui/ seo/
data/                   # equipment.ts · services.ts · reviews.ts
lib/                    # constants.ts · validation.ts · telegram.ts · analytics.ts · schemas.ts · faq.ts · mdx.ts
content/blog/           # 5 MDX-статей
public/                 # favicon.svg · site.webmanifest · robots.txt · _headers
workers/telegram-bot/   # Cloudflare Worker (wrangler.toml + index.ts)
.github/workflows/      # deploy.yml
```

## 🎨 Дизайн-токены

```
bg: #0A0A0A  surface: #141414  surface-2: #1F1F1F
text: #F5F5F5  text-muted: #A1A1AA  border: #27272A
accent: #F59E0B  accent-hover: #FBBF24  success: #10B981  error: #EF4444
```

Шрифты: Space Grotesk (заголовки) · Inter (текст) · JetBrains Mono (цифры) — через `next/font/google`.

## 🗄 Data-driven архитектура

Техника и услуги живут в `data/`. Добавление новой единицы = объект в массив → страница, карточка, пункт меню автоматически.

| Файл | Экспорты |
|---|---|
| `data/equipment.ts` | `Equipment` interface, `EQUIPMENT_DATA[]` |
| `data/services.ts` | `Service` interface, `SERVICES_DATA[]`, `DetailBlock` union |
| `data/reviews.ts` | `Review` interface, `REVIEWS_DATA[]` |

`DetailBlock` — discriminated union: `checklist`, `included`, `grid-cards`, `steps`, `zone-table`, `equipment-links`.  
`compact` prop на `DetailBlockRenderer` — в two-col колонке `grid-cards` рендерится как вертикальный список (фикс text overflow + `min-w-0`).

## 🔐 Безопасность

- Секреты Worker только через `wrangler secret put`
- Worker: `parse_mode: 'HTML'` + `escapeHtml()`; rate limit 3 req/hour/IP через KV; `tel:` URL не поддерживается Telegram Bot API
- Деплой Worker: `cd workers/telegram-bot && npx wrangler deploy --config wrangler.toml`
- KV reset: `npx wrangler kv key delete "rl:<IP>" --binding RATE_LIMIT --preview false --config wrangler.toml`
- CSP в `public/_headers`

## 🛠 Команды

```bash
npm run dev           # localhost:3000
npm run build         # → /out (static export, без postbuild next-sitemap)
npm run type-check    # TSC
npx eslint . --ext .ts,.tsx --max-warnings 0
```

> `next lint` удалён из CLI в Next.js 16 — использовать `npx eslint` напрямую.

## 📞 Контакты-заполнители

Все `// TODO: REPLACE` в `lib/constants.ts`. Глобальный поиск: `TODO: REPLACE`.

## ✅ Текущее состояние

`type-check` → 0 ошибок · `build` → статический экспорт ✓

### Phase 1–3 (основа)
Layout, все секции главной, формы + Cloudflare Worker, страницы техники и услуг, блог (5 MDX-статей), 404, privacy, Leaflet карта.

### Phase A — data-driven архитектура
- `data/equipment.ts` + `data/services.ts` — все данные вынесены из страниц
- `app/equipment/[slug]/` + `app/services/[slug]/` — единые динамические шаблоны
- Nav, MobileMenu, Footer — dropdown-пункты из data-массивов автоматически
- `lib/constants.ts` NAV_LINKS — `hasDropdown` маркер вместо захардкоженных children
- Фикс: text overflow в detail cards — `compact=true`, `min-w-0`, `break-words hyphens-auto`

### Phase B — Open Graph
- `app/opengraph-image.tsx` — OG главной (Satori, тёмный фон, MT логотип)
- `app/equipment/[slug]/opengraph-image.tsx` + `app/services/[slug]/opengraph-image.tsx`
- `metadataBase` + полный `openGraph` + `twitter` на всех страницах

### Phase C — Favicon
- `public/favicon.svg` — MT логотип (оранжевый квадрат)
- `public/safari-pinned-tab.svg` (монохромный)
- `public/browserconfig.xml` (Windows tiles)
- `public/site.webmanifest` обновлён; layout.tsx icons metadata

### Phase D — Медиа
- `HeroVideo` — CSS-градиент fallback (нет 404 при отсутствии видео)
- `EquipmentCard` — `onError` fallback при отсутствии фото
- Реальные файлы кладутся в: `/public/videos/`, `/public/images/equipment/[slug]/`

### Phase E — SEO
- `app/sitemap.ts` — динамический sitemap из EQUIPMENT_DATA + SERVICES_DATA + блог
- `public/robots.txt` — `Sitemap: https://mini-tech.by/sitemap.xml`
- `next-sitemap` postbuild отключён (заменён на app/sitemap.ts)

### Phase F — UX/разное
- `components/ui/CallbackButton.tsx` + `CallbackModal.tsx` — sticky «Заказать звонок»
- `components/ui/BackToTop.tsx` — кнопка «наверх» (появляется после 600px)
- `app/thank-you/page.tsx` — страница благодарности
- `data/reviews.ts` + AggregateRating schema
- Cookie notice в Footer
- Заглушки верификации: `public/google-site-verification.html`, `public/yandex-site-verification.html`

## 🔜 Оставшееся (контент + медиа)

- **Контакты** — заменить TODO: REPLACE в `lib/constants.ts`
- **Hero-видео** — `/public/videos/hero-bg.webm|mp4` + `hero-poster.webp`
- **Фото техники** — `/public/images/equipment/[slug]/thumb.webp`
- **GLTF-модели** — `/public/models/*.glb` → восстановить R3F в `Equipment3DViewerInner.tsx`
- **Верификация** — заменить заглушки реальными файлами Google Search Console / Yandex Webmaster
- **Plausible** — `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` в GitHub Secrets

## 🏗 Архитектурные решения

- **Static export** → нет SSR, всё через Cloudflare Worker
- **R3F** — конфликт с React RSC → CSS/Framer Motion заглушка в `Equipment3DViewerInner.tsx`; `transpilePackages` в next.config.js сохранён
- **MDX** — `unified` pipeline (не `next-mdx-remote` — несовместима с Next.js 16)
- **Button asChild** — `@radix-ui/react-slot`; иконки в `asChild` режиме — внутрь дочернего `<Link>`
- **FAQ_ITEMS** — в `lib/faq.ts` (не в `'use client'` компоненте — App Router server/client boundary)
- **opengraph-image.tsx** — Satori требует inline styles (исключение из правила no inline styles)
