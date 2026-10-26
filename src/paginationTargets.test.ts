import { describe, expect, it } from 'vitest';
import { paginationTargets } from './paginationTargets.js';

describe('paginationTargets', () => {
	it('includes first, last and ten-page jumps around the current page', () => {
		expect(paginationTargets(15, 30)).toEqual([
			{ kind: 'first', page: 1 },
			{ kind: 'jumpBack', page: 5 },
			{ kind: 'previous', page: 14 },
			{ kind: 'page', page: 13 },
			{ kind: 'page', page: 14 },
			{ kind: 'page', page: 15 },
			{ kind: 'page', page: 16 },
			{ kind: 'page', page: 17 },
			{ kind: 'next', page: 16 },
			{ kind: 'jumpForward', page: 25 },
			{ kind: 'last', page: 30 },
		]);
	});

	it('omits jumps that fall outside the page range', () => {
		expect(paginationTargets(3, 8)).toEqual([
			{ kind: 'first', page: 1 },
			{ kind: 'previous', page: 2 },
			{ kind: 'page', page: 1 },
			{ kind: 'page', page: 2 },
			{ kind: 'page', page: 3 },
			{ kind: 'page', page: 4 },
			{ kind: 'page', page: 5 },
			{ kind: 'next', page: 4 },
			{ kind: 'last', page: 8 },
		]);
	});
});
