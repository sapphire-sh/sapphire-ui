import config from '@sapphire-sh/utils/vitest/next';
import { mergeConfig } from 'vitest/config';

export default mergeConfig(config, {
	test: {
		environment: 'jsdom',
	},
});
