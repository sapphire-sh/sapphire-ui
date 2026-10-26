import type { ReactNode } from 'react';

export interface ChipProps {
	pressed: boolean;
	onClick: () => void;
	children: ReactNode;
}

const CHIP_CLASS = 'rounded-full border px-2.5 py-0.5 text-xs';
const PRESSED_CHIP_CLASS = 'bg-accent-soft text-accent-ink border-transparent';
const IDLE_CHIP_CLASS = 'bg-transparent text-muted border-border';

export const Chip = ({ pressed, onClick, children }: ChipProps) => (
	<button
		type="button"
		aria-pressed={pressed}
		onClick={onClick}
		className={`${CHIP_CLASS} ${pressed ? PRESSED_CHIP_CLASS : IDLE_CHIP_CLASS}`}
	>
		{children}
	</button>
);
