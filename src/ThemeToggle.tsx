'use client';

import { Moon, Sun } from 'lucide-react';
import { useState, useSyncExternalStore } from 'react';
import { Button } from './Button.js';

export type ColorScheme = 'light' | 'dark';

const DARK_QUERY = '(prefers-color-scheme: dark)';

const subscribe = (onChange: () => void) => {
	const query = window.matchMedia(DARK_QUERY);
	query.addEventListener('change', onChange);
	return () => {
		query.removeEventListener('change', onChange);
	};
};

const getSnapshot = (): ColorScheme => (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light');

const getServerSnapshot = (): ColorScheme => 'light';

const readPressedScheme = (): ColorScheme | null => {
	if (typeof document === 'undefined') {
		return null;
	}
	const { theme } = document.documentElement.dataset;
	return theme === 'light' || theme === 'dark' ? theme : null;
};

export const ThemeToggle = () => {
	const systemScheme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	const [pressedScheme, setPressedScheme] = useState<ColorScheme | null>(readPressedScheme);
	const scheme = pressedScheme ?? systemScheme;
	const Icon = scheme === 'dark' ? Sun : Moon;

	return (
		<Button
			variant="ghost"
			aria-label="Dark mode"
			aria-pressed={scheme === 'dark'}
			onClick={() => {
				const next = scheme === 'dark' ? 'light' : 'dark';
				setPressedScheme(next);
				document.documentElement.dataset.theme = next;
			}}
		>
			<Icon aria-hidden className="size-4" />
		</Button>
	);
};
