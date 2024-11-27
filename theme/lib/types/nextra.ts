/**
 * @module
 * Some types from `nextra` with baked-in `FrontMatter` typing.
 */

import type { FullThemeConfig } from 'lib/config'
import type * as Nextra from 'nextra'
import type { ExtLinkProps } from 'pageComponents'
import type { TemplateName } from 'templates'

type Tab = 'alphabetic' | 'date' | 'tags'

/**
 * An ext link with `children` renamed to `name` for readability in front matters.
 */
type FurtherReadingLink = Omit<ExtLinkProps, 'children'> & {
  name: string
}

/**
 * This is how a front matter should look. Partial enforces double-checking
 * values in usage.
 */
export type FrontMatter = Partial<{
  /**
   * Page title
   */
  title: string

  /**
   * Shorter page title for navigational links to the page
   */
  shortTitle: string

  /**
   * A short description of the page
   */
  description: string

  /**
   * A timestamp for the page. It can for example be time of publication or
   * time of writing. Format as anything that parses in `new Date()`, e.g.
   * `2024-01-09`
   */
  date: string

  /**
   * The template to use for the page
   */
  template: TemplateName

  /**
   * Default tab to have opened in collections
   */
  defaultTab: Tab

  /**
   * Whether the page should be hidden from listings.
   */
  hidden: boolean

  /**
   * Page tags
   */
  tags: string[]

  /**
   * Related pages on the site. Use [[wikilinks]]
   */
  related: string[]

  /**
   * External links for further reading. They can be given titles using the
   * furtherReadingLinks property of the theme config.
   */
  furtherReading: string[]

  /**
   * Workaround to inform the theme whether the page uses footnotes.
   * If set to true, Footnotes will be added to the ToC
   */
  footnotes: boolean
}>

/**
 * Page opts with baked FrontMatter type and added flat page structure.
 */
export type PageOpts = Nextra.PageOpts<FrontMatter> & {
  pages: MdxFile[]
}

// Re-exports
export type MdxFile = Nextra.MdxFile<FrontMatter>
export type Folder = Nextra.Folder<PageMapItem>
export type MetaJsonFile = Nextra.MetaJsonFile
export type PageMapItem = Folder | MdxFile | MetaJsonFile
export type ThemeLayoutProps = {
  pageOpts: PageOpts
  pageProps: any
  themeConfig: FullThemeConfig
  children: React.ReactNode
}
