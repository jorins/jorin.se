import type { NextraThemeLayoutProps } from 'nextra'
import type { FullThemeConfig } from './lib/config'

import '@openfonts/quicksand_all'

import Nav from './siteComponents/Nav'
import Toc from './siteComponents/Toc'

import { resolveTemplate } from './templates'
import { defaultConfig } from './lib/config'

export default function Layout(props: NextraThemeLayoutProps) {
  const { pageOpts, children } = props
  const themeConfig: FullThemeConfig = {
    ...defaultConfig,
    ...props.themeConfig,
  }

  if (pageOpts.filePath.includes('[collection]')) {
    console.log("Template path:", props)
  }

  const Template = resolveTemplate(pageOpts, themeConfig)

  return (
    <>
      <Nav pageOpts={pageOpts} themeConfig={themeConfig} />
      <Toc headings={pageOpts.headings} />
      <main className="site-block">
        <Template {...props}>{children}</Template>
      </main>
    </>
  )
}
