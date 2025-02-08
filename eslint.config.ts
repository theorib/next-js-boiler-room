/* eslint-disable @typescript-eslint/no-unused-vars */
import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'
import tsdoc from 'eslint-plugin-tsdoc'
import react from 'eslint-plugin-react'
import reactRefresh from 'eslint-plugin-react-refresh'
// @ts-expect-error there are no type definitions for this
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-config-prettier'
import vitest from 'eslint-plugin-vitest'
import jestDom from 'eslint-plugin-jest-dom'
import testingLibrary from 'eslint-plugin-testing-library'
// @ts-expect-error there are no type definitions for this
import next from '@next/eslint-plugin-next'
import globals from 'globals'
import jsxA11y from 'eslint-plugin-jsx-a11y'
// @ts-expect-error there are no type definitions for this
import importPlugin from 'eslint-plugin-import'
import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { type Linter, type ESLint } from 'eslint'
import { type TSESLint } from '@typescript-eslint/utils'

/**
 * Replace Types from 'eslint' such as the ones from Linter and ESLint and it's sub types such as Linter.Config with stricter types from '\@typescript-eslint/utils'
 * Replace Types from 'eslint' such as the ones from Linter and ESLint and it's sub types such as Linter.Config with stricter types from '\@typescript-eslint/utils'
 * @see {@link https://typescript-eslint.io/packages/utils}
 */
// Eslint Default is Linter.Config
type Config = TSESLint.FlatConfig.Config
// Eslint Default is Array<Linter.Config>
type ConfigArray = TSESLint.FlatConfig.ConfigArray
// Eslint Default is Array<string | string[]>
type ConfigFiles = TSESLint.FlatConfig.Config['files']
// Eslint Default is Array<string>
type ConfigIgnores = TSESLint.FlatConfig.Config['ignores']
// Eslint Default is ESLint.Plugin
type ConfigPlugin = TSESLint.FlatConfig.Plugin
// Eslint Default is Record<string, ESLint.Plugin>
type ConfigPlugins = TSESLint.FlatConfig.Plugins | undefined
// Eslint Default is Linter.RulesRecord
type ConfigRules = TSESLint.FlatConfig.Config['rules']
// Eslint Default is Linter.LanguageOptions
type ConfigLanguageOptions = TSESLint.FlatConfig.Config['languageOptions']

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * FlatCompat is a utility class that allows us to use eslintrc Config files (pre ESLint v9) with ESlint v9  Flat Config files
 * @see {@link https://eslint.org/docs/latest/use/configure/migration-guide#using-eslintrc-configs-in-flat-config }
 */
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  resolvePluginsRelativeTo: __dirname,
})

const JS_FILE_PATTERNS = ['**/*.?(c|m)js'] satisfies ConfigFiles
const JSX_FILE_PATTERNS = ['**/*.?(c|m)jsx'] satisfies ConfigFiles
const TS_FILE_PATTERNS = ['**/*.?(c|m)ts'] satisfies ConfigFiles
const TSX_FILE_PATTERNS = ['**/*.?(c|m)tsx'] satisfies ConfigFiles
const JSX_TSX_FILE_PATTERNS = [
  ...JSX_FILE_PATTERNS,
  ...TSX_FILE_PATTERNS,
] satisfies ConfigFiles
const JS_JSX_TS_TSX_FILE_PATTERNS = [
  ...JS_FILE_PATTERNS,
  ...JSX_FILE_PATTERNS,
  ...TS_FILE_PATTERNS,
  ...TSX_FILE_PATTERNS,
] satisfies ConfigFiles
const NEXT_JS_JSX_TS_TSX_FILE_PATTERNS = [
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

/**
 * 'eslint-plugin-tsdoc' does not have a recommended config that is directly compatible with flat config files ESlint v9+ so we need to create our own
 * @see {@link https://github.com/microsoft/tsdoc/issues/374#issuecomment-2336536959}
 */
const tsdocRecommended = {
  name: 'tsdoc/recommended',
  plugins: {
    tsdoc: tsdoc,
  },
  rules: {
    'tsdoc/syntax': 'warn',
  },
} satisfies Config

/**
 * This is the recommended configuration for React projects
 * @see {@link https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#configuring-shared-settings}
 */
const reactRecommended = {
  name: 'react/recommended',
  files: [...JS_JSX_TS_TSX_FILE_PATTERNS],
  ...react.configs.flat.recommended,
  languageOptions: {
    ...react.configs.flat.recommended.languageOptions,
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
    },
  },
  settings: { react: { version: 'detect' } },
} satisfies Config

/**
 * JSX Runtime is recommended for React v17+ projects
 * @see {@link https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#configuring-shared-settings}
 */
const reactJsxRuntime = {
  name: 'react/jsx-runtime',
  files: [...JS_JSX_TS_TSX_FILE_PATTERNS],
  ...react.configs.flat['jsx-runtime'],
} satisfies Config

