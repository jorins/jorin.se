import nextra from 'nextra'
import sectionize from 'remark-sectionize'

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
  latex: true,
  mdxOptions: {
    remarkPlugins: [sectionize],
  },
}

export default nextra(nextraConfig)(nextConfig)
