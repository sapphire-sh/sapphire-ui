'use client';

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
	ThemeToggle,
	useToast,
} from '../../lib/index.js';
import { NAV_ITEMS } from './navItems';

type ProjectStatus = 'Active' | 'Archived';

type StatusFilter = 'All' | ProjectStatus;

interface Project {
	name: string;
	status: ProjectStatus;
	tasks: number;
	updated: string;
}

const PROJECTS: readonly Project[] = [
	{ name: 'Atlas', status: 'Active', tasks: 24, updated: '2026-10-27' },
	{ name: 'Beacon', status: 'Active', tasks: 12, updated: '2026-10-26' },
	{ name: 'Cobalt', status: 'Archived', tasks: 0, updated: '2026-09-14' },
	{ name: 'Delta', status: 'Active', tasks: 8, updated: '2026-10-25' },
	{ name: 'Ember', status: 'Active', tasks: 31, updated: '2026-10-24' },
	{ name: 'Fjord', status: 'Archived', tasks: 2, updated: '2026-08-30' },
	{ name: 'Granite', status: 'Active', tasks: 16, updated: '2026-10-22' },
	{ name: 'Harbor', status: 'Archived', tasks: 0, updated: '2026-07-11' },
];

const STATUS_FILTERS: readonly StatusFilter[] = ['All', 'Active', 'Archived'];

const STATUS_CLASS: Record<ProjectStatus, string> = {
	Active: 'text-success',
	Archived: 'text-muted',
};

const CELL_CLASS = 'px-3 py-2';

const PlaygroundPage = () => {
	const [query, setQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
	const [modalOpen, setModalOpen] = useState(false);
	const toast = useToast();

	const normalizedQuery = query.trim().toLowerCase();
	const projects = PROJECTS.filter(
		({ name, status }) =>
			(statusFilter === 'All' || status === statusFilter) && name.toLowerCase().includes(normalizedQuery),
	);

	return (
		<>
			<Nav brand="@sapphire-sh/ui" items={NAV_ITEMS} actions={<ThemeToggle />} />
			<main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_16rem]">
				<div className="flex flex-col gap-4">
					<header className="flex items-center justify-between gap-4">
						<h1 className="text-xl font-semibold">Projects</h1>
						<Button
							variant="primary"
							onClick={() => {
								setModalOpen(true);
							}}
						>
							New project
						</Button>
					</header>
					<div className="flex flex-wrap items-center gap-3">
						<input
							aria-label="Search projects"
							placeholder="Search projects"
							value={query}
							onChange={(event) => {
								setQuery(event.target.value);
							}}
							className={FIELD_CLASS}
						/>
						<div className="flex gap-2">
							{STATUS_FILTERS.map((filter) => (
								<Chip
									key={filter}
									pressed={statusFilter === filter}
									onClick={() => {
										setStatusFilter(filter);
									}}
								>
									{filter}
								</Chip>
							))}
						</div>
					</div>
					{projects.length === 0 ? (
						<EmptyState>No projects match</EmptyState>
					) : (
						<DataTable>
							<thead>
								<tr>
									<th className={`${CELL_CLASS} text-left`}>Name</th>
									<th className={`${CELL_CLASS} text-left`}>Status</th>
									<th className={`${CELL_CLASS} text-right`}>Tasks</th>
									<th className={`${CELL_CLASS} text-left`}>Updated</th>
									<th className={CELL_CLASS} />
								</tr>
							</thead>
							<tbody>
								{projects.map(({ name, status, tasks, updated }) => (
									<tr key={name} className="border-t border-border">
										<td className={CELL_CLASS}>{name}</td>
										<td className={`${CELL_CLASS} ${STATUS_CLASS[status]}`}>{status}</td>
										<td className={`${CELL_CLASS} text-right`}>{tasks}</td>
										<td className={`${CELL_CLASS} text-muted`}>{updated}</td>
										<td className={`${CELL_CLASS} text-right`}>
											<Button
												variant="danger"
												onClick={() => {
													toast.show({ message: 'Archive failed', tone: 'error' });
												}}
											>
												Archive
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</DataTable>
					)}
					<Pagination page={1} totalPages={5} hrefForPage={(page) => `/?page=${page}`} />
				</div>
				<aside className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
					<h2 className="text-sm font-semibold text-muted">Activity</h2>
					<LoadingBlock label="Loading activity" />
				</aside>
			</main>
			<Modal
				open={modalOpen}
				onClose={() => {
					setModalOpen(false);
				}}
				title="New project"
			>
				<div className="flex flex-col gap-4">
					<input aria-label="Name" placeholder="Name" className={FIELD_CLASS} />
					<div className="flex justify-end gap-2">
						<Button
							variant="ghost"
							onClick={() => {
								setModalOpen(false);
							}}
						>
							Cancel
						</Button>
						<Button
							variant="primary"
							onClick={() => {
								setModalOpen(false);
								toast.show({ message: 'Project created', tone: 'success' });
							}}
						>
							Create
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default PlaygroundPage;
