import type { FullThemeConfig } from './config'

type TitleComponent = string | null | undefined

function keepStrings(i: TitleComponent): i is string {
  return typeof i === 'string'
}

/**
 * Make a title for a <title> tag
 */
export function makeTitle(
  components: TitleComponent[],
  themeConfig: FullThemeConfig,
): string {
  const { postfix, separator } = themeConfig.title
  const calculatedComponents = [...components, postfix].filter(keepStrings)
  return calculatedComponents.join(separator)
}
