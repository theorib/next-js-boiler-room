/* eslint-disable @typescript-eslint/no-unused-vars */
import tseslint from 'typescript-eslint'
import { TSESLint } from '@typescript-eslint/utils'
import eslint from '@eslint/js'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintConfigPrettier from 'eslint-config-prettier'
import vitest from 'eslint-plugin-vitest'
// @ts-expect-error there are no type definitions for this
import pluginNext from '@next/eslint-plugin-next'
import react from 'eslint-plugin-react'
import globals from 'globals'
// @ts-expect-error there are no type definitions for this
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
// @ts-expect-error there are no type definitions for this
import importPlugin from 'eslint-plugin-import'
import { Linter, ESLint } from 'eslint'
import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'
import jestDom from 'eslint-plugin-jest-dom'
import testingLibrary from 'eslint-plugin-testing-library'

// Eslint Default is Linter.Config
type Config = TSESLint.FlatConfig.Config
// Eslint Default is Array<Linter.Config>
type ConfigArray = TSESLint.FlatConfig.ConfigArray
// Eslint Default is Array<string | string[]>
type ConfigFiles = TSESLint.FlatConfig.Config['files']
// Eslint Default is Array<string>
type ConfigIgnores = TSESLint.FlatConfig.Config['ignores']
// Eslint Default is ESLint.Plugin
type ConfigPlugin = TSESLint.FlatConfig.Plugin | undefined
// Eslint Default is Record<string, ESLint.Plugin>
type ConfigPlugins = TSESLint.FlatConfig.Plugins | undefined
// Eslint Default is Linter.RulesRecord
type ConfigRules = TSESLint.FlatConfig.Config['rules']
// Eslint Default is Linter.LanguageOptions
type ConfigLanguageOptions = TSESLint.FlatConfig.Config['languageOptions']

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  resolvePluginsRelativeTo: __dirname,
})

const TSX_FILE_PATTERNS = ['**/*.?(c|m)ts?(x)'] satisfies ConfigFiles
const JSX_FILE_PATTERNS = ['**/*.?(c|m)js?(x)'] satisfies ConfigFiles
const NEXT_JSX_FILE_PATTERNS = [
  'src/**/*.?(c|m)[jt]s?(x)',
] satisfies ConfigFiles

const TEST_FILE_PATTERNS_JS = [
  '**/__tests__/**/*.?(c|m)js?(x)',
  '**/*.(spec|test).?(c|m)js?(x)',
] satisfies ConfigFiles
const TEST_FILE_PATTERNS_TS = [
  '**/__tests__/**/*.?(c|m)ts?(x)',
  '**/*.(spec|test).?(c|m)ts?(x)',
] satisfies ConfigFiles

const TEST_FILE_PATTERNS = [
  ...TEST_FILE_PATTERNS_JS,
  ...TEST_FILE_PATTERNS_TS,
] satisfies ConfigFiles

const IGNORE_PATTERNS = [
  '.next/',
  '**/node_modules/',
  '.git/',
  '**/dist/',
  '**/coverage/',
] satisfies ConfigIgnores

const reactRecommended = {
  name: 'react/recommended',
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
} satisfies Config

const reactHooksRecommended = {
  name: 'react-hooks/recommended',
  files: [...NEXT_JSX_FILE_PATTERNS],
  plugins: { 'react-hooks': reactHooks as ESLint.Plugin },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
} satisfies Config

const reactRefreshRecommended = {
  name: 'react-refresh/recommended',
  files: [...NEXT_JSX_FILE_PATTERNS],
  ...reactRefresh.configs.recommended,
  rules: {
    ...reactRefresh.configs.recommended.rules,
    'react-refresh/only-export-components': 'warn',
  },
} satisfies Config

const [compilerConfigCompat] = compat.config({
  plugins: ['react-compiler'],
  rules: {
    'react-compiler/react-compiler': 'error',
  },
})

const reactCompilerRecommended = {
  files: [...NEXT_JSX_FILE_PATTERNS],
  ...compilerConfigCompat,
  name: 'react-compiler/recommended',
} satisfies Config

