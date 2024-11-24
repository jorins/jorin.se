import type { Template } from '.'

import Head from 'next/head'
import { useRouter } from 'nextra/hooks'

import { useLayoutProps } from 'contexts'
import { makeHierarchicalTitle } from 'lib/title'

const Tags: Template = ({ children }) => {
  const { pageOpts, themeConfig } = useLayoutProps()
  const { route } = useRouter()
  const fullTitle = makeHierarchicalTitle(pageOpts.pages, route, themeConfig)

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
      </Head>

      {children}
    </>
  )
}

export default Tags
