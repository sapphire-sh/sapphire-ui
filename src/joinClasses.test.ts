import { describe, expect, it } from 'vitest';
import { joinClasses } from './joinClasses.js';

describe('joinClasses', () => {
	it('joins class strings and drops false, undefined and empty strings', () => {
		expect(joinClasses('a', false, undefined, '', 'b')).toBe('a b');
	});
});
