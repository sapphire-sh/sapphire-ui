import config from '@sapphire-sh/utils/eslint/next';
import { defineConfig } from 'eslint/config';

export default defineConfig(...config, {
	rules: {
		'@next/next/no-html-link-for-pages': 'off',
	},
});
