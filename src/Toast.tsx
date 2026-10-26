'use client';

import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

export type ToastTone = 'success' | 'error';

export interface ToastOptions {
	message: string;
	tone: ToastTone;
}

interface ToastEntry extends ToastOptions {
	id: number;
}

export interface ToastContextValue {
	show: (options: ToastOptions) => void;
}

export interface ToastProviderProps {
	children: ReactNode;
}

const TOAST_DURATION_MS = 3500;

const TONE_DOT_CLASS: Record<ToastTone, string> = {
	success: 'bg-success',
	error: 'bg-danger',
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: ToastProviderProps) => {
	const [toasts, setToasts] = useState<ToastEntry[]>([]);
	const nextIdRef = useRef(0);

	const show = useCallback((options: ToastOptions) => {
		const id = nextIdRef.current;
		nextIdRef.current += 1;
		setToasts((current) => [...current, { ...options, id }]);
		setTimeout(() => {
			setToasts((current) => current.filter((toast) => toast.id !== id));
		}, TOAST_DURATION_MS);
	}, []);

	const value = useMemo(() => ({ show }), [show]);

	return (
		<ToastContext value={value}>
			{children}
			<div role="status" className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
					>
						<span aria-hidden className={`size-2 rounded-full ${TONE_DOT_CLASS[toast.tone]}`} />
						{toast.message}
					</div>
				))}
			</div>
		</ToastContext>
	);
};

export const useToast = (): ToastContextValue => {
	const value = useContext(ToastContext);
	if (value === null) {
		throw new Error('useToast must be used inside ToastProvider');
	}
	return value;
};
