import { API } from './constants';
import { WorkerResponseSchema } from './validation';

export interface LeadPayload {
  name: string;
  phone: string;
  message?: string;
  source: string;
  turnstileToken?: string;
  withHammer?: boolean;
}

// Отправляет заявку на Cloudflare Worker, который пересылает её в Telegram
export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch(`${API.workerUrl}/api/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      return { ok: false, error: `Ошибка сервера: ${response.status}. ${text}` };
    }

    const data = await response.json();
    const parsed = WorkerResponseSchema.safeParse(data);

    if (!parsed.success) {
      return { ok: false, error: 'Неожиданный ответ от сервера' };
    }

    return parsed.data;
  } catch (err) {
    if (err instanceof TypeError && err.message.includes('fetch')) {
      return { ok: false, error: 'Нет подключения к интернету. Попробуйте позже.' };
    }
    return { ok: false, error: 'Произошла непредвиденная ошибка. Попробуйте ещё раз.' };
  }
}
