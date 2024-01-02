import type { Template } from '.'

import Head from 'next/head'

import { makeHierarchicalTitle } from '../lib/title'

const Tags: Template = ({ children, pageOpts, themeConfig }) => {
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
