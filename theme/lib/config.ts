import type { Locale } from './types/locale'
import type { LinkSpec } from '../siteComponents/Nav.tsx'
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
    postfix: null,
  },
  templates: [
    {
      pattern: '/',
      template: 'index',
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
      title: 'Nextra theme by Jorin',
      href: 'https://github.com/jorins',
    },
  ],
}
