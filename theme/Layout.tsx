import type { NextraThemeLayoutProps } from 'nextra'

import '@openfonts/quicksand_all'
import { useRouter } from 'nextra/hooks'
import { MDXProvider } from 'nextra/mdx'

import { HeadingCounterProvider, LayoutPropsProvider } from 'contexts'
import { expandLayoutProps } from 'lib/expandLayoutProps'
import { mdxComponents } from 'mdxComponents'
import { registerImage } from 'pageComponents'
import { SiteNav, Toc } from 'siteComponents'
import { resolveTemplate } from 'templates'

export default function Layout(rawProps: NextraThemeLayoutProps) {
  const expandedProps = expandLayoutProps(rawProps)
  const { route } = useRouter()
  const { children } = expandedProps

  // Register pre-defined images
  Object.entries(expandedProps.themeConfig.images).forEach(([key, image]) =>
    registerImage(key, image),
  )

  // Get the target template
  const Template = resolveTemplate(
    expandedProps.pageOpts,
    route,
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
