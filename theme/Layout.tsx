import type { NextraThemeLayoutProps } from 'nextra'

import '@openfonts/quicksand_all'
import { MDXProvider } from 'nextra/mdx'

import { expandLayoutProps } from './lib/expandLayoutProps'
import { registerImage } from './pageComponents'
import { SiteNav, Toc } from './siteComponents'
import mdxComponents from './mdxComponents'
import { resolveTemplate } from './templates'
import { HeadingCounterProvider, LayoutPropsProvider } from './contexts'

export default function Layout(rawProps: NextraThemeLayoutProps) {
  const expandedProps = expandLayoutProps(rawProps)
  const { children } = expandedProps

  // Register pre-defined images
  Object.entries(expandedProps.themeConfig.images).forEach(([key, image]) =>
    registerImage(key, image),
  )

  // Get the target template
  const Template = resolveTemplate(
    expandedProps.pageOpts,
    expandedProps.themeConfig,
  )

  return (
    <LayoutPropsProvider layoutProps={expandedProps}>
      <SiteNav />
      <Toc />
      <main className="site-block">
        <HeadingCounterProvider>
          <MDXProvider components={mdxComponents}>
            <Template>{children}</Template>
          </MDXProvider>
        </HeadingCounterProvider>
      </main>
    </LayoutPropsProvider>
  )
}
