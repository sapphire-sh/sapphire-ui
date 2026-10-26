import type { ReactNode } from 'react';

export interface EmptyStateProps {
	children: ReactNode;
}

export const EmptyState = ({ children }: EmptyStateProps) => <p className="text-sm text-muted">{children}</p>;
