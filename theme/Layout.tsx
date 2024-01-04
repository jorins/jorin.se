import type { NextraThemeLayoutProps } from 'nextra'

import '@openfonts/quicksand_all'

import { SiteNav, Toc } from './siteComponents'

import { resolveTemplate } from './templates'
import { expandLayoutProps } from './lib/expandLayoutProps'
import { registerImage } from './pageComponents'

export default function Layout(rawProps: NextraThemeLayoutProps) {
  const { children, pageOpts, pageProps, themeConfig } =
    expandLayoutProps(rawProps)

  // Register pre-defined images
  Object.entries(themeConfig.images).forEach(([key, image]) =>
    registerImage(key, image),
  )

  // Get the target template
  const Template = resolveTemplate(pageOpts, themeConfig)

  return (
    <>
      <SiteNav pageOpts={pageOpts} themeConfig={themeConfig} />
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
