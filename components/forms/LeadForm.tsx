'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IMaskInput } from 'react-imask';
import { Button } from '@/components/ui/Button';
import { FormField } from './FormField';
import { FormSuccess } from './FormSuccess';
import { LeadFormSchema, type LeadFormData } from '@/lib/validation';
import { submitLead } from '@/lib/telegram';
import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';

interface LeadFormProps {
  source?: string;
  className?: string;
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

// Основная форма заявки с маской телефона, honey-pot и отправкой в Telegram
export function LeadForm({ source = 'main', className = '' }: LeadFormProps) {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: { name: '', phone: '', message: '', consent: undefined, website: '' },
  });

  const onSubmit = async (data: LeadFormData) => {
    // Honey-pot проверка на стороне клиента
    if (data.website) return;

    setFormState('loading');
    trackEvent('lead_form_submit', { source });

    const result = await submitLead({
      name: data.name,
      phone: data.phone,
      message: data.message,
      source,
      turnstileToken: data.turnstileToken,
    });

    if (result.ok) {
      setFormState('success');
      trackEvent('lead_form_success', { source });
    } else {
      setFormState('error');
      setErrorMessage(result.error || 'Произошла ошибка. Позвоните нам напрямую.');
      trackEvent('lead_form_error', { source });
    }
  };

  const handleReset = () => {
    reset();
    setFormState('idle');
    setErrorMessage('');
  };

  if (formState === 'success') {
    return <FormSuccess onReset={handleReset} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 ${className}`}
      noValidate
    >
      {/* Honey-pot — скрытое поле, люди не трогают, боты заполняют */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute opacity-0 h-0 w-0 pointer-events-none"
        {...register('website')}
      />

      <FormField
        label="Ваше имя"
        id="lead-name"
        type="text"
        placeholder="Иван Петров"
        autoComplete="name"
        required
        error={errors.name?.message}
        {...register('name')}
      />

      {/* Телефон с маской +375 (XX) XXX-XX-XX */}
      <div className="space-y-1.5">
        <label htmlFor="lead-phone" className="block text-sm font-medium text-text-muted">
          Телефон <span className="text-error" aria-hidden="true">*</span>
        </label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <IMaskInput
              id="lead-phone"
              mask="+375 (00) 000-00-00"
              unmask={false}
              value={field.value}
              onAccept={(value) => field.onChange(value)}
              inputRef={field.ref}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+375 (XX) XXX-XX-XX"
              className={[
                'w-full bg-surface-2 border rounded-xl px-4 py-3 text-text placeholder:text-text-muted',
                'transition-all duration-200 text-base',
                'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
                errors.phone
                  ? 'border-error focus:ring-error'
                  : 'border-border hover:border-text-muted',
              ].join(' ')}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'lead-phone-error' : undefined}
            />
          )}
        />
        {errors.phone && (
          <p id="lead-phone-error" role="alert" className="text-error text-sm">
            {errors.phone.message}
          </p>
        )}
      </div>

      <FormField
        label="Сообщение"
        id="lead-message"
        multiline
        rows={3}
        placeholder="Опишите задачу: тип работ, объём, сроки..."
        error={errors.message?.message}
        {...register('message')}
      />

      {/* Согласие на обработку персональных данных */}
      <div className="space-y-1">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded border-border bg-surface-2
                       accent-accent cursor-pointer shrink-0"
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            {...register('consent')}
          />
          <span className="text-sm text-text-muted leading-relaxed group-hover:text-text transition-colors">
            Я согласен на обработку{' '}
            <Link
              href="/privacy/"
              className="text-accent hover:text-accent-hover underline underline-offset-2"
              target="_blank"
            >
              персональных данных
            </Link>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" className="text-error text-sm ml-7">
            {errors.consent.message}
          </p>
        )}
      </div>

      {/* Ошибка отправки */}
      {formState === 'error' && (
        <div
          role="alert"
          className="p-4 bg-error/10 border border-error/30 rounded-xl text-error text-sm"
        >
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={formState === 'loading'}
        className="w-full"
      >
        {formState === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
      </Button>

      <p className="text-xs text-text-muted text-center">
        Перезвоним в течение 15 минут в рабочее время
      </p>
    </form>
  );
}
