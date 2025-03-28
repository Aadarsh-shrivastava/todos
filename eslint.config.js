import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import perfectionist from 'eslint-plugin-perfectionist'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prettier': prettierPlugin,
      'perfectionist': perfectionist,
      'sort-keys-fix': sortKeysFix,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-console': ['warn'],
      'prettier/prettier': 'error',
      "sort-keys": ["error", "asc", { "caseSensitive": true, "natural": false, "minKeys": 2 }],
      'perfectionist/sort-union-types': ['error', { 'order': 'asc' }],
      'sort-keys-fix/sort-keys-fix': 'error'
    },
  },
)
