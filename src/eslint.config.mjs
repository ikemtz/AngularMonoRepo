import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import nx from '@nx/eslint-plugin';
import ngrxEslintPlugin from '@ngrx/eslint-plugin';
import eslintPluginJest from 'eslint-plugin-jest';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import globals from 'globals';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

export default [
  ...nx.configs['flat/base'],
  {
    plugins: {
      '@ngrx': ngrxEslintPlugin,
      jest: eslintPluginJest,
    },
  },
  { languageOptions: { globals: { ...(globals.jest / globals) } } },
  {
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
  ...compat
    .config({
      extends: [],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      rules: {
        ...config.rules,
        '@nx/dependency-checks': 'error',
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    })),
  ...nx.configs['flat/typescript'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-extra-semi': 'off',
    },
  },
  ...nx.configs['flat/javascript'],
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'no-extra-semi': 'off',
    },
  },
  ...compat
    .config({
      extends: [],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts'],
      rules: {
        ...config.rules,
        ...ngrxEslintPlugin.configs.all,
      },
    })),
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    languageOptions: {
      parser: angularTemplateParser,
    },
    rules: {
      '@angular-eslint/template/interactive-supports-focus': 'warn',
      '@angular-eslint/template/click-events-have-key-events': 'warn',
    },
  },
  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    processor: '@angular-eslint/template/extract-inline-html',
    rules: {
      '@angular-eslint/template/interactive-supports-focus': 'warn',
      '@angular-eslint/template/click-events-have-key-events': 'warn',
    },
  },
  {
    ignores: [
      'libs/imng-oidc-client/src/assets',
      '**/gen-ts.js',
      '**/models/**/*.ts',
    ],
  },
];
