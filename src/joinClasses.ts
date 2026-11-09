export const joinClasses = (...classes: readonly (string | false | undefined)[]): string =>
	classes.filter((value): value is string => typeof value === 'string' && value !== '').join(' ');
