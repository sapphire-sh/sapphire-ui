import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
}

const BUTTON_CLASS = 'rounded-md border px-3 py-1 text-sm focus-visible:outline-2 focus-visible:outline-accent';

const VARIANT_CLASS: Record<ButtonVariant, string> = {
	primary: 'bg-accent text-accent-foreground border-accent',
	secondary: 'bg-surface text-foreground border-border',
	danger: 'bg-surface text-danger border-danger',
	ghost: 'bg-transparent text-muted border-transparent',
};

export const Button = ({ variant = 'secondary', className, type = 'button', ...rest }: ButtonProps) => (
	<button
		{...rest}
		type={type}
		className={`${BUTTON_CLASS} ${VARIANT_CLASS[variant]}${className === undefined ? '' : ` ${className}`}`}
	/>
);
