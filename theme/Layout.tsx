import type { NextraThemeLayoutProps } from 'nextra'
import type { FullThemeConfig } from './lib/config'

import '@openfonts/quicksand_all'

import Nav from './siteComponents/Nav'
import Toc from './siteComponents/Toc'

import { resolveTemplate } from './templates'
import { defaultConfig } from './lib/config'
import { registerImage } from './pageComponents'

export default function Layout(props: NextraThemeLayoutProps) {
  const { pageOpts, pageProps, children } = props

  // Build theme config including defaults
  const themeConfig: FullThemeConfig = {
    ...defaultConfig,
    ...props.themeConfig,
  }

  // Register pre-defined images
  Object.entries(themeConfig.images).forEach(([key, image]) =>
    registerImage(key, image),
  )

  // Get the target template
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
