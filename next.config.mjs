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

  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
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
          strategy: 'inline-svg',
        },
      ],
    ],
  },
}

export default nextra(nextraConfig)(nextConfig)
