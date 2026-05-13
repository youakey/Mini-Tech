'use client';

import { useState } from 'react';
import { useForm, Controller, type Control, type UseFormRegister, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IMaskInput } from 'react-imask';
import { Button } from '@/components/ui/Button';
import { FormField } from './FormField';
import { FormSuccess } from './FormSuccess';
import {
  WasteRemovalFormSchema,
  DemolitionFormSchema,
  DeliveryFormSchema,
  WASTE_TYPES,
  OBJECT_TYPES,
  EQUIPMENT_OPTIONS,
  type ServiceType,
} from '@/lib/validation';
import { submitLead } from '@/lib/telegram';
import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';

const SERVICE_LABELS: Record<ServiceType, string> = {
  waste: 'Вывоз мусора',
  demolition: 'Демонтаж',
  delivery: 'Доставка техники',
};

interface ServiceFormProps {
  serviceType: ServiceType;
  onSuccess?: () => void;
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

// Поле телефона с маской (переиспользуется во всех вариантах формы)
function PhoneField({
  control,
  error,
  fieldId = 'svc-phone',
}: {
  control: Control<FieldValues>;
  error?: string;
  fieldId?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={fieldId} className="block text-sm font-medium text-text-muted">
        Телефон <span className="text-error" aria-hidden="true">*</span>
      </label>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <IMaskInput
            id={fieldId}
            mask="+375 (00) 000-00-00"
            unmask={false}
            value={(field.value as string) ?? ''}
            onAccept={(value) => field.onChange(value)}
            inputRef={field.ref}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+375 (XX) XXX-XX-XX"
            className={[
              'w-full bg-surface-2 border rounded-xl px-4 py-3 text-text placeholder:text-text-muted',
              'transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
              error ? 'border-error' : 'border-border hover:border-text-muted',
            ].join(' ')}
          />
        )}
      />
      {error && <p role="alert" className="text-error text-sm">{error}</p>}
    </div>
  );
}

// Согласие на обработку персональных данных
function ConsentField({
  register,
  error,
}: {
  register: UseFormRegister<FieldValues>;
  error?: string;
}) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          className="mt-0.5 w-4 h-4 rounded border-border bg-surface-2 accent-accent cursor-pointer shrink-0"
          {...register('consent')}
        />
        <span className="text-sm text-text-muted">
          Согласен на обработку{' '}
          <Link href="/privacy/" className="text-accent underline underline-offset-2" target="_blank">
            персональных данных
          </Link>
        </span>
      </label>
      {error && <p role="alert" className="text-error text-sm ml-7">{error}</p>}
    </div>
  );
}

