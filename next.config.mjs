import nextra from 'nextra'
import behead from 'remark-behead'
import lilypond from 'remark-lilypond'
import sectionize from 'remark-sectionize'

/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },

  webpack: config => {
    config.resolve.fallback = { fs: false }
    return config
  },
}

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
      [
        lilypond,
        {
          strategy: 'img-png'
        }
      ]
    ],
  },
}

export default nextra(nextraConfig)(nextConfig)
