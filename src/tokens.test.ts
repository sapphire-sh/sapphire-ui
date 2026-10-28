// @vitest-environment node

import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { colorTokens } from './tokens.js';

const css = readFileSync(new URL('./theme.css', import.meta.url), 'utf8');
const darkStart = css.indexOf('@media (prefers-color-scheme: dark)');
const themeStart = css.indexOf('@theme inline');
const lightBlock = css.slice(0, darkStart);
const darkBlock = css.slice(darkStart, themeStart);
const themeBlock = css.slice(themeStart);

describe('theme.css', () => {
	it('theme.css declares every light token of colorTokens on :root', () => {
		for (const [name, value] of Object.entries(colorTokens.light)) {
			expect(lightBlock).toContain(`--${name}: ${value};`);
		}
	});

	it('theme.css declares every dark token of colorTokens under prefers-color-scheme dark', () => {
		for (const [name, value] of Object.entries(colorTokens.dark)) {
			expect(darkBlock).toContain(`--${name}: ${value};`);
		}
	});

	it('theme.css maps every token to a --color- theme variable', () => {
		for (const name of Object.keys(colorTokens.light)) {
			expect(themeBlock).toContain(`--color-${name}: var(--${name});`);
		}
	});
});

describe('colorTokens', () => {
	it('colorTokens carries warning and the three mark tokens in both schemes', () => {
		expect(colorTokens.light).toMatchObject({
			warning: 'oklch(0.555 0.163 49)',
			'mark-rose': 'oklch(0.514 0.222 16.9)',
			'mark-violet': 'oklch(0.491 0.27 292.6)',
			'mark-slate': 'oklch(0.446 0.043 257.3)',
		});
		expect(colorTokens.dark).toMatchObject({
			warning: 'oklch(0.828 0.189 84.4)',
			'mark-rose': 'oklch(0.712 0.194 13.4)',
			'mark-violet': 'oklch(0.811 0.111 293.6)',
			'mark-slate': 'oklch(0.869 0.022 252.9)',
		});
	});
});
