/* eslint-disable @typescript-eslint/no-unused-vars */
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';
import vitest from 'eslint-plugin-vitest';
// @ts-expect-error there are no type definitions for this
import pluginNext from '@next/eslint-plugin-next';
import react from 'eslint-plugin-react';
import globals from 'globals';
// @ts-expect-error there are no type definitions for this
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
// @ts-expect-error there are no type definitions for this
import importPlugin from 'eslint-plugin-import';
import { Linter, ESLint } from 'eslint';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
// import jestDom from 'eslint-plugin-jest-dom';
// import testingLibrary from 'eslint-plugin-testing-library';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  resolvePluginsRelativeTo: __dirname,
});

const TSX_FILE_PATTERNS = ['**/*.?(c|m)ts?(x)'];
const JSX_FILE_PATTERNS = ['**/*.?(c|m)js?(x)'];
const NEXT_JSX_FILE_PATTERNS = ['src/**/*.?(c|m)[jt]s?(x)'];

const TEST_FILE_PATTERNS_JS = [
  '**/__tests__/**/*.?(c|m)js?(x)',
  '**/*.(spec|test).?(c|m)js?(x)',
];
const TEST_FILE_PATTERNS_TS = [
  '**/__tests__/**/*.?(c|m)ts?(x)',
  '**/*.(spec|test).?(c|m)ts?(x)',
];

const TEST_FILE_PATTERNS = [...TEST_FILE_PATTERNS_JS, ...TEST_FILE_PATTERNS_TS];

const IGNORE_PATTERNS = [
  '.next/**',
  'node_modules',
  'node_modules/**',
  'dist/**',
  'coverage/**',
];

const eslintPluginReactRecommended = {
  name: 'eslint-plugin-react-recommended',
  files: [...NEXT_JSX_FILE_PATTERNS],
  ...react.configs.flat.recommended,
  plugins: {
    react,
  },
  languageOptions: {
    ...react.configs.flat.recommended.languageOptions,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
} satisfies Linter.Config;

const eslintPluginReactHooksRecommended = {
  name: 'eslint-plugin-react-hooks-recommended',
  files: [...NEXT_JSX_FILE_PATTERNS],
  plugins: { 'react-hooks': reactHooks as ESLint.Plugin },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
} satisfies Linter.Config;

const eslintPluginReactRefreshRecommended = {
  name: 'eslint-config-react-refresh',
  files: [...NEXT_JSX_FILE_PATTERNS],
  ...reactRefresh.configs.recommended,
  rules: {
    ...reactRefresh.configs.recommended.rules,
    'react-refresh/only-export-components': 'warn',
  },
} satisfies Linter.Config;

const [compilerConfigCompat] = compat.config({
  plugins: ['react-compiler'],
  rules: {
    'react-compiler/react-compiler': 'error',
  },
});

const eslintPluginReactcompiler = {
  name: 'eslint-plugin-react-compiler',
  files: [...NEXT_JSX_FILE_PATTERNS],
  ...compilerConfigCompat,
} satisfies Linter.Config;

const jsxA11yConfigRecommended = {
  files: [...NEXT_JSX_FILE_PATTERNS],
  ...jsxA11y.flatConfigs.recommended,
} satisfies Linter.Config;

const prettierConfig = {
  name: 'eslint-config-prettier',
  files: [...JSX_FILE_PATTERNS],
  ...eslintConfigPrettier,
} satisfies Linter.Config;

const eslintPluginNextRecommended = {
  name: 'eslint-plugin-next-recommended',
  plugins: {
    '@next/next': pluginNext as ESLint.Plugin,
  },

  rules: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...(pluginNext?.configs?.recommended?.rules as Record<
      string,
      Linter.RuleEntry
    >),
  },
  files: [...NEXT_JSX_FILE_PATTERNS],
} satisfies Linter.Config;

const eslintConfigNext = {
  name: 'eslint-config-next',

  plugins: { import: importPlugin as ESLint.Plugin },
  languageOptions: {
    parser: tseslint.parser as Linter.Parser,
    // parser: babelParser,
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      requireConfigFile: false,
      projectService: true,
      allowImportExportEverywhere: true,
      babelOptions: {
        presets: ['next/babel'],
        caller: {
          // Eslint supports top level await when a parser for it is included. We enable the parser by default for Babel.
          supportsTopLevelAwait: true,
        },
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
} satisfies Linter.Config;

const coreWebVitalsConfig = {
  name: 'core-web-vitals',
  files: [...NEXT_JSX_FILE_PATTERNS],
  plugins: {
    '@next/next': pluginNext as ESLint.Plugin,
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'error',
    '@next/next/no-sync-scripts': 'error',
  },
} satisfies Linter.Config;

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
    parser: tseslint.parser as Linter.Parser,
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
    globals: {
      ...vitest.environments.env.globals,
    },
  },
  rules: {
    ...vitest.configs.recommended.rules,
  },
} satisfies Linter.Config;

const vitestCustomConfigTS = {
  name: 'eslint-vitest-no-ts',
  files: [...TEST_FILE_PATTERNS_TS],
  ignores: [...IGNORE_PATTERNS, ...TEST_FILE_PATTERNS_JS],
  rules: {
    '@typescript-eslint/await-thenable': 'warn',
    // 'vitest/expect-expect': 'off', // eliminate
  },
} satisfies Linter.Config;

// const eslintPluginTestingLibraryRecommended = {
//   name: 'eslint-plugin-testing-library-recommended',
//   files: [...TEST_FILE_PATTERNS],
//   ...testingLibrary.configs['flat/dom'],
// };

// const eslintPluginJestDomRecommended = {
//   name: 'eslint-config-jest-dom',
//   files: [...TEST_FILE_PATTERNS],
//   ...jestDom.configs['flat/recommended'],
// };

const ignoreConfig: Linter.Config = {
  name: 'eslint-config-ignores',
  ignores: [...IGNORE_PATTERNS],
};

const eslintDefaults = {
  name: 'eslint-config-default-recommended',
  // files: [...JSX_FILE_PATTERNS],
  ...eslint.configs.recommended,
} satisfies Linter.Config;

//
const tsEslintParserOptionsTypeChecked = [
  {
    name: 'ts-eslint-recommended-TypeChecked-parser-options',
    languageOptions: {
      parser: tseslint.parser as Linter.Parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    name: 'ts-eslint-disable-TypeChecked-for-js-files',
    files: [...JSX_FILE_PATTERNS],
    // extends: [tseslint.configs.disableTypeChecked],
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
    },
  },
] satisfies Array<Linter.Config>;

const eslintConfig = tseslint.config(
  ignoreConfig,

  eslintDefaults,
  tseslint.configs.recommendedTypeChecked,
  tsEslintParserOptionsTypeChecked,

  eslintPluginReactRecommended,
  eslintPluginReactHooksRecommended,
  // eslintPluginReactRefreshRecommended,
  eslintPluginReactcompiler,

  jsxA11yConfigRecommended,

  eslintPluginNextRecommended,
  eslintConfigNext,
  coreWebVitalsConfig,

  eslintPluginVitestRecommended,
  vitestCustomConfigTS,
  prettierConfig,

  {
    name: 'eslint-config-my-config',
    files: [...JSX_FILE_PATTERNS],
    ignores: [...IGNORE_PATTERNS],
    languageOptions: {
      parser: tseslint.parser as Linter.Parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
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
  } satisfies Linter.Config,
);

export default eslintConfig;
