import { describe, expect, it, vi } from 'vitest';

vi.mock('next/link', () => {
	throw new Error('next/link');
});
vi.mock('next/navigation', () => {
	throw new Error('next/navigation');
});

describe('index', () => {
	it('loads without importing next', async () => {
		const entry = await import('./index.js');
		expect(Object.keys(entry).toSorted()).toEqual([
			'Button',
			'CELL_CLASS',
			'Chip',
			'DataTable',
			'EmptyState',
			'FIELD_CLASS',
			'LoadingBlock',
			'Modal',
			'ROW_CLASS',
			'Spinner',
			'ThemeToggle',
			'ToastProvider',
			'colorTokens',
			'currentNavHref',
			'paginationTargets',
			'useToast',
		]);
	});
});
