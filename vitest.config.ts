import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  optimizeDeps: {
    // Exclude next/image from pre-bundling so Vitest's mock interceptor can
    // catch it in the transform pipeline. Pre-bundled modules are served from
    // the /@vite/deps/ cache and bypass vi.mock in browser mode.
    exclude: ['next/image'],
  },
  test: {
    globals: true,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.next/**',
    ],
    setupFiles: ['./src/testUtils/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['html'],
    },
    projects: [
      {
        extends: 'vitest.config.ts',
        test: {
          name: 'react-jsdom',
          include: ['src/**/*.{test,spec}.jsdom.{ts,tsx,js,jsx}'],
          exclude: ['**/e2e/**', 'node_modules/**'],
          environment: 'jsdom',
        },
      },
      {
        extends: 'vitest.config.ts',
        test: {
          name: 'react-browser-mode',
          include: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}'],
          exclude: [
            '**/e2e/**',
            'node_modules/**',
            '**/*.jsdom.*',
            'src/__tests__/e2e/**/*',
          ],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
