import { z } from 'zod';

// Регулярное выражение для белорусских номеров телефона (+375 XX XXX-XX-XX)
const belarusPhoneRegex = /^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;

// Базовые поля, общие для всех форм заявок
const baseLeadFields = {
  name: z
    .string()
    .min(2, 'Имя должно содержать не менее 2 символов')
    .max(50, 'Имя не должно превышать 50 символов')
    .regex(/^[а-яА-ЯёЁa-zA-Z\s\-]+$/, 'Используйте только буквы и дефис'),
  phone: z
    .string()
    .regex(belarusPhoneRegex, 'Введите номер в формате +375 (XX) XXX-XX-XX'),
  message: z
    .string()
    .max(1000, 'Сообщение не должно превышать 1000 символов')
    .optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо согласие на обработку данных' }),
  }),
  // Honey-pot поле — должно оставаться пустым (антиспам)
  website: z.string().max(0, 'Это поле должно быть пустым').optional(),
  // Cloudflare Turnstile токен
  turnstileToken: z.string().optional(),
};

// Схема основной формы заявки (главная, контакты, страницы техники)
export const LeadFormSchema = z.object(baseLeadFields);
export type LeadFormData = z.infer<typeof LeadFormSchema>;

// Схема формы для услуги "Вывоз мусора"
export const WasteRemovalFormSchema = z.object({
  ...baseLeadFields,
  wasteType: z.enum(['construction', 'household', 'vegetation', 'mixed'], {
    errorMap: () => ({ message: 'Выберите тип мусора' }),
  }),
  volume: z
    .string()
    .min(1, 'Укажите примерный объём')
    .max(50, 'Слишком длинное значение'),
});
export type WasteRemovalFormData = z.infer<typeof WasteRemovalFormSchema>;

// Схема формы для услуги "Демонтаж"
export const DemolitionFormSchema = z.object({
  ...baseLeadFields,
  objectType: z.enum(['barn', 'garage', 'house', 'partitions', 'other'], {
    errorMap: () => ({ message: 'Выберите тип объекта' }),
  }),
  area: z
    .string()
    .min(1, 'Укажите примерную площадь')
    .max(50, 'Слишком длинное значение'),
});
export type DemolitionFormData = z.infer<typeof DemolitionFormSchema>;

// Схема формы для услуги "Доставка техники"
export const DeliveryFormSchema = z.object({
  ...baseLeadFields,
  addressFrom: z
    .string()
    .min(5, 'Укажите адрес отправки')
    .max(200, 'Слишком длинный адрес'),
  addressTo: z
    .string()
    .min(5, 'Укажите адрес доставки')
    .max(200, 'Слишком длинный адрес'),
  equipment: z.enum(['excavator', 'loader', 'both'], {
    errorMap: () => ({ message: 'Выберите технику' }),
  }),
});
export type DeliveryFormData = z.infer<typeof DeliveryFormSchema>;

// Объединённый тип для сервисных форм
export type ServiceType = 'waste' | 'demolition' | 'delivery';

// Схема ответа Cloudflare Worker
export const WorkerResponseSchema = z.object({
  ok: z.boolean(),
  error: z.string().optional(),
});
export type WorkerResponse = z.infer<typeof WorkerResponseSchema>;

// Описания типов мусора для UI
export const WASTE_TYPES = [
  { value: 'construction', label: 'Строительный мусор' },
  { value: 'household', label: 'Бытовой мусор' },
  { value: 'vegetation', label: 'Растительные отходы' },
  { value: 'mixed', label: 'Смешанный' },
] as const;

// Описания типов объектов для UI
export const OBJECT_TYPES = [
  { value: 'barn', label: 'Сарай' },
  { value: 'garage', label: 'Гараж' },
  { value: 'house', label: 'Дом / здание' },
  { value: 'partitions', label: 'Перегородки / стены' },
  { value: 'other', label: 'Другое' },
] as const;

// Типы техники для доставки
export const EQUIPMENT_OPTIONS = [
  { value: 'excavator', label: 'Мини-экскаватор Volvo EC25' },
  { value: 'loader', label: 'Мини-погрузчик CAT 226B' },
  { value: 'both', label: 'Оба агрегата' },
] as const;
