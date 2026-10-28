import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from './ThemeToggle.js';

beforeEach(() => {
	vi.stubGlobal(
		'matchMedia',
		vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
	);
});

afterEach(() => {
	cleanup();
	delete document.documentElement.dataset.theme;
});

describe('ThemeToggle', () => {
	it('sets data-theme to dark when pressed in the light scheme', () => {
		render(<ThemeToggle />);
		fireEvent.click(screen.getByRole('button', { name: 'Dark mode' }));
		expect(document.documentElement.dataset.theme).toBe('dark');
	});

	it('sets data-theme back to light when pressed twice', () => {
		render(<ThemeToggle />);
		const button = screen.getByRole('button', { name: 'Dark mode' });
		fireEvent.click(button);
		fireEvent.click(button);
		expect(document.documentElement.dataset.theme).toBe('light');
	});

	it('reflects the dark scheme in aria-pressed', () => {
		render(<ThemeToggle />);
		const button = screen.getByRole('button', { name: 'Dark mode' });
		expect(button.getAttribute('aria-pressed')).toBe('false');
		fireEvent.click(button);
		expect(button.getAttribute('aria-pressed')).toBe('true');
	});
});
