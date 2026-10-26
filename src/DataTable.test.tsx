import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { DataTable } from './DataTable.js';

afterEach(cleanup);

describe('DataTable', () => {
	it('applies widthClass to the table inside the bordered frame', () => {
		render(
			<DataTable widthClass="w-auto">
				<tbody>
					<tr>
						<td>1</td>
					</tr>
				</tbody>
			</DataTable>,
		);
		const table = screen.getByRole('table');
		expect(table.className).toBe('border-collapse text-foreground tabular-nums w-auto');
		expect(table.parentElement?.className).toBe('overflow-x-auto rounded-lg border border-border');
	});
});
