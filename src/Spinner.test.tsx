import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { LoadingBlock } from './Spinner.js';

afterEach(cleanup);

describe('LoadingBlock', () => {
	it('exposes the LoadingBlock label through a status role', () => {
		render(<LoadingBlock label="Loading" />);
		expect(screen.getByRole('status').textContent).toBe('Loading');
	});
});
