import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    extends: 'vitest.config.ts',
    test: {
      include: ['src/**/*.{test,spec}.jsdom.{ts,tsx,js,jsx}'],
      name: 'react-jsdom',
      environment: 'jsdom',
    },
  },
  {
    extends: 'vitest.config.ts',
    test: {
      name: 'react-browser-mode',
      include: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}'],
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }],
      },
    },
  },
]);
