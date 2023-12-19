import type { NextraThemeLayoutProps } from 'nextra'

import '@openfonts/quicksand_all'

import Nav from './components/Nav'
import Toc from './components/Toc'
import { resolveTemplate } from './templates'

export default function Layout(props: NextraThemeLayoutProps) {
  const { pageOpts, pageProps, themeConfig, children } = props
  const Template = resolveTemplate(pageOpts, themeConfig)

  console.log(`Headings (${pageOpts.headings.length}):`, pageOpts.headings)

  return <>
    <Nav internal={themeConfig.nav.internal} external={themeConfig.nav.external} />
    <Toc headings={pageOpts.headings}/>
    <main className='site-block'>
      <Template {...props}>
        {children}
      </Template>
    </main>
  </>
}
