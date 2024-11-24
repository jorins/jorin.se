import type { FullThemeConfig } from './config'
import type { MdxFile } from 'nextra'

import { asMdxFile, getShortTitle, pagesInHierarchy } from './pageMap'

type TitleComponent = string | null | undefined

function keepStrings(i: TitleComponent): i is string {
  return typeof i === 'string'
}

/**
 * Make a title for a <title> tag using a given list of components
 */
export function makeTitle(
  components: TitleComponent[],
  themeConfig: FullThemeConfig,
): string {
  const { postfix, separator } = themeConfig.title
  const calculatedComponents = [...components, postfix].filter(keepStrings)
  return calculatedComponents.join(separator)
}

/**
 * Make a title for a <title> tag based on the page hierarchy.
 */
export function makeHierarchicalTitle(
  pages: MdxFile[],
  route: string,
  themeConfig: FullThemeConfig,
): string {
  const pageTitles = pagesInHierarchy(pages, route)
    .map(asMdxFile)
    .map(getShortTitle)
    .slice(1) // Discard index; the site name is used in its place
    .reverse()
  return makeTitle(pageTitles, themeConfig)
}
