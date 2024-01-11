import type { NextraThemeLayoutProps } from 'nextra'

import '@openfonts/quicksand_all'
import { MDXProvider } from 'nextra/mdx'

import { expandLayoutProps } from './lib/expandLayoutProps'
import { registerImage } from './pageComponents'
import { SiteNav, Toc } from './siteComponents'
import mdxComponents from './mdxComponents'
import { resolveTemplate } from './templates'
import { HeadingCounterProvider } from './contexts'

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
        <HeadingCounterProvider>
          <MDXProvider components={mdxComponents}>
            <Template
              pageOpts={pageOpts}
              pageProps={pageProps}
              themeConfig={themeConfig}
            >
              {children}
            </Template>
          </MDXProvider>
        </HeadingCounterProvider>
      </main>
    </>
  )
}
