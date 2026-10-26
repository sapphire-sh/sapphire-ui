import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Button } from './Button.js';

afterEach(cleanup);

describe('Button', () => {
	it('renders the secondary variant when no variant is given', () => {
		render(<Button>Save</Button>);
		expect(screen.getByRole('button', { name: 'Save' }).className).toBe(
			'rounded-md border px-3 py-1 text-sm focus-visible:outline-2 focus-visible:outline-accent bg-surface text-foreground border-border',
		);
	});

	it('applies the danger border and text color to the danger variant', () => {
		render(<Button variant="danger">Delete</Button>);
		expect(screen.getByRole('button', { name: 'Delete' }).className).toBe(
			'rounded-md border px-3 py-1 text-sm focus-visible:outline-2 focus-visible:outline-accent bg-surface text-danger border-danger',
		);
	});
});
