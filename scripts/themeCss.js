import { writeFileSync } from 'node:fs';
import { themeCss } from '../lib/themeCss.js';
import { colorTokens } from '../lib/tokens.js';

writeFileSync(new URL('../src/theme.css', import.meta.url), themeCss(colorTokens));
