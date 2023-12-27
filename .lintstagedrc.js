const test = 'pnpm run test'
const lint = 'eslint --fix'
const format = 'prettier --write'

/**
 * @type { import('lint-staged').Config }
 */
const config = {
  '*.ts': [test, lint, format],
  '*.{js,jsx,mjs,cjs,tsx,mdx,scss}': [lint, format],
  '.*rc.{js,mjs,cjs}': [lint, format],
}

export default config
