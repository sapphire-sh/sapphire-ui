'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { currentNavHref } from './navHref.js';

export interface NavItem {
	href: string;
	label: string;
	children?: readonly NavItem[];
}

export interface NavProps {
	brand: string;
	items: readonly NavItem[];
	actions?: ReactNode;
}

const LINK_CLASS = 'block rounded-md px-2.5 py-1 text-sm';
const CURRENT_LINK_CLASS = 'bg-accent-soft text-accent-ink';
const IDLE_LINK_CLASS = 'text-muted hover:text-foreground';

const flattenNavItems = (items: readonly NavItem[]): NavItem[] =>
	items.flatMap((item) => [item, ...flattenNavItems(item.children ?? [])]);

export const Nav = ({ brand, items, actions }: NavProps) => {
	const pathname = usePathname();
	const current = currentNavHref(pathname, flattenNavItems(items));

	const renderLink = (item: NavItem) => {
		const isCurrent = item.href === current;
		return (
			<Link
				href={item.href}
				aria-current={isCurrent ? 'page' : undefined}
				className={`${LINK_CLASS} ${isCurrent ? CURRENT_LINK_CLASS : IDLE_LINK_CLASS}`}
			>
				{item.label}
			</Link>
		);
	};

	return (
		<nav className="flex items-center gap-4 border-b border-border bg-surface px-4 py-2">
			<span className="font-semibold text-foreground">{brand}</span>
			<ul className="flex items-center gap-1">
				{items.map((item) => (
					<li key={item.href} className="group relative">
						{renderLink(item)}
						{item.children !== undefined && (
							<ul className="invisible absolute top-full left-0 z-10 min-w-40 rounded-md border border-border bg-surface p-1 group-focus-within:visible group-hover:visible">
								{item.children.map((child) => (
									<li key={child.href}>{renderLink(child)}</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
			{actions !== undefined && <div className="ml-auto">{actions}</div>}
		</nav>
	);
};