const jsxA11yRecommended = {
  files: [...NEXT_JSX_FILE_PATTERNS],
  ...jsxA11y.flatConfigs.recommended,
  name: 'jsx-a11y/recommended',
} satisfies Config

const prettierRecommended = {
  files: [...JSX_FILE_PATTERNS],
  ...eslintConfigPrettier,
  name: 'prettier/recommended',
} satisfies Config

const nextNextRecommended = {
  name: '@next/next/recommended',
  plugins: {
    '@next/next': pluginNext as ESLint.Plugin,
  },

  rules: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...(pluginNext?.configs?.recommended?.rules as ConfigRules),
  },
  files: [...NEXT_JSX_FILE_PATTERNS],
} satisfies Config

const configNext = {
  name: 'config-next',

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
} satisfies Config

const coreWebVitals = {
  name: 'core-web-vitals',
  files: [...NEXT_JSX_FILE_PATTERNS],
  plugins: {
    ...nextNextRecommended.plugins,
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'error',
    '@next/next/no-sync-scripts': 'error',
  },
} satisfies Config

const vitestRecommended = {
  name: 'vitest/recommended',
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
} satisfies Config

const vitestDisableTypeChecked = {
  name: 'vitest/disable-type-checked',
  files: [...TEST_FILE_PATTERNS_TS],
  ignores: [...IGNORE_PATTERNS, ...TEST_FILE_PATTERNS_JS],
  rules: {
    '@typescript-eslint/await-thenable': 'warn',
    // 'vitest/expect-expect': 'off', // eliminate
  },
} satisfies Config

const testingLibraryRecommended = {
  name: 'testing-library/recommended',
  files: [...TEST_FILE_PATTERNS],
  ...testingLibrary.configs['flat/dom'],
}

const jestDomRecommended = {
  name: 'jest-dom/recommended',
  files: [...TEST_FILE_PATTERNS],
  ...jestDom.configs['flat/recommended'],
}

const ignoreConfig = {
  name: 'ignores',
  ignores: [...IGNORE_PATTERNS],
} satisfies Config

const eslintDefaults = {
  name: 'eslint/recommended',
  ...eslint.configs.recommended,
} satisfies Config

//

const typescriptEslintRecommendedTypeCheckedPlugins = {
  ...tseslint.configs.recommendedTypeChecked.reduce<ConfigPlugins>(
    (plugins: ConfigPlugins, config: Config): ConfigPlugins => {
      if (!config.plugins) return plugins
      return { ...plugins, ...(config.plugins as ConfigPlugins) }
    },
    {},
  ),
} satisfies ConfigPlugins

const typescriptEslintRecommendedTypeCheckedLanguageOptions = {
  name: '@typescript-eslint/recommended-type-checked/language-options',
  languageOptions: {
    sourceType: 'module',
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
} satisfies Config

const typescriptEslintDisableTypeChecked = {
  name: '@typescript-eslint/disable-type-checked',
  files: [...JSX_FILE_PATTERNS],
  plugins: { ...typescriptEslintRecommendedTypeCheckedPlugins },

  rules: {
    ...tseslint.configs.disableTypeChecked.rules,
  },
} satisfies Config

const eslintConfig = [
  ignoreConfig,
  eslintDefaults,
  ...tseslint.configs.recommendedTypeChecked,
  // typescriptEslintRecommendedTypeCheckedLanguageOptions,
  typescriptEslintDisableTypeChecked,
  reactRecommended,
  reactHooksRecommended,
  // eslintPluginReactRefreshRecommended,
  reactCompilerRecommended,
  jsxA11yRecommended,
  nextNextRecommended,
  configNext,
  coreWebVitals,
  vitestRecommended,
  vitestDisableTypeChecked,
  // testingLibraryRecommended,
  // jestDomRecommended,
  prettierRecommended,
  {
    name: 'custom-config',
    files: [...JSX_FILE_PATTERNS, ...TSX_FILE_PATTERNS],
    ignores: [...IGNORE_PATTERNS],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      ...jsxA11yRecommended.plugins,
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
      'jsx-a11y/anchor-has-content': 'warn',
    },
  },
] satisfies ConfigArray

export default eslintConfig
