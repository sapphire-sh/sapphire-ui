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
