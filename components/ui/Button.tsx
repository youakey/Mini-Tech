'use client';

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /**
   * Когда true — рендерит Radix Slot вместо <button>, сливая все пропы
   * (className, onClick и т.д.) с единственным дочерним элементом.
   * Используется для <Button asChild><Link href="...">...</Link></Button>.
   */
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-bg font-semibold hover:bg-accent-hover active:scale-95 shadow-sm hover:shadow-accent-glow',
  ghost: 'bg-transparent text-text hover:bg-surface-2 hover:text-accent',
  outline:
    'bg-transparent border border-border text-text hover:border-accent hover:text-accent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm rounded-lg gap-1.5',
  md: 'h-11 px-6 text-base rounded-xl gap-2',
  lg: 'h-14 px-8 text-lg rounded-xl gap-2.5',
};

const baseClasses =
  'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      asChild = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      ...rest
    },
    ref
  ) => {
    const classes = [baseClasses, variantClasses[variant], sizeClasses[size], className].join(' ');

    if (asChild) {
      // Slot сливает className и все обработчики событий с дочерним элементом.
      // leftIcon / rightIcon / isLoading / disabled не передаём — они невалидны для <a>.
      return (
        <Slot ref={ref} className={classes} {...rest}>
          {children}
        </Slot>
      );
    }

    return (
      <button ref={ref} disabled={disabled || isLoading} className={classes} {...rest}>
        {isLoading ? (
          <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
