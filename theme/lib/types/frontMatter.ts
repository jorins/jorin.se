import type { TemplateName } from '../../templates'

type Tab = 'alphabetic' | 'date' | 'tags'

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
}>
