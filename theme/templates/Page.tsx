import type { Template } from '.'

import Head from 'next/head'

import { makeHierarchicalTitle } from '../lib/title'
import { HierarchyNav, PageMetadata, PageTitle } from '../siteComponents'

const Page: Template = ({ children, pageOpts, themeConfig }) => {
  const fullTitle = makeHierarchicalTitle(pageOpts, themeConfig)

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
      </Head>

      <PageMetadata />
      <HierarchyNav pageOpts={pageOpts} />
      <PageTitle>{pageOpts.title}</PageTitle>
      {children}
    </>
  )
}

export default Page
