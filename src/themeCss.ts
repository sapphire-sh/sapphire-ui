import type { colorTokens } from './tokens.js';

type ColorTokens = typeof colorTokens;

const declarations = (tokens: ColorTokens['light'], indent: string): string =>
	Object.entries(tokens)
		.map(([name, value]) => `${indent}--${name}: ${value};`)
		.join('\n');

const themeMappings = (tokens: ColorTokens['light']): string =>
	Object.keys(tokens)
		.map((name) => `\t--color-${name}: var(--${name});`)
		.join('\n');

export const themeCss = (tokens: ColorTokens): string => `:root {
${declarations(tokens.light, '\t')}
}

@media (prefers-color-scheme: dark) {
	:root:not([data-theme='light']) {
		color-scheme: dark;
${declarations(tokens.dark, '\t\t')}
	}
}

:root[data-theme='dark'] {
	color-scheme: dark;
${declarations(tokens.dark, '\t')}
}

@theme inline {
${themeMappings(tokens.light)}
	--font-sans: var(--font-noto-sans-kr), system-ui, sans-serif;
	--font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;
}
`;
