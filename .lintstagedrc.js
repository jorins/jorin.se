const test = 'pnpm run test'
const lint = 'eslint --fix'
const format = 'prettier --write'

/**
 * @type { import('lint-staged').Config }
 */
const config = {
  '*.{ts,tsx}': [test, lint, format],
  '*.{js,jsx,mjs,cjs}': [lint, format],
  '.*rc.{js,mjs,cjs}': [lint, format],
  '*.{md,mdx,html,css,scss}': [format],
}

export default config
