import type { NextraThemeLayoutProps, PageOpts } from 'nextra'
import type { ThemeConfig } from './config'

import { minimatch } from 'minimatch'

import Collection from './templates/Collection'
import Page from './templates/Page'
import Tag from './templates/Tag'
import Tags from './templates/Tags'

export type TemplateProps = {
  children: React.ReactNode
} & NextraThemeLayoutProps

/** Shared template specification */
export type Template = ({children}: TemplateProps) => React.ReactElement

/** Template patterns for specification in config */
export interface TemplatePattern {
  pattern: string
  template: string
}

/** Template lookup table for manually picked templates */
const templates = {
  collection: Collection,
  page: Page,
  tag: Tag,
  tags: Tags,
} satisfies Record<string, Template>

export function resolveTemplate(page: PageOpts, themeConfig: ThemeConfig): Template {
  const route = page.route
  const specified = page.frontMatter.template

  // First check for a specified template
  if (specified !== undefined) {
    const found: Template | undefined = templates[specified]
    if (found === undefined) {
      throw new Error(`Page '${page.filePath}' specifies unknown template '${specified}'`)
    }

    return found
  }

  // Then match against patterns
  for (const i of themeConfig.templates) {
    if (minimatch(route, i.pattern)) {
      // console.debug(route, '->', i.pattern)
      return templates[i.template]
    }
  }
  
  // If a fallback is desired, it should be explicitly specified as a wildcard
  // in `patterns`. Thus we throw here.
  throw new Error(`Page '${page.filePath}' does not specify a template and its route '${route}' does not match any existing one.`)
}
