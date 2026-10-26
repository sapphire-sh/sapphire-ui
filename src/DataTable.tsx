import type { ReactNode } from 'react';

export interface DataTableProps {
	widthClass?: string;
	children: ReactNode;
}

export const DataTable = ({ widthClass = 'w-full', children }: DataTableProps) => (
	<div className="overflow-x-auto rounded-lg border border-border">
		<table className={`border-collapse text-foreground tabular-nums ${widthClass}`}>{children}</table>
	</div>
);
