'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import {
	Button,
	Chip,
	DataTable,
	EmptyState,
	FIELD_CLASS,
	LoadingBlock,
	Modal,
	Nav,
	Pagination,
	Spinner,
	colorTokens,
	useToast,
} from '../../lib/index.js';

const NAV_ITEMS = [
	{
		href: '/',
		label: 'Samples',
		children: [
			{ href: '/#buttons', label: 'Button' },
			{ href: '/#modal', label: 'Modal' },
		],
	},
];

const TOKEN_SCHEMES = ['light', 'dark'] as const;

const TABLE_ROWS = [
	{ name: 'Alpha', count: 12 },
	{ name: 'Beta', count: 7 },
];

interface SectionProps {
	id: string;
	title: string;
	children: ReactNode;
}

const Section = ({ id, title, children }: SectionProps) => (
	<section id={id} className="flex flex-col gap-3">
		<h2 className="text-sm font-semibold text-muted">{title}</h2>
		{children}
	</section>
);

const PlaygroundPage = () => {
	const [firstChipPressed, setFirstChipPressed] = useState(true);
	const [secondChipPressed, setSecondChipPressed] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const toast = useToast();

	return (
		<>
			<Nav brand="@sapphire-sh/ui" items={NAV_ITEMS} />
			<main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-8">
				<Section id="tokens" title="Color tokens">
					{TOKEN_SCHEMES.map((scheme) => (
						<div key={scheme} className="flex flex-col gap-2">
							<h3 className="text-xs text-muted">{scheme}</h3>
							<ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
								{Object.entries(colorTokens[scheme]).map(([name, value]) => (
									<li key={name} className="flex items-center gap-2 text-xs">
										<span className="size-6 rounded-md border border-border" style={{ backgroundColor: value }} />
										<span className="font-mono">{name}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</Section>
				<Section id="buttons" title="Button">
					<div className="flex flex-wrap gap-2">
						<Button variant="primary">Primary</Button>
						<Button>Secondary</Button>
						<Button variant="danger">Danger</Button>
						<Button variant="ghost">Ghost</Button>
					</div>
				</Section>
				<Section id="field" title="FIELD_CLASS">
					<input aria-label="Field" placeholder="Field" className={FIELD_CLASS} />
				</Section>
				<Section id="chip" title="Chip">
					<div className="flex gap-2">
						<Chip
							pressed={firstChipPressed}
							onClick={() => {
								setFirstChipPressed(!firstChipPressed);
							}}
						>
							Pressed
						</Chip>
						<Chip
							pressed={secondChipPressed}
							onClick={() => {
								setSecondChipPressed(!secondChipPressed);
							}}
						>
							Idle
						</Chip>
					</div>
				</Section>
				<Section id="data-table" title="DataTable">
					<DataTable>
						<thead>
							<tr>
								<th className="px-3 py-2 text-left">Name</th>
								<th className="px-3 py-2 text-right">Count</th>
							</tr>
						</thead>
						<tbody>
							{TABLE_ROWS.map(({ name, count }) => (
								<tr key={name} className="border-t border-border">
									<td className="px-3 py-2">{name}</td>
									<td className="px-3 py-2 text-right">{count}</td>
								</tr>
							))}
						</tbody>
					</DataTable>
				</Section>
				<Section id="empty-state" title="EmptyState">
					<EmptyState>No entries</EmptyState>
				</Section>
				<Section id="spinner" title="Spinner and LoadingBlock">
					<span className="text-accent">
						<Spinner />
					</span>
					<LoadingBlock label="Loading" />
				</Section>
				<Section id="pagination" title="Pagination">
					<Pagination page={3} totalPages={20} hrefForPage={(page) => `/?page=${page}`} />
				</Section>
				<Section id="modal" title="Modal">
					<div>
						<Button
							variant="primary"
							onClick={() => {
								setModalOpen(true);
							}}
						>
							Open modal
						</Button>
					</div>
					<Modal
						open={modalOpen}
						onClose={() => {
							setModalOpen(false);
						}}
						title="Modal"
					>
						<p className="text-sm">Escape or a click outside closes this dialog.</p>
					</Modal>
				</Section>
				<Section id="toast" title="Toast">
					<div className="flex gap-2">
						<Button
							onClick={() => {
								toast.show({ message: 'Saved', tone: 'success' });
							}}
						>
							Success toast
						</Button>
						<Button
							onClick={() => {
								toast.show({ message: 'Failed', tone: 'error' });
							}}
						>
							Error toast
						</Button>
					</div>
				</Section>
			</main>
		</>
	);
};

export default PlaygroundPage;
