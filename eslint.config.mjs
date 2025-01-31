import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';
import vitest from 'eslint-plugin-vitest';
import pluginNext from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactCompiler from 'eslint-plugin-react-compiler';
import jsxA11y from 'eslint-plugin-jsx-a11y';
// import eslintConfigNext from 'eslint-config-next';

const JSX_FILE_PATTERNS = ['**/*.{j,t,mj,mt,cj,ct}s?(x)'];
const TEST_FILE_PATTERNS = [
  '**/__test(s)__/*.{j,t,mj,mt,cj,ct}s?(x)',
  '**/__test(s)__/*.cjs',
  '**/*.spec.{j,t,mj,mt,cj,ct}s?(x)',
  '**/*.test(s).{j,t,mj,mt,ct,ct}s?(x)',
];

const IGNORE_PATTERNS = [
  '.next/**',
  'node_modules',
  'node_modules/**',
  'dist/**',
  'coverage/**',
  '*.config.js',
  '*.config.mjs',
  '*.config.cjs',
];

/** @type {import('eslint').Linter.Config} */
const eslintPluginReactcompiler = {
  name: 'eslint-plugin-react-compiler',
  ...reactCompiler.configs.recommended,
};

/** @type {import('eslint').Linter.Config} */
const eslintPluginReactRecommended = {
  name: 'eslint-plugin-react-recommended',
  files: [...JSX_FILE_PATTERNS],
  ...reactPlugin.configs.flat.recommended,
  languageOptions: {
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
    },
    ...reactPlugin.configs.flat.recommended.languageOptions,
  },
};

/** @type {import('eslint').Linter.Config} */
const eslintPluginReactHooksRecommended = {
  name: 'eslint-plugin-react-hooks-recommended',
  files: [...JSX_FILE_PATTERNS],
  plugins: { 'react-hooks': reactHooks },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};

/** @type {import('eslint').Linter.Config} */
const eslintPluginReactRefreshRecommended = {
  name: 'eslint-config-react-refresh',
  ...reactRefresh.configs.recommended,
};

/** @type {import('eslint').Linter.Config} */
const jsxA11yConfigRecommended = {
  ...jsxA11y.flatConfigs.recommended,
};

/** @type {import('eslint').Linter.Config} */
const ignoreConfig = {
  name: 'eslint-config-ignores',
  ignores: [...IGNORE_PATTERNS],
};

/** @type {import('eslint').Linter.Config} */
const eslintPluginVitestRecommended = {
  name: 'eslint-plugin-vitest-recommended',
  files: [...TEST_FILE_PATTERNS],
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
  rules: {
    ...vitest.configs.recommended.rules,
    'vitest/expect-expect': 'off', // eliminate
  },
};

/** @type {import('eslint').Linter.Config} */
const eslintPluginTestingLibraryRecommended = {
  name: 'eslint-plugin-testing-library-recommended',
  ...testingLibrary.configs['flat/dom'],
};

/** @type {import('eslint').Linter.Config} */
const eslintPluginJestDomRecommended = {
  name: 'eslint-config-jest-dom',
  ...jestDom.configs['flat/recommended'],
};

/** @type {import('eslint').Linter.Config} */
const eslintDefaults = {
  name: 'eslint-config-default-recommended',
  ...eslint.configs.recommended,
};

/** @type {import('eslint').Linter.Config} */
const prettierConfig = {
  name: 'eslint-config-prettier',
  ...eslintConfigPrettier,
};

/** @type {import('eslint').Linter.Config[]} */
const nextConfig = [
  {
    name: 'eslint-plugin-next-recommended',
    files: [...JSX_FILE_PATTERNS],
    plugins: {
      '@next/next': pluginNext,
    },
    languageOptions: {
      // parser,
      // equivalent to :
      //  env: {
      //    browser: true,
      //    node: true,
      //  }

      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        requireConfigFile: false,
        tsconfigRootDir: import.meta.dirname,
        projectService: true,

        // ecmaVersion: 2022,
        sourceType: 'module',
        allowImportExportEverywhere: true,
        babelOptions: {
          presets: ['next/babel'],
          caller: {
            // Eslint supports top level await when a parser for it is included. We enable the parser by default for Babel.
            supportsTopLevelAwait: true,
          },
        },
        // ecmaFeatures: {
        //   jsx: true,
        // },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // ...eslintConfigNext.rules,
      ...pluginNext.configs.recommended.rules,
    },
  },
  {
    name: 'eslint-config-next-core-web-vitals',
    files: [...JSX_FILE_PATTERNS],
    rules: {
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-sync-scripts': 'error',
    },
  },
];

const eslintConfig = tseslint.config(
  ignoreConfig,

  eslintDefaults,

  tseslint.configs.recommendedTypeChecked,

  eslintPluginReactRecommended,
  eslintPluginReactHooksRecommended,
  eslintPluginReactRefreshRecommended,
  eslintPluginReactcompiler,

  jsxA11yConfigRecommended,

  eslintPluginVitestRecommended,
  eslintPluginTestingLibraryRecommended,
  eslintPluginJestDomRecommended,

  ...nextConfig,

  prettierConfig,

  {
    name: 'eslint-config-my-config',
    files: [...JSX_FILE_PATTERNS],
    ignores: [...IGNORE_PATTERNS],
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
