import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider, useToast } from './Toast.js';

const ShowButton = () => {
	const { show } = useToast();
	return (
		<button
			type="button"
			onClick={() => {
				show({ message: 'Saved', tone: 'success' });
			}}
		>
			show
		</button>
	);
};

beforeEach(() => {
	vi.useFakeTimers();
});

afterEach(() => {
	cleanup();
	vi.useRealTimers();
});

describe('Toast', () => {
	it('shows a toast in the status region', () => {
		render(
			<ToastProvider>
				<ShowButton />
			</ToastProvider>,
		);
		fireEvent.click(screen.getByRole('button', { name: 'show' }));
		expect(screen.getByRole('status').textContent).toBe('Saved');
	});

	it('removes a toast after 3500ms', () => {
		render(
			<ToastProvider>
				<ShowButton />
			</ToastProvider>,
		);
		fireEvent.click(screen.getByRole('button', { name: 'show' }));
		act(() => {
			vi.advanceTimersByTime(3499);
		});
		expect(screen.getByRole('status').textContent).toBe('Saved');
		act(() => {
			vi.advanceTimersByTime(1);
		});
		expect(screen.getByRole('status').textContent).toBe('');
	});
});
