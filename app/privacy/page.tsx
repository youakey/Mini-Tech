import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, CONTACTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Политика конфиденциальности | ${SITE.name}`,
  description:
    'Политика обработки персональных данных МиниТех Брест: какие данные мы собираем, как используем и защищаем.',
  alternates: {
    canonical: `${SITE.url}/privacy/`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

const LAST_UPDATED = '13 мая 2026 г.';

const TOC = [
  { id: 'operator', label: '1. Оператор персональных данных' },
  { id: 'data', label: '2. Какие данные мы собираем' },
  { id: 'purposes', label: '3. Цели обработки данных' },
  { id: 'legal-basis', label: '4. Правовое основание' },
  { id: 'retention', label: '5. Срок хранения данных' },
  { id: 'sharing', label: '6. Передача третьим лицам' },
  { id: 'rights', label: '7. Права субъекта персональных данных' },
  { id: 'cookies', label: '8. Cookie-файлы и аналитика' },
  { id: 'contacts', label: '9. Контакты для запросов по ПДн' },
  { id: 'changes', label: '10. Изменения политики' },
];

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <div className="container-site py-12 lg:py-20">
        <div className="max-w-3xl mx-auto">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-accent transition-colors mb-8"
          >
            ← На главную
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="accent-line mb-6" />
            <h1 className="font-heading font-extrabold text-3xl lg:text-4xl text-text mb-3">
              Политика конфиденциальности
            </h1>
            <p className="text-text-muted text-sm">
              Последнее обновление: <time dateTime="2026-05-13">{LAST_UPDATED}</time>
            </p>
          </div>

          {/* Intro */}
          <div className="bg-surface border border-border rounded-2xl p-6 mb-10 text-text-muted leading-relaxed">
            <p>
              Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок
              сбора, хранения, использования и защиты персональных данных пользователей
              (далее — «субъекты персональных данных») при использовании веб-сайта{' '}
              <span className="text-text font-medium">{SITE.url}</span> (далее — «Сайт»).
            </p>
            <p className="mt-3">
              Политика разработана в соответствии с Законом Республики Беларусь
              от 7 мая 2021 г. № 99-З «О защите персональных данных» и основными принципами
              Общего регламента о защите данных (GDPR) Европейского союза.
            </p>
          </div>

          {/* Table of contents */}
          <nav aria-label="Оглавление" className="mb-12">
            <p className="text-xs uppercase tracking-widest text-text-muted font-medium mb-4">
              Содержание
            </p>
            <ol className="space-y-2">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-text-muted hover:text-accent transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-border group-hover:bg-accent transition-colors shrink-0" aria-hidden="true" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="space-y-12 text-text-muted leading-relaxed">

            {/* 1 */}
            <section aria-labelledby="operator">
              <h2 id="operator" className="font-heading font-bold text-xl text-text mb-4 scroll-mt-24">
                1. Оператор персональных данных
              </h2>
              <p className="mb-3">
                Оператором персональных данных является:
              </p>
              <div className="bg-surface border border-border rounded-xl p-5 space-y-2 text-sm">
                <div className="flex gap-3">
                  <span className="text-text-muted shrink-0 w-28">Наименование:</span>
                  <span className="text-text font-medium">{SITE.name}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-text-muted shrink-0 w-28">Адрес:</span>
                  <span className="text-text">{CONTACTS.address}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-text-muted shrink-0 w-28">Email:</span>
                  <a href={`mailto:${CONTACTS.email}`} className="text-accent hover:text-accent-hover transition-colors">
                    {CONTACTS.email}
                  </a>
                </div>
                <div className="flex gap-3">
                  <span className="text-text-muted shrink-0 w-28">Телефон:</span>
                  <a href={CONTACTS.phoneHref} className="text-accent hover:text-accent-hover transition-colors">
                    {CONTACTS.phone}
                  </a>
                </div>
              </div>
            </section>

            {/* 2 */}
            <section aria-labelledby="data">
              <h2 id="data" className="font-heading font-bold text-xl text-text mb-4 scroll-mt-24">
                2. Какие данные мы собираем
              </h2>
              <p className="mb-4">
                При отправке заявки через формы на Сайте мы собираем следующие персональные данные:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  { name: 'Имя', desc: 'имя или имя и фамилия, указанные вами в форме.' },
                  { name: 'Номер телефона', desc: 'контактный телефон в формате +375 (XX) XXX-XX-XX.' },
                  { name: 'Текст сообщения', desc: 'описание задачи, объём работ, пожелания — если вы их указали (необязательное поле).' },
                ].map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                    <span>
                      <span className="text-text font-medium">{item.name}</span> — {item.desc}
                    </span>
                  </li>
                ))}
              </ul>

              <h3 className="font-heading font-semibold text-base text-text mb-3">
                Технические данные (для антиспама)
              </h3>
              <p className="mb-3">
                В целях защиты от автоматических рассылок (спама) наш сервер на стороне
                Cloudflare Worker может автоматически фиксировать:
              </p>
              <ul className="space-y-3">
                {[
                  { name: 'IP-адрес', desc: 'используется исключительно для ограничения числа заявок (не более 3 в час с одного адреса), не привязывается к личности.' },
                  { name: 'User-Agent', desc: 'тип браузера и операционной системы — для выявления автоматических обращений.' },
                ].map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-border shrink-0" aria-hidden="true" />
                    <span>
                      <span className="text-text font-medium">{item.name}</span> — {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm bg-surface border border-border rounded-xl px-4 py-3">
                Мы не собираем данные о платёжных инструментах, паспортные данные, биометрию
                или иные специальные категории персональных данных.
              </p>
            </section>

            {/* 3 */}
            <section aria-labelledby="purposes">
              <h2 id="purposes" className="font-heading font-bold text-xl text-text mb-4 scroll-mt-24">
                3. Цели обработки данных
              </h2>
              <p className="mb-4">Ваши персональные данные обрабатываются строго в следующих целях:</p>
              <ol className="space-y-4">
                {[
                  {
                    title: 'Обработка заявки',
                    desc: 'Связаться с вами для уточнения деталей заказа, согласования времени выезда и стоимости услуги.',
                  },
                  {
                    title: 'Обратная связь',
                    desc: 'Ответить на ваш вопрос или запрос, переданный через форму на Сайте.',
                  },
                  {
                    title: 'Улучшение качества обслуживания',
                    desc: 'Анализ типичных запросов для развития ассортимента услуг и повышения удобства работы с нами. Данные используются в обезличенном виде.',
                  },
                  {
                    title: 'Антиспам и безопасность',
                    desc: 'Предотвращение автоматических рассылок и злоупотреблений формой заявки.',
                  },
                ].map((item, index) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-mono text-sm font-bold shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <div className="font-medium text-text mb-1">{item.title}</div>
                      <div className="text-sm">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-4">
                Мы не используем ваши данные для маркетинговых рассылок без вашего
                дополнительного согласия и не продаём данные третьим лицам.
              </p>
            </section>

            {/* 4 */}
            <section aria-labelledby="legal-basis">
              <h2 id="legal-basis" className="font-heading font-bold text-xl text-text mb-4 scroll-mt-24">
                4. Правовое основание обработки
              </h2>
              <p className="mb-3">
                Обработка персональных данных осуществляется на основании{' '}
                <strong className="text-text">согласия субъекта персональных данных</strong> —
                статья 6, пункт 1.1 Закона РБ № 99-З «О защите персональных данных».
              </p>
              <p className="mb-3">
                Согласие предоставляется вами в момент отправки формы посредством
                установки флажка «Я согласен на обработку персональных данных». Установка
                флажка является добровольным, конкретным, информированным и однозначным
                выражением воли субъекта персональных данных.
              </p>
              <p>
                Без предоставления согласия отправка формы невозможна. Вы вправе
                отозвать своё согласие в любое время (см. раздел 7).
              </p>
            </section>

            {/* 5 */}
            <section aria-labelledby="retention">
              <h2 id="retention" className="font-heading font-bold text-xl text-text mb-4 scroll-mt-24">
                5. Срок хранения данных
              </h2>
              <p className="mb-3">
                Персональные данные хранятся в течение{' '}
                <strong className="text-text">12 месяцев</strong> с даты последнего
                контакта с вами либо с даты завершения оказания услуги — в зависимости от того,
                что наступит позже.
              </p>
              <p className="mb-3">
                По истечении указанного срока данные удаляются или обезличиваются в течение
                30 дней. Резервные копии уничтожаются по расписанию ротации (не позднее
                чем через 90 дней после основного удаления).
              </p>
              <p>
                IP-адреса, сохранённые для антиспам-контроля, хранятся не более{' '}
                <strong className="text-text">1 часа</strong> (TTL ключа в хранилище
                Cloudflare KV) и после этого уничтожаются автоматически.
              </p>
            </section>

            {/* 6 */}
            <section aria-labelledby="sharing">
              <h2 id="sharing" className="font-heading font-bold text-xl text-text mb-4 scroll-mt-24">
                6. Передача данных третьим лицам
              </h2>
              <p className="mb-4">
                Мы <strong className="text-text">не продаём, не сдаём в аренду и не передаём</strong>{' '}
                ваши персональные данные третьим лицам в коммерческих целях.
              </p>
              <p className="mb-4">
                Единственная передача данных происходит внутри нашей инфраструктуры:
              </p>
              <div className="bg-surface border border-border rounded-xl p-5 space-y-4 text-sm">
                <div>
                  <div className="font-medium text-text mb-1">Cloudflare (США / ЕС)</div>
                  <div>
                    Сайт и серверная часть работают через инфраструктуру Cloudflare Inc.
                    Cloudflare обрабатывает HTTP-запросы в роли технического посредника.
                    Ваши данные из формы передаются через зашифрованное соединение (HTTPS/TLS)
                    на Cloudflare Worker, который формирует и отправляет уведомление оператору.
                    Cloudflare действует как обработчик данных по поручению оператора
                    в соответствии с Data Processing Addendum Cloudflare.
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="font-medium text-text mb-1">Telegram (уведомление оператора)</div>
                  <div>
                    Имя, телефон и текст сообщения передаются через Telegram Bot API
                    исключительно для того, чтобы наш менеджер получил уведомление о заявке
                    и мог связаться с вами. Данные не сохраняются в Telegram-хранилищах
                    системно; история чата у оператора-получателя хранится по правилам Telegram.
                  </div>
                </div>
              </div>
              <p className="mt-4">
                По требованию компетентных государственных органов Республики Беларусь
                данные могут быть предоставлены в соответствии с действующим законодательством.
              </p>
            </section>

            {/* 7 */}
            <section aria-labelledby="rights">
              <h2 id="rights" className="font-heading font-bold text-xl text-text mb-4 scroll-mt-24">
                7. Права субъекта персональных данных
              </h2>
              <p className="mb-4">
                В соответствии с Законом РБ № 99-З вы имеете следующие права:
              </p>
              <ul className="space-y-4">
                {[
                  {
                    right: 'Право на доступ',
                    desc: 'Получить подтверждение факта обработки ваших персональных данных и копию обрабатываемых данных.',
                  },
                  {
                    right: 'Право на исправление',
                    desc: 'Потребовать исправления неточных или устаревших персональных данных.',
                  },
                  {
                    right: 'Право на удаление',
                    desc: 'Потребовать удаления ваших персональных данных, если они более не нужны для целей обработки или вы отозвали согласие.',
                  },
                  {
                    right: 'Право на отзыв согласия',
                    desc: 'В любой момент отозвать ранее данное согласие на обработку персональных данных. Отзыв не влияет на законность обработки, осуществлённой до отзыва.',
                  },
                  {
                    right: 'Право на ограничение обработки',
                    desc: 'Потребовать ограничения обработки данных в случаях, предусмотренных законодательством.',
                  },
                  {
                    right: 'Право на обжалование',
                    desc: 'Обратиться с жалобой в Национальный центр защиты персональных данных Республики Беларусь (pdp.by).',
                  },
                ].map((item) => (
                  <li key={item.right} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                    <span>
                      <span className="text-text font-medium">{item.right}.</span>{' '}
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 bg-surface border border-border rounded-xl px-5 py-4 text-sm">
                Для реализации любого из указанных прав направьте запрос на email{' '}
                <a href={`mailto:${CONTACTS.email}`} className="text-accent hover:text-accent-hover transition-colors">
                  {CONTACTS.email}
                </a>{' '}
                с указанием вашего имени, номера телефона, которые вы указывали при обращении,
                и описанием запроса. Мы ответим в срок не позднее 15 рабочих дней.
              </p>
            </section>

            {/* 8 */}
            <section aria-labelledby="cookies">
              <h2 id="cookies" className="font-heading font-bold text-xl text-text mb-4 scroll-mt-24">
                8. Cookie-файлы и аналитика
              </h2>
              <h3 className="font-heading font-semibold text-base text-text mb-3">
                Cookie-файлы
              </h3>
              <p className="mb-4">
                Сайт <strong className="text-text">не устанавливает сторонние cookie-файлы</strong> и
                не использует трекинговые технологии (пиксели, fingerprinting).
                Сессионные технические cookie могут устанавливаться браузером в рамках стандартного
                протокола HTTPS. Эти данные не передаются третьим лицам.
              </p>
              <h3 className="font-heading font-semibold text-base text-text mb-3">
                Аналитика
              </h3>
              <p className="mb-3">
                При подключении веб-аналитики используется{' '}
                <strong className="text-text">Plausible Analytics</strong> — cookie-less решение,
                которое не устанавливает cookie-файлы, не использует fingerprinting и не передаёт
                данные за пределы ЕС/EEA. Сервис обрабатывает только агрегированную статистику
                (количество посещений, страницы, источники трафика) без идентификации пользователей.
              </p>
              <h3 className="font-heading font-semibold text-base text-text mb-3">
                localStorage
              </h3>
              <p>
                Для сохранения черновиков форм между вкладками Сайт может использовать
                <strong className="text-text"> sessionStorage</strong> браузера — данные
                хранятся только на вашем устройстве и очищаются при закрытии вкладки.
                Данные из sessionStorage не отправляются на сервер.
              </p>
            </section>

            {/* 9 */}
            <section aria-labelledby="contacts">
              <h2 id="contacts" className="font-heading font-bold text-xl text-text mb-4 scroll-mt-24">
                9. Контакты для запросов по персональным данным
              </h2>
              <p className="mb-4">
                По всем вопросам, связанным с обработкой персональных данных, вы можете
                обратиться к оператору:
              </p>
              <div className="bg-surface border border-border rounded-xl p-5 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-text-muted w-20 shrink-0">Email:</span>
                  <a href={`mailto:${CONTACTS.email}`} className="text-accent hover:text-accent-hover transition-colors font-medium">
                    {CONTACTS.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-text-muted w-20 shrink-0">Телефон:</span>
                  <a href={CONTACTS.phoneHref} className="text-accent hover:text-accent-hover transition-colors font-medium">
                    {CONTACTS.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-text-muted w-20 shrink-0">Telegram:</span>
                  <a
                    href={CONTACTS.telegramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover transition-colors font-medium"
                  >
                    {CONTACTS.telegram}
                  </a>
                </div>
                <div className="border-t border-border pt-3">
                  <span className="text-text-muted">Срок ответа:</span>{' '}
                  <span className="text-text">не позднее 15 рабочих дней с даты получения запроса</span>
                </div>
              </div>
              <p className="mt-4 text-sm">
                Вы также вправе направить жалобу в надзорный орган —{' '}
                <strong className="text-text">Национальный центр защиты персональных данных
                Республики Беларусь</strong>{' '}
                (официальный сайт:{' '}
                <a
                  href="https://pdp.by"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover transition-colors"
                >
                  pdp.by
                </a>
                ).
              </p>
            </section>

            {/* 10 */}
            <section aria-labelledby="changes">
              <h2 id="changes" className="font-heading font-bold text-xl text-text mb-4 scroll-mt-24">
                10. Изменения политики
              </h2>
              <p className="mb-3">
                Оператор оставляет за собой право вносить изменения в настоящую Политику
                в связи с изменениями в законодательстве, деятельности компании или
                применяемых технологиях.
              </p>
              <p className="mb-3">
                Актуальная версия Политики всегда доступна по адресу{' '}
                <Link href="/privacy/" className="text-accent hover:text-accent-hover transition-colors">
                  {SITE.url}/privacy/
                </Link>
                . Дата последнего обновления указана в начале документа.
              </p>
              <p>
                При существенных изменениях, затрагивающих права субъектов персональных
                данных, мы разместим соответствующее уведомление на главной странице Сайта.
                Продолжение использования Сайта после вступления изменений в силу означает
                ваше согласие с обновлённой версией Политики.
              </p>
            </section>

          </div>

          {/* Bottom divider */}
          <div className="border-t border-border mt-16 pt-8">
            <p className="text-text-muted text-sm text-center">
              © {new Date().getFullYear()} {SITE.name}. Политика конфиденциальности действует
              с {LAST_UPDATED}.
            </p>
            <div className="flex justify-center mt-4">
              <Link
                href="/"
                className="text-accent hover:text-accent-hover text-sm transition-colors"
              >
                ← Вернуться на главную
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
