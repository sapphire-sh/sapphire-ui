import config from '@sapphire-sh/utils/eslint/next';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
	...config,
	globalIgnores([
		'playground/.next/**',
		'playground/out/**',
		'playground/next-env.d.ts',
		'playground/postcss.config.mjs',
	]),
	{
		rules: {
			'@next/next/no-html-link-for-pages': 'off',
		},
	},
);
