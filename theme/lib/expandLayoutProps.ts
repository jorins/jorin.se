import type { FullThemeConfig } from './config'
import type { ThemeLayoutProps, PageOpts } from './types'
import type * as Nextra from 'nextra'

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
 */
export function expandPageOpts(pageOpts: Nextra.PageOpts): PageOpts {
  return {
    ...pageOpts,
    pages: getAllPages(pageOpts.pageMap),
  }
}
