import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    extends: 'vitest.config.ts',
    test: {
      include: ['src/**/*.{test,spec}.jsdom.{ts,tsx}'],
      name: 'react-jsdom',
      environment: 'jsdom',
    },
  },
  {
    extends: 'vitest.config.ts',
    test: {
      name: 'react-browser-mode',
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      browser: {
        enabled: true,
        headless: false,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }],
      },
    },
  },
]);