/**
 * This eslint plugin enforces React's Rule of Hooks
 * @see {@link https://react.dev/reference/rules/rules-of-hooks}
 * As of 'eslint-plugin-react-hooks' v5.1.0 there is a bug when
 * implementing the current recommended way of adding this plugin.
 * It breaks ESlint `TypeError: Cannot read properties of undefined (reading 'plugins')`
 * This configuration follows the plugin's custom configuration suggestion which is currenlty exactly the same as what their recommended config should be:
 * @see {@link https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#custom-configuration}
 */
const reactHooksRecommended = {
  name: 'react-hooks/recommended',
  files: [...JS_JSX_TS_TSX_FILE_PATTERNS],
  // plugins: { 'react-hooks': reactHooks as ESLint.Plugin },
  plugins: { 'react-hooks': reactHooks as ConfigPlugin },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
} satisfies Config

/**
 * This plugin Validate that your components can safely be updated with Fast Refresh or hot reloading.
 * This configuration is the same as the recommended config with the addition of adding the files property as well as a name for the config.
 * @see {@link https://github.com/ArnaudBarre/eslint-plugin-react-refresh?tab=readme-ov-file#recommended-config}
 */
const reactRefreshRecommended = {
  name: 'react-refresh/recommended',
  files: [...JS_JSX_TS_TSX_FILE_PATTERNS],
  ...reactRefresh.configs.recommended,
} satisfies Config

/**
 * This ESLint plugin will display any violations of the rules of React in your editor. When it does this, it means that the compiler has skipped over optimizing that component or hook. This is perfectly okay, and the compiler can recover and continue optimizing other components in your codebase.

 * The current recommended ways of implementing this plugin are:
 * {@link https://react.dev/learn/react-compiler#installing-eslint-plugin-react-compiler}
 * {@link https://github.com/facebook/react/tree/main/compiler/packages/eslint-plugin-react-compiler}
 * However, as of 'eslint-plugin-react-compiler' v19.0.0-beta-714736e-20250131 there is a bug in both recommended ways of using this plugin.
 * The current workaround I found is to use the FlatCompat utility to patch the config from .eslintrc deprecated config styles.
 * Currently the plugin throw a TypeError: Cannot read properties of undefined (reading 'configs') when running eslint

 */
const [compilerConfigCompat] = compat.config({
  plugins: ['react-compiler'],
  rules: {
    'react-compiler/react-compiler': 'error',
  },
})

const reactCompilerRecommended = {
  files: [...JS_JSX_TS_TSX_FILE_PATTERNS],
  ...compilerConfigCompat,
  name: 'react-compiler/recommended',
} satisfies Config

/**
 * This plugin does a static evaluation of the JSX in your code to spot accessibility issues in React apps.
 * Bellow is the recommended config from the plugin's documentation with the addition of adding the files property as well as a name for the config.
 * @see {@link https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main}
 */
const jsxA11yRecommended = {
  files: [...JS_JSX_TS_TSX_FILE_PATTERNS],
  ...jsxA11y.flatConfigs.recommended,
  name: 'jsx-a11y/recommended',
} satisfies Config

/**
 * This plugin Turns off all eslint rules that are unnecessary or might conflict with Prettier.
 * This lets you use your favorite shareable configs without letting their stylistic choices get in the way when using Prettier.
 * This configuration is the same as the recommended config with the addition of adding the files property as well as a name for the config.
 * @see {@link https://github.com/prettier/eslint-config-prettier}
 */
const prettierRecommended = {
  files: [...JS_JSX_TS_TSX_FILE_PATTERNS],
  ...prettier,
  name: 'prettier/recommended',
} satisfies Config

/**
 * /node_modules/eslint-config-next/index.js
Error: Failed to patch ESLint because the calling module was not recognized.
https://github.com/microsoft/rushstack/issues
https://nextjs.org/docs/pages/api-reference/config/eslint
 */
const nextNextRecommended = {
  name: '@next/next/recommended',
  plugins: {
    '@next/next': next as ConfigPlugin,
  },

  rules: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- This is a bug in eslint-plugin-next
    ...(next.configs.recommended.rules as ConfigRules),
  },
  files: [...NEXT_JS_JSX_TS_TSX_FILE_PATTERNS],
} satisfies Config

const configNext = {
  name: 'config-next',

  plugins: { import: importPlugin as ESLint.Plugin },
  languageOptions: {
    parser: tseslint.parser,
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
  files: [...NEXT_JS_JSX_TS_TSX_FILE_PATTERNS],
} satisfies Config

const coreWebVitals = {
  name: 'core-web-vitals',
  files: [...NEXT_JS_JSX_TS_TSX_FILE_PATTERNS],
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
  tsdocRecommended,
  eslintDefaults,
  ...tseslint.configs.recommendedTypeChecked,
  // typescriptEslintRecommendedTypeCheckedLanguageOptions,
  typescriptEslintDisableTypeChecked,
  reactRecommended,
  reactJsxRuntime,
  reactHooksRecommended,
  reactRefreshRecommended,
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
    files: [...JS_JSX_TS_TSX_FILE_PATTERNS],
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
