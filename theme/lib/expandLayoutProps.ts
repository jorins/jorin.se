import type * as Nextra from 'nextra'
import type { ThemeLayoutProps, PageOpts } from './types'
import type { FullThemeConfig } from './config'

import { defaultConfig } from './config'
import { getAllPages } from './pageMap'

/**
 * Convert `NextraThemeLayoutProps` to `ThemeLayoutProps`, adding relevant
 * defaults and deriving more info for pageOpts.
 */
export function expandLayoutProps(
  props: Nextra.NextraThemeLayoutProps,
): ThemeLayoutProps {
  return {
    children: props.children,
    pageProps: props.pageProps,
    themeConfig: applyThemeConfigDefaults(props.themeConfig),
    pageOpts: expandPageOpts(props.pageOpts),
  }
}

/**
 * Apply defaults to theme config
 */
export function applyThemeConfigDefaults(
  themeConfig: Nextra.ThemeConfig,
): FullThemeConfig {
  return {
    ...defaultConfig,
    ...themeConfig,
  }
}

/**
 * Modify page opts:
 *  * Convert from Nextra `PageOpts` to customised `PageOpts`
 *  * Add flattened pageMap
 *  * Add headings entries for footnotes and further reading, if they exist
 */
export function expandPageOpts(pageOpts: Nextra.PageOpts): PageOpts {
  const headings = [...pageOpts.headings]

  const hasFootnotes = pageOpts?.frontMatter?.footnotes === true

  if (hasFootnotes) {
    headings.push({
      value: 'Footnotes',
      depth: 2,
      id: 'footnote-label',
    })
  }

  const hasMetadata =
    [
      pageOpts?.frontMatter?.related,
      pageOpts?.frontMatter?.tags,
      pageOpts?.frontMatter?.furtherReading,
    ].find(i => i !== undefined) !== undefined

  if (hasMetadata) {
    headings.push({
      value: 'See also',
      depth: 2,
      id: 'metadata-label',
    })
  }

  return {
    ...pageOpts,
    headings,
    pages: getAllPages(pageOpts.pageMap),
  }
}
