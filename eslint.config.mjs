import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const config = [
  {
    ignores: ['**/pnpm-lock.yaml', '**/out', '.next'],
  },
  ...fixupConfigRules(
    compat.extends(
      'next/core-web-vitals',
      'plugin:import/recommended',
      'plugin:import/typescript',
    ),
  ),
  {
    rules: {
      'import/order': [
        'warn',
        {
          'groups': [
            'type',
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',

          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]

export default config
