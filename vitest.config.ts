import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { playwright } from "@vitest/browser-playwright";


export default defineConfig({
  plugins: [
    react(),
    // If you are using TypeScript, this give vite the ability to resolve imports using TypeScript's path mapping.
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    setupFiles: ['./src/testUtils/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['html'],
    },
    projects:[{
    extends: 'vitest.config.ts',
    test: {
      include: ['src/**/*.{test,spec}.jsdom.{ts,tsx,js,jsx}'],
      exclude: ["**/e2e/**", "node_modules/**"],
      name: 'react-jsdom',
      environment: 'jsdom',
    },
  },
  {
    extends: 'vitest.config.ts',
    test: {
      name: 'react-browser-mode',
      exclude: ["**/e2e/**", "node_modules/**", "**/*.jsdom.*",'src/__tests__/e2e/**/*'],
      include: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}'],
      browser: {
        enabled: true,
        headless: true,
        provider: playwright(),
        instances: [{ browser: 'chromium' }],
      },
    },
  },],
  },
})
