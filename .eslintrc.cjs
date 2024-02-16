/**
 * @type { import('eslint').Linter.Config }
 */
module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],

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
}
