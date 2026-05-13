import { forwardRef } from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

// Атомарный компонент поля формы с лейблом и отображением ошибки
export const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(({ label, error, multiline = false, rows = 4, id, className = '', ...props }, ref) => {
  const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${fieldId}-error`;

  const baseClasses = [
    'w-full bg-surface-2 border rounded-xl px-4 py-3 text-text placeholder:text-text-muted',
    'transition-all duration-200 text-base',
    'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
    error ? 'border-error focus:ring-error' : 'border-border hover:border-text-muted',
    className,
  ].join(' ');

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-text-muted"
      >
        {label}
        {props.required && (
          <span className="text-error ml-1" aria-hidden="true">*</span>
        )}
      </label>

      {multiline ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={fieldId}
          rows={rows}
          className={`${baseClasses} resize-none`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={fieldId}
          className={baseClasses}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <p id={errorId} role="alert" className="text-error text-sm">
          {error}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';
