import type { NextraThemeLayoutProps } from 'nextra'
import type { FullThemeConfig } from './lib/config'

import '@openfonts/quicksand_all'

import Nav from './siteComponents/Nav'
import Toc from './siteComponents/Toc'

import { resolveTemplate } from './templates'
import { defaultConfig } from './lib/config'

export default function Layout(props: NextraThemeLayoutProps) {
  const { pageOpts, pageProps, children } = props
  const themeConfig: FullThemeConfig = {
    ...defaultConfig,
    ...props.themeConfig,
  }

  const Template = resolveTemplate(pageOpts, themeConfig)

  return (
    <>
      <Nav pageOpts={pageOpts} themeConfig={themeConfig} />
      <Toc headings={pageOpts.headings} />
      <main className="site-block">
        <Template
          pageOpts={pageOpts}
          pageProps={pageProps}
          themeConfig={themeConfig}
        >
          {children}
        </Template>
      </main>
    </>
  )
}
