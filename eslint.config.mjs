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
import importPlugin from 'eslint-plugin-import';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const JSX_FILE_PATTERNS = ['**/*.[jt]s?(x)', '**/*.?(c|m)[jt]s?(x)'];
const NEXT_JSX_FILE_PATTERNS = [
  'src/**/*.[jt]s?(x)',
  'src/**/*.?(c|m)[jt]s?(x)',
];

const TEST_FILE_PATTERNS = [
  '**/__tests__/**/*.[jt]s?(x)',
  '**/__tests__/**/*.?(c|m)[jt]s?(x)',
  '**/*.spec.[jt]s?(x)',
  '**/*.spec.?(c|m)[jt]s?(x)',
  '**/*.test.[jt]s?(x)',
  '**/*.test.?(c|m)[jt]s?(x)',
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
  files: [...NEXT_JSX_FILE_PATTERNS],
  ...reactCompiler.configs.recommended,
};

/** @type {import('eslint').Linter.Config} */
const eslintPluginReactRecommended = {
  name: 'eslint-plugin-react-recommended',
  files: [...NEXT_JSX_FILE_PATTERNS],
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
  files: [...NEXT_JSX_FILE_PATTERNS],
  plugins: { 'react-hooks': reactHooks },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};

/** @type {import('eslint').Linter.Config} */
const eslintPluginReactRefreshRecommended = {
  name: 'eslint-config-react-refresh',
  files: [...NEXT_JSX_FILE_PATTERNS],
  ...reactRefresh.configs.recommended,
};

/** @type {import('eslint').Linter.Config} */
const jsxA11yConfigRecommended = {
  files: [...NEXT_JSX_FILE_PATTERNS],
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
    '@typescript-eslint/await-thenable': 'warn',
    // 'vitest/expect-expect': 'off', // eliminate
  },
};

/** @type {import('eslint').Linter.Config} */
const eslintPluginTestingLibraryRecommended = {
  name: 'eslint-plugin-testing-library-recommended',
  files: [...TEST_FILE_PATTERNS],
  ...testingLibrary.configs['flat/dom'],
};

/** @type {import('eslint').Linter.Config} */
const eslintPluginJestDomRecommended = {
  name: 'eslint-config-jest-dom',
  files: [...TEST_FILE_PATTERNS],
  ...jestDom.configs['flat/recommended'],
};

/** @type {import('eslint').Linter.Config} */
const eslintDefaults = {
  name: 'eslint-config-default-recommended',
  files: [...JSX_FILE_PATTERNS],
  ...eslint.configs.recommended,
};

/** @type {import('eslint').Linter.Config} */
const prettierConfig = {
  name: 'eslint-config-prettier',
  files: [...JSX_FILE_PATTERNS],
  ...eslintConfigPrettier,
};

/** @type {import('eslint').Linter.Config} */
const eslintPluginNextRecommended = {
  name: 'eslint-plugin-next-recommended',
  plugins: {
    '@next/next': pluginNext,
  },
  rules: {
    ...pluginNext.configs.recommended.rules,
  },
  files: [...NEXT_JSX_FILE_PATTERNS],
};

/** @type {import('eslint').Linter.Config} */
const eslintConfigNext = {
  name: 'eslint-config-next',

  plugins: { import: importPlugin },
  languageOptions: {
    parser: require('./node_modules/eslint-config-next/parser'),
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      requireConfigFile: false,
      tsconfigRootDir: import.meta.dirname,
      projectService: true,
      sourceType: 'module',
      allowImportExportEverywhere: true,
      babelOptions: {
        presets: ['next/babel'],
        caller: {
          // Eslint supports top level await when a parser for it is included. We enable the parser by default for Babel.
          supportsTopLevelAwait: true,
        },
      },
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/no-anonymous-default-export': 'warn',
    'react/no-unknown-property': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/alt-text': [
      'warn',
      {
        elements: ['img'],
        img: ['Image'],
      },
    ],
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-proptypes': 'warn',
    'jsx-a11y/aria-unsupported-elements': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',
    'react/jsx-no-target-blank': 'off',
  },
  files: [...NEXT_JSX_FILE_PATTERNS],
};

/** @type {import('eslint').Linter.Config} */
const coreWebVitalsConfig = {
  name: 'core-web-vitals',
  files: [...NEXT_JSX_FILE_PATTERNS],
  plugins: {
    '@next/next': pluginNext,
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'error',
    '@next/next/no-sync-scripts': 'error',
  },
};

/** @type {import('eslint').Linter.Config} */
const tsEslintConfigsRecommendedTypeChecked = [
  tseslint.configs.recommendedTypeChecked,
  {
    name: 'ts-eslint-recommended-type-checked-parser-options',
    files: [...JSX_FILE_PATTERNS],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

const eslintConfig = tseslint.config(
  ignoreConfig,

  eslintDefaults,
  tsEslintConfigsRecommendedTypeChecked,

  eslintPluginReactRecommended,
  eslintPluginReactHooksRecommended,
  eslintPluginReactRefreshRecommended,
  eslintPluginReactcompiler,

  jsxA11yConfigRecommended,

  // eslintPluginTestingLibraryRecommended,
  eslintPluginJestDomRecommended,

  eslintPluginNextRecommended,
  eslintConfigNext,
  coreWebVitalsConfig,

  eslintPluginVitestRecommended,
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
