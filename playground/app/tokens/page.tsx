'use client';

import { Nav, ThemeToggle, colorTokens } from '../../../lib/index.js';
import { NAV_ITEMS } from '../navItems';

const TOKEN_SCHEMES = ['light', 'dark'] as const;

const TokensPage = () => (
	<>
		<Nav brand="@sapphire-sh/ui" items={NAV_ITEMS} actions={<ThemeToggle />} />
		<main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
			<h1 className="text-xl font-semibold">Color tokens</h1>
			{TOKEN_SCHEMES.map((scheme) => (
				<section key={scheme} className="flex flex-col gap-2">
					<h2 className="text-sm font-semibold text-muted">{scheme}</h2>
					<ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
						{Object.entries(colorTokens[scheme]).map(([name, value]) => (
							<li key={name} className="flex items-center gap-2 text-xs">
								<span className="size-6 rounded-md border border-border" style={{ backgroundColor: value }} />
								<span className="font-mono">{name}</span>
							</li>
						))}
					</ul>
				</section>
			))}
		</main>
	</>
);

export default TokensPage;
