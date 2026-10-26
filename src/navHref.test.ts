import { describe, expect, it } from 'vitest';
import { currentNavHref } from './navHref.js';

describe('currentNavHref', () => {
	it('returns the longest item href that prefixes the pathname', () => {
		expect(currentNavHref('/posts/42', [{ href: '/' }, { href: '/post' }, { href: '/posts' }])).toBe('/posts');
	});

	it('returns null when no item href prefixes the pathname', () => {
		expect(currentNavHref('/about', [{ href: '/posts' }])).toBeNull();
	});
});
