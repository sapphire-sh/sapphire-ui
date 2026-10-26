import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Pagination } from './Pagination.js';

afterEach(cleanup);

describe('Pagination', () => {
	it('links every target page through hrefForPage', () => {
		render(<Pagination page={15} totalPages={30} hrefForPage={(page) => `/posts?page=${page}`} />);
		expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
			'/posts?page=1',
			'/posts?page=5',
			'/posts?page=14',
			'/posts?page=13',
			'/posts?page=14',
			'/posts?page=15',
			'/posts?page=16',
			'/posts?page=17',
			'/posts?page=16',
			'/posts?page=25',
			'/posts?page=30',
		]);
	});
});