// Форма для "Вывоз мусора"
function WasteForm({ onSubmitData }: { onSubmitData: (data: FieldValues) => void }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<FieldValues>({
    resolver: zodResolver(WasteRemovalFormSchema),
    defaultValues: { name: '', phone: '', message: '', wasteType: '', volume: '', consent: false, website: '' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmitData)} className="space-y-4" noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 h-0 w-0 pointer-events-none" {...register('website')} />
      <FormField label="Ваше имя" type="text" placeholder="Иван Петров" autoComplete="name" required error={errors.name?.message as string} {...register('name')} />
      <PhoneField control={control} error={errors.phone?.message as string} fieldId="waste-phone" />
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-text-muted">
          Тип мусора <span className="text-error" aria-hidden="true">*</span>
        </label>
        <select className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent" {...register('wasteType')}>
          <option value="">Выберите тип</option>
          {WASTE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        {errors.wasteType && <p role="alert" className="text-error text-sm">{errors.wasteType.message as string}</p>}
      </div>
      <FormField label="Примерный объём (м³)" type="text" placeholder="напр. 5–10 м³" error={errors.volume?.message as string} {...register('volume')} />
      <FormField label="Дополнительно" multiline rows={2} placeholder="Любые уточнения..." error={errors.message?.message as string} {...register('message')} />
      <ConsentField register={register} error={errors.consent?.message as string} />
      <Button type="submit" variant="primary" size="lg" className="w-full">Отправить заявку</Button>
    </form>
  );
}

// Форма для "Демонтаж"
function DemolitionForm({ onSubmitData }: { onSubmitData: (data: FieldValues) => void }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<FieldValues>({
    resolver: zodResolver(DemolitionFormSchema),
    defaultValues: { name: '', phone: '', message: '', objectType: '', area: '', consent: false, website: '' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmitData)} className="space-y-4" noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 h-0 w-0 pointer-events-none" {...register('website')} />
      <FormField label="Ваше имя" type="text" placeholder="Иван Петров" autoComplete="name" required error={errors.name?.message as string} {...register('name')} />
      <PhoneField control={control} error={errors.phone?.message as string} fieldId="demolition-phone" />
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-text-muted">
          Тип объекта <span className="text-error" aria-hidden="true">*</span>
        </label>
        <select className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent" {...register('objectType')}>
          <option value="">Выберите тип</option>
          {OBJECT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        {errors.objectType && <p role="alert" className="text-error text-sm">{errors.objectType.message as string}</p>}
      </div>
      <FormField label="Примерная площадь (м²)" type="text" placeholder="напр. 30–50 м²" error={errors.area?.message as string} {...register('area')} />
      <FormField label="Дополнительно" multiline rows={2} placeholder="Любые уточнения..." error={errors.message?.message as string} {...register('message')} />
      <ConsentField register={register} error={errors.consent?.message as string} />
      <Button type="submit" variant="primary" size="lg" className="w-full">Отправить заявку</Button>
    </form>
  );
}

// Форма для "Доставка техники"
function DeliveryForm({ onSubmitData }: { onSubmitData: (data: FieldValues) => void }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<FieldValues>({
    resolver: zodResolver(DeliveryFormSchema),
    defaultValues: { name: '', phone: '', message: '', addressFrom: '', addressTo: '', equipment: '', consent: false, website: '' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmitData)} className="space-y-4" noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 h-0 w-0 pointer-events-none" {...register('website')} />
      <FormField label="Ваше имя" type="text" placeholder="Иван Петров" autoComplete="name" required error={errors.name?.message as string} {...register('name')} />
      <PhoneField control={control} error={errors.phone?.message as string} fieldId="delivery-phone" />
      <FormField label="Откуда забрать технику" type="text" placeholder="Адрес или район" required error={errors.addressFrom?.message as string} {...register('addressFrom')} />
      <FormField label="Куда доставить" type="text" placeholder="Адрес объекта" required error={errors.addressTo?.message as string} {...register('addressTo')} />
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-text-muted">
          Какая техника <span className="text-error" aria-hidden="true">*</span>
        </label>
        <select className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent" {...register('equipment')}>
          <option value="">Выберите технику</option>
          {EQUIPMENT_OPTIONS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        {errors.equipment && <p role="alert" className="text-error text-sm">{errors.equipment.message as string}</p>}
      </div>
      <FormField label="Дополнительно" multiline rows={2} placeholder="Любые уточнения..." error={errors.message?.message as string} {...register('message')} />
      <ConsentField register={register} error={errors.consent?.message as string} />
      <Button type="submit" variant="primary" size="lg" className="w-full">Отправить заявку</Button>
    </form>
  );
}

// Главный компонент — выбирает нужную форму и управляет состоянием отправки
export function ServiceForm({ serviceType, onSuccess }: ServiceFormProps) {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleData = async (data: FieldValues) => {
    if (data.website as string) return;
    setFormState('loading');
    trackEvent('lead_form_submit', { source: serviceType });

    const result = await submitLead({
      name: data.name as string,
      phone: data.phone as string,
      message: `[${SERVICE_LABELS[serviceType]}] ${(data.message as string) ?? ''}`.trim(),
      source: SERVICE_LABELS[serviceType],
    });

    if (result.ok) {
      setFormState('success');
      trackEvent('lead_form_success', { source: serviceType });
      onSuccess?.();
    } else {
      setFormState('error');
      setErrorMessage(result.error || 'Ошибка отправки. Позвоните нам.');
    }
  };

  if (formState === 'success') {
    return (
      <FormSuccess
        onReset={() => {
          setFormState('idle');
          setErrorMessage('');
        }}
      />
    );
  }

  const formMap: Record<ServiceType, React.ReactNode> = {
    waste: <WasteForm onSubmitData={handleData} />,
    demolition: <DemolitionForm onSubmitData={handleData} />,
    delivery: <DeliveryForm onSubmitData={handleData} />,
  };

  return (
    <div>
      {formState === 'error' && (
        <div
          role="alert"
          className="mb-4 p-4 bg-error/10 border border-error/30 rounded-xl text-error text-sm"
        >
          {errorMessage}
        </div>
      )}
      {formMap[serviceType]}
    </div>
  );
}
