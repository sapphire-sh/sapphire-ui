export type PaginationTargetKind = 'first' | 'jumpBack' | 'previous' | 'page' | 'next' | 'jumpForward' | 'last';

export interface PaginationTarget {
	kind: PaginationTargetKind;
	page: number;
}

const JUMP_PAGES = 10;
const NEIGHBOR_PAGES = 2;

export const paginationTargets = (page: number, totalPages: number): PaginationTarget[] => {
	const targets: PaginationTarget[] = [];
	if (page > 1) {
		targets.push({ kind: 'first', page: 1 });
	}
	if (page - JUMP_PAGES >= 1) {
		targets.push({ kind: 'jumpBack', page: page - JUMP_PAGES });
	}
	if (page > 1) {
		targets.push({ kind: 'previous', page: page - 1 });
	}
	const lastNeighbor = Math.min(totalPages, page + NEIGHBOR_PAGES);
	for (let neighbor = Math.max(1, page - NEIGHBOR_PAGES); neighbor <= lastNeighbor; neighbor += 1) {
		targets.push({ kind: 'page', page: neighbor });
	}
	if (page < totalPages) {
		targets.push({ kind: 'next', page: page + 1 });
	}
	if (page + JUMP_PAGES <= totalPages) {
		targets.push({ kind: 'jumpForward', page: page + JUMP_PAGES });
	}
	if (page < totalPages) {
		targets.push({ kind: 'last', page: totalPages });
	}
	return targets;
};
