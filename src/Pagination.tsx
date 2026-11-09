import type { LucideIcon } from 'lucide-react';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Link from 'next/link';
import { joinClasses } from './joinClasses.js';
import { IDLE_LINK_CLASS } from './linkClass.js';
import type { PaginationTargetKind } from './paginationTargets.js';
import { paginationTargets } from './paginationTargets.js';

export interface PaginationProps {
	page: number;
	totalPages: number;
	hrefForPage: (page: number) => string;
}

interface MoveTarget {
	icon: LucideIcon;
	label: string;
}

const MOVE_TARGETS: Record<Exclude<PaginationTargetKind, 'page'>, MoveTarget> = {
	first: { icon: ChevronFirst, label: 'First page' },
	jumpBack: { icon: ChevronsLeft, label: 'Back 10 pages' },
	previous: { icon: ChevronLeft, label: 'Previous page' },
	next: { icon: ChevronRight, label: 'Next page' },
	jumpForward: { icon: ChevronsRight, label: 'Forward 10 pages' },
	last: { icon: ChevronLast, label: 'Last page' },
};

const ITEM_CLASS = 'flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm';

export const Pagination = ({ page, totalPages, hrefForPage }: PaginationProps) => (
	<nav aria-label="Pagination">
		<ul className="flex items-center gap-1">
			{paginationTargets(page, totalPages).map(({ kind, page: target }) => {
				if (kind === 'page') {
					const isCurrent = target === page;
					return (
						<li key={`page-${target}`}>
							<Link
								href={hrefForPage(target)}
								aria-current={isCurrent ? 'page' : undefined}
								className={joinClasses(ITEM_CLASS, isCurrent ? 'bg-raised text-foreground' : IDLE_LINK_CLASS)}
							>
								{target}
							</Link>
						</li>
					);
				}
				const { icon: Icon, label } = MOVE_TARGETS[kind];
				return (
					<li key={kind}>
						<Link href={hrefForPage(target)} aria-label={label} className={joinClasses(ITEM_CLASS, IDLE_LINK_CLASS)}>
							<Icon aria-hidden className="size-4" />
						</Link>
					</li>
				);
			})}
		</ul>
	</nav>
);
