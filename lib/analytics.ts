// Обёртка над Plausible Analytics — безопасно вызывается при отсутствии скрипта
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void;
  }
}

type AnalyticsEvent =
  | 'lead_form_submit'
  | 'lead_form_success'
  | 'lead_form_error'
  | 'phone_click'
  | 'telegram_click'
  | 'whatsapp_click'
  | 'equipment_view'
  | 'service_modal_open';

// Отправляет событие в Plausible (no-op если скрипт не подключён)
export function trackEvent(
  event: AnalyticsEvent,
  props?: Record<string, string | number>
): void {
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible(event, props ? { props } : undefined);
  }
}
