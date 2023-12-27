/**
 * @type { import('lint-staged').Config }
 */
const config = {
  '*.ts': 'pnpm run test',
  '*.{js,jsx,mjs,cjs,ts,tsx,mdx,scss}': 'eslint --fix',
  '*': 'prettier --ignore-unknown --write',
}

export default config
