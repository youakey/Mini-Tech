/**
 * Cloudflare Worker — принимает POST /api/lead, верифицирует Turnstile,
 * применяет rate limiting через KV и отправляет уведомление в Telegram.
 * Секреты (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_IDS, TURNSTILE_SECRET)
 * задаются через `wrangler secret put`, не хранятся в коде.
 * TELEGRAM_CHAT_IDS — строка с chat_id через запятую (владелец,клиент).
 */

interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_IDS: string;
  TURNSTILE_SECRET: string;
  RATE_LIMIT: KVNamespace;
}

interface LeadPayload {
  name: string;
  phone: string;
  message?: string;
  source?: string;
  turnstileToken?: string;
  withHammer?: boolean;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 3600;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

// Экранирование HTML-спецсимволов для parse_mode: HTML.
// ОБЯЗАТЕЛЬНО для любых данных из форм — иначе Telegram вернёт 400.
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function checkRateLimit(kv: KVNamespace, ip: string): Promise<boolean> {
  const key = `rl:${ip}`;
  const raw = await kv.get(key);
  const count = raw ? parseInt(raw, 10) : 0;
  if (count >= RATE_LIMIT_MAX) return false;
  await kv.put(key, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW });
  return true;
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  form.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

// Форматирует сообщение для Telegram с parse_mode: HTML.
// Все поля из формы обязательно проходят через escapeHtml.
function buildTelegramMessage(payload: LeadPayload, ip: string): string {
  const now = new Date().toLocaleString('ru-BY', {
    timeZone: 'Europe/Minsk',
    dateStyle: 'short',
    timeStyle: 'short',
  });

  const lines = [
    '🔔 <b>НОВАЯ ЗАЯВКА</b>',
    '',
    `📋 Услуга: ${escapeHtml(payload.source || 'главная')}`,
    `👤 Имя: ${escapeHtml(payload.name)}`,
    `📞 Телефон: ${escapeHtml(payload.phone)}`,
    payload.message ? `💬 Сообщение: ${escapeHtml(payload.message)}` : '',
    payload.withHammer ? '🔨 С гидромолотом' : '',
    '',
    `🌐 IP: ${escapeHtml(ip)}`,
    `🕐 Время: ${now} (Минск)`,
  ];

  return lines.filter((l) => l !== undefined && l !== null).join('\n');
}

// Отправка сообщения в Telegram.
// Возвращает { ok: true } или { ok: false, description: string }.
async function sendTelegram(
  token: string,
  chatId: string,
  text: string
): Promise<{ ok: true } | { ok: false; description: string }> {
  const apiUrl = `https://api.telegram.org/bot${token.slice(0, 4)}***/sendMessage`;
  const chatIdNum = Number(chatId);

  const requestBody = {
    // Telegram принимает и строку, и число, но число надёжнее для group/channel chat_id
    chat_id: Number.isFinite(chatIdNum) ? chatIdNum : chatId,
    text,
    parse_mode: 'HTML',
    // ВАЖНО: tel: URLs не поддерживаются Telegram Bot API inline keyboard.
    // Допустимы только http://, https://, tg://.
    // Телефон уже есть в тексте сообщения — этого достаточно.
    reply_markup: {
      inline_keyboard: [
        [{ text: '✅ Принято в работу', callback_data: 'lead_accepted' }],
      ],
    },
  };

  console.log('[sendTelegram] URL (masked):', apiUrl);
  console.log('[sendTelegram] chat_id:', requestBody.chat_id, '| text length:', text.length);

  let res: Response;
  try {
    res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
  } catch (err) {
    const e = err as Error;
    console.error('[sendTelegram] fetch threw:', e.message, e.stack);
    return { ok: false, description: `fetch error: ${e.message}` };
  }

  // Всегда читаем тело ответа — даже при !res.ok оно содержит description
  let data: unknown;
  try {
    data = await res.json();
  } catch {
    const raw = await res.text().catch(() => '<unreadable>');
    console.error('[sendTelegram] Failed to parse Telegram JSON. Status:', res.status, 'Body:', raw);
    return { ok: false, description: `HTTP ${res.status}, body not JSON: ${raw.slice(0, 200)}` };
  }

  console.log('[sendTelegram] Telegram response status:', res.status);
  console.log('[sendTelegram] Telegram response body:', JSON.stringify(data));

  const tgData = data as { ok: boolean; description?: string };
  if (!tgData.ok) {
    return { ok: false, description: tgData.description ?? `HTTP ${res.status}` };
  }

  return { ok: true };
}

function validatePayload(payload: unknown): payload is LeadPayload {
  if (typeof payload !== 'object' || payload === null) return false;
  const p = payload as Record<string, unknown>;
  if (typeof p.name !== 'string' || p.name.trim().length < 2) return false;
  if (typeof p.phone !== 'string' || p.phone.trim().length < 10) return false;
  return true;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ ok: false, error: 'Method not allowed' }, 405);
    }

    const url = new URL(request.url);
    if (url.pathname !== '/api/lead') {
      return jsonResponse({ ok: false, error: 'Not found' }, 404);
    }

    // Диагностика наличия секретов (без раскрытия значений)
    console.log('[worker] TELEGRAM_BOT_TOKEN present:', !!env.TELEGRAM_BOT_TOKEN,
      '| length:', env.TELEGRAM_BOT_TOKEN?.length ?? 0);
    console.log('[worker] TELEGRAM_CHAT_IDS present:', !!env.TELEGRAM_CHAT_IDS,
      '| value:', env.TELEGRAM_CHAT_IDS);

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_IDS) {
      console.error('[worker] Missing secrets — check wrangler secret put');
      return jsonResponse({ ok: false, error: 'Worker configuration error' }, 500);
    }

    const ip = request.headers.get('CF-Connecting-IP') || '0.0.0.0';

    const allowed = await checkRateLimit(env.RATE_LIMIT, ip);
    if (!allowed) {
      return jsonResponse(
        { ok: false, error: 'Слишком много заявок. Попробуйте через час.' },
        429
      );
    }

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ ok: false, error: 'Invalid JSON' }, 400);
    }

    if (!validatePayload(payload)) {
      return jsonResponse({ ok: false, error: 'Некорректные данные формы' }, 422);
    }

    if (env.TURNSTILE_SECRET && payload.turnstileToken) {
      const valid = await verifyTurnstile(payload.turnstileToken, env.TURNSTILE_SECRET, ip);
      if (!valid) {
        return jsonResponse({ ok: false, error: 'Проверка безопасности не пройдена' }, 403);
      }
    }

    const message = buildTelegramMessage(payload, ip);

    const chatIds = env.TELEGRAM_CHAT_IDS.split(',').map((s) => s.trim()).filter(Boolean);
    let anySuccess = false;
    for (const chatId of chatIds) {
      const result = await sendTelegram(env.TELEGRAM_BOT_TOKEN, chatId, message);
      if (result.ok) {
        anySuccess = true;
      } else {
        console.error(`[worker] Failed for chatId ${chatId}:`, result.description);
      }
    }

    if (!anySuccess) {
      return jsonResponse({ ok: false, error: 'Ошибка отправки уведомления' }, 502);
    }

    console.log('[worker] Lead sent successfully for IP:', ip);
    return jsonResponse({ ok: true });
  },
};
