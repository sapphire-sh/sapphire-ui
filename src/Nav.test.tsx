import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Nav } from './Nav.js';

vi.mock('next/navigation', () => ({ usePathname: () => '/posts/42' }));

afterEach(cleanup);

describe('Nav', () => {
	it('marks the current item with aria-current page', () => {
		render(
			<Nav
				brand="sapphire"
				items={[
					{ href: '/', label: 'Home' },
					{ href: '/posts', label: 'Posts' },
				]}
			/>,
		);
		expect(screen.getByRole('link', { name: 'Posts' }).getAttribute('aria-current')).toBe('page');
		expect(screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current')).toBeNull();
	});

	it('renders actions inside the nav', () => {
		render(
			<Nav brand="sapphire" items={[{ href: '/', label: 'Home' }]} actions={<button type="button">Action</button>} />,
		);
		expect(screen.getByRole('navigation').contains(screen.getByRole('button', { name: 'Action' }))).toBe(true);
	});

	it('joins the current or idle link class onto the link class', () => {
		render(
			<Nav
				brand="sapphire"
				items={[
					{ href: '/', label: 'Home' },
					{ href: '/posts', label: 'Posts' },
				]}
			/>,
		);
		expect(screen.getByRole('link', { name: 'Posts' }).className).toBe(
			'block rounded-md px-2.5 py-1 text-sm bg-accent-soft text-accent-ink',
		);
		expect(screen.getByRole('link', { name: 'Home' }).className).toBe(
			'block rounded-md px-2.5 py-1 text-sm text-muted hover:text-foreground',
		);
	});
});
