import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Chip } from './Chip.js';

afterEach(cleanup);

describe('Chip', () => {
	it('reflects pressed in aria-pressed', () => {
		render(
			<>
				<Chip pressed onClick={vi.fn()}>
					Open
				</Chip>
				<Chip pressed={false} onClick={vi.fn()}>
					Closed
				</Chip>
			</>,
		);
		expect(screen.getByRole('button', { name: 'Open' }).getAttribute('aria-pressed')).toBe('true');
		expect(screen.getByRole('button', { name: 'Closed' }).getAttribute('aria-pressed')).toBe('false');
	});

	it('calls onClick when clicked', () => {
		const onClick = vi.fn();
		render(
			<Chip pressed={false} onClick={onClick}>
				Open
			</Chip>,
		);
		fireEvent.click(screen.getByRole('button', { name: 'Open' }));
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
