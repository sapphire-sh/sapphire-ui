import { describe, expect, it } from 'vitest';

describe('test environment', () => {
	it('provides a jsdom document to tests', () => {
		expect(document.createElement('div').tagName).toBe('DIV');
	});
});
