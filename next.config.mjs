import nextra from 'nextra'
import sectionize from 'remark-sectionize'
import behead from 'remark-behead'

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
    remarkPlugins: [
      [
        behead,
        {
          minDepth: 2,
        },
      ],
      sectionize,
    ],
  },
}

export default nextra(nextraConfig)(nextConfig)
