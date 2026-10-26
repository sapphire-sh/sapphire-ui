export interface LoadingBlockProps {
	label: string;
}

export const Spinner = () => (
	<svg aria-hidden viewBox="0 0 24 24" fill="none" className="size-4 motion-safe:animate-spin">
		<circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="42 15" />
	</svg>
);

export const LoadingBlock = ({ label }: LoadingBlockProps) => (
	<div role="status" className="flex items-center justify-center gap-2 py-8 text-sm text-muted">
		<Spinner />
		<span>{label}</span>
	</div>
);
