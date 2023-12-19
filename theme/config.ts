import type { Locale } from "../lib/types"
import type { NavProps } from './components/Nav'
import type { TemplatePattern } from './templates'

export interface ThemeConfig {
  lang: Locale
  templates: TemplatePattern[]
  nav: NavProps
}
