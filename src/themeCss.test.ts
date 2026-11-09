// @vitest-environment node

import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { themeCss } from './themeCss.js';
import { colorTokens } from './tokens.js';

describe('themeCss', () => {
	it('theme.css equals themeCss(colorTokens)', () => {
		expect(readFileSync(new URL('./theme.css', import.meta.url), 'utf8')).toBe(themeCss(colorTokens));
	});
});
