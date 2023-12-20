import type { Locale } from "../../lib/types"
import type { LinkSpec } from '../components/Nav'
import type { TemplatePattern } from '../templates'

/** A complete theme config. This is to be used internally by the theme. */
export interface FullThemeConfig {
  lang: Locale
  title: {
    postfix: string | null
    separator: string
  }
  templates: TemplatePattern[]
  externalLinks: LinkSpec[]
}

/** A partial theme config. It is to be used in the theme config. */
export type ThemeConfig = Partial<FullThemeConfig>

export const defaultConfig: FullThemeConfig = {
  lang: 'en-GB',
  title: {
    separator: ' | ',
    postfix: null
  },
  templates: [
    {
      pattern: '/',
      template: 'page',
    },
    {
      pattern: '/*',
      template: 'collection',
    },
    {
      pattern: '/*/tags',
      template: 'tags',
    },
    {
      pattern: '/*/tags/*',
      template: 'tag',
    },
    {
      pattern: '/*/*',
      template: 'page',
    },
  ],
  externalLinks: [
    {
      id: 'theme',
      title: 'Theme by Jorin',
      href: 'https://github.com/jorins',
    },
  ],
}
