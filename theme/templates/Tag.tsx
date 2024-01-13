import type { Template } from '.'

import Head from 'next/head'

import { makeHierarchicalTitle } from '../lib/title'
import { useLayoutProps } from '../contexts'

const Tag: Template = ({ children }) => {
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

export default Tag
