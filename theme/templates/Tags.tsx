import type { Template } from '.'

import Head from 'next/head'

import { useLayoutProps } from 'contexts'
import { makeHierarchicalTitle } from 'lib/title'

const Tags: Template = ({ children }) => {
  const { pageOpts, themeConfig } = useLayoutProps()
  const fullTitle = makeHierarchicalTitle(pageOpts, themeConfig)

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
