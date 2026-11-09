import type { NavItem } from './Nav.js';

export type NavHrefItem = Pick<NavItem, 'href'>;

const isSameOrAncestorPath = (href: string, pathname: string): boolean =>
	pathname === href || pathname.startsWith(href.endsWith('/') ? href : `${href}/`);

export const currentNavHref = (pathname: string, items: readonly NavHrefItem[]): string | null => {
	let current: string | null = null;
	for (const { href } of items) {
		if (isSameOrAncestorPath(href, pathname) && (current === null || href.length > current.length)) {
			current = href;
		}
	}
	return current;
};
