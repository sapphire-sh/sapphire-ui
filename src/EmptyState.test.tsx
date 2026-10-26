import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { EmptyState } from './EmptyState.js';

afterEach(cleanup);

describe('EmptyState', () => {
	it('renders its children in muted text', () => {
		render(<EmptyState>No rows</EmptyState>);
		const paragraph = screen.getByText('No rows');
		expect(paragraph.tagName).toBe('P');
		expect(paragraph.className).toBe('text-sm text-muted');
	});
});
