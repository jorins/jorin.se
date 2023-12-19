import nextra from 'nextra'

/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {}

/**
 * @type { import('nextra').NextraConfig }
 */
const nextraConfig = {
  theme: './theme/Layout.tsx',
  themeConfig: './theme.config.tsx',
}

export default nextra(nextraConfig)(nextConfig)
