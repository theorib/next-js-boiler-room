// @ts-check

import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';
import { Linter } from 'eslint';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';
import vitest from 'eslint-plugin-vitest';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: eslint.configs.recommended,
});

const nextConfig = compat.config({
  extends: [
    // 'eslint:recommended',
    'next/core-web-vitals',
    'next/typescript',
    // 'prettier',
  ],
  // extends: [
  // 'eslint:recommended',
  // 'next',
  // 'next/typescript',
  // 'prettier',
  // ],
});

const compilerConfig = compat.config({
  plugins: ['react-compiler'],
  rules: {
    'react-compiler/react-compiler': 'error',
  },
});

/** @type {import('eslint').Linter.Config} */
const ignoreConfig = {
  ignores: [
    '.next/**',
    'node_modules',
    'node_modules/**',
    'dist/**',
    'coverage/**',
    '*.config.js',
    '*.config.mjs',
    '*.config.cjs',
  ],
};

/** @type {import('eslint').Linter.Config} */
const testingConfig = {
  files: [
    '**/__test(s)__/*.{j,t}s?(x)',
    '**/*.spec.{j,t}s?(x)',
    '**/*.test(s).{j,t}s?(x)',
  ],
  ignores: ignoreConfig.ignores,
  plugins: { vitest },
  settings: {
    vitest: {
      typecheck: true,
      // testEnvironment: 'jsdom',
    },
  },
  languageOptions: {
    globals: {
      ...vitest.environments.env.globals,
    },
  },
  ...testingLibrary.configs['flat/dom'],
  rules: {
    ...vitest.configs.recommended.rules,
    'vitest/expect-expect': 'off', // eliminate
  },
};

/** @type {import('eslint').Linter.Config} */
const languageOptions = {
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
};

const eslintConfig = tseslint.config(
  eslint.configs.recommended,
  ignoreConfig,
  eslintConfigPrettier,
  tseslint.configs.recommendedTypeChecked,
  reactRefresh.configs.recommended,
  ...compilerConfig,
  testingConfig,
  jestDom.configs['flat/recommended'],
  languageOptions,
  ...nextConfig,
  {
    extends: [
      eslint.configs.recommended,
      eslintConfigPrettier,
      tseslint.configs.recommendedTypeChecked,
      reactRefresh.configs.recommended,
      jestDom.configs['flat/recommended'],
      ignoreConfig,
      languageOptions,
      ...compilerConfig,
      ...nextConfig,
    ],
    files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.cjs', '*.mjs'],
    rules: {
      'react-refresh/only-export-components': [
        'off',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          ignoreIIFE: true,
        },
      ],
    },
  },
);

export default eslintConfig;
