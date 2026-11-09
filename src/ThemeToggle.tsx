'use client';

import { Moon, Sun } from 'lucide-react';
import { useState, useSyncExternalStore } from 'react';
import { Button } from './Button.js';

export type ColorScheme = 'light' | 'dark';

type ThemeMode = 'system' | ColorScheme;

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

const readPressedScheme = (): ThemeMode => {
	if (typeof document === 'undefined') {
		return 'system';
	}
	const { theme } = document.documentElement.dataset;
	return theme === 'light' || theme === 'dark' ? theme : 'system';
};

const writeThemeMode = (mode: ColorScheme) => {
	document.documentElement.dataset.theme = mode;
};

export const ThemeToggle = () => {
	const systemScheme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	const [mode, setMode] = useState<ThemeMode>(readPressedScheme);
	const scheme = mode === 'system' ? systemScheme : mode;
	const Icon = scheme === 'dark' ? Sun : Moon;

	return (
		<Button
			variant="ghost"
			aria-label="Dark mode"
			aria-pressed={scheme === 'dark'}
			onClick={() => {
				const next = scheme === 'dark' ? 'light' : 'dark';
				setMode(next);
				writeThemeMode(next);
			}}
		>
			<Icon aria-hidden className="size-4" />
		</Button>
	);
};
