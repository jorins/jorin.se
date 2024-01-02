/**
 * @module
 * Some types from `nextra` with baked-in `FrontMatter` typing.
 */

import type * as Nextra from 'nextra'
import type { TemplateName } from '../../templates'
import type { FullThemeConfig } from '../config'

type Tab = 'alphabetic' | 'date' | 'tags'

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
}>

// Re-exports
export type PageOpts = Nextra.PageOpts<FrontMatter>
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
