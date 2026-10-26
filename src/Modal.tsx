'use client';

import type { ReactNode } from 'react';
import { useEffect, useId, useRef } from 'react';

export interface ModalProps {
	open: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
}

export const Modal = ({ open, onClose, title, children }: ModalProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const titleId = useId();

	useEffect(() => {
		const dialog = dialogRef.current;
		if (dialog === null) {
			return;
		}
		if (open && !dialog.open) {
			dialog.showModal();
		}
		if (!open && dialog.open) {
			dialog.close();
		}
	}, [open]);

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={titleId}
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}
			onClick={(event) => {
				if (event.target === event.currentTarget) {
					onClose();
				}
			}}
			className="rounded-lg border border-border bg-surface p-0 text-foreground backdrop:bg-foreground/40"
		>
			<div className="p-4">
				<h2 id={titleId} className="mb-3 text-base font-semibold">
					{title}
				</h2>
				{children}
			</div>
		</dialog>
	);
};
