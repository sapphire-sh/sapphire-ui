import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal.js';

const showModal = vi.fn();
const close = vi.fn();

beforeEach(() => {
	HTMLDialogElement.prototype.showModal = showModal;
	HTMLDialogElement.prototype.close = close;
});

afterEach(cleanup);

describe('Modal', () => {
	it('opens the dialog with showModal when open becomes true', () => {
		const { rerender } = render(
			<Modal open={false} onClose={vi.fn()} title="Settings">
				body
			</Modal>,
		);
		expect(showModal).toHaveBeenCalledTimes(0);
		rerender(
			<Modal open onClose={vi.fn()} title="Settings">
				body
			</Modal>,
		);
		expect(showModal).toHaveBeenCalledTimes(1);
	});

	it('calls onClose when Escape closes the dialog', () => {
		const onClose = vi.fn();
		render(
			<Modal open onClose={onClose} title="Settings">
				body
			</Modal>,
		);
		fireEvent(screen.getByRole('dialog', { hidden: true }), new Event('cancel', { cancelable: true }));
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('labels the dialog with its title', () => {
		render(
			<Modal open onClose={vi.fn()} title="Settings">
				body
			</Modal>,
		);
		const heading = screen.getByRole('heading', { hidden: true, name: 'Settings' });
		expect(screen.getByRole('dialog', { hidden: true }).getAttribute('aria-labelledby')).toBe(heading.id);
	});
});
