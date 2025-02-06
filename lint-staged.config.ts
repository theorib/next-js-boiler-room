import type { Configuration } from 'lint-staged';

const config = {
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '**/*.{ts,tsx}': () => 'tsc',
  '**/*.{html,json,css,scss,md,mdx,js,jsx,ts,tsx}': ['prettier -w'],
} satisfies Configuration;

export default config;
