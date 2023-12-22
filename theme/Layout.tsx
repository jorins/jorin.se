import type { NextraThemeLayoutProps } from 'nextra'

import '@openfonts/quicksand_all'

import Nav from './components/Nav'
import Toc from './components/Toc'

import { resolveTemplate } from './templates'
import { defaultConfig } from './lib/config'

export default function Layout(props: NextraThemeLayoutProps) {
  const { pageOpts, children } = props
  const themeConfig = {
    ...defaultConfig,
    ...props.themeConfig,
  }

  const Template = resolveTemplate(pageOpts, themeConfig)

  // FIXME: why is it empty >:(
  console.debug(`Headings (${pageOpts.headings.length}):`, pageOpts.headings)

  return <>
    <Nav pageOpts={pageOpts} themeConfig={themeConfig}/>
    {
      // Re-enable with headings
      // }<Toc headings={pageOpts.headings}/>
    }
    <main className='site-block'>
      <Template {...props}>
        {children}
      </Template>
    </main>
  </>
}
